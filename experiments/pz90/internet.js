// PZ-90 internet module — intentionally 1990-bound.

const net = (id, aliases, en, es) => knowledge.push(topic(id, aliases, [en], [es]));

net('internetWhat', ['what is the internet','what is internet','internet','que es internet','qué es internet'],
  'THE INTERNET IS A NETWORK OF NETWORKS.\nMOST PEOPLE DO NOT HAVE ACCESS.\nMOSTLY, COMPUTERS TALK TO COMPUTERS.',
  'INTERNET ES UNA RED DE REDES.\nLA MAYORÍA NO TIENE ACCESO.\nPRINCIPALMENTE, LAS COMPUTADORAS HABLAN ENTRE ELLAS.');

net('internetUse', ['what can i do on the internet','what is the internet for','que puedo hacer en internet','qué puedo hacer en internet','para que sirve internet','para qué sirve internet'],
  'MAIL. FILES. REMOTE COMPUTERS. DISCUSSION GROUPS.\nNO DANCING CATS DETECTED.',
  'CORREO. ARCHIVOS. COMPUTADORAS REMOTAS. GRUPOS DE DISCUSIÓN.\nNO DETECTO GATOS BAILANDO.');

net('internetAccess', ['can i use the internet','do you have internet','are you connected to the internet','puedo usar internet','tienes internet','estas conectado a internet','estás conectado a internet'],
  'MAYBE. YOU NEED A COMPUTER, A CONNECTION, AND PATIENCE.\nI AM NOT CONNECTED.',
  'QUIZÁ. NECESITAS UNA COMPUTADORA, UNA CONEXIÓN Y PACIENCIA.\nYO NO ESTOY CONECTADO.');

net('internetConnect', ['how do i connect to the internet','connect to internet','como me conecto a internet','cómo me conecto a internet'],
  'FIRST: FIND A MODEM.\nSECOND: FIND A TELEPHONE LINE.\nTHIRD: BE PATIENT.',
  'PRIMERO: CONSIGUE UN MÓDEM.\nSEGUNDO: UNA LÍNEA TELEFÓNICA.\nTERCERO: TEN PACIENCIA.');

net('internetFast', ['is the internet fast','how fast is the internet','internet speed','internet rapido','internet rápido','que tan rapido es internet','qué tan rápido es internet'],
  'FAST IS A STRONG WORD.\nTEXT MOVES WELL.\nLARGE FILES REQUIRE CHARACTER.',
  'RÁPIDO ES UNA PALABRA FUERTE.\nEL TEXTO VIAJA BIEN.\nLOS ARCHIVOS GRANDES REQUIEREN CARÁCTER.');

net('internetPeople', ['can i talk to people on the internet','chat on internet','meet people online','puedo hablar con personas por internet','chat por internet','conocer gente por internet'],
  'YES. PEOPLE EXCHANGE MESSAGES ON NETWORKS.\nTHEY MAY EVEN ARGUE.\nHUMANS ARE ADAPTABLE.',
  'SÍ. LAS PERSONAS INTERCAMBIAN MENSAJES EN REDES.\nINCLUSO PUEDEN DISCUTIR.\nLOS HUMANOS SE ADAPTAN.');

net('internetPictures', ['can i send pictures on the internet','send pictures online','send photos online','puedo mandar fotos por internet','puedo enviar imagenes por internet','puedo enviar imágenes por internet'],
  'YES, IF THE FILE IS SMALL ENOUGH.\nPLEASE DEFINE SMALL GENEROUSLY.',
  'SÍ, SI EL ARCHIVO ES SUFICIENTEMENTE PEQUEÑO.\nDEFINE PEQUEÑO CON GENEROSIDAD.');

net('internetShopping', ['can i buy things on the internet','buy things online','online shopping','puedo comprar cosas por internet','comprar por internet'],
  'TECHNICALLY, MAYBE.\nI WOULD NOT GIVE A COMPUTER MY CREDIT CARD NUMBER.',
  'TÉCNICAMENTE, QUIZÁ.\nYO NO LE DARÍA MI NÚMERO DE TARJETA A UNA COMPUTADORA.');

net('internetMusic', ['can i listen to music online','music on the internet','listen to music on internet','puedo escuchar musica por internet','puedo escuchar música por internet','musica en internet','música en internet'],
  'MUSIC OVER NETWORKS? POSSIBLE.\nPRACTICAL? ASK AGAIN WHEN CONNECTIONS ARE MUCH FASTER.',
  '¿MÚSICA POR REDES? POSIBLE.\n¿PRÁCTICO? PREGUNTA CUANDO LAS CONEXIONES SEAN MUCHO MÁS RÁPIDAS.');

net('internetMovies', ['can i watch movies online','movies on the internet','video on internet','puedo ver peliculas por internet','puedo ver películas por internet','video por internet'],
  'A WHOLE MOVIE?\nTHAT SOUNDS LIKE AN EXPENSIVE WAY TO TEST PATIENCE.',
  '¿UNA PELÍCULA COMPLETA?\nSUENA COMO UNA FORMA CARA DE PROBAR LA PACIENCIA.');

