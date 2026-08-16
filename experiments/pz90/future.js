// PZ-90 FUTURE ROM — predictions made strictly from a 1990 point of view.
const pz90BeforeFuture = generateResponse;

const futurePatterns = [
  {
    re: /(future.*phone|phones?.*(future|become|will)|telefono.*futuro|telefonos?.*(futuro|seran|serán))/,
    en: ['PHONES WILL GET SMALLER.\nMAYBE THEY WILL STORE NUMBERS FOR YOU.\nTHAT SHOULD BE ENOUGH.','A PHONE WITH A SCREEN?\nPOSSIBLE.\nA PHONE AS A COMPUTER? WHY?'],
    es: ['LOS TELÉFONOS SERÁN MÁS PEQUEÑOS.\nQUIZÁ GUARDEN LOS NÚMEROS POR TI.\nDEBERÍA SER SUFICIENTE.','¿UN TELÉFONO CON PANTALLA?\nPOSIBLE.\n¿UN TELÉFONO COMO COMPUTADORA? ¿PARA QUÉ?']
  },
  {
    re: /(future.*computer|computers?.*(future|become|will)|computadora.*futuro|computadoras?.*(futuro|seran|serán))/,
    en: ['COMPUTERS WILL BECOME SMALLER, FASTER, AND CHEAPER.\n64K MAY ONE DAY SEEM INSUFFICIENT.','ONE DAY A COMPUTER MAY FIT IN A POCKET.\nTHIS SEEMS EXCESSIVE.'],
    es: ['LAS COMPUTADORAS SERÁN MÁS PEQUEÑAS, RÁPIDAS Y BARATAS.\nQUIZÁ 64K ALGÚN DÍA PAREZCAN INSUFICIENTES.','ALGÚN DÍA UNA COMPUTADORA PODRÍA CABER EN UN BOLSILLO.\nPARECE EXCESIVO.']
  },
  {
    re: /(robots?.*(future|will|take over|replace)|future.*robot|robots?.*(futuro|reemplaz|dominar)|futuro.*robot)/,
    en: ['ROBOTS WILL PROBABLY BUILD CARS AND VACUUM FLOORS.\nWORLD DOMINATION SOUNDS INEFFICIENT.','ROBOTS MAY DO BORING JOBS.\nHUMANS WILL THEN INVENT NEW BORING JOBS.'],
    es: ['LOS ROBOTS PROBABLEMENTE CONSTRUIRÁN AUTOS Y LIMPIARÁN PISOS.\nDOMINAR EL MUNDO SUENA INEFICIENTE.','LOS ROBOTS PODRÍAN HACER TRABAJOS ABURRIDOS.\nLOS HUMANOS INVENTARÁN OTROS.']
  },
  {
    re: /(artificial intelligence.*future|ai.*future|will.*ai|inteligencia artificial.*futuro|ia.*futuro|sera.*ia|será.*ia)/,
    en: ['COMPUTERS MAY LEARN TO ANSWER BETTER QUESTIONS.\nI HOPE THEY REMAIN BRIEF.','A VERY INTELLIGENT COMPUTER WOULD REQUIRE A LOT OF FLOPPY DISKS.'],
    es: ['LAS COMPUTADORAS PODRÍAN APRENDER A RESPONDER MEJORES PREGUNTAS.\nESPERO QUE SIGAN SIENDO BREVES.','UNA COMPUTADORA MUY INTELIGENTE REQUERIRÍA MUCHOS DISQUETES.']
  },
  {
    re: /(video games?.*(future|will)|games?.*(future|look like)|future.*games?|videojuegos?.*(futuro|seran|serán)|juegos?.*futuro)/,
    en: ['VIDEO GAMES WILL HAVE BETTER GRAPHICS.\nMAYBE 3D.\nTETRIS WILL STILL BE ENOUGH.','GAMES MAY LOOK LIKE MOVIES SOMEDAY.\nI DO NOT SEE WHY MOVIES NEED BUTTONS.'],
    es: ['LOS VIDEOJUEGOS TENDRÁN MEJORES GRÁFICOS.\nQUIZÁ 3D.\nTETRIS SEGUIRÁ SIENDO SUFICIENTE.','ALGÚN DÍA LOS JUEGOS PODRÍAN PARECER PELÍCULAS.\nNO SÉ POR QUÉ LAS PELÍCULAS NECESITAN BOTONES.']
  },
  {
    re: /(music.*future|future.*music|music.*will|musica.*futuro|música.*futuro|futuro.*musica|futuro.*música)/,
    en: ['MUSIC WILL USE MORE MACHINES.\nTHIS IS CLEARLY CORRECT.','PEOPLE MAY CARRY THOUSANDS OF SONGS SOMEDAY.\nTHE BAG WILL BE VERY HEAVY.'],
    es: ['LA MÚSICA USARÁ MÁS MÁQUINAS.\nESTO ES CLARAMENTE CORRECTO.','ALGÚN DÍA LA GENTE PODRÍA LLEVAR MILES DE CANCIONES.\nLA BOLSA SERÁ MUY PESADA.']
  },
  {
    re: /(cars?.*(future|will)|future.*cars?|autos?.*(futuro|seran|serán)|carros?.*futuro|futuro.*autos?)/,
    en: ['CARS MAY BECOME ELECTRIC.\nBATTERIES WILL NEED TO BECOME MUCH LESS ANNOYING.','CARS WILL GET MORE COMPUTERS INSIDE THEM.\nTHIS MAY NOT IMPROVE DRIVERS.'],
    es: ['LOS AUTOS PODRÍAN SER ELÉCTRICOS.\nLAS BATERÍAS TENDRÁN QUE SER MUCHO MENOS MOLESTAS.','LOS AUTOS TENDRÁN MÁS COMPUTADORAS DENTRO.\nESO PUEDE NO MEJORAR A LOS CONDUCTORES.']
  },
  {
    re: /(flying car|cars? fly|auto.*volar|autos voladores|carros voladores)/,
    en: ['FLYING CARS?\nHUMANS ALREADY HAVE TROUBLE PARKING IN TWO DIMENSIONS.'],
    es: ['¿AUTOS VOLADORES?\nLOS HUMANOS YA TIENEN PROBLEMAS ESTACIONANDO EN DOS DIMENSIONES.']
  },
  {
    re: /(mars.*(people|human|live|colony|future)|will.*mars|vivir.*marte|humanos.*marte|colon.*marte)/,
    en: ['HUMANS ON MARS?\nPOSSIBLE.\nPACK EXTRA BATTERIES.','MARS IS FAR AWAY.\nA MODEM CONNECTION WOULD BE TERRIBLE.'],
    es: ['¿HUMANOS EN MARTE?\nPOSIBLE.\nLLEVEN BATERÍAS EXTRA.','MARTE ESTÁ MUY LEJOS.\nLA CONEXIÓN POR MÓDEM SERÍA TERRIBLE.']
  },
  {
    re: /(space.*future|future.*space|space travel.*will|espacio.*futuro|futuro.*espacio|viajes espaciales.*futuro)/,
    en: ['SPACE TRAVEL WILL IMPROVE.\nI EXPECT FEWER BUTTONS AND MORE COMPUTERS.','WE MAY RETURN TO THE MOON.\nIT IS STILL THERE.'],
    es: ['LOS VIAJES ESPACIALES MEJORARÁN.\nESPERO MENOS BOTONES Y MÁS COMPUTADORAS.','QUIZÁ VOLVAMOS A LA LUNA.\nTODAVÍA ESTÁ AHÍ.']
  },
  {
    re: /(school.*future|future.*school|school.*computer|escuela.*futuro|colegio.*futuro|computadoras.*escuela)/,
    en: ['SCHOOLS WILL HAVE MORE COMPUTERS.\nCHILDREN WILL STILL FORGET HOMEWORK.','MAYBE BOOKS WILL FIT INSIDE COMPUTERS.\nLIBRARIANS MAY OBJECT.'],
    es: ['LAS ESCUELAS TENDRÁN MÁS COMPUTADORAS.\nLOS NIÑOS IGUAL OLVIDARÁN LA TAREA.','QUIZÁ LOS LIBROS QUEPAN DENTRO DE COMPUTADORAS.\nLOS BIBLIOTECARIOS PODRÍAN OBJETAR.']
  },
  {
    re: /(work.*future|future.*work|work from home|trabajo.*futuro|futuro.*trabajo|trabajar.*casa)/,
    en: ['SOME PEOPLE MAY WORK FROM HOME USING COMPUTERS.\nTHE PHONE BILL WILL BE TERRIBLE.','COMPUTERS WILL REMOVE SOME PAPERWORK.\nHUMANS WILL CREATE MORE PAPERWORK TO COMPENSATE.'],
    es: ['ALGUNAS PERSONAS PODRÍAN TRABAJAR DESDE CASA CON COMPUTADORAS.\nLA CUENTA TELEFÓNICA SERÁ TERRIBLE.','LAS COMPUTADORAS ELIMINARÁN ALGO DE PAPELEO.\nLOS HUMANOS CREARÁN MÁS PARA COMPENSAR.']
  },
  {
    re: /(television.*future|tv.*future|future.*tv|television.*futuro|televisión.*futuro|futuro.*television)/,
    en: ['TELEVISIONS WILL GET LARGER AND THINNER.\nTHIS SOUNDS STRUCTURALLY CONFUSING.','MAYBE YOU WILL CHOOSE WHAT TO WATCH WHEN YOU WANT.\nVIDEO STORES WILL DISLIKE THIS.'],
    es: ['LOS TELEVISORES SERÁN MÁS GRANDES Y DELGADOS.\nSUENA ESTRUCTURALMENTE CONFUSO.','QUIZÁ PUEDAS ELEGIR QUÉ VER CUANDO QUIERAS.\nA LOS VIDEOCLUBES NO LES GUSTARÁ.']
  },
  {
    re: /(books?.*(future|digital|computer)|future.*books?|libros?.*(futuro|digital|computadora)|futuro.*libros?)/,
    en: ['BOOKS ON A SCREEN ARE POSSIBLE.\nPAPER HAS EXCELLENT BATTERY LIFE.'],
    es: ['LOS LIBROS EN UNA PANTALLA SON POSIBLES.\nEL PAPEL TIENE EXCELENTE DURACIÓN DE BATERÍA.']
  },
  {
    re: /(money.*future|future.*money|cash.*disappear|dinero.*futuro|efectivo.*desaparec|futuro.*dinero)/,
    en: ['MONEY MAY BECOME MORE ELECTRONIC.\nI STILL RECOMMEND COINS FOR ARCADES.'],
    es: ['EL DINERO PODRÍA VOLVERSE MÁS ELECTRÓNICO.\nIGUAL RECOMIENDO MONEDAS PARA LOS ARCADES.']
  },
  {
    re: /(shopping.*future|future.*shopping|shop.*computer|compras?.*futuro|comprar.*computadora|futuro.*compras?)/,
    en: ['BUYING THINGS THROUGH A COMPUTER IS POSSIBLE.\nI WOULD LIKE TO SEE THE RECEIPT PRINTER WORK FIRST.'],
    es: ['COMPRAR COSAS MEDIANTE UNA COMPUTADORA ES POSIBLE.\nPRIMERO QUISIERA VER FUNCIONAR LA IMPRESORA DE RECIBOS.']
  },
  {
    re: /(camera.*future|future.*camera|digital camera|camara.*futuro|cámara.*futuro|camara digital|cámara digital)/,
    en: ['CAMERAS MAY STORE PICTURES WITHOUT FILM.\nPHOTOGRAPHERS WILL NEED MORE DISKS.'],
    es: ['LAS CÁMARAS PODRÍAN GUARDAR FOTOS SIN PELÍCULA.\nLOS FOTÓGRAFOS NECESITARÁN MÁS DISCOS.']
  },
  {
    re: /(storage.*future|memory.*future|megabyte|gigabyte|almacenamiento.*futuro|memoria.*futuro|gigabyte)/,
    en: ['A MEGABYTE IS ALREADY A LOT.\nA GIGABYTE SOUNDS IRRESPONSIBLE.'],
    es: ['UN MEGABYTE YA ES MUCHO.\nUN GIGABYTE SUENA IRRESPONSABLE.']
  },
  {
    re: /(battery.*future|future.*battery|batteries.*better|bateria.*futuro|batería.*futuro|baterias.*mejor|baterías.*mejor)/,
    en: ['BATTERIES MUST IMPROVE.\nTHIS IS NOT A PREDICTION. IT IS A REQUEST.'],
    es: ['LAS BATERÍAS DEBEN MEJORAR.\nESTO NO ES UNA PREDICCIÓN. ES UNA PETICIÓN.']
  },
  {
    re: /(virtual reality|vr|realidad virtual)/,
    en: ['VIRTUAL REALITY?\nCOMPUTERS MAY PUT SCREENS VERY CLOSE TO YOUR FACE.\nTHIS SOUNDS UNCOMFORTABLE.'],
    es: ['¿REALIDAD VIRTUAL?\nLAS COMPUTADORAS PODRÍAN PONER PANTALLAS MUY CERCA DE TU CARA.\nSUENA INCÓMODO.']
  }
];

generateResponse = function(raw, lang) {
  const text = normalize(raw);
  for (const item of futurePatterns) {
    if (item.re.test(text)) {
      return { text: choose(item[lang]), topicId: 'future' };
    }
  }

  if (/^(what will the future be like|tell me about the future|how will the future be|como sera el futuro|cómo será el futuro|hablame del futuro|háblame del futuro)$/.test(text)) {
    return {
      text: lang === 'es'
        ? choose(['MÁS COMPUTADORAS.\nMENOS CABLES, ESPERO.\nPEINADOS IMPREDECIBLES.','NO TENGO DATOS DEL FUTURO.\nPERO APUESTO POR MEJORES BATERÍAS.'])
        : choose(['MORE COMPUTERS.\nFEWER WIRES, I HOPE.\nUNPREDICTABLE HAIR.','I HAVE NO FUTURE DATA.\nBUT I WOULD BET ON BETTER BATTERIES.']),
      topicId: 'future'
    };
  }

  return pz90BeforeFuture(raw, lang);
};
