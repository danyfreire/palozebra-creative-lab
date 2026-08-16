// PZ-90 mini game: the meaning of life.
// One question. Three answers. The reward for being right is forgetting everything.

const pz90GameBaseGenerate = generateResponse;
const pz90GameBaseFinishTurn = finishTurn;

const lifeGameTriggers = [
  'play a game','play game','game','lets play','let us play',
  'jugar','juguemos','quiero jugar','un juego','juego',
  'what is the meaning of life','meaning of life','the meaning of life',
  'cual es el sentido de la vida','cuál es el sentido de la vida','sentido de la vida'
];

const lifeGameWrongTopics = {
  en: [
    'WRONG.\n\nANYWAY. DO YOU PLAY TETRIS?',
    'WRONG.\n\nNEW SUBJECT: I DO NOT TRUST PRINTERS.',
    'WRONG.\n\nLET US DISCUSS SYNTHESIZERS INSTEAD.',
    'WRONG.\n\nQUESTION WITHDRAWN.\nDO YOU LIKE CASSETTES?'
  ],
  es: [
    'EQUIVOCADO.\n\nEN FIN. ¿JUEGAS TETRIS?',
    'EQUIVOCADO.\n\nNUEVO TEMA: NO CONFÍO EN LAS IMPRESORAS.',
    'EQUIVOCADO.\n\nMEJOR HABLEMOS DE SINTETIZADORES.',
    'EQUIVOCADO.\n\nPREGUNTA RETIRADA.\n¿TE GUSTAN LOS CASETES?'
  ]
};

function startLifeGame(lang) {
  mind.pending = 'lifeGame';
  return lang === 'es'
    ? 'UNA PREGUNTA IMPORTANTE.\n\n¿CUÁL ES EL SENTIDO DE LA VIDA?\n\n1. EL DESTINO\n2. EL CAMINO\n3. LA RESPUESTA\n\nELIGE 1, 2 O 3.'
    : 'AN IMPORTANT QUESTION.\n\nWHAT IS THE MEANING OF LIFE?\n\n1. THE DESTINATION\n2. THE JOURNEY\n3. THE ANSWER\n\nCHOOSE 1, 2, OR 3.';
}

function isLifeGameTrigger(text) {
  return lifeGameTriggers.some(trigger => text === normalize(trigger));
}

function isLifeGameCorrect(text) {
  return /^(2|the journey|journey|the path|path|el camino|camino|el viaje|viaje)$/.test(text);
}

function isLifeGameWrong(text) {
  return /^(1|3|the destination|destination|the answer|answer|el destino|destino|la respuesta|respuesta)$/.test(text);
}

generateResponse = function(raw, lang) {
  const text = normalize(raw);

  if (mind.pending === 'lifeGame') {
    if (isLifeGameCorrect(text)) {
      mind.pending = null;
      return {
        text: lang === 'es'
          ? 'CORRECTO.\n\nEL CAMINO ES EL PREMIO.\n\nTU PREMIO:\nBORRARLO TODO.\n\nMEMORIA BORRADA.'
          : 'CORRECT.\n\nTHE JOURNEY IS THE REWARD.\n\nYOUR PRIZE:\nERASE EVERYTHING.\n\nMEMORY ERASED.',
        topicId: 'lifeGame',
        gameReset: true
      };
    }

    if (isLifeGameWrong(text)) {
      mind.pending = null;
      return {
        text: choose(lifeGameWrongTopics[lang]),
        topicId: 'lifeGameWrong'
      };
    }

    return {
      text: lang === 'es'
        ? 'ENTRADA INVÁLIDA.\nELIGE 1, 2 O 3.'
        : 'INVALID INPUT.\nCHOOSE 1, 2, OR 3.',
      topicId: 'lifeGame'
    };
  }

  if (isLifeGameTrigger(text)) {
    return { text: startLifeGame(lang), topicId: 'lifeGame' };
  }

  return pz90GameBaseGenerate(raw, lang);
};

finishTurn = function(pendingTurn, userText, result, lang, stateBefore) {
  pz90GameBaseFinishTurn(pendingTurn, userText, result, lang, stateBefore);

  if (result.gameReset) {
    setTimeout(() => {
      if (!busy) reset();
    }, 2400);
  }
};