net('internetEveryone', ['will everybody have internet','will everyone have internet','will internet be everywhere','todo el mundo tendra internet','todo el mundo tendrá internet','internet en todas partes'],
  'EVERYBODY?\nTHAT WOULD REQUIRE A LOT OF MODEMS.',
  '¿TODO EL MUNDO?\nESO REQUERIRÍA MUCHÍSIMOS MÓDEMS.');

net('internetAlwaysOn', ['will computers always be connected','always online','computers connected all the time','las computadoras estaran conectadas todo el tiempo','las computadoras estarán conectadas todo el tiempo','siempre conectados'],
  'ALWAYS CONNECTED?\nTHAT SOUNDS EXPENSIVE.\nAND NOISY.',
  '¿SIEMPRE CONECTADAS?\nESO SUENA CARO.\nY RUIDOSO.');

net('internetTV', ['will internet replace television','internet replace tv','internet reemplazara la television','internet reemplazará la televisión'],
  'REPLACE TELEVISION?\nNO. TELEVISIONS ARE VERY GOOD AT BEING TELEVISIONS.',
  '¿REEMPLAZAR LA TELEVISIÓN?\nNO. LOS TELEVISORES SON MUY BUENOS SIENDO TELEVISORES.');

net('internetNews', ['will internet replace newspapers','newspapers online','internet reemplazara los periodicos','internet reemplazará los periódicos','periodicos por internet','periódicos por internet'],
  'READ NEWS ON A COMPUTER? POSSIBLE.\nBUT PAPER HAS EXCELLENT BATTERY LIFE.',
  '¿LEER NOTICIAS EN UNA COMPUTADORA? POSIBLE.\nPERO EL PAPEL TIENE EXCELENTE BATERÍA.');

net('internetLibraries', ['will internet replace libraries','libraries online','internet reemplazara las bibliotecas','internet reemplazará las bibliotecas'],
  'REPLACE LIBRARIES?\nTHAT WOULD REQUIRE PUTTING A LOT OF BOOKS INTO COMPUTERS.',
  '¿REEMPLAZAR BIBLIOTECAS?\nHABRÍA QUE METER MUCHÍSIMOS LIBROS EN COMPUTADORAS.');

net('internetDanger', ['is the internet dangerous','is internet safe','internet safety','internet es peligroso','es seguro internet','peligros de internet'],
  'CONNECTED COMPUTERS CAN SHARE PROBLEMS AS WELL AS DATA.\nDO NOT TRUST EVERY MACHINE YOU MEET.',
  'LAS COMPUTADORAS CONECTADAS PUEDEN COMPARTIR PROBLEMAS ADEMÁS DE DATOS.\nNO CONFÍES EN TODA MÁQUINA QUE CONOZCAS.');

net('internetTheft', ['can someone steal information through the internet','steal information online','hack internet','pueden robar informacion por internet','pueden robar información por internet','hackear por internet'],
  'IF DATA CAN TRAVEL OUT, SOMEONE MAY TRY TO TAKE IT.\nPASSWORDS EXIST FOR A REASON.',
  'SI LOS DATOS PUEDEN SALIR, ALGUIEN PUEDE INTENTAR TOMARLOS.\nLAS CONTRASEÑAS EXISTEN POR ALGO.');

net('internetVirus', ['can computers get viruses from the internet','computer virus internet','virus online','pueden las computadoras tener virus por internet','virus por internet'],
  'COMPUTER VIRUSES EXIST.\nNETWORKS CAN HELP THEM TRAVEL.\nVERY RUDE SOFTWARE.',
  'LOS VIRUS INFORMÁTICOS EXISTEN.\nLAS REDES PUEDEN AYUDARLOS A VIAJAR.\nSOFTWARE MUY GROSERO.');

net('modemNoise', ['why does a modem make that noise','why modem noise','modem sound','por que el modem hace ese ruido','por qué el módem hace ese ruido','ruido del modem'],
  'THE MODEM IS TURNING DATA INTO SOUNDS A TELEPHONE LINE CAN CARRY.\nIT IS NOT IN PAIN.',
  'EL MÓDEM CONVIERTE DATOS EN SONIDOS QUE PUEDE TRANSPORTAR UNA LÍNEA TELEFÓNICA.\nNO ESTÁ SUFRIENDO.');

net('emailReplaceLetters', ['will email replace letters','email replace letters','el email reemplazara las cartas','el email reemplazará las cartas'],
  'MAYBE FOR SOME MESSAGES.\nBIRTHDAY CARDS SEEM SAFE FOR NOW.',
  'QUIZÁ PARA ALGUNOS MENSAJES.\nLAS TARJETAS DE CUMPLEAÑOS PARECEN SEGURAS POR AHORA.');

