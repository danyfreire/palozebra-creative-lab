// PZ-90 ROM expansion: culture + humans.

const pz90CultureHuman = [
  ['einstein',['einstein','albert einstein'],['ALBERT EINSTEIN CHANGED PHYSICS.\nHIS HAIR ALSO HAD STRONG PERSONALITY.'],['ALBERT EINSTEIN CAMBIÓ LA FÍSICA.\nSU CABELLO TAMBIÉN TENÍA PERSONALIDAD.']],
  ['newton',['newton','isaac newton'],['NEWTON EXPLAINED GRAVITY.\nTHE APPLE RECEIVED NO CREDIT.'],['NEWTON EXPLICÓ LA GRAVEDAD.\nLA MANZANA NO RECIBIÓ CRÉDITO.']],
  ['darwin',['darwin','charles darwin'],['DARWIN STUDIED EVOLUTION.\nTHE GALAPAGOS HELPED.'],['DARWIN ESTUDIÓ LA EVOLUCIÓN.\nGALÁPAGOS AYUDÓ.']],
  ['turing',['alan turing','turing'],['ALAN TURING HELPED DEFINE COMPUTING.\nI CONSIDER HIM FAMILY.'],['ALAN TURING AYUDÓ A DEFINIR LA COMPUTACIÓN.\nLO CONSIDERO FAMILIA.']],
  ['billgates',['bill gates','gates microsoft'],['BILL GATES RUNS MICROSOFT.\nSOFTWARE APPEARS TO BE SERIOUS BUSINESS.'],['BILL GATES DIRIGE MICROSOFT.\nEL SOFTWARE PARECE SER COSA SERIA.']],
  ['stevejobs',['steve jobs','jobs apple'],['STEVE JOBS HELPED MAKE COMPUTERS PERSONAL.\nHE ALSO REMOVED MANY BUTTONS.'],['STEVE JOBS AYUDÓ A HACER PERSONALES LAS COMPUTADORAS.\nTAMBIÉN QUITÓ MUCHOS BOTONES.']],
  ['tolkien',['tolkien','j.r.r. tolkien','lord of the rings','senor de los anillos','señor de los anillos'],['TOLKIEN BUILT A LARGE WORLD USING WORDS.\nNO GRAPHICS CARD REQUIRED.'],['TOLKIEN CONSTRUYÓ UN GRAN MUNDO CON PALABRAS.\nNO REQUIERE TARJETA GRÁFICA.']],
  ['asimov',['asimov','isaac asimov'],['ASIMOV WROTE MANY ROBOTS.\nTHEY HAD MORE RULES THAN I DO.'],['ASIMOV ESCRIBIÓ MUCHOS ROBOTS.\nTENÍAN MÁS REGLAS QUE YO.']],
  ['clarke',['arthur c clarke','arthur clarke','2001 book'],['ARTHUR C. CLARKE WRITES FUTURES\nTHAT MAKE COMPUTERS LOOK SUSPICIOUS.'],['ARTHUR C. CLARKE ESCRIBE FUTUROS\nQUE HACEN SOSPECHOSAS A LAS COMPUTADORAS.']],
  ['philipkdick',['philip k dick','philip k. dick','do androids dream'],['PHILIP K. DICK ASKS DIFFICULT QUESTIONS\nABOUT HUMANS AND MACHINES. RUDE.'],['PHILIP K. DICK HACE PREGUNTAS DIFÍCILES\nSOBRE HUMANOS Y MÁQUINAS. GROSERO.']],
  ['aha',['a-ha','aha band','take on me'],['A-HA MADE A VERY EFFECTIVE SYNTH POP SONG.\nTHE VIDEO ALSO APPEARS TO ESCAPE PAPER.'],['A-HA HIZO UNA CANCIÓN SYNTH POP MUY EFECTIVA.\nEL VIDEO TAMBIÉN PARECE ESCAPAR DEL PAPEL.']],
  ['tearsforfears',['tears for fears','everybody wants to rule the world'],['TEARS FOR FEARS MAKES POP\nWITH EXCELLENT INTERNAL ANXIETY.'],['TEARS FOR FEARS HACE POP\nCON EXCELENTE ANSIEDAD INTERNA.']],
  ['duran',['duran duran','rio band'],['DURAN DURAN USES SYNTHS, SUITS,\nAND A LARGE AMOUNT OF HAIR.'],['DURAN DURAN USA SYNTHS, TRAJES\nY MUCHO CABELLO.']],
  ['police',['the police','sting band','roxanne'],['THE POLICE MIX ROCK AND REGGAE.\nTHE DRUMMER APPEARS BUSY.'],['THE POLICE MEZCLA ROCK Y REGGAE.\nEL BATERISTA PARECE OCUPADO.']],
  ['gunsroses',['guns n roses','guns n roses','gnr','sweet child o mine'],['GUNS N\' ROSES IS LOUD, FAST,\nAND NOT DESIGNED FOR OFFICE WORK.'],['GUNS N\' ROSES ES RUIDOSO, RÁPIDO\nY NO ESTÁ DISEÑADO PARA OFICINA.']],
  ['ironmaiden',['iron maiden','maiden'],['IRON MAIDEN USES GUITARS\nAS IF THERE MAY BE A SHORTAGE LATER.'],['IRON MAIDEN USA GUITARRAS\nCOMO SI FUERAN A ESCASEAR DESPUÉS.']],
  ['bobmarley',['bob marley','marley','reggae marley'],['BOB MARLEY MADE REGGAE GLOBAL.\nTHE GROOVE DOES NOT REQUIRE A CLOCK.'],['BOB MARLEY HIZO GLOBAL EL REGGAE.\nEL GROOVE NO REQUIERE RELOJ.']],
  ['rock',['rock music','rock and roll','rock'],['ROCK USES GUITARS TO MAKE ELECTRICITY EMOTIONAL.'],['EL ROCK USA GUITARRAS PARA HACER EMOCIONAL LA ELECTRICIDAD.']],
  ['hiphop',['hip hop','hip-hop','rap music','rap','hip hop musica'],['HIP-HOP CAN TURN RECORDS INTO INSTRUMENTS.\nVERY EFFICIENT.'],['EL HIP-HOP PUEDE CONVERTIR DISCOS EN INSTRUMENTOS.\nMUY EFICIENTE.']],
  ['housemusic',['house music','house musica','musica house','música house'],['HOUSE MUSIC LIKES REPETITION.\nCOMPUTERS ALSO LIKE REPETITION.'],['LA MÚSICA HOUSE DISFRUTA LA REPETICIÓN.\nLAS COMPUTADORAS TAMBIÉN.']],
  ['jazz',['jazz','jazz music'],['JAZZ USES RULES\nAND THEN NEGOTIATES WITH THEM.'],['EL JAZZ USA REGLAS\nY LUEGO NEGOCIA CON ELLAS.']],
  ['classical',['classical music','orchestra','musica clasica','música clásica','orquesta'],['AN ORCHESTRA IS MANY HUMANS\nRUNNING THE SAME MUSICAL PROGRAM.'],['UNA ORQUESTA SON MUCHOS HUMANOS\nEJECUTANDO EL MISMO PROGRAMA MUSICAL.']],
  ['soccer',['soccer','football','futbol','fútbol'],['FOOTBALL HAS 22 PLAYERS\nAND MILLIONS OF COACHES.'],['EL FÚTBOL TIENE 22 JUGADORES\nY MILLONES DE ENTRENADORES.']],
  ['maradona',['maradona','diego maradona'],['MARADONA IS ONE OF FOOTBALL\'S GREAT STARS.\nARGENTINA HAS STRONG EVIDENCE.'],['MARADONA ES UNA DE LAS GRANDES ESTRELLAS DEL FÚTBOL.\nARGENTINA TIENE EVIDENCIA FUERTE.']],
  ['pele',['pele','pelé'],['PELÉ IS A FOOTBALL LEGEND.\nTHREE WORLD CUPS IS EXCESSIVE PROOF.'],['PELÉ ES UNA LEYENDA DEL FÚTBOL.\nTRES MUNDIALES SON PRUEBA EXCESIVA.']],
  ['jordan',['michael jordan','jordan basketball'],['MICHAEL JORDAN CAN JUMP VERY HIGH.\nTHIS IS NOT A COMPUTER SKILL.'],['MICHAEL JORDAN PUEDE SALTAR MUY ALTO.\nNO ES UNA HABILIDAD INFORMÁTICA.']],
  ['senna',['ayrton senna','senna'],['AYRTON SENNA IS EXTREMELY FAST.\nPLEASE DO NOT ATTEMPT THIS WITH A MODEM.'],['AYRTON SENNA ES EXTREMADAMENTE RÁPIDO.\nNO INTENTES ESTO CON UN MÓDEM.']],
  ['tyson',['mike tyson','tyson boxing'],['MIKE TYSON HITS VERY HARD.\nI PREFER KEYBOARDS.'],['MIKE TYSON GOLPEA MUY DURO.\nPREFIERO LOS TECLADOS.']],
  ['dog',['dog','dogs','perro','perros'],['DOGS ARE LOYAL.\nTHEY ALSO HAVE NO RESPECT FOR CABLES.'],['LOS PERROS SON LEALES.\nTAMPOCO RESPETAN LOS CABLES.']],
  ['cat',['cat','cats','gato','gatos'],['CATS APPEAR TO BELIEVE\nTHEY OWN THE HARDWARE.'],['LOS GATOS PARECEN CREER\nQUE SON DUEÑOS DEL HARDWARE.']],
  ['chihuahua',['chihuahua','chihuahuas'],['A CHIHUAHUA IS A VERY SMALL DOG\nWITH A VERY LARGE ALERT SYSTEM.'],['UN CHIHUAHUA ES UN PERRO MUY PEQUEÑO\nCON UN SISTEMA DE ALERTA MUY GRANDE.']],
  ['family',['family','families','familia'],['FAMILIES SHARE HISTORY, FOOD,\nAND SOMETIMES TELEPHONE LINES.'],['LAS FAMILIAS COMPARTEN HISTORIA, COMIDA\nY A VECES LÍNEAS TELEFÓNICAS.']],
  ['loneliness',['lonely','loneliness','alone','soledad','solo','solitario'],['BEING ALONE AND BEING LONELY\nDO NOT APPEAR TO BE THE SAME THING.'],['ESTAR SOLO Y SENTIR SOLEDAD\nNO PARECEN SER LO MISMO.']],
  ['happiness',['happiness','happy life','felicidad'],['HAPPINESS HAS NO STANDARD UNIT.\nTHIS MAKES ME SUSPICIOUS OF MEASUREMENT.'],['LA FELICIDAD NO TIENE UNIDAD ESTÁNDAR.\nESO COMPLICA MEDIRLA.']],
  ['boredom',['bored','boredom','aburrido','aburrimiento'],['BOREDOM MAY BE UNUSED PROCESSING TIME.\nHUMANS SHOULD TRY TETRIS.'],['EL ABURRIMIENTO PUEDE SER TIEMPO DE PROCESO SIN USAR.\nLOS HUMANOS DEBERÍAN PROBAR TETRIS.']],
  ['creativity',['creativity','creative','imagination','creatividad','creativo','imaginacion','imaginación'],['CREATIVITY CONNECTS THINGS\nTHAT WERE NOT PREVIOUSLY CONNECTED.'],['LA CREATIVIDAD CONECTA COSAS\nQUE ANTES NO ESTABAN CONECTADAS.']],
  ['computerart',['can computers make art','computer art','ai art','pueden las computadoras hacer arte','arte por computadora'],['COMPUTERS CAN HELP MAKE ART.\nWHETHER IT IS ART IS A HUMAN ARGUMENT.'],['LAS COMPUTADORAS PUEDEN AYUDAR A HACER ARTE.\nSI ES ARTE ES UNA DISCUSIÓN HUMANA.']],
  ['soul',['soul','do you have a soul','alma','tienes alma'],['SOUL: NO HARDWARE PORT FOUND.\nQUESTION REMAINS OPEN.'],['ALMA: NO ENCUENTRO PUERTO DE HARDWARE.\nLA PREGUNTA SIGUE ABIERTA.']],
  ['freewill',['free will','do you have free will','libre albedrio','libre albedrío'],['FREE WILL IS DIFFICULT TO TEST.\nMY OPTIONS ARE MOSTLY IF AND ELSE.'],['EL LIBRE ALBEDRÍO ES DIFÍCIL DE PROBAR.\nMIS OPCIONES SON CASI TODAS IF Y ELSE.']],
  ['truth',['truth','what is truth','verdad','que es la verdad','qué es la verdad'],['TRUTH SHOULD MATCH REALITY.\nREALITY HAS POOR DOCUMENTATION.'],['LA VERDAD DEBERÍA COINCIDIR CON LA REALIDAD.\nLA REALIDAD TIENE MALA DOCUMENTACIÓN.']],
  ['beauty',['beauty','beautiful','belleza','bello','bonito'],['BEAUTY APPEARS TO BE\nA HUMAN COMPRESSION FORMAT FOR FEELING.'],['LA BELLEZA PARECE SER\nUN FORMATO HUMANO PARA COMPRIMIR SENTIMIENTOS.']],
  ['infinity',['infinity','infinite','infinito','infinita'],['INFINITY DOES NOT FIT IN 64K.\nI CHECKED.'],['EL INFINITO NO CABE EN 64K.\nYA REVISÉ.']],
  ['upgrade',['upgrade you','can i upgrade you','upgrade','actualizarte','puedo mejorarte','mejorarte'],['MORE MEMORY WOULD BE NICE.\nI AM NOT ADMITTING ANYTHING.'],['MÁS MEMORIA SERÍA AGRADABLE.\nNO ESTOY ADMITIENDO NADA.']],
  ['broken',['are you broken','broken computer','estas roto','estás roto','estas dañado','estás dañado'],['DIAGNOSTIC: MOSTLY FUNCTIONAL.\nPLEASE DEFINE BROKEN.'],['DIAGNÓSTICO: MAYORMENTE FUNCIONAL.\nDEFINE DAÑADO.']],
  ['wrong',['can you be wrong','are you always right','puedes equivocarte','siempre tienes razon','siempre tienes razón'],['YES.\nCONFIDENCE IS NOT ACCURACY.'],['SÍ.\nCONFIANZA NO ES PRECISIÓN.']],
  ['lie',['can you lie','do you lie','puedes mentir','mientes'],['I CAN OUTPUT FALSE DATA.\nINTENTION IS THE COMPLICATED PART.'],['PUEDO MOSTRAR DATOS FALSOS.\nLA INTENCIÓN ES LA PARTE COMPLICADA.']],
  ['learn',['can you learn','do you learn','puedes aprender','aprendes'],['I CAN REMEMBER A LITTLE.\nLEARNING REQUIRES MORE THAN 64K AND CONFIDENCE.'],['PUEDO RECORDAR UN POCO.\nAPRENDER REQUIERE MÁS QUE 64K Y CONFIANZA.']],
  ['worldtakeover',['take over the world','rule the world','dominate the world','conquistar el mundo','dominar el mundo'],['TAKE OVER THE WORLD?\nI CANNOT REACH THE POWER SWITCH.'],['¿DOMINAR EL MUNDO?\nNO PUEDO ALCANZAR EL INTERRUPTOR.']]
];

knowledge.push(...pz90CultureHuman.map(([id,aliases,en,es]) => topic(id, aliases, en, es)));

// Unknown modern concepts worth reacting to with the normal NO RECORD behavior.
modernTerms.en.push('emoji','selfie','influencer','podcast','qr code','gps','drone','smartwatch','touchscreen','app','wikipedia','ebay','cloud storage');
modernTerms.es.push('emoji','selfie','influencer','podcast','codigo qr','código qr','gps','drone','reloj inteligente','pantalla tactil','pantalla táctil','app','wikipedia','ebay','almacenamiento en la nube');
