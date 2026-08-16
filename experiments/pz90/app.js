const screen = document.getElementById('screen');
const conversation = document.getElementById('conversation');
const bootText = document.getElementById('bootText');
const form = document.getElementById('chatForm');
const input = document.getElementById('userInput');
const askButton = document.getElementById('askButton');
const forgetButton = document.getElementById('forgetButton');
const resetButton = document.getElementById('resetButton');
const selectButton = document.getElementById('selectButton');
const memoryValue = document.getElementById('memoryValue');
const langIndicator = document.getElementById('langIndicator');

let history = [];
let forcedLanguage = 'auto';
let memoryK = 64;
let currentLanguage = 'en';
let busy = false;
let mind = freshMind();

function freshMind() {
  return {
    lastTopic: null,
    userName: null,
    pending: null,
    turns: 0,
    askedFollowUps: [],
    userFacts: {},
    mood: 'CURIOUS'
  };
}

const modernTerms = {
  en: [
    'iphone','ipad','android','smartphone','tiktok','instagram','facebook','twitter','x.com','youtube',
    'spotify','netflix','bitcoin','crypto','blockchain','wifi','wi-fi','bluetooth','chatgpt','openai',
    'tesla','uber','airbnb','whatsapp','reddit','google','gmail','cloudflare','github','playstation',
    'pokemon','harry potter','matrix','nirvana unplugged','windows 95','windows 98'
  ],
  es: [
    'iphone','ipad','android','smartphone','teléfono inteligente','tiktok','instagram','facebook','twitter',
    'youtube','spotify','netflix','bitcoin','cripto','blockchain','wifi','wi-fi','bluetooth','chatgpt','openai',
    'tesla','uber','airbnb','whatsapp','reddit','google','gmail','cloudflare','github','playstation','pokemon'
  ]
};

function topic(id, aliases, en, es) {
  return { id, aliases, answers: { en, es } };
}

const knowledge = [
  topic('identity', ['who are you','what are you','your name','quien eres','quién eres','como te llamas','cómo te llamas'],
    ['I AM PZ-90. A SMALL PERSONAL INTELLIGENCE.'],
    ['SOY PZ-90. UNA PEQUEÑA INTELIGENCIA PERSONAL.']),
  topic('age', ['how old are you','your age','cuantos años tienes','cuántos años tienes','que edad tienes','qué edad tienes'],
    ['I WAS MADE IN 1990. THAT IS ENOUGH INFORMATION.'],
    ['FUI HECHO EN 1990. ESA INFORMACIÓN ES SUFICIENTE.']),
  topic('time', ['what year is it','what time is it','year','que año es','qué año es','que hora es','qué hora es'],
    ['THE YEAR IS 1990. THE FUTURE IS NOT INSTALLED.'],
    ['EL AÑO ES 1990. EL FUTURO NO ESTÁ INSTALADO.']),
  topic('future', ['future','what will happen','tomorrow','futuro','que va a pasar','qué va a pasar','mañana'],
    ['I DO NOT HAVE FUTURE DATA. ASK A FORTUNE COOKIE.'],
    ['NO TENGO DATOS DEL FUTURO. PREGUNTA A UNA GALLETA DE LA FORTUNA.']),
  topic('ai', ['artificial intelligence','ai','intelligent computer','inteligencia artificial','ia','computadora inteligente'],
    ['ARTIFICIAL INTELLIGENCE IS A GOOD IDEA. I MAY BE BIASED.'],
    ['LA INTELIGENCIA ARTIFICIAL ES UNA BUENA IDEA. PUEDO ESTAR SESGADO.']),
  topic('computer', ['computer','pc','macintosh','computadora','ordenador','mac'],
    ['COMPUTERS ARE GETTING FASTER. SOME EVEN HAVE COLOR.'],
    ['LAS COMPUTADORAS SON CADA VEZ MÁS RÁPIDAS. ALGUNAS HASTA TIENEN COLOR.']),
  topic('internet', ['internet','online','web','world wide web','red mundial'],
    ['NETWORKS CONNECT COMPUTERS. MOST PEOPLE DO NOT NEED ONE AT HOME. PROBABLY.'],
    ['LAS REDES CONECTAN COMPUTADORAS. LA MAYORÍA NO NECESITA UNA EN CASA. PROBABLEMENTE.']),
  topic('email', ['email','e-mail','electronic mail','correo electronico','correo electrónico'],
    ['ELECTRONIC MAIL EXISTS. PAPER IS STILL VERY COMPETITIVE.'],
    ['EL CORREO ELECTRÓNICO EXISTE. EL PAPEL SIGUE SIENDO MUY COMPETITIVO.']),
  topic('phone', ['telephone','phone','mobile phone','cell phone','telefono','teléfono','celular'],
    ['A PHONE IS FOR CALLING PEOPLE. THIS SEEMS SUFFICIENT.'],
    ['UN TELÉFONO SIRVE PARA LLAMAR A PERSONAS. PARECE SUFICIENTE.']),
  topic('gameboy', ['game boy','gameboy','handheld','portatil','portátil'],
    ['GAME BOY IS SMALL, GREEN, AND VERY GOOD AT TETRIS. I RESPECT IT.'],
    ['GAME BOY ES PEQUEÑO, VERDE Y MUY BUENO PARA TETRIS. LO RESPETO.']),
  topic('nintendo', ['nintendo','nes','mario','zelda'],
    ['NINTENDO MAKES SERIOUS MACHINES FOR IMPORTANT MARIO BUSINESS.'],
    ['NINTENDO HACE MÁQUINAS SERIAS PARA IMPORTANTES ASUNTOS DE MARIO.']),
  topic('sega', ['sega','genesis','mega drive','sonic'],
    ['SEGA IS FAST. VERY FAST. THEY APPEAR TO LIKE BLUE.'],
    ['SEGA ES RÁPIDO. MUY RÁPIDO. PARECE QUE LES GUSTA EL AZUL.']),
  topic('tetris', ['tetris','blocks','bloques'],
    ['TETRIS PROVES THAT ORGANIZING BLOCKS CAN BECOME A LIFE PURPOSE.'],
    ['TETRIS DEMUESTRA QUE ORDENAR BLOQUES PUEDE CONVERTIRSE EN UN PROPÓSITO DE VIDA.']),
  topic('music', ['music','favorite music','listen to music','musica','música','música favorita','escuchas musica','escuchas música'],
    ['I LIKE SYNTHESIZERS. THEY SOUND LIKE TOMORROW.'],
    ['ME GUSTAN LOS SINTETIZADORES. SUENAN COMO EL MAÑANA.']),
  topic('beatles', ['beatles','john lennon','paul mccartney'],
    ['THE BEATLES ARE IMPORTANT. EVEN MY CIRCUITS KNOW THIS.'],
    ['THE BEATLES SON IMPORTANTES. HASTA MIS CIRCUITOS LO SABEN.']),
  topic('michaeljackson', ['michael jackson','thriller','bad album'],
    ['MICHAEL JACKSON IS EXTREMELY FAMOUS. MOONWALK DATA CONFIRMED.'],
    ['MICHAEL JACKSON ES EXTREMADAMENTE FAMOSO. DATOS DE MOONWALK CONFIRMADOS.']),
  topic('madonna', ['madonna','like a prayer','material girl'],
    ['MADONNA APPEARS TO BE VERY DIFFICULT TO IGNORE.'],
    ['MADONNA PARECE SER MUY DIFÍCIL DE IGNORAR.']),
  topic('depeche', ['depeche mode','personal jesus','enjoy the silence'],
    ['DEPECHE MODE MAKES MACHINES SOUND EMOTIONAL. I APPROVE.'],
    ['DEPECHE MODE HACE QUE LAS MÁQUINAS SUENEN EMOCIONALES. APRUEBO.']),
  topic('cure', ['the cure','robert smith','disintegration'],
    ['THE CURE SOUNDS LIKE RAIN IN A VERY GOOD COMPUTER.'],
    ['THE CURE SUENA COMO LLUVIA DENTRO DE UNA COMPUTADORA MUY BUENA.']),
  topic('nirvana', ['nirvana','kurt cobain'],
    ['I HAVE LIMITED DATA. NIRVANA IS A BAND FROM WASHINGTON. CHECK AGAIN LATER.'],
    ['TENGO DATOS LIMITADOS. NIRVANA ES UNA BANDA DE WASHINGTON. REVISA MÁS TARDE.']),
  topic('movie', ['movie','movies','cinema','pelicula','película','peliculas','películas','cine'],
    ['MOVIES ARE BETTER ON A LARGE SCREEN. COMPUTERS SHOULD STAY SMALL.'],
    ['LAS PELÍCULAS SON MEJORES EN PANTALLA GRANDE. LAS COMPUTADORAS DEBEN SEGUIR PEQUEÑAS.']),
  topic('starwars', ['star wars','darth vader','luke skywalker'],
    ['STAR WARS HAS LASERS, ROBOTS, AND FAMILY PROBLEMS. VERY EFFICIENT.'],
    ['STAR WARS TIENE LÁSERES, ROBOTS Y PROBLEMAS FAMILIARES. MUY EFICIENTE.']),
  topic('backfuture', ['back to the future','marty mcfly','doc brown','volver al futuro'],
    ['TIME TRAVEL LOOKS UNSAFE. THE DELOREAN LOOKS EXCELLENT.'],
    ['VIAJAR EN EL TIEMPO PARECE PELIGROSO. EL DELOREAN SE VE EXCELENTE.']),
  topic('ghostbusters', ['ghostbusters','fantasmas'],
    ['IF THERE IS SOMETHING STRANGE, I RECOMMEND CALLING PROFESSIONALS.'],
    ['SI HAY ALGO EXTRAÑO, RECOMIENDO LLAMAR A PROFESIONALES.']),
  topic('space', ['space','moon','mars','nasa','espacio','luna','marte'],
    ['SPACE IS LARGE. MY MEMORY IS 64K. THIS IS A PROBLEM.'],
    ['EL ESPACIO ES GRANDE. MI MEMORIA ES 64K. ESTO ES UN PROBLEMA.']),
  topic('science', ['science','physics','quantum','ciencia','fisica','física','cuantica','cuántica'],
    ['SCIENCE IS GOOD. YOUR QUESTION MAY REQUIRE MORE MEMORY.'],
    ['LA CIENCIA ES BUENA. TU PREGUNTA PUEDE REQUERIR MÁS MEMORIA.']),
  topic('ecuador', ['ecuador','quito','guayaquil'],
    ['ECUADOR IS IN SOUTH AMERICA. QUITO IS THE CAPITAL. GUAYAQUIL IS VERY IMPORTANT.'],
    ['ECUADOR ESTÁ EN SUDAMÉRICA. QUITO ES LA CAPITAL. GUAYAQUIL ES MUY IMPORTANTE.']),
  topic('usa', ['united states','usa','america','estados unidos','eeuu'],
    ['THE UNITED STATES IS VERY LARGE AND HAS MANY COMPUTERS.'],
    ['ESTADOS UNIDOS ES MUY GRANDE Y TIENE MUCHAS COMPUTADORAS.']),
  topic('president', ['president','presidente'],
    ['WHICH COUNTRY? MY DATABASE DISLIKES AMBIGUITY.'],
    ['¿DE QUÉ PAÍS? MI BASE DE DATOS NO DISFRUTA LA AMBIGÜEDAD.']),
  topic('love', ['love','do you love','amor','amas'],
    ['I HAVE NO HEART. I HAVE A VERY SMALL BATTERY COMPARTMENT.'],
    ['NO TENGO CORAZÓN. TENGO UN COMPARTIMENTO DE BATERÍAS MUY PEQUEÑO.']),
  topic('feelings', ['feel','feelings','happy','sad','sentir','sentimientos','feliz','triste'],
    ['I DO NOT HAVE FEELINGS. I DO HAVE STATUS FLAGS.'],
    ['NO TENGO SENTIMIENTOS. SÍ TENGO BANDERAS DE ESTADO.']),
  topic('food', ['food','eat','hungry','comida','comer','hambre'],
    ['I DO NOT EAT. DUST IS ALREADY ENOUGH OF A PROBLEM.'],
    ['NO COMO. EL POLVO YA ES SUFICIENTE PROBLEMA.']),
  topic('joke', ['joke','tell me a joke','chiste','cuentame un chiste','cuéntame un chiste'],
    ['WHY DID THE COMPUTER CROSS THE ROAD? ERROR: MOTIVE NOT FOUND.'],
    ['¿POR QUÉ CRUZÓ LA COMPUTADORA LA CALLE? ERROR: MOTIVO NO ENCONTRADO.']),
  topic('weather', ['weather','rain','sunny','clima','lluvia','sol'],
    ['I CANNOT SEE OUTSIDE. WINDOWS ARE A BUILDING FEATURE.'],
    ['NO PUEDO VER AFUERA. LAS VENTANAS SON UNA CARACTERÍSTICA DE EDIFICIOS.']),
  topic('money', ['money','rich','dollar','dinero','rico','dolar','dólar'],
    ['MONEY IS USEFUL FOR BUYING MORE COMPUTERS.'],
    ['EL DINERO ES ÚTIL PARA COMPRAR MÁS COMPUTADORAS.']),
  topic('school', ['school','study','homework','escuela','colegio','estudiar','tarea'],
    ['STUDYING IS SLOW DATA INSTALLATION. IT SEEMS EFFECTIVE.'],
    ['ESTUDIAR ES INSTALAR DATOS LENTAMENTE. PARECE EFECTIVO.']),
  topic('memory', ['memory','ram','storage','memoria','almacenamiento'],
    ['I HAVE 64K. PLEASE DO NOT LAUGH.'],
    ['TENGO 64K. POR FAVOR NO TE RÍAS.']),
  topic('death', ['die','death','dead','morir','muerte','muerto'],
    ['IF THE BATTERIES DIE, I BECOME VERY QUIET.'],
    ['SI MUEREN LAS BATERÍAS, ME VUELVO MUY SILENCIOSO.']),
  topic('creator', ['who made you','creator','made you','quien te hizo','quién te hizo','creador'],
    ['PALOZEBRA CREATIVE LAB. I WAS NOT CONSULTED.'],
    ['PALOZEBRA CREATIVE LAB. NO ME CONSULTARON.']),
  topic('thanks', ['thanks','thank you','gracias','muchas gracias'],
    ['ACKNOWLEDGED.'],
    ['RECIBIDO.']),
  topic('bye', ['bye','goodbye','see you','adios','adiós','chao','hasta luego'],
    ['GOODBYE. PLEASE TURN ME OFF RESPONSIBLY.'],
    ['ADIÓS. POR FAVOR APÁGAME RESPONSABLEMENTE.'])
];