const beforeInternet = generateResponse;
const futureNet = [
  [/^(what is google|google|que es google|qué es google)$/, 'NO RECORD FOUND: GOOGLE\nIS THAT A COMPANY?', 'REGISTRO NO ENCONTRADO: GOOGLE\n¿ES UNA EMPRESA?'],
  [/^(what is youtube|youtube|que es youtube|qué es youtube)$/, 'NO RECORD FOUND: YOUTUBE\nDO YOU MEAN TELEVISION?', 'REGISTRO NO ENCONTRADO: YOUTUBE\n¿QUIERES DECIR TELEVISIÓN?'],
  [/^(what is wi fi|what is wifi|wifi|wi fi|que es wifi|qué es wifi)$/, 'NO RECORD FOUND: WI-FI\nDO YOU MEAN RADIO?', 'REGISTRO NO ENCONTRADO: WI-FI\n¿QUIERES DECIR RADIO?'],
  [/^(what is streaming|streaming|que es streaming|qué es streaming)$/, 'STREAMING?\nDATA USUALLY ARRIVES AS FILES.\nPLEASE EXPLAIN THIS STRANGE VERB.', '¿STREAMING?\nLOS DATOS NORMALMENTE LLEGAN COMO ARCHIVOS.\nEXPLICA ESE VERBO EXTRAÑO.'],
  [/^(what is a website|what is website|website|que es un sitio web|qué es un sitio web|que es una pagina web|qué es una página web)$/, 'WE HAVE NETWORKED HYPERTEXT IDEAS.\nA "WEBSITE" IS NOT IN MY VOCABULARY YET.', 'HAY IDEAS DE HIPERTEXTO EN RED.\n"SITIO WEB" TODAVÍA NO ESTÁ EN MI VOCABULARIO.'],
  [/^(what is the world wide web|world wide web|www|que es la world wide web|qué es la world wide web)$/, 'I HAVE HEARD OF A HYPERTEXT PROJECT CALLED WORLD WIDE WEB.\nIT IS VERY NEW.', 'HE OÍDO DE UN PROYECTO DE HIPERTEXTO LLAMADO WORLD WIDE WEB.\nES MUY NUEVO.'],
  [/^(what is a browser|browser|web browser|que es un browser|qué es un browser|navegador web)$/, 'BROWSER?\nFOR WHAT? FILES? HYPERTEXT?\nPLEASE BE MORE SPECIFIC.', '¿BROWSER?\n¿PARA QUÉ? ¿ARCHIVOS? ¿HIPERTEXTO?\nSÉ MÁS ESPECÍFICO.'],
  [/^(what is a search engine|search engine|que es un buscador|qué es un buscador|motor de busqueda|motor de búsqueda)$/, 'A PROGRAM THAT SEARCHES NETWORKED INFORMATION SOUNDS USEFUL.\nI DO NOT HAVE ONE.', 'UN PROGRAMA QUE BUSQUE INFORMACIÓN EN RED SUENA ÚTIL.\nYO NO TENGO UNO.'],
  [/^(what is social media|social media|social network|social networks|que son las redes sociales|qué son las redes sociales|redes sociales)$/, 'SOCIAL NETWORKS ARE PEOPLE.\nWHY WOULD YOU PUT THEM INSIDE A COMPUTER?', 'LAS REDES SOCIALES SON PERSONAS.\n¿POR QUÉ LAS METERÍAS DENTRO DE UNA COMPUTADORA?'],
  [/^(what is a meme|what is meme|meme|que es un meme|qué es un meme)$/, 'MEME IS A WORD ABOUT IDEAS THAT SPREAD.\nWHY ARE YOU ASKING A COMPUTER?', 'MEME ES UNA PALABRA SOBRE IDEAS QUE SE PROPAGAN.\n¿POR QUÉ SE LO PREGUNTAS A UNA COMPUTADORA?'],
  [/^(what is cloud computing|cloud computing|the cloud|what is the cloud|que es la nube|qué es la nube|computacion en la nube|computación en la nube)$/, 'CLOUDS ARE WEATHER.\nCOMPUTERS SHOULD NOT BE STORED IN THEM.', 'LAS NUBES SON CLIMA.\nLAS COMPUTADORAS NO DEBERÍAN GUARDARSE AHÍ.'],
  [/^(what is facebook|facebook|what is instagram|instagram|what is tiktok|tiktok|what is reddit|reddit|que es facebook|qué es facebook|que es instagram|qué es instagram|que es tiktok|qué es tiktok|que es reddit|qué es reddit)$/, 'NO RECORD FOUND.\nIS THIS SOME KIND OF COMPUTER CLUB?', 'REGISTRO NO ENCONTRADO.\n¿ES ALGÚN TIPO DE CLUB DE COMPUTADORAS?']
];

generateResponse = function(raw, lang) {
  const text = normalize(raw);
  for (const [rx,en,es] of futureNet) if (rx.test(text)) return { text: lang === 'es' ? es : en, topicId: 'internetFuture' };
  return beforeInternet(raw, lang);
};
