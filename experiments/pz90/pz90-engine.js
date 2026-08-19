// PZ-90 bilingual intent engine — lightweight, deterministic, browser-only.
// Loaded after app.js so it can replace the original matching helpers without
// changing the existing ROM/intents, games, personality, or UI.

(() => {
  const stopwords = {
    en: new Set(['a','an','and','are','can','do','does','for','how','i','in','is','it','me','my','of','on','please','the','to','what','when','where','who','why','you','your']),
    es: new Set(['a','al','como','con','cual','de','del','donde','el','ella','en','es','esta','este','la','las','lo','los','me','mi','para','por','que','quien','se','si','su','te','tu','un','una','y','yo'])
  };

  const languageSignals = {
    en: {
      strong: ['hello','hi','please','thanks','thank you','what','who','why','where','when','how','your','you','computer','movie','music','future','year','phone','game'],
      weak: ['the','is','are','do','does','can','my','me','and','of','to','in']
    },
    es: {
      strong: ['hola','buenas','gracias','que','quien','por que','donde','cuando','como','tu','computadora','pelicula','musica','futuro','ano','telefono','juego','puedes','quiero'],
      weak: ['el','la','los','las','es','son','mi','me','y','de','en','para','con']
    }
  };

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/(.)\1{2,}/g, '$1$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokens(text) {
    return normalize(text).split(' ').filter(Boolean);
  }

  function phraseInText(text, phrase) {
    const haystack = ` ${normalize(text)} `;
    const needle = ` ${normalize(phrase)} `;
    return needle.trim().length > 0 && haystack.includes(needle);
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 3;

    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      const current = [i];
      let rowMin = current[0];
      for (let j = 1; j <= b.length; j += 1) {
        const value = Math.min(
          current[j - 1] + 1,
          previous[j] + 1,
          previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
        current[j] = value;
        rowMin = Math.min(rowMin, value);
      }
      if (rowMin > 2) return 3;
      previous = current;
    }
    return previous[b.length];
  }

  function fuzzyTokenMatch(a, b) {
    if (a === b) return 1;
    if (a.length < 5 || b.length < 5) return 0;
    const maxDistance = Math.max(a.length, b.length) >= 8 ? 2 : 1;
    const distance = levenshtein(a, b);
    if (distance > maxDistance) return 0;
    return distance === 1 ? 0.82 : 0.68;
  }

  function meaningfulWords(text, lang) {
    const sw = stopwords[lang] || new Set();
    return tokens(text).filter(word => word.length > 1 && !sw.has(word));
  }

  function detectLanguage(raw, previousLanguage = 'en') {
    const text = normalize(raw);
    if (!text) return previousLanguage || 'en';

    const padded = ` ${text} `;
    const scores = { en: 0, es: 0 };

    for (const lang of ['en', 'es']) {
      for (const signal of languageSignals[lang].strong) {
        if (padded.includes(` ${normalize(signal)} `)) scores[lang] += 3;
      }
      for (const signal of languageSignals[lang].weak) {
        if (padded.includes(` ${normalize(signal)} `)) scores[lang] += 1;
      }
    }

    // Spanish-only forms provide useful evidence even after accents are stripped.
    if (/\b(eres|tienes|quieres|puedes|dime|cuentame|porque|gracias|hola)\b/.test(text)) scores.es += 2;
    if (/\b(are|have|want|tell|because|thanks|hello|please)\b/.test(text)) scores.en += 2;

    if (scores.en === scores.es) return previousLanguage || 'en';
    return scores.es > scores.en ? 'es' : 'en';
  }

  function scoreAlias(text, alias, lang) {
    const cleanText = normalize(text);
    const cleanAlias = normalize(alias);
    if (!cleanAlias) return 0;
    if (cleanText === cleanAlias) return 100;

    const textTokens = tokens(cleanText);
    const aliasTokens = tokens(cleanAlias);

    if (phraseInText(cleanText, cleanAlias)) {
      return aliasTokens.length > 1 ? Math.min(94, 78 + cleanAlias.length / 3) : 76;
    }

    const usefulAliasTokens = aliasTokens.filter(word => word.length > 1 && !(stopwords[lang] || new Set()).has(word));
    if (!usefulAliasTokens.length) return 0;

    let exact = 0;
    let fuzzy = 0;
    for (const aliasWord of usefulAliasTokens) {
      if (textTokens.includes(aliasWord)) {
        exact += 1;
        continue;
      }
      let bestFuzzy = 0;
      for (const textWord of textTokens) bestFuzzy = Math.max(bestFuzzy, fuzzyTokenMatch(textWord, aliasWord));
      fuzzy += bestFuzzy;
    }

    const coverage = (exact + fuzzy) / usefulAliasTokens.length;
    if (coverage <= 0) return 0;

    // One distinctive exact token should be enough for entity-like aliases such as
    // MARIO, TETRIS, MODEM, MADONNA, etc. Short/generic tokens score lower.
    if (usefulAliasTokens.length === 1) {
      const word = usefulAliasTokens[0];
      if (exact) return word.length >= 4 ? 72 : 42;
      if (fuzzy) return word.length >= 5 ? 50 * fuzzy : 0;
    }

    let score = coverage * 58;
    if (exact === usefulAliasTokens.length) score += 14;
    if (exact > 0) score += Math.min(10, exact * 4);
    return Math.min(76, score);
  }

  function scoreTopic(text, item, lang = 'en', context = {}) {
    let score = 0;
    for (const alias of item.aliases || []) score = Math.max(score, scoreAlias(text, alias, lang));

    const wordCount = tokens(text).length;
    if (context.lastTopic && item.id === context.lastTopic && score > 0 && wordCount <= 6) score += 5;
    return Math.min(100, score);
  }

  function findBestTopic(text, items, lang = 'en', context = {}) {
    let best = null;
    let bestScore = 0;
    let secondScore = 0;

    for (const item of items || []) {
      const score = scoreTopic(text, item, lang, context);
      if (score > bestScore) {
        secondScore = bestScore;
        bestScore = score;
        best = item;
      } else if (score > secondScore) {
        secondScore = score;
      }
    }

    return {
      best,
      bestScore,
      secondScore,
      confidence: bestScore ? Math.max(0, Math.min(1, (bestScore - secondScore + 18) / 60)) : 0
    };
  }

  function findModern(text, terms) {
    const cleanText = normalize(text);
    const textTokens = tokens(cleanText);
    let fuzzyCandidate = null;
    let fuzzyScore = 0;

    for (const termRaw of terms || []) {
      const term = normalize(termRaw);
      if (!term) continue;
      if (phraseInText(cleanText, term)) return termRaw;
      const termTokens = tokens(term);
      if (termTokens.length !== 1) continue;
      for (const word of textTokens) {
        const match = fuzzyTokenMatch(word, term);
        if (match > fuzzyScore) {
          fuzzyScore = match;
          fuzzyCandidate = termRaw;
        }
      }
    }
    return fuzzyScore >= 0.8 ? fuzzyCandidate : null;
  }

  window.PZ90Engine = {
    normalize,
    detectLanguage,
    scoreTopic,
    findBestTopic,
    findModern,
    levenshtein,
    meaningfulWords
  };

  // Replace only the interpretation helpers. Everything else remains the original
  // PZ-90 application and ROM content.
  normalize = PZ90Engine.normalize;
  detectLanguage = function(raw) {
    if (forcedLanguage !== 'auto') return forcedLanguage;
    return PZ90Engine.detectLanguage(raw, currentLanguage || 'en');
  };
  scoreTopic = function(text, item) {
    return PZ90Engine.scoreTopic(text, item, currentLanguage || 'en', { lastTopic: mind?.lastTopic || null });
  };
  findBestTopic = function(text) {
    return PZ90Engine.findBestTopic(text, knowledge, currentLanguage || 'en', { lastTopic: mind?.lastTopic || null });
  };
  findModern = function(text) {
    return PZ90Engine.findModern(text, [...modernTerms.en, ...modernTerms.es]);
  };
})();