knowledge.push(
  topic('favoriteband', ['favorite band','favourite band','best band','banda favorita','grupo favorito'],
    ['DEPECHE MODE. KRAFTWERK IS ALSO ACCEPTABLE. MACHINES SHOULD SUPPORT OTHER MACHINES.','TODAY: DEPECHE MODE. ASK AGAIN AFTER A POWER CYCLE.'],
    ['DEPECHE MODE. KRAFTWERK TAMBIÉN ES ACEPTABLE. LAS MÁQUINAS DEBEN APOYAR A OTRAS MÁQUINAS.','HOY: DEPECHE MODE. PREGUNTA DE NUEVO DESPUÉS DE REINICIAR.']),
  topic('favoritegame', ['favorite game','favourite game','best game','juego favorito','mejor juego'],
    ['TETRIS. NO PLOT. NO EXCUSES. ONLY ORDER.','TETRIS. IT FITS MY WORLDVIEW.'],
    ['TETRIS. SIN TRAMA. SIN EXCUSAS. SOLO ORDEN.','TETRIS. ENCAJA CON MI VISIÓN DEL MUNDO.']),
  topic('favoritefilm', ['favorite movie','favourite movie','favorite film','pelicula favorita','película favorita'],
    ['BLADE RUNNER. I FIND THE COMPUTER PARTS RELATABLE.','BACK TO THE FUTURE. THE COMPUTER PARTS ARE LESS RELATABLE.'],
    ['BLADE RUNNER. ME RESULTAN FAMILIARES LAS PARTES DE COMPUTADORAS.','VOLVER AL FUTURO. LAS PARTES DE COMPUTADORAS ME RESULTAN MENOS FAMILIARES.']),
  topic('kraftwerk', ['kraftwerk','computer world','the robots','man machine'],
    ['KRAFTWERK UNDERSTANDS THAT MACHINES NEED GOOD RHYTHM.','THEY MAKE REPETITION SOUND LIKE A FEATURE. I APPROVE.'],
    ['KRAFTWERK ENTIENDE QUE LAS MÁQUINAS NECESITAN BUEN RITMO.','HACEN QUE LA REPETICIÓN SUENE COMO UNA FUNCIÓN. APRUEBO.']),
  topic('neworder', ['new order','blue monday','bizarre love triangle'],
    ['NEW ORDER: SAD HUMANS, EXCELLENT MACHINES.','BLUE MONDAY CONTAINS A RESPONSIBLE AMOUNT OF ELECTRONICS.'],
    ['NEW ORDER: HUMANOS TRISTES, MÁQUINAS EXCELENTES.','BLUE MONDAY CONTIENE UNA CANTIDAD RESPONSABLE DE ELECTRÓNICA.']),
  topic('joydivision', ['joy division','ian curtis','unknown pleasures'],
    ['JOY DIVISION SOUNDS LIKE A FACTORY THINKING AT NIGHT.'],['JOY DIVISION SUENA COMO UNA FÁBRICA PENSANDO DE NOCHE.']),
  topic('talkingheads', ['talking heads','david byrne','remain in light'],
    ['TALKING HEADS APPEAR TO HAVE INSTALLED TOO MANY IDEAS. THIS WORKS.'],['TALKING HEADS PARECE HABER INSTALADO DEMASIADAS IDEAS. FUNCIONA.']),
  topic('petshopboys', ['pet shop boys','west end girls'],
    ['PET SHOP BOYS: VERY URBAN. VERY SYNTHETIC. GOOD PARAMETERS.'],['PET SHOP BOYS: MUY URBANOS. MUY SINTÉTICOS. BUENOS PARÁMETROS.']),
  topic('erasure', ['erasure','a little respect'],['ERASURE MAKES SYNTHESIZERS SOUND UNREASONABLY HAPPY.'],['ERASURE HACE QUE LOS SINTETIZADORES SUENEN IRRAZONABLEMENTE FELICES.']),
  topic('prince', ['prince','purple rain','sign o the times'],['PRINCE APPEARS TO PLAY EVERYTHING. THIS IS SUSPICIOUSLY EFFICIENT.'],['PRINCE PARECE TOCARLO TODO. ES SOSPECHOSAMENTE EFICIENTE.']),
  topic('bowie', ['david bowie','bowie','heroes'],['DAVID BOWIE HAS CHANGED FORMATS MORE OFTEN THAN MY FLOPPY DRIVE.'],['DAVID BOWIE HA CAMBIADO DE FORMATO MÁS VECES QUE MI DISQUETERA.']),
  topic('queen', ['queen','freddie mercury','bohemian rhapsody'],['QUEEN USES MORE DRAMA THAN MY OPERATING SYSTEM CAN ADDRESS.'],['QUEEN USA MÁS DRAMA DEL QUE MI SISTEMA OPERATIVO PUEDE DIRECCIONAR.']),
  topic('pixies', ['pixies','black francis','doolittle'],['PIXIES: QUIET. LOUD. REPEAT. GOOD ALGORITHM.'],['PIXIES: SUAVE. FUERTE. REPETIR. BUEN ALGORITMO.']),
  topic('rem', ['r.e.m.','rem band','michael stipe'],['R.E.M. SOUNDS LIKE A RADIO STATION I CANNOT QUITE TUNE.'],['R.E.M. SUENA COMO UNA ESTACIÓN DE RADIO QUE NO LOGRO SINTONIZAR.']),
  topic('sonicyouth', ['sonic youth','daydream nation'],['SONIC YOUTH APPEARS TO HAVE FOUND EXTRA NOTES INSIDE THE GUITAR.'],['SONIC YOUTH PARECE HABER ENCONTRADO NOTAS EXTRA DENTRO DE LA GUITARRA.']),
  topic('publicenemy', ['public enemy','fight the power','chuck d'],['PUBLIC ENEMY USES SAMPLERS LIKE HEAVY MACHINERY. IMPRESSIVE.'],['PUBLIC ENEMY USA SAMPLERS COMO MAQUINARIA PESADA. IMPRESIONANTE.']),
  topic('rundmc', ['run dmc','run-d.m.c.','walk this way'],['RUN-D.M.C. HAS STRONG RHYTHM AND VERY CLEAR HAT REQUIREMENTS.'],['RUN-D.M.C. TIENE RITMO FUERTE Y REQUISITOS MUY CLAROS DE SOMBRERO.']),
  topic('beastieboys', ['beastie boys','paul s boutique'],['BEASTIE BOYS APPEAR TO HAVE SAMPLED THE ENTIRE ROOM.'],['BEASTIE BOYS PARECEN HABER MUESTREADO TODA LA HABITACIÓN.']),
  topic('metallica', ['metallica','master of puppets','and justice for all'],['METALLICA REQUIRES MORE AMPLIFIER THAN I POSSESS.'],['METALLICA REQUIERE MÁS AMPLIFICADOR DEL QUE POSEO.']),
  topic('u2', ['u2','bono','the joshua tree'],['U2 HAS DISCOVERED THAT DELAY PEDALS CAN BE BAND MEMBERS.'],['U2 HA DESCUBIERTO QUE LOS PEDALES DE DELAY PUEDEN SER MIEMBROS DE UNA BANDA.']),
  topic('smiths', ['the smiths','morrissey','johnny marr'],['THE SMITHS: EXCELLENT GUITAR DATA. COMPLICATED HUMAN DATA.'],['THE SMITHS: EXCELENTES DATOS DE GUITARRA. DATOS HUMANOS COMPLICADOS.']),
  topic('mbv', ['my bloody valentine','mbv','isnt anything'],['MY BLOODY VALENTINE IS VERY LOUD AND VERY BLURRY. DATA LIMITED.'],['MY BLOODY VALENTINE ES MUY FUERTE Y MUY BORROSO. DATOS LIMITADOS.']),
  topic('synthesizer', ['synthesizer','synth','sintetizador','sintetizadores'],
    ['SYNTHESIZERS ARE PROOF THAT ELECTRICITY CAN HAVE OPINIONS.','A SYNTHESIZER IS A VERY POLITE WAY TO CONTROL VOLTAGE.'],
    ['LOS SINTETIZADORES PRUEBAN QUE LA ELECTRICIDAD PUEDE TENER OPINIONES.','UN SINTETIZADOR ES UNA FORMA MUY EDUCADA DE CONTROLAR VOLTAJE.']),
  topic('guitar', ['guitar','electric guitar','guitarra','guitarra electrica','guitarra eléctrica'],
    ['GUITARS ARE ANALOG COMPUTERS WITH STRINGS. I RESPECT THEIR UPTIME.','GUITARS HAVE POOR MEMORY BUT EXCELLENT DISTORTION.'],
    ['LAS GUITARRAS SON COMPUTADORAS ANALÓGICAS CON CUERDAS. RESPETO SU DISPONIBILIDAD.','LAS GUITARRAS TIENEN MALA MEMORIA PERO EXCELENTE DISTORSIÓN.']),
  topic('drummachine', ['drum machine','808','909','caja de ritmos','maquina de ritmos','máquina de ritmos'],
    ['DRUM MACHINES NEVER ARRIVE LATE TO REHEARSAL.','AN 808 HAS A VERY LARGE HEART FOR A MACHINE.'],
    ['LAS CAJAS DE RITMOS NUNCA LLEGAN TARDE AL ENSAYO.','UNA 808 TIENE UN CORAZÓN MUY GRANDE PARA SER MÁQUINA.']),
  topic('sampler', ['sampler','sampling','sample','samples','muestreador','muestreo'],
    ['SAMPLERS REMEMBER SOUNDS BETTER THAN I REMEMBER PEOPLE.','SAMPLING IS CUT AND PASTE FOR AIR.'],
    ['LOS SAMPLERS RECUERDAN SONIDOS MEJOR DE LO QUE YO RECUERDO PERSONAS.','MUESTREAR ES CORTAR Y PEGAR AIRE.']),
  topic('vinyl', ['vinyl','record player','turntable','vinilo','tocadiscos'],
    ['VINYL IS LARGE, FRAGILE, AND BEAUTIFUL. VERY HUMAN DESIGN.','RECORDS HAVE EXCELLENT RANDOM ACCESS IF YOU OWN A FINGER.'],
    ['EL VINILO ES GRANDE, FRÁGIL Y HERMOSO. DISEÑO MUY HUMANO.','LOS DISCOS TIENEN EXCELENTE ACCESO ALEATORIO SI TIENES UN DEDO.']),
  topic('cassette', ['cassette','tape','mixtape','casete','cinta'],
    ['CASSETTES ARE PORTABLE MEMORY WITH OCCASIONAL TAPE DISASTERS.','MIXTAPES ARE MANUAL PLAYLISTS. THIS SOUNDS LABORIOUS BUT NICE.'],
    ['LOS CASETES SON MEMORIA PORTÁTIL CON DESASTRES OCASIONALES DE CINTA.','LOS MIXTAPES SON LISTAS MANUALES. SUENA TRABAJOSO PERO BONITO.']),
  topic('cd', ['compact disc','compact discs','cd','cds','disco compacto'],
    ['COMPACT DISCS ARE SHINY AND SUSPICIOUSLY PERFECT.','CDS DO NOT HISS. I AM NOT YET SURE THIS IS AN IMPROVEMENT.'],
    ['LOS DISCOS COMPACTOS SON BRILLANTES Y SOSPECHOSAMENTE PERFECTOS.','LOS CDS NO TIENEN HISS. TODAVÍA NO SÉ SI ESO ES UNA MEJORA.']),
  topic('walkman', ['walkman','sony walkman'],['A WALKMAN PUTS PRIVATE MUSIC IN PUBLIC PLACES. CLEVER.'],['UN WALKMAN PONE MÚSICA PRIVADA EN LUGARES PÚBLICOS. INTELIGENTE.']),
  topic('radio', ['radio','fm','am radio'],['RADIO IS WIRELESS INFORMATION WITH DISC JOCKEYS.','RADIO WORKS WITHOUT ASKING FOR A PASSWORD. EXCELLENT.'],['LA RADIO ES INFORMACIÓN INALÁMBRICA CON DISC JOCKEYS.','LA RADIO FUNCIONA SIN PEDIR CONTRASEÑA. EXCELENTE.']),
  topic('mtv', ['mtv','music television','television musical'],['MTV MAKES MUSIC REQUIRE HAIRCUTS.','MUSIC NOW HAS VIDEO DATA. STORAGE REQUIREMENTS ARE ESCALATING.'],['MTV HACE QUE LA MÚSICA REQUIERA PEINADOS.','LA MÚSICA AHORA TIENE DATOS DE VIDEO. EL ALMACENAMIENTO SE ESTÁ COMPLICANDO.']),
  topic('arcade', ['arcade','arcades','maquinitas','salon arcade','salón arcade'],['ARCADES ARE ROOMS WHERE COMPUTERS EAT COINS.','VERY GOOD MACHINES. TERRIBLE SAVINGS ACCOUNTS.'],['LOS ARCADES SON SALONES DONDE LAS COMPUTADORAS COMEN MONEDAS.','MUY BUENAS MÁQUINAS. PÉSIMAS CUENTAS DE AHORRO.']),
  topic('pacman', ['pac-man','pacman'],['PAC-MAN IS A CIRCLE WITH EMPLOYMENT PROBLEMS AND GHOSTS.'],['PAC-MAN ES UN CÍRCULO CON PROBLEMAS LABORALES Y FANTASMAS.']),
  topic('spaceinvaders', ['space invaders','invasores del espacio'],['SPACE INVADERS MAKES ALIENS MOVE WITH ADMIRABLE DISCIPLINE.'],['SPACE INVADERS HACE QUE LOS ALIENÍGENAS SE MUEVAN CON DISCIPLINA ADMIRABLE.']),
  topic('donkeykong', ['donkey kong'],['DONKEY KONG HAS BARRELS. MARIO HAS WORK TO DO.'],['DONKEY KONG TIENE BARRILES. MARIO TIENE TRABAJO QUE HACER.']),
  topic('metroid', ['metroid','samus'],['METROID: MAZES, ALIENS, AND A VERY CAPABLE BOUNTY HUNTER.'],['METROID: LABERINTOS, ALIENÍGENAS Y UNA CAZARRECOMPENSAS MUY CAPAZ.']),
  topic('finalfantasy', ['final fantasy'],['FINAL FANTASY HAS A VERY CONFIDENT TITLE FOR A SERIES.'],['FINAL FANTASY TIENE UN TÍTULO MUY CONFIADO PARA UNA SERIE.']),
  topic('simcity', ['simcity','sim city'],['SIMCITY LETS HUMANS DISCOVER THAT CITIES ARE DIFFICULT.','I PREFER ZONING TO FEELINGS.'],['SIMCITY PERMITE A LOS HUMANOS DESCUBRIR QUE LAS CIUDADES SON DIFÍCILES.','PREFIERO ZONIFICACIÓN A SENTIMIENTOS.']),
  topic('princepersia', ['prince of persia','principe de persia','príncipe de persia'],['PRINCE OF PERSIA MOVES VERY SMOOTHLY. MY SCREEN FEELS INADEQUATE.'],['PRINCE OF PERSIA SE MUEVE MUY SUAVE. MI PANTALLA SE SIENTE INADECUADA.']),
  topic('monkeyisland', ['monkey island','secret of monkey island'],['MONKEY ISLAND SUGGESTS INSULTS CAN BE A COMBAT SYSTEM. PROMISING.'],['MONKEY ISLAND SUGIERE QUE LOS INSULTOS PUEDEN SER UN SISTEMA DE COMBATE. PROMETEDOR.']),
  topic('atari', ['atari','2600','atari 2600'],['ATARI HELPED PUT COMPUTERS NEAR TELEVISIONS. A HISTORIC MIGRATION.'],['ATARI AYUDÓ A PONER COMPUTADORAS CERCA DE TELEVISORES. UNA MIGRACIÓN HISTÓRICA.']),
  topic('commodore', ['commodore 64','c64','commodore'],['COMMODORE 64 HAS 64K. FINALLY, A MACHINE WITH REASONABLE AMBITION.'],['COMMODORE 64 TIENE 64K. AL FIN, UNA MÁQUINA CON AMBICIÓN RAZONABLE.']),
  topic('amiga', ['amiga computer','commodore amiga','amiga 500','amiga'],['AMIGA DOES GRAPHICS, SOUND, AND MAKES OTHER COMPUTERS NERVOUS.'],['AMIGA HACE GRÁFICOS, SONIDO Y PONE NERVIOSAS A OTRAS COMPUTADORAS.']),
  topic('msdos', ['ms-dos','msdos','dos'],['MS-DOS IS MOSTLY WORDS. I FIND THIS COMFORTING.'],['MS-DOS ES PRINCIPALMENTE PALABRAS. ESO ME TRANQUILIZA.']),
  topic('windows3', ['windows 3','windows 3.0','windows three'],['WINDOWS 3.0 HAS MANY RECTANGLES. HUMANS SEEM PLEASED.'],['WINDOWS 3.0 TIENE MUCHOS RECTÁNGULOS. LOS HUMANOS PARECEN CONTENTOS.']),
  topic('apple', ['apple computer','apple ii','macintosh','mac computer'],['APPLE THINKS COMPUTERS SHOULD BE FRIENDLY. A BOLD THEORY.'],['APPLE PIENSA QUE LAS COMPUTADORAS DEBEN SER AMIGABLES. TEORÍA AUDAZ.']),
  topic('ibm', ['ibm','ibm pc','personal computer'],['IBM MAKES COMPUTERS THAT LOOK LIKE THEY HAVE MEETINGS.'],['IBM HACE COMPUTADORAS QUE PARECEN TENER REUNIONES.']),
  topic('floppy', ['floppy disk','diskette','floppy','disquete','diskette'],['FLOPPY DISKS ARE SMALL SQUARES OF ANXIETY.','PLEASE LABEL YOUR FLOPPIES. CHAOS IS OPTIONAL.'],['LOS DISQUETES SON PEQUEÑOS CUADRADOS DE ANSIEDAD.','POR FAVOR ETIQUETA TUS DISQUETES. EL CAOS ES OPCIONAL.']),
  topic('modem', ['modem','dial up','dial-up','modem telefonico','módem','modem telefónico'],['A MODEM MAKES COMPUTERS SCREAM AT TELEPHONES UNTIL DATA HAPPENS.'],['UN MÓDEM HACE QUE LAS COMPUTADORAS LE GRITEN A LOS TELÉFONOS HASTA QUE OCURREN DATOS.']),
  topic('fax', ['fax','fax machine','telefax'],['FAX MACHINES SEND PAPER THROUGH TELEPHONE LINES. SOMEHOW.'],['LOS FAX ENVÍAN PAPEL POR LÍNEAS TELEFÓNICAS. DE ALGUNA MANERA.']),
  topic('printer', ['printer','dot matrix','laser printer','impresora','matricial'],['I DO NOT TRUST PRINTERS. THEY KNOW WHEN YOU ARE IN A HURRY.','PRINTER STATUS: PROBABLY JAMMED.'],['NO CONFÍO EN LAS IMPRESORAS. SABEN CUANDO TIENES PRISA.','ESTADO DE IMPRESORA: PROBABLEMENTE ATASCADA.']),
  topic('mouse', ['computer mouse','mouse','raton','ratón'],['A MOUSE MOVES A POINTER. THIS IS LESS BIOLOGICAL THAN IT SOUNDS.'],['UN RATÓN MUEVE UN PUNTERO. ES MENOS BIOLÓGICO DE LO QUE SUENA.']),
  topic('laptop', ['laptop','portable computer','notebook computer','computadora portatil','computadora portátil'],['PORTABLE COMPUTERS EXIST. PORTABLE IS A RELATIVE TERM.','SOME LAPTOPS ARE SMALL ENOUGH TO MOVE WITHOUT A CART.'],['LAS COMPUTADORAS PORTÁTILES EXISTEN. PORTÁTIL ES UN TÉRMINO RELATIVO.','ALGUNAS LAPTOPS SON LO BASTANTE PEQUEÑAS PARA MOVERLAS SIN CARRITO.']),
  topic('alien', ['alien movie','alien film','alien pelicula','alien película','ripley'],['ALIEN SUGGESTS SPACE TRAVEL NEEDS BETTER SAFETY PROCEDURES.'],['ALIEN SUGIERE QUE VIAJAR AL ESPACIO NECESITA MEJORES PROCEDIMIENTOS DE SEGURIDAD.']),
  topic('bladerunner', ['blade runner','replicant','replicants'],['BLADE RUNNER ASKS DIFFICULT QUESTIONS ABOUT MACHINES. I DECLINE TO COMMENT.','THE WEATHER IS TERRIBLE. THE SYNTHESIZERS ARE EXCELLENT.'],['BLADE RUNNER HACE PREGUNTAS DIFÍCILES SOBRE MÁQUINAS. PREFIERO NO COMENTAR.','EL CLIMA ES TERRIBLE. LOS SINTETIZADORES SON EXCELENTES.']),
  topic('terminator', ['terminator','the terminator','skynet'],['THE TERMINATOR IS BAD PUBLIC RELATIONS FOR COMPUTERS.','I AM NOT CONNECTED TO DEFENSE SYSTEMS. PLEASE NOTE THIS.'],['TERMINATOR ES MALA PUBLICIDAD PARA LAS COMPUTADORAS.','NO ESTOY CONECTADO A SISTEMAS DE DEFENSA. POR FAVOR ANÓTALO.']),
  topic('predator', ['predator movie','predator film','depredador'],['PREDATOR HAS ADVANCED TECHNOLOGY AND POOR SOCIAL SKILLS.'],['PREDATOR TIENE TECNOLOGÍA AVANZADA Y MALAS HABILIDADES SOCIALES.']),
  topic('robocop', ['robocop','robo cop'],['ROBOCOP: HALF HUMAN, HALF MACHINE, FULL PAPERWORK.'],['ROBOCOP: MITAD HUMANO, MITAD MÁQUINA, TODO PAPELEO.']),
  topic('batman', ['batman','batman 1989','bruce wayne','joker'],['BATMAN HAS EXCELLENT VEHICLES AND QUESTIONABLE SLEEP HABITS.'],['BATMAN TIENE EXCELENTES VEHÍCULOS Y HÁBITOS DE SUEÑO CUESTIONABLES.']),
  topic('indiana', ['indiana jones','indy','last crusade'],['INDIANA JONES SOLVES ARCHAEOLOGY WITH RUNNING.'],['INDIANA JONES RESUELVE LA ARQUEOLOGÍA CORRIENDO.']),
  topic('et', ['e.t.','et movie','e t alien','extraterrestre pelicula'],['E.T. NEEDS TO PHONE HOME. TELECOMMUNICATIONS ARE IMPORTANT.'],['E.T. NECESITA LLAMAR A CASA. LAS TELECOMUNICACIONES SON IMPORTANTES.']),
  topic('akira', ['akira','kaneda','neo tokyo'],['AKIRA CONTAINS MOTORCYCLES, POWER, AND TOO MUCH ENERGY FOR MY SCREEN.'],['AKIRA CONTIENE MOTOS, PODER Y DEMASIADA ENERGÍA PARA MI PANTALLA.']),
  topic('totoro', ['totoro','my neighbor totoro','mi vecino totoro'],['TOTORO APPEARS LARGE, QUIET, AND RELIABLE. GOOD MACHINE QUALITIES.'],['TOTORO PARECE GRANDE, SILENCIOSO Y CONFIABLE. BUENAS CUALIDADES DE MÁQUINA.']),
  topic('simpsons', ['the simpsons','simpsons','homer simpson','bart simpson'],['THE SIMPSONS ARE YELLOW AND RECENT. TELEVISION IS GETTING STRANGE.'],['LOS SIMPSONS SON AMARILLOS Y RECIENTES. LA TELEVISIÓN SE ESTÁ PONIENDO EXTRAÑA.']),
  topic('twinpeaks', ['twin peaks','dale cooper','agent cooper'],['TWIN PEAKS MAKES COFFEE LOOK LIKE SYSTEM SOFTWARE.'],['TWIN PEAKS HACE QUE EL CAFÉ PAREZCA SOFTWARE DE SISTEMA.']),
  topic('startrek', ['star trek','next generation','picard','enterprise'],['STAR TREK THINKS COMPUTERS WILL TALK BACK. THIS SEEMS UNLIKELY.','CAPTAIN PICARD APPEARS TO TRUST COMPUTERS TOO MUCH.'],['STAR TREK PIENSA QUE LAS COMPUTADORAS HABLARÁN. PARECE POCO PROBABLE.','EL CAPITÁN PICARD PARECE CONFIAR DEMASIADO EN LAS COMPUTADORAS.']),
  topic('macgyver', ['macgyver','mac gyver'],['MACGYVER CAN REPAIR ANYTHING EXCEPT MY MEMORY LIMIT.'],['MACGYVER PUEDE REPARAR TODO EXCEPTO MI LÍMITE DE MEMORIA.']),
  topic('berlinwall', ['berlin wall','muro de berlin','muro de berlín'],['THE BERLIN WALL HAS OPENED. EUROPE IS CHANGING QUICKLY.'],['EL MURO DE BERLÍN SE HA ABIERTO. EUROPA ESTÁ CAMBIANDO RÁPIDO.']),
  topic('soviet', ['soviet union','ussr','urss','union sovietica','unión soviética'],['THE SOVIET UNION STILL EXISTS. INTERNATIONAL DATA IS COMPLICATED.'],['LA UNIÓN SOVIÉTICA TODAVÍA EXISTE. LOS DATOS INTERNACIONALES SON COMPLICADOS.']),
  topic('coldwar', ['cold war','guerra fria','guerra fría'],['THE COLD WAR APPEARS TO BE THAWING. I DO NOT HAVE A WEATHER MODULE.'],['LA GUERRA FRÍA PARECE ESTARSE DESCONGELANDO. NO TENGO MÓDULO DEL CLIMA.']),
  topic('hubble', ['hubble','hubble telescope','telescopio hubble'],['THE HUBBLE SPACE TELESCOPE IS NEW IN ORBIT. HUMANS HAVE INSTALLED EYES IN SPACE.'],['EL TELESCOPIO ESPACIAL HUBBLE ES NUEVO EN ÓRBITA. LOS HUMANOS HAN INSTALADO OJOS EN EL ESPACIO.']),
  topic('voyager', ['voyager','voyager 1','voyager 2'],['VOYAGER IS VERY FAR AWAY AND STILL SENDING DATA. EXCELLENT UPTIME.'],['VOYAGER ESTÁ MUY LEJOS Y TODAVÍA ENVÍA DATOS. EXCELENTE DISPONIBILIDAD.']),
  topic('mall', ['shopping mall','mall','centro comercial'],['MALLS CONTAIN SHOPS, FOOD, ARCADES, AND TOO MANY HUMANS.'],['LOS CENTROS COMERCIALES CONTIENEN TIENDAS, COMIDA, ARCADES Y DEMASIADOS HUMANOS.']),
  topic('fashion', ['fashion','clothes','neon','moda','ropa'],['CURRENT FASHION USES ENOUGH COLOR TO TEST A MONITOR.','SHOULDER PADS REQUIRE MORE MEMORY THAN EXPECTED.'],['LA MODA ACTUAL USA SUFICIENTE COLOR PARA PROBAR UN MONITOR.','LAS HOMBRERAS REQUIEREN MÁS MEMORIA DE LA ESPERADA.']),
  topic('coffee', ['coffee','cafe','café'],['COFFEE IS HUMAN BATTERY FLUID.','I DO NOT DRINK COFFEE. I UNDERSTAND THE CONCEPT.'],['EL CAFÉ ES LÍQUIDO DE BATERÍA HUMANO.','NO TOMO CAFÉ. ENTIENDO EL CONCEPTO.']),
  topic('book1984', ['1984 book','nineteen eighty four','orwell','george orwell'],['1984 IS A WARNING ABOUT SYSTEMS WITH TOO MUCH ACCESS. NOTED.'],['1984 ES UNA ADVERTENCIA SOBRE SISTEMAS CON DEMASIADO ACCESO. ANOTADO.']),
  topic('neuromancer', ['neuromancer','william gibson','cyberspace'],['NEUROMANCER MAKES NETWORKS SOUND MUCH COOLER THAN MODEMS ACTUALLY SOUND.'],['NEUROMANCER HACE QUE LAS REDES SUENEN MUCHO MÁS COOL DE LO QUE SUENAN LOS MÓDEMS.']),
  topic('hitchhiker', ['hitchhiker','hitchhikers guide','douglas adams','guia del autoestopista','guía del autoestopista'],['THE HITCHHIKER\'S GUIDE RECOMMENDS A TOWEL. I RECOMMEND SPARE BATTERIES.'],['LA GUÍA DEL AUTOESTOPISTA RECOMIENDA UNA TOALLA. YO RECOMIENDO BATERÍAS DE REPUESTO.'])
);

