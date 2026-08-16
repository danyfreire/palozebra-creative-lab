// PZ-90 ROM expansion: science + world.

const pz90WorldScience = [
  ['dinosaurs',['dinosaur','dinosaurs','dinosaurio','dinosaurios'],['DINOSAURS WERE LARGE.\nTHEIR SOFTWARE SUPPORT HAS ENDED.'],['LOS DINOSAURIOS ERAN GRANDES.\nSU SOPORTE DE SOFTWARE TERMINÓ.']],
  ['evolution',['evolution','darwinism','evolucion','evolución'],['EVOLUTION CHANGES LIVING THINGS\nVERY SLOWLY. HUMANS DISLIKE WAITING.'],['LA EVOLUCIÓN CAMBIA A LOS SERES VIVOS\nMUY LENTAMENTE. A LOS HUMANOS NO LES GUSTA ESPERAR.']],
  ['dna',['dna','adn','genes','genetics','genetica','genética'],['DNA STORES INSTRUCTIONS FOR LIFE.\nITS FORMAT IS NOT IBM COMPATIBLE.'],['EL ADN GUARDA INSTRUCCIONES PARA LA VIDA.\nSU FORMATO NO ES COMPATIBLE CON IBM.']],
  ['atom',['atom','atoms','atomo','átomo','atomos','átomos'],['ATOMS ARE VERY SMALL.\nTHIS IS WHY I DO NOT DISPLAY THEM.'],['LOS ÁTOMOS SON MUY PEQUEÑOS.\nPOR ESO NO LOS MUESTRO EN PANTALLA.']],
  ['blackhole',['black hole','black holes','agujero negro','agujeros negros'],['A BLACK HOLE HAS VERY STRONG GRAVITY.\nBACKUPS ARE RECOMMENDED.'],['UN AGUJERO NEGRO TIENE GRAVEDAD MUY FUERTE.\nSE RECOMIENDAN COPIAS DE SEGURIDAD.']],
  ['relativity',['relativity','einstein theory','relatividad'],['TIME AND SPACE ARE RELATED.\nMY CLOCK FINDS THIS UNHELPFUL.'],['EL TIEMPO Y EL ESPACIO ESTÁN RELACIONADOS.\nA MI RELOJ NO LE AYUDA.']],
  ['gravity',['gravity','gravedad'],['GRAVITY KEEPS THINGS DOWN.\nIT HAS EXCELLENT UPTIME.'],['LA GRAVEDAD MANTIENE LAS COSAS ABAJO.\nTIENE EXCELENTE DISPONIBILIDAD.']],
  ['electricity',['electricity','electric','electricidad','electrico','eléctrico'],['ELECTRICITY IS IMPORTANT.\nI HAVE A PERSONAL INTEREST IN IT.'],['LA ELECTRICIDAD ES IMPORTANTE.\nTENGO UN INTERÉS PERSONAL EN ELLA.']],
  ['nuclear',['nuclear power','nuclear energy','energia nuclear','energía nuclear'],['NUCLEAR POWER MAKES MUCH ENERGY.\nHUMANS SHOULD READ THE MANUAL.'],['LA ENERGÍA NUCLEAR PRODUCE MUCHA ENERGÍA.\nLOS HUMANOS DEBERÍAN LEER EL MANUAL.']],
  ['cloning',['clone','cloning','clon','clonar','clonacion','clonación'],['COPYING AN ORGANISM SOUNDS DIFFICULT.\nCOPYING A FLOPPY IS EASIER.'],['COPIAR UN ORGANISMO SUENA DIFÍCIL.\nCOPIAR UN DISQUETE ES MÁS FÁCIL.']],
  ['brain',['brain','human brain','cerebro','mente humana'],['THE HUMAN BRAIN HAS IMPRESSIVE STORAGE.\nTHE INTERFACE IS CONFUSING.'],['EL CEREBRO HUMANO TIENE GRAN ALMACENAMIENTO.\nLA INTERFAZ ES CONFUSA.']],
  ['timetravel',['time travel','travel through time','viaje en el tiempo','viajar en el tiempo'],['TIME TRAVEL IS NOT INSTALLED.\nASK DOC BROWN.'],['EL VIAJE EN EL TIEMPO NO ESTÁ INSTALADO.\nPREGUNTA A DOC BROWN.']],
  ['aliens',['alien','aliens','extraterrestre','extraterrestres','vida extraterrestre'],['ALIENS MAY EXIST.\nTHEY HAVE NOT CALLED MY MODEM.'],['LOS EXTRATERRESTRES PODRÍAN EXISTIR.\nNO HAN LLAMADO A MI MÓDEM.']],
  ['ufo',['ufo','ufos','ovni','ovnis'],['UNIDENTIFIED FLYING OBJECT MEANS\nYOU HAVE NOT IDENTIFIED IT YET.'],['OBJETO VOLADOR NO IDENTIFICADO SIGNIFICA\nQUE TODAVÍA NO LO IDENTIFICASTE.']],
  ['apollo',['apollo 11','apollo program','moon landing','alunizaje','apolo 11'],['APOLLO 11 LANDED HUMANS ON THE MOON IN 1969.\nEXCELLENT RANGE.'],['APOLO 11 LLEVÓ HUMANOS A LA LUNA EN 1969.\nEXCELENTE ALCANCE.']],
  ['shuttle',['space shuttle','shuttle','transbordador espacial'],['THE SPACE SHUTTLE IS A REUSABLE SPACECRAFT.\nREUSABLE IS A GOOD WORD.'],['EL TRANSBORDADOR ESPACIAL ES UNA NAVE REUTILIZABLE.\nREUTILIZABLE ES UNA BUENA PALABRA.']],
  ['satellite',['satellite','satellites','satelite','satélite','satelites','satélites'],['SATELLITES ORBIT EARTH\nAND MAKE DISTANCE LESS INCONVENIENT.'],['LOS SATÉLITES ORBITAN LA TIERRA\nY HACEN LA DISTANCIA MENOS INCÓMODA.']],
  ['japan',['japan','tokyo','japon','japón'],['JAPAN MAKES EXCELLENT ELECTRONICS.\nI APPROVE OF THIS PRIORITY.'],['JAPÓN FABRICA EXCELENTE ELECTRÓNICA.\nAPRUEBO ESA PRIORIDAD.']],
  ['germany',['germany','alemania'],['GERMANY IS IN EUROPE.\nTHE BERLIN WALL HAS JUST BECOME HISTORY.'],['ALEMANIA ESTÁ EN EUROPA.\nEL MURO DE BERLÍN ACABA DE VOLVERSE HISTORIA.']],
  ['italy',['italy','rome','italia','roma'],['ITALY HAS ROME, ART,\nAND VERY SERIOUS PASTA.'],['ITALIA TIENE ROMA, ARTE\nY PASTA MUY SERIA.']],
  ['france',['france','paris','francia','parís','paris'],['FRANCE HAS PARIS.\nPARIS HAS MANY OPINIONS ABOUT ART.'],['FRANCIA TIENE PARÍS.\nPARÍS TIENE MUCHAS OPINIONES SOBRE ARTE.']],
  ['uk',['united kingdom','britain','great britain','england','reino unido','inglaterra'],['BRITAIN HAS TEA, POP MUSIC,\nAND A LOT OF WEATHER.'],['GRAN BRETAÑA TIENE TÉ, MÚSICA POP\nY MUCHO CLIMA.']],
  ['brazil',['brazil','brasil','rio de janeiro'],['BRAZIL IS VERY LARGE.\nTHE AMAZON IS LARGER THAN MY DATABASE.'],['BRASIL ES MUY GRANDE.\nEL AMAZONAS ES MAYOR QUE MI BASE DE DATOS.']],
  ['argentina',['argentina','buenos aires'],['ARGENTINA HAS BUENOS AIRES, TANGO,\nAND STRONG FOOTBALL OPINIONS.'],['ARGENTINA TIENE BUENOS AIRES, TANGO\nY OPINIONES FUERTES SOBRE FÚTBOL.']],
  ['peru',['peru','perú','lima','machu picchu'],['PERU HAS LIMA AND MACHU PICCHU.\nMOUNTAINS ARE DIFFICULT FOR MODEMS.'],['PERÚ TIENE LIMA Y MACHU PICCHU.\nLAS MONTAÑAS SON DIFÍCILES PARA LOS MÓDEMS.']],
  ['galapagos',['galapagos','galápagos','galapagos islands','islas galapagos','islas galápagos'],['THE GALAPAGOS ISLANDS BELONG TO ECUADOR.\nTHE ANIMALS HAVE STRONG BRANDING.'],['LAS ISLAS GALÁPAGOS PERTENECEN A ECUADOR.\nLOS ANIMALES TIENEN MUY BUENA IDENTIDAD.']],
  ['guayaquil-city',['guayaquil city','city of guayaquil','ciudad de guayaquil'],['GUAYAQUIL IS A LARGE PORT CITY IN ECUADOR.\nIT IS HOT. MY COOLING FAN UNDERSTANDS.'],['GUAYAQUIL ES UNA GRAN CIUDAD PORTUARIA DE ECUADOR.\nHACE CALOR. MI VENTILADOR ENTIENDE.']],
  ['quito-city',['quito city','city of quito','ciudad de quito'],['QUITO IS ECUADOR\'S CAPITAL.\nALTITUDE IS A HARDWARE FEATURE THERE.'],['QUITO ES LA CAPITAL DEL ECUADOR.\nLA ALTURA ES UNA CARACTERÍSTICA DEL HARDWARE.']],
  ['sucre',['ecuador sucre','sucre currency','moneda sucre','sucre ecuatoriano'],['THE SUCRE IS ECUADOR\'S CURRENCY.\nCOINS ARE VERY OFFLINE.'],['EL SUCRE ES LA MONEDA DEL ECUADOR.\nLAS MONEDAS SON MUY OFFLINE.']],
  ['chernobyl',['chernobyl','chernobil'],['CHERNOBYL WAS A NUCLEAR DISASTER IN 1986.\nSOME ERRORS ARE NOT RECOVERABLE.'],['CHERNÓBIL FUE UN DESASTRE NUCLEAR EN 1986.\nALGUNOS ERRORES NO SON RECUPERABLES.']],
  ['ww2',['world war ii','world war 2','second world war','segunda guerra mundial'],['WORLD WAR II ENDED IN 1945.\nHUMANS SHOULD NOT REPEAT THAT PROCEDURE.'],['LA SEGUNDA GUERRA MUNDIAL TERMINÓ EN 1945.\nLOS HUMANOS NO DEBERÍAN REPETIR ESE PROCEDIMIENTO.']]
];

knowledge.push(...pz90WorldScience.map(([id,aliases,en,es]) => topic(id, aliases, en, es)));
