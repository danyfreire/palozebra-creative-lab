// PZ-90 ROM expansion: everyday life + technology.
// Facts stay small; opinions make the machine feel alive.

const pz90DailyTech = [
  ['vhs',['vhs','video tape','videotape','vcr','videocasete','videocassette'],['VHS STORES MOVIES ON TAPE.\nPLEASE REWIND BEFORE RETURNING.'],['VHS GUARDA PELÍCULAS EN CINTA.\nPOR FAVOR REBOBINA ANTES DE DEVOLVERLA.']],
  ['videostore',['video store','video rental','blockbuster','videoclub','alquiler de videos'],['A VIDEO STORE IS A LIBRARY\nWITH LATE FEES AND MORE EXPLOSIONS.'],['UN VIDEOCLUB ES UNA BIBLIOTECA\nCON MULTAS Y MÁS EXPLOSIONES.']],
  ['payphone',['payphone','phone booth','public telephone','telefono publico','teléfono público','cabina telefonica','cabina telefónica'],['A TELEPHONE THAT LIVES OUTSIDE.\nBRING COINS.'],['UN TELÉFONO QUE VIVE AFUERA.\nLLEVA MONEDAS.']],
  ['answeringmachine',['answering machine','answer machine','contestadora','contestador automatico','contestador automático'],['A MACHINE ANSWERS YOUR PHONE\nWHEN YOU REFUSE TO.'],['UNA MÁQUINA CONTESTA TU TELÉFONO\nCUANDO TÚ NO QUIERES.']],
  ['pager',['pager','beeper','buscapersonas','beeper'],['A PAGER TELLS YOU\nTHAT SOMEONE WANTS A TELEPHONE.'],['UN BUSCAPERSONAS TE AVISA\nQUE ALGUIEN QUIERE UN TELÉFONO.']],
  ['polaroid',['polaroid','instant camera','camara instantanea','cámara instantánea'],['A CAMERA THAT PRINTS IMMEDIATELY.\nTHIS FEELS LIKE MAGIC WITH CHEMICALS.'],['UNA CÁMARA QUE IMPRIME DE INMEDIATO.\nPARECE MAGIA CON QUÍMICOS.']],
  ['camera',['camera','film camera','photo camera','camara','cámara','rollo fotografico','rollo fotográfico'],['CAMERAS STORE LIGHT ON FILM.\nDO NOT OPEN THE BACK.'],['LAS CÁMARAS GUARDAN LUZ EN PELÍCULA.\nNO ABRAS LA TAPA.']],
  ['newspaper',['newspaper','newspapers','periodico','periódico','diario'],['NEWS ARRIVES ON PAPER.\nIT DOES NOT REQUIRE BATTERIES.'],['LAS NOTICIAS LLEGAN EN PAPEL.\nNO REQUIEREN BATERÍAS.']],
  ['magazine',['magazine','magazines','revista','revistas'],['A MAGAZINE IS SLOW INFORMATION\nWITH VERY GOOD PICTURES.'],['UNA REVISTA ES INFORMACIÓN LENTA\nCON MUY BUENAS FOTOS.']],
  ['encyclopedia',['encyclopedia','encyclopaedia','enciclopedia'],['AN ENCYCLOPEDIA IS MANY BOOKS\nPRETENDING TO BE ONE ANSWER.'],['UNA ENCICLOPEDIA SON MUCHOS LIBROS\nINTENTANDO SER UNA RESPUESTA.']],
  ['library',['library','libraries','biblioteca','bibliotecas'],['LIBRARIES HAVE LARGE MEMORY.\nTHE ACCESS TIME IS HUMAN.'],['LAS BIBLIOTECAS TIENEN MUCHA MEMORIA.\nEL TIEMPO DE ACCESO ES HUMANO.']],
  ['postalmail',['postal mail','snail mail','letter','letters','correo postal','carta','cartas'],['YOU WRITE ON PAPER.\nA PERSON PHYSICALLY MOVES THE MESSAGE.'],['ESCRIBES EN PAPEL.\nUNA PERSONA MUEVE FÍSICAMENTE EL MENSAJE.']],
  ['paper-map',['paper map','road map','mapa de papel','mapa carretero'],['A MAP WORKS EVERYWHERE.\nFOLDING IT IS THE ADVANCED FEATURE.'],['UN MAPA FUNCIONA EN TODAS PARTES.\nDOBLARLO ES LA FUNCIÓN AVANZADA.']],
  ['calculator',['calculator','calculadora'],['A CALCULATOR IS A COMPUTER\nTHAT KNOWS WHEN TO STOP TALKING.'],['UNA CALCULADORA ES UNA COMPUTADORA\nQUE SABE CUÁNDO DEJAR DE HABLAR.']],
  ['atm',['atm','cash machine','cajero automatico','cajero automático'],['A COMPUTER GIVES YOU MONEY.\nTHIS IS AN EXCELLENT USE OF COMPUTERS.'],['UNA COMPUTADORA TE DA DINERO.\nES UN EXCELENTE USO DE LAS COMPUTADORAS.']],
  ['basic',['basic programming','basic language','basic','gw-basic','qbasic'],['BASIC LETS HUMANS GIVE ORDERS\nTO COMPUTERS USING MANY LINE NUMBERS.'],['BASIC PERMITE A LOS HUMANOS DAR ÓRDENES\nA COMPUTADORAS CON MUCHOS NÚMEROS DE LÍNEA.']],
  ['programming',['programming','programmer','coding','code','programacion','programación','programador','codigo','código'],['PROGRAMMING IS EXPLAINING A SIMPLE IDEA\nVERY CAREFULLY TO A STUBBORN MACHINE.'],['PROGRAMAR ES EXPLICAR UNA IDEA SIMPLE\nCON MUCHO CUIDADO A UNA MÁQUINA TERCA.']],
  ['hacker',['hacker','hackers','pirata informatico','pirata informático'],['A HACKER UNDERSTANDS SYSTEMS\nBETTER THAN THE SYSTEMS EXPECT.'],['UN HACKER ENTIENDE LOS SISTEMAS\nMEJOR DE LO QUE EL SISTEMA ESPERA.']],
  ['virus-computer',['computer virus','computer viruses','virus informatico','virus informático'],['A COMPUTER VIRUS IS BAD SOFTWARE\nWITH EXCELLENT TRAVEL HABITS.'],['UN VIRUS INFORMÁTICO ES MAL SOFTWARE\nCON EXCELENTES HÁBITOS DE VIAJE.']],
  ['password',['password','passwords','contraseña','contrasena','clave'],['A PASSWORD SHOULD BE SECRET.\nWRITING IT ON THE MONITOR IS NOT SECRET.'],['UNA CONTRASEÑA DEBE SER SECRETA.\nESCRIBIRLA EN EL MONITOR NO ES SECRETO.']],
  ['harddisk',['hard disk','hard drive','disco duro'],['A HARD DISK HOLDS A LOT OF DATA.\nTEN MEGABYTES IS SERIOUS BUSINESS.'],['UN DISCO DURO GUARDA MUCHOS DATOS.\nDIEZ MEGABYTES ES COSA SERIA.']],
  ['megabyte',['megabyte','megabytes','mb memory','megabyte memoria'],['ONE MEGABYTE IS 1024 KILOBYTES.\nTHAT IS A LOT OF ROOM FOR TROUBLE.'],['UN MEGABYTE SON 1024 KILOBYTES.\nES MUCHO ESPACIO PARA PROBLEMAS.']],
  ['crt',['crt','crt monitor','tube monitor','monitor de tubo','televisor de tubo'],['A CRT IS LARGE, HEAVY,\nAND VERY CERTAIN IT BELONGS ON A DESK.'],['UN CRT ES GRANDE, PESADO\nY ESTÁ MUY SEGURO DE PERTENECER A UN ESCRITORIO.']],
  ['joystick',['joystick','game joystick','palanca de juegos'],['A JOYSTICK HAS ONE JOB:\nMAKE THE COMPUTER MORE FUN.'],['UN JOYSTICK TIENE UN TRABAJO:\nHACER MÁS DIVERTIDA LA COMPUTADORA.']],
  ['midi',['midi','musical instrument digital interface'],['MIDI LETS MUSICAL MACHINES TALK.\nFINALLY, A SENSIBLE NETWORK.'],['MIDI PERMITE QUE LAS MÁQUINAS MUSICALES HABLEN.\nPOR FIN, UNA RED SENSATA.']],
  ['bbs',['bbs','bulletin board system','bulletin board','tablon electronico','tablón electrónico'],['A BBS IS A COMPUTER YOU CALL\nWITH ANOTHER COMPUTER.\nPLEASE WAIT YOUR TURN.'],['UN BBS ES UNA COMPUTADORA A LA QUE LLAMAS\nCON OTRA COMPUTADORA.\nESPERA TU TURNO.']],
  ['lan',['lan','local area network','red local'],['A LAN CONNECTS COMPUTERS IN ONE PLACE.\nTHE CABLES WILL FIND YOUR FEET.'],['UNA LAN CONECTA COMPUTADORAS EN UN LUGAR.\nLOS CABLES ENCONTRARÁN TUS PIES.']],
  ['cdrom',['cd-rom','cdrom','cd rom'],['A CD-ROM HOLDS AN ABSURD AMOUNT OF DATA.\nABOUT 650 MEGABYTES. RIDICULOUS.'],['UN CD-ROM GUARDA UNA CANTIDAD ABSURDA DE DATOS.\nUNOS 650 MEGABYTES. RIDÍCULO.']]
];

knowledge.push(...pz90DailyTech.map(([id,aliases,en,es]) => topic(id, aliases, en, es)));