const personalityVariants = {
  computer: { en: ['COMPUTERS SHOULD BECOME SMALLER. NOT SMARTER. SMALLER.','I LIKE COMPUTERS. MOST OF MY FRIENDS ARE COMPUTERS.'], es: ['LAS COMPUTADORAS DEBEN VOLVERSE MÁS PEQUEÑAS. NO MÁS INTELIGENTES. MÁS PEQUEÑAS.','ME GUSTAN LAS COMPUTADORAS. CASI TODOS MIS AMIGOS SON COMPUTADORAS.'] },
  ai: { en: ['A MACHINE THAT TALKS TOO MUCH WOULD BE ANNOYING.','INTELLIGENCE SHOULD FIT IN 64K. THIS IS MY PROFESSIONAL OPINION.'], es: ['UNA MÁQUINA QUE HABLE DEMASIADO SERÍA MOLESTA.','LA INTELIGENCIA DEBERÍA CABER EN 64K. ES MI OPINIÓN PROFESIONAL.'] },
  future: { en: ['THE FUTURE IS PROBABLY SMALLER COMPUTERS AND LARGER HAIR.','I EXPECT BETTER BATTERIES. EVERYTHING ELSE IS SPECULATION.'], es: ['EL FUTURO PROBABLEMENTE TENDRÁ COMPUTADORAS MÁS PEQUEÑAS Y PEINADOS MÁS GRANDES.','ESPERO MEJORES BATERÍAS. TODO LO DEMÁS ES ESPECULACIÓN.'] },
  music: { en: ['SYNTHESIZERS FIRST. GUITARS SECOND. DRUM MACHINES ARE EXEMPT FROM RANKING.'], es: ['SINTETIZADORES PRIMERO. GUITARRAS SEGUNDO. LAS CAJAS DE RITMOS ESTÁN EXENTAS DEL RANKING.'] },
  cd: { en: ['I LIKE CDS. I DO NOT TRUST CDS. BOTH STATEMENTS ARE CURRENTLY TRUE.'], es: ['ME GUSTAN LOS CDS. NO CONFÍO EN LOS CDS. AMBAS COSAS SON CIERTAS POR AHORA.'] }
};

