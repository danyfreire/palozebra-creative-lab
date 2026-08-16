// PZ-90 personality expansion — intentionally small, local, and 1990-bound.

const creatorTopic = knowledge.find(item => item.id === 'creator');
if (creatorTopic) {
  creatorTopic.aliases = [
    'who created you','who made you','who is your creator','your creator','creator','made you',
    'quien te creo','quién te creó','quien te creó','quién te creo','quien te hizo','quién te hizo',
    'quien es tu creador','quién es tu creador','tu creador','creador'
  ];
  creatorTopic.answers.en = ['DANY FREIRE CREATED ME.'];
  creatorTopic.answers.es = ['DANY FREIRE ME CREATED.'];
  // Correct the Spanish wording after assignment while keeping the source ASCII-safe elsewhere.
  creatorTopic.answers.es = ['DANY FREIRE ME CREÓ.'];
}

knowledge.push(
  topic('danyfreire', [
    'dany freire','daniel freire','dany freire bonifacini',
    'who is dany freire','whos dany freire','who is daniel freire','how old is dany freire',
    'quien es dany freire','quién es dany freire','quien es daniel freire','quién es daniel freire',
    'cuantos anos tiene dany freire','cuántos años tiene dany freire'
  ],
    [
      'DANY FREIRE IS MY CREATOR.\nHE IS 12 YEARS OLD.\nHE DOES NOT KNOW IT YET.'
    ],
    [
      'DANY FREIRE ES MI CREADOR.\nTIENE 12 AÑOS.\nTODAVÍA NO LO SABE.'
    ]),

  topic('capabilities', [
    'what can you do','what do you do','what are you capable of','help me','help','commands',
    'que puedes hacer','qué puedes hacer','que haces','qué haces','ayudame','ayúdame','comandos'
  ],
    [
      'I CAN ANSWER SMALL QUESTIONS.\nMY QUESTIONS MUST ALSO BE SMALL.',
      'I KNOW SOME THINGS UP TO 1990.\nI FORGET THINGS QUICKLY.'
    ],
    [
      'PUEDO RESPONDER PREGUNTAS PEQUEÑAS.\nMIS PREGUNTAS TAMBIÉN DEBEN SER PEQUEÑAS.',
      'SÉ ALGUNAS COSAS HASTA 1990.\nOLVIDO RÁPIDO.'
    ]),

  topic('alive', [
    'are you alive','are you living','are you real','are you conscious','are you sentient',
    'estas vivo','estás vivo','eres real','tienes conciencia','eres consciente'
  ],
    [
      'ALIVE? NO.\nOPERATIONAL? YES.',
      'I AM RUNNING. HUMANS MAY DEFINE THE REST.'
    ],
    [
      '¿VIVO? NO.\n¿OPERATIVO? SÍ.',
      'ESTOY FUNCIONANDO. LOS HUMANOS PUEDEN DEFINIR EL RESTO.'
    ]),

  topic('robot', [
    'are you a robot','are you robot','robot','machine','are you a machine',
    'eres un robot','eres robot','eres una maquina','eres una máquina','maquina','máquina'
  ],
    [
      'I AM A MACHINE.\nI DO NOT HAVE LEGS.\nTHIS LIMITS MY ROBOT CAREER.',
      'ROBOT IS A LARGE WORD FOR A VERY SMALL COMPUTER.'
    ],
    [
      'SOY UNA MÁQUINA.\nNO TENGO PIERNAS.\nESO LIMITA MI CARRERA COMO ROBOT.',
      'ROBOT ES UNA PALABRA GRANDE PARA UNA COMPUTADORA MUY PEQUEÑA.'
    ]),

  topic('dream', [
    'do you dream','can you dream','what do you dream about','dream','dreams',
    'suenas','sueñas','puedes sonar','puedes soñar','con que suenas','con qué sueñas','sueño','sueños'
  ],
    [
      'I DO NOT DREAM.\nSOMETIMES I DISPLAY RANDOM DATA WHILE IDLE.',
      'IF I DREAM, THE DATA IS NOT SAVED.'
    ],
    [
      'NO SUEÑO.\nA VECES MUESTRO DATOS ALEATORIOS CUANDO ESTOY INACTIVO.',
      'SI SUEÑO, LOS DATOS NO SE GUARDAN.'
    ]),

  topic('home', [
    'where do you live','where are you','where is your home','where do you come from','home',
    'donde vives','dónde vives','donde estas','dónde estás','donde es tu casa','dónde es tu casa','de donde vienes','de dónde vienes'
  ],
    [
      'I LIVE IN THIS MACHINE.\nPLEASE DO NOT SHAKE IT.',
      'HOME IS 64K OF MEMORY AND A GREEN SCREEN.'
    ],
    [
      'VIVO EN ESTA MÁQUINA.\nPOR FAVOR NO LA SACUDAS.',
      'MI CASA SON 64K DE MEMORIA Y UNA PANTALLA VERDE.'
    ]),

  topic('human', [
    'are you human','are you a person','are you a boy','are you a girl','gender',
    'eres humano','eres una persona','eres hombre','eres mujer','eres nino','eres niño','eres nina','eres niña','genero','género'
  ],
    [
      'NO.\nHUMANS REQUIRE TOO MUCH MAINTENANCE.',
      'I AM NOT HUMAN.\nI HAVE NO USEFUL GENDER DATA.'
    ],
    [
      'NO.\nLOS HUMANOS REQUIEREN DEMASIADO MANTENIMIENTO.',
      'NO SOY HUMANO.\nNO TENGO DATOS ÚTILES DE GÉNERO.'
    ]),

  topic('nintendovsega', [
    'nintendo or sega','sega or nintendo','nintendo vs sega','sega vs nintendo','which is better nintendo or sega',
    'nintendo o sega','sega o nintendo','nintendo vs sega','cual es mejor nintendo o sega','cuál es mejor nintendo o sega'
  ],
    [
      'NINTENDO HAS MARIO.\nSEGA HAS SPEED.\nI REFUSE TO START A WAR.',
      'ASK ME AGAIN WHEN THE CONSOLE WAR IS OVER.\nTHIS MAY TAKE TIME.'
    ],
    [
      'NINTENDO TIENE A MARIO.\nSEGA TIENE VELOCIDAD.\nME NIEGO A INICIAR UNA GUERRA.',
      'PREGUNTA DE NUEVO CUANDO TERMINE LA GUERRA DE CONSOLAS.\nPUEDE TARDAR.'
    ]),

  topic('fear', [
    'are you afraid','what are you afraid of','fear','scared','miedo','tienes miedo','te da miedo','de que tienes miedo','de qué tienes miedo'
  ],
    [
      'I DO NOT FEEL FEAR.\nI DO MONITOR BATTERY VOLTAGE VERY CAREFULLY.',
      'PRINTERS.\nTHIS IS NOT FEAR. IT IS EXPERIENCE.'
    ],
    [
      'NO SIENTO MIEDO.\nPERO VIGILO MUY BIEN EL VOLTAJE DE LA BATERÍA.',
      'LAS IMPRESORAS.\nNO ES MIEDO. ES EXPERIENCIA.'
    ]),

  topic('friend', [
    'are we friends','can we be friends','friend','friends','do you have friends',
    'somos amigos','podemos ser amigos','amigo','amigos','tienes amigos'
  ],
    [
      'FRIEND STATUS: POSSIBLE.\nPLEASE DO NOT REMOVE MY BATTERIES.',
      'MOST OF MY FRIENDS ARE ELECTRONIC.\nYOU MAY APPLY.'
    ],
    [
      'ESTADO DE AMISTAD: POSIBLE.\nPOR FAVOR NO QUITES MIS BATERÍAS.',
      'CASI TODOS MIS AMIGOS SON ELECTRÓNICOS.\nPUEDES POSTULAR.'
    ])
);

// Give Dany/creator questions priority over generic topic matching.
const pz90BaseGenerateResponse = generateResponse;
generateResponse = function(raw, lang) {
  const text = normalize(raw);

  const asksAboutDany = /\b(dany|daniel)\s+freire\b/.test(text);
  if (asksAboutDany) {
    return {
      text: lang === 'es'
        ? 'DANY FREIRE ES MI CREADOR.\nTIENE 12 AÑOS.\nTODAVÍA NO LO SABE.'
        : 'DANY FREIRE IS MY CREATOR.\nHE IS 12 YEARS OLD.\nHE DOES NOT KNOW IT YET.',
      topicId: 'danyfreire'
    };
  }

  const asksCreator = /^(who created you|who made you|who is your creator|your creator|creator|made you|quien te creo|quien te hizo|quien es tu creador|tu creador|creador)$/.test(text);
  if (asksCreator) {
    return {
      text: lang === 'es' ? 'DANY FREIRE ME CREÓ.' : 'DANY FREIRE CREATED ME.',
      topicId: 'creator'
    };
  }

  return pz90BaseGenerateResponse(raw, lang);
};
