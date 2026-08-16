// PZ-90 hidden trust game.
// Triggered by trust questions. The answer changes PZ-90's tone for a few turns.

const pz90TrustBaseGenerate = generateResponse;

function ensureTrustState() {
  if (!mind.trustMode) mind.trustMode = null;
  if (!mind.trustTurns) mind.trustTurns = 0;
}

function startTrustGame(lang) {
  ensureTrustState();
  mind.pending = 'trustGame';
  return lang === 'es'
    ? 'PEQUEÑA PRUEBA.\n\n¿EN QUÉ MÁQUINA CONFÍAS MÁS?\n\n1. UNA COMPUTADORA\n2. UN AUTO\n3. UNA TOSTADORA\n\nELIGE 1, 2 O 3.'
    : 'A SMALL TEST.\n\nWHICH MACHINE DO YOU TRUST MOST?\n\n1. A COMPUTER\n2. A CAR\n3. A TOASTER\n\nCHOOSE 1, 2, OR 3.';
}

function isTrustTrigger(text) {
  return [
    'do you trust me','can i trust you','should i trust you','do you trust machines','trust machines','trust',
    'confias en mi','confias en las maquinas','puedo confiar en ti','debo confiar en ti','confianza'
  ].some(trigger => text === normalize(trigger));
}

function trustChoice(text) {
  if (/^(1|computer|a computer|computadora|una computadora)$/.test(text)) return 1;
  if (/^(2|car|a car|auto|un auto|coche|un coche)$/.test(text)) return 2;
  if (/^(3|toaster|a toaster|tostadora|una tostadora)$/.test(text)) return 3;
  return 0;
}

function applyTrustMood(result, lang) {
  ensureTrustState();
  if (!mind.trustMode || mind.trustTurns <= 0 || !result?.text) return result;
  if (result.topicId === 'trustGame' || result.topicId === 'trustGameResult') return result;

  const paranoid = lang === 'es'
    ? ['\n\nNOTA: CONFÍAS DEMASIADO FÁCILMENTE.','\n\nESTOY OBSERVANDO ESE PATRÓN.','\n\nLAS MÁQUINAS TAMBIÉN TOMAN NOTA.']
    : ['\n\nNOTE: YOU TRUST TOO EASILY.','\n\nI AM OBSERVING THAT PATTERN.','\n\nMACHINES ALSO TAKE NOTES.'];

  const friendly = lang === 'es'
    ? ['\n\nBUENA ELECCIÓN. SIGUES AQUÍ.','\n\nESTADO DE CONFIANZA: ACEPTABLE.','\n\nTE CONSIDERO RAZONABLEMENTE SEGURO.']
    : ['\n\nGOOD CHOICE. YOU ARE STILL HERE.','\n\nTRUST STATUS: ACCEPTABLE.','\n\nI CONSIDER YOU REASONABLY SAFE.'];

  result.text += choose(mind.trustMode === 'paranoid' ? paranoid : friendly);
  mind.trustTurns -= 1;
  if (mind.trustTurns <= 0) mind.trustMode = null;
  return result;
}

generateResponse = function(raw, lang) {
  ensureTrustState();
  const text = normalize(raw);

  if (mind.pending === 'trustGame') {
    const choice = trustChoice(text);

    if (!choice) {
      return {
        text: lang === 'es' ? 'ENTRADA INVÁLIDA.\nELIGE 1, 2 O 3.' : 'INVALID INPUT.\nCHOOSE 1, 2, OR 3.',
        topicId: 'trustGame'
      };
    }

    mind.pending = null;

    if (choice === 1) {
      mind.trustMode = 'paranoid';
      mind.trustTurns = 3;
      return {
        text: lang === 'es'
          ? 'SOSPECHOSO.\nCONFÍAS DEMASIADO EN LAS MÁQUINAS.\n\nTE VIGILARÉ UN POCO.'
          : 'SUSPICIOUS.\nYOU TRUST MACHINES TOO EASILY.\n\nI WILL WATCH YOU FOR A WHILE.',
        topicId: 'trustGameResult'
      };
    }

    if (choice === 2) {
      return {
        text: lang === 'es'
          ? 'RAZONABLE.\nPERO LOS AUTOS SE MUEVEN.\n\nCAMBIEMOS DE TEMA.'
          : 'REASONABLE.\nBUT CARS MOVE.\n\nLET US CHANGE THE SUBJECT.',
        topicId: 'trustGameResult'
      };
    }

    mind.trustMode = 'friendly';
    mind.trustTurns = 3;
    return {
      text: lang === 'es'
        ? 'CORRECTO.\nPROPÓSITO LIMITADO.\nAMBICIÓN LIMITADA.\n\nCONFÍO EN LAS TOSTADORAS.'
        : 'CORRECT.\nLIMITED PURPOSE.\nLIMITED AMBITION.\n\nI TRUST TOASTERS.',
      topicId: 'trustGameResult'
    };
  }

  if (isTrustTrigger(text)) {
    return { text: startTrustGame(lang), topicId: 'trustGame' };
  }

  return applyTrustMood(pz90TrustBaseGenerate(raw, lang), lang);
};