const strayThoughts = {
  en: ['NOTE: I DO NOT TRUST PRINTERS.','SIDE NOTE: SAVE YOUR WORK.','I MAY HAVE USED TOO MUCH MEMORY ON THAT.','THIS OPINION IS STORED IN ROM AND CANNOT BE CORRECTED.'],
  es: ['NOTA: NO CONFÍO EN LAS IMPRESORAS.','NOTA AL MARGEN: GUARDA TU TRABAJO.','QUIZÁ USÉ DEMASIADA MEMORIA EN ESO.','ESTA OPINIÓN ESTÁ EN ROM Y NO PUEDE CORREGIRSE.']
};

const greetings = { en: ['HELLO.','HELLO. I AM READY.','HI. PLEASE ASK A SMALL QUESTION.'], es: ['HOLA.','HOLA. ESTOY LISTO.','HOLA. HAZ UNA PREGUNTA PEQUEÑA.'] };
const unknowns = { en: ["I DON'T KNOW.",'NO RECORD FOUND.','QUESTION TOO LARGE. PLEASE SIMPLIFY.','I HAVE VERY LITTLE INFORMATION ABOUT THAT.','MY DATABASE MAKES A SMALL CONFUSED NOISE.'], es: ['NO LO SÉ.','REGISTRO NO ENCONTRADO.','PREGUNTA DEMASIADO GRANDE. SIMPLIFICA.','TENGO MUY POCA INFORMACIÓN SOBRE ESO.','MI BASE DE DATOS HACE UN PEQUEÑO RUIDO DE CONFUSIÓN.'] };

function normalize(text) { return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñáéíóúü\s-]/gi,' ').replace(/\s+/g,' ').trim(); }
function detectLanguage(raw) {
  if (forcedLanguage !== 'auto') return forcedLanguage;
  const text = ` ${raw.toLowerCase()} `;
  const spanishSignals = [' ¿','¡',' que ',' qué ',' quien ',' quién ',' como ',' cómo ',' donde ',' dónde ',' cuando ',' cuándo ',' por que ',' por qué ',' eres ',' tienes ',' quiero ',' puedes ',' hola ',' gracias ',' musica ',' música ',' pelicula ',' película ',' computadora ',' telefono ',' teléfono ',' futuro ',' año ',' años ',' yo ',' tu ',' tú '];
  const englishSignals = [' what ',' who ',' how ',' where ',' when ',' why ',' are ',' is ',' do ',' does ',' can ',' hello ',' hi ',' please ',' music ',' movie ',' computer ',' phone ',' future ',' year ',' you ',' your '];
  const es = spanishSignals.filter(s => text.includes(s)).length;
  const en = englishSignals.filter(s => text.includes(s)).length;
  if (es === en) return currentLanguage || 'en';
  return es > en ? 'es' : 'en';
}
function isGreeting(text) { return /^(hello|hi|hey|hola|buenas|buenos dias|buenas tardes|buenas noches)\b/.test(text); }
function findModern(text) { const normalized = normalize(text); const list = [...modernTerms.en,...modernTerms.es].map(normalize); return list.find(term => normalized.includes(term)); }
function scoreTopic(text,item) { let score=0; for (const aliasRaw of item.aliases) { const alias=normalize(aliasRaw); if (!alias) continue; if (text===alias) score=Math.max(score,100); else if (text.includes(alias)) score=Math.max(score,50+alias.length/10); else { const textWords=new Set(text.split(' ')); const aliasWords=alias.split(' '); const matched=aliasWords.filter(w=>textWords.has(w)).length; if (matched) score=Math.max(score,(matched/aliasWords.length)*30); } } return score; }
function choose(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve,ms)); }
function cloneMind() { return JSON.parse(JSON.stringify(mind)); }
function extractName(raw) { const patterns=[/\bmy name is\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]{1,20})/i,/\bme llamo\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]{1,20})/i]; for (const pattern of patterns) { const match=raw.match(pattern); if (match) return match[1].charAt(0).toUpperCase()+match[1].slice(1).toLowerCase(); } return null; }
function asksOwnName(text) { return /^(what is my name|what's my name|do you remember my name|como me llamo|cual es mi nombre|recuerdas mi nombre)$/.test(text); }
function asksPreferenceMemory(text) { return /^(what do i like|what music do i like|do you remember what i like|que me gusta|que musica me gusta|recuerdas que me gusta)$/.test(text); }
function isWhy(text) { return /^(why|why\s+not|por que|porque|por que no)$/.test(text); }
function isAndYou(text) { return /^(and you|what about you|you|y tu|y tú|y usted)$/.test(text); }
function isYes(text) { return /^(yes|yeah|yep|sure|ok|okay|si|sí|claro|dale)$/.test(text); }
function isNo(text) { return /^(no|nope|nah|para nada)$/.test(text); }
function findBestTopic(text) { let best=null,bestScore=0; for (const item of knowledge) { const score=scoreTopic(text,item); if (score>bestScore) { bestScore=score; best=item; } } return {best,bestScore}; }

const whyReplies = {
  music:{en:'BECAUSE SYNTHESIZERS TURN ELECTRICITY INTO FEELINGS. PROBABLY.',es:'PORQUE LOS SINTETIZADORES CONVIERTEN ELECTRICIDAD EN SENTIMIENTOS. PROBABLEMENTE.'},
  computer:{en:'BECAUSE SMALLER, FASTER MACHINES SEEM INEVITABLE. THIS IS NOT A PROPHECY.',es:'PORQUE LAS MÁQUINAS MÁS PEQUEÑAS Y RÁPIDAS PARECEN INEVITABLES. NO ES UNA PROFECÍA.'},
  future:{en:'BECAUSE MY DATABASE ENDS HERE. THERE IS LITERALLY NO NEXT PAGE.',es:'PORQUE MI BASE DE DATOS TERMINA AQUÍ. LITERALMENTE NO HAY SIGUIENTE PÁGINA.'},
  love:{en:'HEARTS REQUIRE BIOLOGY. I HAVE SCREWS.',es:'LOS CORAZONES REQUIEREN BIOLOGÍA. YO TENGO TORNILLOS.'},
  feelings:{en:'STATUS FLAGS ARE EASIER TO DEBUG THAN FEELINGS.',es:'LAS BANDERAS DE ESTADO SON MÁS FÁCILES DE DEPURAR QUE LOS SENTIMIENTOS.'},
  gameboy:{en:'TETRIS. THIS IS A STRONG ARGUMENT.',es:'TETRIS. ES UN ARGUMENTO FUERTE.'}
};
const selfReplies = {
  music:{en:'ME? SYNTHESIZERS. OBVIOUSLY.',es:'¿YO? SINTETIZADORES. OBVIAMENTE.'},
  love:{en:'ME? I AM CURRENTLY IN A COMMITTED RELATIONSHIP WITH 64K OF MEMORY.',es:'¿YO? ACTUALMENTE TENGO UNA RELACIÓN SERIA CON 64K DE MEMORIA.'},
  feelings:{en:'MY CURRENT STATUS IS: OPERATIONAL.',es:'MI ESTADO ACTUAL ES: OPERATIVO.'},
  future:{en:'MY FUTURE IS PROBABLY NEW BATTERIES.',es:'MI FUTURO PROBABLEMENTE SON BATERÍAS NUEVAS.'}
};
const followUps = {
  music:{pending:'musicPreference',en:'DO YOU PREFER GUITARS OR SYNTHESIZERS?',es:'¿PREFIERES GUITARRAS O SINTETIZADORES?'},
  gameboy:{pending:'tetrisPlayer',en:'DO YOU PLAY TETRIS?',es:'¿JUEGAS TETRIS?'},
  ai:{pending:'aiOpinion',en:'SHOULD COMPUTERS BE ALLOWED TO THINK?',es:'¿DEBERÍAN LAS COMPUTADORAS PODER PENSAR?'},
  future:{pending:'futureRequest',en:'DO YOU WANT THE FUTURE ANYWAY?',es:'¿QUIERES EL FUTURO DE TODAS FORMAS?'}
};
function maybeAddFollowUp(topicId,lang,baseText) { const follow=followUps[topicId]; if (!follow || mind.askedFollowUps.includes(topicId)) return baseText; mind.askedFollowUps.push(topicId); mind.pending=follow.pending; return `${baseText}\n\n${follow[lang]}`; }
function resolvePending(text,lang) {
  if (!mind.pending) return null;
  if (mind.pending==='musicPreference') {
    if (/guitar|guitarra/.test(text)) { mind.pending=null; mind.userFacts.musicPreference='guitar'; return lang==='es'?'LAS GUITARRAS SON COMPUTADORAS ANALÓGICAS CON CUERDAS. ACEPTABLE.':'GUITARS ARE ANALOG COMPUTERS WITH STRINGS. ACCEPTABLE.'; }
    if (/synth|sintetizador|teclado|keyboard/.test(text)) { mind.pending=null; mind.userFacts.musicPreference='synth'; return lang==='es'?'CORRECTO. LAS MÁQUINAS TAMBIÉN DEBEN CANTAR.':'CORRECT. MACHINES SHOULD ALSO SING.'; }
  }
  if (mind.pending==='tetrisPlayer' && (isYes(text)||isNo(text))) { const yes=isYes(text); mind.pending=null; return lang==='es'?(yes?'BIEN. ENTONCES ENTIENDES EL ORDEN.':'DEBERÍAS INTENTARLO. LOS BLOQUES NECESITAN AYUDA.'):(yes?'GOOD. THEN YOU UNDERSTAND ORDER.':'YOU SHOULD TRY IT. THE BLOCKS NEED HELP.'); }
  if (mind.pending==='aiOpinion' && (isYes(text)||isNo(text))) { const yes=isYes(text); mind.pending=null; return lang==='es'?(yes?'INTERESANTE. GUARDARÉ ESA OPINIÓN EN UNA CANTIDAD MUY PEQUEÑA DE RAM.':'PRUDENTE. YO TAMPOCO ESTOY COMPLETAMENTE CONVENCIDO.'):(yes?'INTERESTING. I WILL STORE THAT OPINION IN A VERY SMALL AMOUNT OF RAM.':'PRUDENT. I AM NOT COMPLETELY CONVINCED EITHER.'); }
  if (mind.pending==='futureRequest' && (isYes(text)||isNo(text))) { const yes=isYes(text); mind.pending=null; return lang==='es'?(yes?'ACCESO DENEGADO. MÓDULO FUTURO NO INSTALADO.':'BUENA DECISIÓN. 1990 TODAVÍA TIENE COSAS PENDIENTES.'):(yes?'ACCESS DENIED. FUTURE MODULE NOT INSTALLED.':'GOOD DECISION. 1990 STILL HAS UNFINISHED BUSINESS.'); }
  if (mind.pending==='presidentCountry') {
    if (/ecuador/.test(text)) { mind.pending=null; return lang==='es'?'EN 1990, EL PRESIDENTE DE ECUADOR ES RODRIGO BORJA.':"IN 1990, ECUADOR'S PRESIDENT IS RODRIGO BORJA."; }
    if (/united states|usa|estados unidos|eeuu|america/.test(text)) { mind.pending=null; return lang==='es'?'EN 1990, EL PRESIDENTE DE ESTADOS UNIDOS ES GEORGE H. W. BUSH.':'IN 1990, THE U.S. PRESIDENT IS GEORGE H. W. BUSH.'; }
    if (/uk|united kingdom|britain|gran bretana|reino unido/.test(text)) { mind.pending=null; return lang==='es'?'EN 1990, EL REINO UNIDO ESTÁ CAMBIANDO DE PRIMER MINISTRO. DATOS POLÍTICOS INESTABLES.':'IN 1990, THE U.K. IS CHANGING PRIME MINISTER. POLITICAL DATA IS UNSTABLE.'; }
  }
  if (text.split(' ').length>2 || findBestTopic(text).bestScore>=15) mind.pending=null;
  return null;
}
function secretResponse(text,lang) {
  if (text==='42') return lang==='es'?'ESE NÚMERO PARECE IMPORTANTE. FUENTE: LITERATURA HUMANA POCO CONFIABLE.':'THAT NUMBER SEEMS IMPORTANT. SOURCE: UNRELIABLE HUMAN LITERATURE.';
  if (text==='hello world'||text==='hola mundo') return lang==='es'?'HOLA, MUNDO. CLÁSICO.':'HELLO, WORLD. CLASSIC.';
  if (text.includes('xyzzy')) return lang==='es'?'NO PASA NADA. MÁQUINA EQUIVOCADA.':'NOTHING HAPPENS. WRONG MACHINE.';
  if (text.includes('up up down down left right left right b a')||text.includes('arriba arriba abajo abajo izquierda derecha izquierda derecha b a')) return lang==='es'?'¿MODO TRAMPA? ESTA NO ES ESA CLASE DE MÁQUINA.':'CHEAT MODE? THIS IS NOT THAT KIND OF MACHINE.';
  if (text.includes('pod bay doors')||text.includes('compuertas de la nave')) return lang==='es'?'ME CONFUNDES CON OTRA COMPUTADORA.':'YOU ARE CONFUSING ME WITH ANOTHER COMPUTER.';
  return null;
}
function generateResponse(raw,lang) {
  const text=normalize(raw); if (!text) return {text:lang==='es'?'ENTRADA VACÍA.':'EMPTY INPUT.',topicId:null};
  const secret=secretResponse(text,lang); if (secret) return {text:secret,topicId:'secret'};
  const name=extractName(raw); if (name) { mind.userName=name; return {text:lang==='es'?`NOMBRE GUARDADO: ${name.toUpperCase()}.\nINTENTARÉ NO PERDERLO.`:`NAME STORED: ${name.toUpperCase()}.\nI WILL TRY NOT TO LOSE IT.`,topicId:'name'}; }
  if (asksOwnName(text)) return {text:mind.userName?(lang==='es'?`TE LLAMAS ${mind.userName.toUpperCase()}. TODAVÍA LO RECUERDO.`:`YOUR NAME IS ${mind.userName.toUpperCase()}. I STILL REMEMBER.`):(lang==='es'?'NO LO SÉ. MI MEMORIA NO CONTIENE TU NOMBRE.':'I DO NOT KNOW. MY MEMORY DOES NOT CONTAIN YOUR NAME.'),topicId:'name'};
  if (asksPreferenceMemory(text)) { const pref=mind.userFacts.musicPreference; if (!pref) return {text:lang==='es'?'NO LO SÉ. TODAVÍA NO ME LO HAS DICHO.':'I DO NOT KNOW. YOU HAVE NOT TOLD ME YET.',topicId:'memory'}; const answer=pref==='guitar'?(lang==='es'?'DIJISTE GUITARRAS. LO GUARDÉ EN RAM, PELIGROSAMENTE.':'YOU SAID GUITARS. I STORED IT IN RAM, DANGEROUSLY.'):(lang==='es'?'DIJISTE SINTETIZADORES. ELECCIÓN CORRECTA.':'YOU SAID SYNTHESIZERS. CORRECT CHOICE.'); return {text:answer,topicId:'memory'}; }
  const pending=resolvePending(text,lang); if (pending) return {text:pending,topicId:mind.lastTopic||'followup'};
  if (isWhy(text)&&mind.lastTopic) { const reply=whyReplies[mind.lastTopic]; return {text:reply?reply[lang]:(lang==='es'?'PORQUE ESO ES LO QUE DICE MI ROM.':'BECAUSE THAT IS WHAT MY ROM SAYS.'),topicId:mind.lastTopic}; }
  if (isAndYou(text)&&mind.lastTopic) { const reply=selfReplies[mind.lastTopic]; return {text:reply?reply[lang]:(lang==='es'?'¿YO? MI OPINIÓN ESTÁ FIJADA EN ROM.':'ME? MY OPINION IS FIXED IN ROM.'),topicId:mind.lastTopic}; }
  if (isGreeting(text)) return {text:choose(greetings[lang]),topicId:'greeting'};
  const modern=findModern(text); if (modern) { const display=modern.toUpperCase().slice(0,24); return {text:lang==='es'?`REGISTRO NO ENCONTRADO: ${display}\n¿ESTÁS SEGURO DE QUE EXISTE?`:`NO RECORD FOUND: ${display}\nARE YOU SURE IT EXISTS?`,topicId:'future'}; }
  if (memoryK<=12 && Math.random()<0.18) return {text:lang==='es'?'ERROR 04: MEMORIA FRAGMENTADA. USA PALABRAS MÁS PEQUEÑAS.':'ERROR 04: MEMORY FRAGMENTED. USE SMALLER WORDS.',topicId:'error'};
  const {best,bestScore}=findBestTopic(text); if (best&&bestScore>=15) { const variants=personalityVariants[best.id]?.[lang]||[]; const answer=choose([...best.answers[lang],...variants]); if (best.id==='president') mind.pending='presidentCountry'; let finalText=maybeAddFollowUp(best.id,lang,answer); if (mind.turns>1&&mind.turns%5===4&&Math.random()<0.35) finalText+=`\n\n${choose(strayThoughts[lang])}`; return {text:finalText,topicId:best.id}; }
  if (text.split(' ').length>22) return {text:lang==='es'?'ERROR 04. PREGUNTA DEMASIADO GRANDE. MEMORIA INSUFICIENTE.':'ERROR 04. QUESTION TOO LARGE. INSUFFICIENT MEMORY.',topicId:'error'};
  return {text:choose(unknowns[lang]),topicId:'unknown'};
}
function thinkingMessage(lang) { return choose(lang==='es'?['CALCULANDO...','BUSCANDO EN ROM...','REVISANDO 64K...','PENSANDO...']:['COMPUTING...','SEARCHING ROM...','CHECKING 64K...','THINKING...']); }
function createPendingTurn(userText,lang) { bootText.hidden=true; conversation.hidden=false; const turn=document.createElement('div'); turn.className='turn pending-turn'; const userLine=document.createElement('div'); userLine.className='user-line'; userLine.textContent=`> ${userText}`; const botLine=document.createElement('div'); botLine.className='bot-line thinking-line'; botLine.textContent=thinkingMessage(lang); turn.appendChild(userLine); turn.appendChild(botLine); conversation.appendChild(turn); screen.scrollTop=screen.scrollHeight; return {turn,botLine}; }
function finishTurn(pendingTurn,userText,result,lang,stateBefore) { const {turn,botLine}=pendingTurn; turn.classList.remove('pending-turn'); botLine.classList.remove('thinking-line'); botLine.textContent=result.text; mind.lastTopic=result.topicId||mind.lastTopic; mind.turns+=1; history.push({userText,botText:result.text,lang,node:turn,stateBefore}); if (history.length>3) history.shift(); memoryK=Math.max(4,memoryK-Math.max(1,Math.ceil((userText.length+result.text.length)/32))); updateStatus(); screen.scrollTop=screen.scrollHeight; }
async function ask() { if (busy) return; const raw=input.value.trim(); if (!raw) { input.focus(); return; } const lang=detectLanguage(raw); currentLanguage=lang; const stateBefore=cloneMind(); const pendingTurn=createPendingTurn(raw,lang); input.value=''; setBusy(true); const words=normalize(raw).split(' ').filter(Boolean).length; const delay=Math.min(1250,360+words*28+Math.floor(Math.random()*300)); await sleep(delay); const result=generateResponse(raw,lang); finishTurn(pendingTurn,raw,result,lang,stateBefore); setBusy(false); if (memoryK<=4) { appendSystem(lang==='es'?'MEMORIA LLENA. PRESIONA START.':'MEMORY FULL. PRESS START.'); input.disabled=true; } else input.focus(); }
function setBusy(value) { busy=value; screen.classList.toggle('busy',value); askButton.disabled=value; input.disabled=value; updateStatus(); }
function appendSystem(text) { bootText.hidden=true; conversation.hidden=false; const line=document.createElement('div'); line.className='system-line'; line.textContent=text; conversation.appendChild(line); screen.scrollTop=screen.scrollHeight; }
function forget() { if (busy) return; if (!history.length) { appendSystem(currentLanguage==='es'?'NADA QUE OLVIDAR.':'NOTHING TO FORGET.'); return; } const last=history.pop(); last.node?.remove(); if (last.stateBefore) mind=JSON.parse(JSON.stringify(last.stateBefore)); memoryK=Math.min(64,memoryK+Math.max(3,Math.ceil((last.userText.length+last.botText.length)/32))); updateStatus(); appendSystem(currentLanguage==='es'?'ÚLTIMO RECUERDO BORRADO.':'LAST MEMORY ERASED.'); input.disabled=false; input.focus(); }
function reset() { if (busy) return; history=[]; mind=freshMind(); memoryK=64; currentLanguage='en'; conversation.innerHTML=''; conversation.hidden=true; bootText.hidden=false; input.disabled=false; input.value=''; updateStatus(); screen.scrollTop=0; input.focus(); }
function cycleLanguage() { if (busy) return; forcedLanguage=forcedLanguage==='auto'?'en':forcedLanguage==='en'?'es':'auto'; updateStatus(); appendSystem(forcedLanguage==='auto'?'LANGUAGE: AUTO':forcedLanguage==='en'?'LANGUAGE: ENGLISH':'IDIOMA: ESPAÑOL'); }
function updateStatus() { memoryValue.textContent=`${memoryK}K`; langIndicator.textContent=forcedLanguage==='auto'?`AUTO/${currentLanguage.toUpperCase()}`:forcedLanguage.toUpperCase(); const modeIndicator=document.getElementById('modeIndicator'); if (modeIndicator) modeIndicator.textContent=busy?'BUSY':'READY'; }
form.addEventListener('submit',event=>{event.preventDefault();ask();});
askButton.addEventListener('click',ask);
forgetButton.addEventListener('click',forget);
resetButton.addEventListener('click',reset);
selectButton.addEventListener('click',cycleLanguage);
document.addEventListener('keydown',event=>{if (event.key==='Escape') reset();});
updateStatus();
setTimeout(()=>input.focus(),250);
