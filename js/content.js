import { CHARACTER_CATALOG } from './config.js';

/** Contenido pendiente de publicación oficial por el Staff. */
export const CONTENT_PENDING =
  'El contenido oficial de esta sección será publicado por el Staff de Maledicta.';

export const WELCOME = {
  tagline: 'Constelación de lo prohibido',
  title: 'MALEDICTA',
  intro:
    'Maledicta es un mundo de fantasía. Esta puerta oficial te permite forjar la identidad de tu personaje antes de cruzar al servidor: cada decisión deja una huella sobre el destino que le espera a esa alma.',
  processSummary:
    'El registro consta de varios pasos: datos del personaje, apariencia, etnia, imagen, lectura del lore, normativas y confirmación. Al finalizar, obtendrás una ficha para validar en Discord.',
  discordNote:
    'La web prepara tu ficha. La validación final siempre ocurre mediante ticket en el Discord de Maledicta.'
};

export const LORE_SECTIONS = [
  {
    id: 'humanos',
    title: '¿Por qué todos los jugadores son humanos?',
    summary: 'Resumen del lore oficial',
    body: CONTENT_PENDING
  },
  {
    id: 'llegada',
    title: 'Llegada de los humanos a Maledicta',
    summary: 'Origen y arribo al mundo',
    body: CONTENT_PENDING
  },
  {
    id: 'pacto',
    title: 'El Pacto de las Seis Esencias',
    summary: 'El acuerdo que define el destino de quienes pisan estas tierras',
    body: CONTENT_PENDING
  },
  {
    id: 'razas-fantasticas',
    title: 'Relación con las razas fantásticas',
    summary: 'Humanos y criaturas del mundo de Maledicta',
    body: 'El detalle narrativo de esa relación aún no está publicado por el Staff. En la actualidad, los personajes jugadores pertenecen únicamente a la raza humana:',
    related: CHARACTER_CATALOG.archetypes
  }
];

export const NORMATIVE_CATEGORIES = [
  {
    id: 'convivencia',
    title: 'Normas de convivencia',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  {
    id: 'roleplay',
    title: 'Reglas de Roleplay',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  {
    id: 'fairplay',
    title: 'Fair Play',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  {
    id: 'pvp-pve',
    title: 'PVP / PVE',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  {
    id: 'construccion',
    title: 'Construcción',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  {
    id: 'sanciones',
    title: 'Sanciones',
    items: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  }
];

export const FANDOM = {
  razas: {
    title: 'Razas',
    description: 'La raza disponible para los personajes jugadores de Maledicta.',
    entries: CHARACTER_CATALOG.archetypes
  },
  clases: {
    title: 'Clases',
    description: 'Disciplinas de combate, magia y devoción presentes en el universo.',
    entries: CHARACTER_CATALOG.classes
  },
  alineaciones: {
    title: 'Alineaciones',
    description: 'Filosofías y posturas morales dentro del mundo.',
    entries: CHARACTER_CATALOG.alignments
  },
  historia: {
    title: 'Historia canon',
    description: 'Cronología y acontecimientos fundamentales de Maledicta.',
    entries: [{
      title: 'Tomo I — El mundo antes de Maledicta',
      body: `Mucho antes de que existiera una bandera capaz de unir a los pueblos, el mundo conoció únicamente la guerra.

Las fronteras de los antiguos territorios estaban marcadas por cicatrices imposibles de borrar. Montañas partidas por terremotos y fuerzas elementales. Bosques consumidos por guerras mágicas. Ciudades reducidas a ruinas. Llanuras convertidas en cementerios donde los espíritus de los caídos permanecían atrapados durante generaciones.

Los pueblos del mundo eran numerosos y sus diferencias parecían imposibles de superar.

Los Celestiales afirmaban haber sido elegidos por fuerzas superiores para proteger y guiar la creación.

Los Elfos defendían que su conexión con la naturaleza, la memoria y los conocimientos ancestrales los convertía en los legítimos guardianes del mundo.

Los Dracónidos sostenían que la sangre de los dragones primordiales corría por sus venas y que su linaje los convertía en herederos de un poder mucho más antiguo que cualquier reino.

Los Enanos habían construido sus civilizaciones bajo las montañas y consideraban que ningún pueblo comprendía mejor que ellos el valor de la resistencia, la construcción y el trabajo de la forja.

Los Cambiapieles, conocidos también como Yokai, mantenían una relación diferente con la naturaleza. Sus cuerpos y espíritus podían adoptar formas sobrenaturales, y muchos pueblos los consideraban impredecibles.

Los Semi-Gigantes dominaban regiones donde pocos podían sobrevivir. Su enorme fuerza y resistencia los convirtió en guerreros temidos y guardianes de territorios remotos.

Los Elementales eran distintos a cualquier otro pueblo. Sus cuerpos y almas estaban vinculados a fuerzas primordiales de la naturaleza. Fuego, agua, tierra, aire y otras manifestaciones elementales formaban parte de su existencia.

Los Serpentinos habitaban regiones hostiles donde la supervivencia exigía paciencia, adaptación y conocimiento del entorno. Sus sentidos y su relación con los venenos los convirtieron en excelentes cazadores y exploradores.

Los Cirrus eran conocidos por una característica que ninguna otra raza compartía: cada individuo poseía dos almas. Dos voluntades coexistiendo dentro de un mismo cuerpo. Para algunos eran una bendición. Para otros, una maldición.

Y lejos de las grandes civilizaciones existían otros pueblos que habían sido apartados de la historia.

Los Dhampiros, descendientes de antiguos linajes vampíricos, sobrevivían ocultos entre las sombras. Su sangre les concedía capacidades que ningún humano común poseía, pero también los condenaba a convivir con un hambre que nunca desaparecía por completo.

Los Licántropos, marcados por una antigua maldición, vivían entre la civilización y la bestia. Algunos aprendieron a dominar su transformación. Otros terminaron completamente consumidos por ella.

Finalmente estaban los Humanos.

Durante mucho tiempo fueron considerados el pueblo más débil.

No poseían la fuerza de los Semi-Gigantes.

No tenían la resistencia natural de los Enanos.

No podían manipular las fuerzas elementales como los Elementales.

No poseían sangre dracónica.

No compartían la percepción ancestral de los Elfos.

No tenían la naturaleza sobrenatural de los Cambiapieles.

No poseían la conexión superior de los Celestiales.

No tenían los sentidos de los Serpentinos.

No compartían la dualidad espiritual de los Cirrus.

Y tampoco poseían las capacidades sobrenaturales de los Dhampiros o Licántropos.

Pero los Humanos tenían algo que las demás razas habían comenzado a olvidar.

Podían adaptarse.

Aprender.

Observar.

Cambiar.

Mientras las demás razas desarrollaban sus dones naturales durante generaciones, los Humanos aprendían de todos ellos.

Estudiaban la metalurgia de los Enanos.

Aprendían las artes de los Elfos.

Observaban las técnicas de los Dracónidos.

Investigaban los secretos de los Elementales.

Estudiaban las transformaciones de los Cambiapieles.

Aprendían de los Celestiales.

Intentaban comprender a los Cirrus.

Incluso investigaban las maldiciones de los Licántropos y la sangre de los Dhampiros.

Aquello que parecía una debilidad terminaría convirtiéndose en la característica que cambiaría la historia del mundo.

Pero antes de que los Humanos descubrieran su verdadero potencial, todas las razas estaban demasiado ocupadas enfrentándose entre sí.

Durante siglos, las guerras se sucedieron una tras otra.

Algunas duraban años.

Otras generaciones enteras.

Las ciudades crecían únicamente para ser destruidas.

Los héroes se convertían en leyendas.

Las leyendas terminaban convertidas en cenizas.

Poco a poco, el odio se convirtió en una herencia.

Los hijos aprendían los nombres de sus enemigos antes incluso de conocer los nombres de sus propios vecinos.

Cada pueblo estaba convencido de que su forma de vivir era la correcta.

Ninguno estaba dispuesto a ceder.

Ninguno aceptaba compartir.

      Y ninguno imaginaba que la verdadera amenaza todavía no había aparecido.`
    }, {
      title: 'Tomo II — Los presagios del Vacío',
      body: `Mientras las distintas razas continuaban enfrentándose por territorios, recursos y antiguos rencores, algo comenzó a despertar más allá de los límites conocidos de la realidad.

En las profundidades del Vacío, allí donde ninguna luz podía alcanzar y donde incluso las fuerzas elementales parecían perder su significado, una presencia comenzó a observar.

Antigua.

Silenciosa.

Hambrienta.

Al principio nadie comprendió lo que estaba ocurriendo.

Los primeros en percibirlo fueron los Elfos.

Sus sabios comenzaron a registrar anomalías en los ciclos naturales. Árboles que enfermaban sin causa. Animales que abandonaban territorios donde habían vivido durante siglos. Lugares donde la magia parecía desaparecer lentamente.

Los Cambiapieles y Yokai fueron los siguientes.

Sus espíritus animales comenzaron a reaccionar ante algo que no podían ver. Algunas criaturas huían de determinados lugares sin explicación. Otras permanecían inmóviles, mirando hacia zonas aparentemente vacías.

Los Celestiales también comenzaron a recibir señales.

Las estrellas parecían apagarse durante breves instantes.

Algunas constelaciones desaparecían de los cielos para regresar horas después.

Sus sacerdotes y videntes comenzaron a hablar de una oscuridad que no pertenecía ni al mundo mortal ni a ninguna fuerza celestial conocida.

Los Dracónidos sintieron algo diferente.

La sangre ancestral que corría por sus venas reaccionaba ante una presencia desconocida.

Los dragones más antiguos dejaron de dormir tranquilamente.

Algunos abandonaron sus guaridas.

Otros comenzaron a vigilar el cielo durante noches enteras.

Los Elementales fueron quizás los que recibieron la advertencia más clara.

Las fuerzas primordiales comenzaron a comportarse de manera irregular.

El fuego ardía sin combustible.

Los ríos cambiaban de dirección.

La tierra temblaba sin que existieran terremotos.

El viento soplaba desde lugares donde no había ninguna corriente atmosférica.

Era como si los propios elementos estuvieran intentando escapar de algo.

Los Enanos descubrieron señales bajo las montañas.

En túneles donde jamás había existido actividad sísmica comenzaron a aparecer grietas.

Algunas conducían hacia profundidades que no figuraban en ningún mapa.

Los exploradores que descendían por ellas regresaban hablando de sonidos provenientes de lugares donde no debería existir vida.

Los Serpentinos percibieron las anomalías incluso antes de comprenderlas.

Sus sentidos detectaban vibraciones bajo la tierra.

No eran pasos.

No eran movimientos de criaturas.

Era algo mucho más grande.

Algo que parecía moverse lentamente debajo del mundo.

Los Semi-Gigantes comenzaron a encontrar animales muertos en territorios donde no existían depredadores capaces de cazarlos.

No tenían heridas visibles.

Simplemente estaban vacíos.

Como si algo hubiese tomado aquello que los mantenía vivos.

Los Cirrus comenzaron a experimentar el fenómeno de una forma completamente distinta.

Sus dos almas podían percibir cosas que una sola mente jamás habría detectado.

En algunos individuos, ambas almas comenzaron a escuchar el mismo susurro.

Una voz sin palabras.

Una presencia sin rostro.

Algunos afirmaban que la voz provenía del futuro.

Otros aseguraban que venía de debajo de la tierra.

Y algunos sostenían que provenía de un lugar situado fuera del mundo.

Los Dhampiros también descubrieron que algo estaba cambiando.

La sangre que consumían comenzó a perder parte de su fuerza.

Algunas criaturas que normalmente podían alimentar su naturaleza vampírica apenas les proporcionaban energía.

Los antiguos linajes vampíricos comenzaron a sospechar que la esencia vital del mundo estaba desapareciendo.

Los Licántropos recibieron una advertencia todavía más brutal.

Las bestias que habitaban dentro de ellos comenzaron a comportarse de manera extraña.

Durante las noches más oscuras, algunos licántropos podían sentir una presencia observándolos desde más allá de los bosques.

La bestia interior reconocía aquel olor.

Pero no sabía nombrarlo.

No era presa.

No era depredador.

Era algo completamente diferente.

Los primeros en comprender que todos aquellos acontecimientos estaban relacionados fueron los antiguos sabios de distintas razas.

Durante años compararon sus descubrimientos.

Las conclusiones fueron aterradoras.

El mundo estaba enfermando.

Las cosechas comenzaron a marchitarse sin explicación.

Los espíritus dejaron de responder a determinadas plegarias.

Las corrientes mágicas se volvieron inestables.

Los portales comenzaron a colapsar.

Los elementos perdieron equilibrio.

La vida animal comenzó a comportarse de manera antinatural.

Y entonces aparecieron las visiones.

Los sabios élficos vieron un océano de oscuridad devorando el cielo.

Los Celestiales contemplaron estrellas extinguiéndose una tras otra.

Los Dracónidos vieron montañas cubiertas por una sombra que ninguna llama podía destruir.

Los Elementales percibieron sus propios elementos siendo consumidos.

Los Cambiapieles vieron espíritus animales huyendo de algo que no podía ser visto.

Los Cirrus escucharon la misma advertencia a través de sus dos almas.

Los Enanos soñaron con sus montañas abiertas desde el interior.

Los Serpentinos sintieron algo desplazándose bajo la tierra.

Los Semi-Gigantes vieron ejércitos enteros caer sin que ningún enemigo estuviera presente.

Los Dhampiros contemplaron océanos de sangre completamente secos.

Los Licántropos escucharon a sus propias bestias aullar de miedo.

Y todos tuvieron la misma visión.

Las distintas razas, que durante siglos se habían considerado enemigas, aparecían juntas bajo una misma sombra.

No como conquistadores.

No como vencedores.

Sino como supervivientes.

Muchos ignoraron aquellas advertencias.

Otros las utilizaron para alimentar el miedo y justificar nuevas guerras.

Algunos líderes incluso acusaron a las demás razas de haber provocado el fenómeno.

Pero los presagios continuaron.

Hasta que ocurrió el acontecimiento que cambiaría la historia para siempre.

Una grieta apareció en el cielo.

No sobre un reino.

No sobre una ciudad.

Sino en el corazón mismo del continente.

Durante siete días y siete noches, una tormenta de energía desconocida cubrió los cielos.

Rayos de luz negra descendieron sobre la tierra.

Las sombras comenzaron a moverse sin necesidad de cuerpos.

Y de las grietas de la realidad comenzaron a surgir criaturas imposibles.

Seres sin alma.

Sin nombre.

Sin compasión.

Los sobrevivientes encontrarían un nombre para ellos.

Los Vacíos.

Y por primera vez en la historia, todas las razas comprendieron una verdad aterradora.

Si continuaban luchando entre ellas, no quedaría nadie para reclamar la victoria.

      Porque el mundo entero estaba a punto de desaparecer.`
    }, {
      title: 'Tomo III — El cataclismo de las almas',
      body: `La aparición de Los Vacíos no fue el verdadero comienzo de la destrucción.

Fue solamente la primera señal visible de un problema mucho más antiguo.

Mientras los ejércitos de las distintas razas luchaban contra aquellas criaturas, los sabios comenzaron a descubrir algo todavía más aterrador.

Los cuerpos podían morir.

Las ciudades podían ser destruidas.

Los territorios podían desaparecer.

Pero aquello que realmente estaba siendo destruido era mucho más profundo.

Las almas.

Los primeros síntomas aparecieron entre los muertos.

Algunas almas dejaron de regresar al ciclo natural.

Otras desaparecieron inmediatamente después de la muerte.

En algunos lugares, los cadáveres permanecían intactos durante días, pero nadie podía sentir la presencia espiritual que normalmente acompañaba a los fallecidos.

Los Elfos fueron los primeros en llamar al fenómeno La Marchitez.

Los Celestiales lo llamaron La Ruptura.

Los Elementales comenzaron a referirse a él como El Desequilibrio.

Los Dracónidos lo llamaron El Agotamiento.

Los Enanos simplemente lo describieron como La Muerte del Mundo.

Los Cambiapieles y Yokai aseguraban que los espíritus estaban abandonando la tierra.

Los Cirrus afirmaban que podían sentir cómo las almas estaban siendo arrancadas del ciclo.

Los Serpentinos detectaban una ausencia bajo la tierra que cada día parecía extenderse más.

Los Semi-Gigantes observaban cómo criaturas enteras desaparecían sin dejar rastro espiritual.

Incluso los Dhampiros comenzaron a sufrir las consecuencias.

La sangre ya no contenía la misma energía vital.

Alimentarse dejó de ser suficiente.

Y los Licántropos descubrieron que su propia maldición comenzaba a debilitarse en determinadas regiones.

Por primera vez, todas las razas estaban experimentando el mismo problema.

Pero todavía no comprendían su origen.

Los grandes oráculos comenzaron entonces una investigación conjunta.

Durante generaciones, las seis grandes corrientes espirituales habían sostenido el equilibrio del mundo.

La energía celestial.

La esencia feérica y natural.

La sangre dracónica.

La fuerza de la tierra y la forja.

Los espíritus y las transformaciones sobrenaturales.

Y las fuerzas primordiales que habitaban dentro de los Elementales.

Con el paso de los siglos, aquellas energías habían sido utilizadas cada vez con mayor intensidad.

La magia había crecido.

Las civilizaciones habían prosperado.

Las guerras se habían vuelto más poderosas.

Los rituales habían aumentado.

Los portales habían sido abiertos.

Las transformaciones habían sido perfeccionadas.

Los grandes hechizos habían comenzado a consumir cantidades de energía espiritual que generaciones anteriores jamás habrían imaginado posibles.

El mundo había estado utilizando sus propias almas para alimentar su progreso.

Y ahora estaba pagando el precio.

Los sabios descubrieron que cada generación nacía con una cantidad ligeramente menor de energía espiritual.

Al principio la diferencia era insignificante.

Después comenzó a acumularse.

Finalmente se convirtió en una crisis.

Los nacimientos disminuyeron.

Los niños nacían con vínculos espirituales más débiles.

Las criaturas mágicas comenzaron a desaparecer.

Los espíritus naturales dejaron de responder.

Las almas de los muertos comenzaron a perderse.

Y cuanto más intentaban las razas utilizar su poder para combatir la crisis, más rápido empeoraba.

Era un círculo imposible de romper.

Utilizaban magia para salvar el mundo.

La magia consumía la esencia del mundo.

Y esa pérdida debilitaba todavía más el mundo.

Entonces los oráculos descubrieron algo que cambiaría para siempre la percepción de los Humanos.

Los Humanos no sufrían el mismo problema.

Sus almas eran diferentes.

No porque fueran más poderosas.

No porque fueran superiores.

Sino porque eran adaptables.

Mientras las demás razas poseían una conexión espiritual definida, la esencia humana permanecía abierta.

Un alma humana podía aprender.

Podía resonar.

Podía establecer vínculos diferentes.

Podía absorber conocimientos y experiencias de otras culturas sin perder completamente su identidad.

Los sabios comenzaron a estudiar aquella anomalía.

Y encontraron algo todavía más antiguo.

Los Humanos no eran una creación independiente.

Miles de años atrás, antes de que las grandes razas existieran como eran conocidas, había existido una humanidad primordial.

Con el paso de las eras, distintas corrientes espirituales habían alterado a grupos de aquella humanidad.

Algunas desarrollaron una conexión celestial.

Otras desarrollaron sangre dracónica.

Algunas establecieron vínculos profundos con la naturaleza.

Otras desarrollaron capacidades elementales.

Algunas despertaron espíritus sobrenaturales.

Y otras evolucionaron hacia cuerpos capaces de soportar condiciones extremas.

Con el paso de los milenios, aquellas diferencias se hicieron tan grandes que los pueblos olvidaron su origen común.

Los Humanos, sin embargo, conservaron algo que las demás razas habían perdido.

La capacidad de resonar con diferentes esencias.

Aquello que durante siglos había sido considerado una debilidad comenzó a parecer una posible solución.

Pero existía un problema.

La humanidad no podía simplemente transformarse en otra raza.

La esencia de cada individuo debía ser preparada.

Estudiada.

Vinculada.

Y finalmente integrada con una nueva corriente espiritual.

La teoría era peligrosa.

Pero también era la primera esperanza que las razas habían encontrado en generaciones.

Si las almas humanas podían establecer vínculos con las distintas esencias sin destruirse en el proceso, quizás podían ayudar a restaurar el equilibrio.

Quizás podían convertirse en un puente entre los pueblos.

Quizás podían ayudar a reparar aquello que las antiguas guerras habían destruido.

Fue entonces cuando apareció una mujer que cambiaría para siempre la historia del continente.

Su nombre era Borghild.

Y todavía no era una reina.

Ni una guerrera.

Ni una noble.

Era simplemente una humana que había comprendido algo que los grandes gobernantes se habían negado a aceptar.

Las razas no sobrevivirían separadas.

Tendrían que aprender a compartir el mundo.

Y para lograrlo, necesitarían algo que nunca habían intentado antes.

      Un pacto.`
    }, {
      title: 'Tomo IV — El surgimiento de Borghild',
      body: `Borghild nació lejos de los grandes palacios y de las antiguas capitales.

Era humana.

Hija de una pequeña comunidad costera, creció en un lugar donde las diferencias entre razas no eran una cuestión de tratados ni de discursos políticos.

Eran parte de la vida cotidiana.

En los puertos podía encontrarse a un Enano comerciando metales, a un Elfo intercambiando conocimientos, a un Serpentino vendiendo productos provenientes de tierras lejanas o a un Cambiapieles ocultando cuidadosamente sus rasgos sobrenaturales.

Borghild creció observando a todos ellos.

Desde joven demostró una característica poco común.

Escuchaba.

Mientras otros discutían para demostrar que tenían razón, ella intentaba comprender por qué pensaban de aquella manera.

Mientras los gobernantes hablaban de fronteras, ella hablaba con las personas que vivían dentro de ellas.

Mientras los sacerdotes discutían sobre las distintas fuerzas espirituales, ella preguntaba qué ocurría con aquellos que no pertenecían a ninguna de ellas.

Con el tiempo comenzó a viajar.

Recorrió territorios élficos.

Descendió a ciudades construidas por los Enanos.

Visitó fortalezas dracónidas.

Estudió las comunidades de los Elementales.

Conoció las tradiciones de los Cambiapieles y Yokai.

Entró en territorios controlados por los Semi-Gigantes.

Aprendió las costumbres de los Serpentinos.

Conversó con miembros de comunidades Cirrus y descubrió cómo dos almas podían compartir una misma existencia.

También conoció las historias que nadie quería contar sobre los Dhampiros y los Licántropos.

Durante sus viajes comprendió algo que los grandes gobernantes no habían conseguido ver.

Todas las razas tenían miedo.

Los Enanos temían perder sus montañas.

Los Elfos temían que el conocimiento desapareciera.

Los Dracónidos temían que su linaje ancestral llegara a su fin.

Los Elementales temían que las fuerzas primordiales se extinguieran.

Los Cambiapieles temían perder su conexión con los espíritus.

Los Celestiales temían que las fuerzas superiores abandonaran el mundo.

Los Semi-Gigantes temían que sus territorios fueran destruidos.

Los Serpentinos temían quedar atrapados en un mundo incapaz de sostener la vida.

Los Cirrus temían que sus dos almas terminaran separándose.

Los Dhampiros temían que su sangre dejara de sostenerlos.

Los Licántropos temían que la maldición terminara consumiendo lo poco que quedaba de su humanidad.

Y los Humanos temían prácticamente todo.

Porque eran quienes menos protección natural poseían.

Pero Borghild descubrió que aquel miedo también podía convertirse en algo diferente.

Podía convertirse en voluntad.

Durante años estudió los antiguos registros encontrados por los sabios.

Comparó las tradiciones de cada pueblo.

Analizó las distintas formas en que cada raza utilizaba su energía espiritual.

Y finalmente llegó a una conclusión.

Los Humanos no necesitaban convertirse en otra raza.

Necesitaban aprender a establecer vínculos con las esencias que habían dado forma al mundo.

Su alma podía funcionar como un puente.

Un humano podía resonar con una esencia celestial.

Podía despertar una conexión dracónica.

Podía vincularse con las fuerzas elementales.

Podía desarrollar una relación profunda con la naturaleza.

Podía despertar una herencia espiritual relacionada con los Cambiapieles.

Podía incluso establecer vínculos con otras corrientes que habían permanecido ocultas durante siglos.

Pero aquello debía hacerse de manera voluntaria.

Borghild rechazó desde el principio cualquier propuesta que implicara esclavizar a los Humanos o utilizar sus almas como simples recursos.

La solución no podía convertirse en otra forma de guerra.

Tenía que ser un pacto.

Un acuerdo entre pueblos.

Un sistema donde cada persona pudiera decidir qué camino seguir.

Por ello comenzó a reunir información.

Estudió antiguas ceremonias.

Consultó a sacerdotes.

Habló con sabios.

Visitó templos.

Entró en bibliotecas prohibidas.

Incluso buscó respuestas en lugares donde ninguna persona sensata habría entrado.

Durante esos años descubrió algo todavía más inquietante.

La Marchitez no podía detenerse destruyendo a Los Vacíos.

Los Vacíos eran una consecuencia.

El problema era mucho más profundo.

El equilibrio espiritual del mundo estaba roto.

Y si las razas continuaban consumiendo las mismas energías de la misma manera, eventualmente no quedaría nada que proteger.

Borghild comprendió entonces que no bastaba con detener la guerra.

Había que cambiar la relación entre las razas y las almas.

Necesitaban un lugar donde las diferentes esencias pudieran coexistir.

Un territorio neutral.

Un reino que no perteneciera a ninguna raza.

Un lugar donde los Humanos pudieran establecer vínculos con las distintas corrientes espirituales sin convertirse en propiedad de ninguna de ellas.

Ese reino todavía no existía.

Pero Borghild ya tenía un nombre para él.

Maledicta.

Y para fundarlo necesitaría convencer a aquellos que durante siglos habían considerado imposible cualquier forma de unidad.

Los líderes de las grandes razas.

Los guardianes de las antiguas esencias.

Y aquellos pueblos que habían sido expulsados de la historia.

Borghild tendría que conseguir que todos aceptaran algo que parecía contrario a todo lo que habían aprendido desde su nacimiento.

Que el futuro del mundo no podía pertenecer a una sola raza.

      Tenía que pertenecer a todas.`
    }, {
      title: 'Tomo V — La verdad del alma humana',
      body: `Los descubrimientos de Borghild comenzaron con una pregunta sencilla.

¿Por qué los Humanos podían aprender de todas las demás razas?

Al principio, los sabios pensaron que se trataba simplemente de una característica cultural.

Los Humanos viajaban más.

Comerciaban con distintos pueblos.

Aprendían diferentes idiomas.

Adoptaban técnicas extranjeras.

Pero Borghild descubrió que aquello no explicaba completamente el fenómeno.

Existía algo dentro del alma humana.

Algo mucho más antiguo.

Durante años, Borghild estudió los registros anteriores a las primeras grandes civilizaciones. Muchos habían sido destruidos durante las guerras, pero algunos sobrevivieron ocultos en templos, fortalezas, bibliotecas subterráneas y santuarios olvidados.

Los registros hablaban de una época en la que las razas actuales todavía no existían.

Existía un único pueblo humano.

Una humanidad primordial.

Aquellos humanos poseían una conexión espiritual mucho más abierta que la de las generaciones posteriores.

Con el paso de los milenios, diferentes fuerzas comenzaron a influir sobre ellos.

La energía celestial transformó a algunos.

Las fuerzas elementales alteraron a otros.

La sangre dracónica despertó en determinados linajes.

La conexión con la naturaleza cambió a otros grupos.

Los espíritus sobrenaturales comenzaron a vincularse con determinados individuos.

Las condiciones extremas de ciertas regiones transformaron a otros pueblos.

Con el tiempo, aquellas diferencias se hicieron hereditarias.

Las comunidades comenzaron a separarse.

Los cuerpos cambiaron.

Las culturas evolucionaron.

Las capacidades espirituales se hicieron más especializadas.

Y finalmente surgieron las distintas razas.

Los Celestiales.

Los Elfos.

Los Dracónidos.

Los Elementales.

Los Cambiapieles y Yokai.

Los Enanos.

Los Semi-Gigantes.

Los Serpentinos.

Los Cirrus.

Y muchas otras ramas que con el tiempo desarrollarían sus propias identidades.

Incluso los linajes malditos de los Dhampiros y los Licántropos podían rastrear sus orígenes hasta aquella humanidad ancestral, aunque sus transformaciones hubieran seguido caminos completamente diferentes.

La historia había convertido aquellas ramas en pueblos separados.

Pero en su origen existía una misma raíz.

Los Humanos.

Borghild comprendió entonces la verdadera naturaleza de su pueblo.

La humanidad no era una raza incompleta.

Era una raza adaptable.

Su alma no estaba completamente vinculada a una única esencia.

Permanecía abierta.

Eso explicaba por qué los Humanos podían aprender de otras culturas con tanta facilidad.

Pero también explicaba algo mucho más importante.

Un alma humana podía establecer una conexión espiritual con otras esencias sin abandonar completamente su naturaleza original.

No significaba que cualquier humano pudiera convertirse inmediatamente en otra raza.

La transformación requería tiempo.

Disciplina.

Preparación.

Y, sobre todo, voluntad.

La esencia humana debía entrar primero en contacto con una nueva corriente espiritual.

Después debía comenzar una lenta integración.

Si el proceso se realizaba incorrectamente, el alma podía sufrir daños irreversibles.

Por eso Borghild comprendió que la transformación debía desarrollarse mediante etapas.

La primera sería la Resonancia.

El alma humana entraría en contacto con una esencia.

Todavía no existiría una transformación física significativa.

El individuo seguiría siendo completamente humano.

Pero comenzaría a sentir cambios.

Sueños extraños.

Nuevos instintos.

Atracción hacia determinados lugares.

Cambios en la percepción.

Sensaciones que no podía explicar.

La segunda etapa sería la Vinculación.

La esencia elegida comenzaría a fusionarse lentamente con el alma.

Los primeros cambios físicos o mágicos podrían aparecer.

Un individuo vinculado con la esencia dracónica podría desarrollar pequeñas escamas.

Alguien conectado con una esencia celestial podría comenzar a percibir señales provenientes del cielo.

Un futuro Cambiapieles podría comenzar a sentir la presencia de su espíritu animal.

Un individuo conectado con una esencia elemental podría manifestar pequeñas alteraciones relacionadas con su elemento.

La tercera etapa sería el Despertar.

La nueva esencia alcanzaría suficiente estabilidad para modificar de manera evidente al individuo.

Su cuerpo, sus capacidades y su percepción comenzarían a reflejar la naturaleza elegida.

El individuo sería reconocido oficialmente como miembro de una Casa.

Pero todavía conservaría una parte importante de su identidad humana.

Finalmente llegaría la Ascensión.

La esencia ancestral alcanzaría su máximo desarrollo.

El individuo despertaría completamente aquello que había permanecido dormido dentro de su alma.

No dejaría de haber sido humano.

Había despertado una herencia que siempre había existido en la humanidad.

Esta revelación cambió completamente la propuesta de Borghild.

Maledicta ya no sería simplemente un refugio.

Sería un lugar donde los Humanos podrían descubrir cuál de las antiguas esencias respondía a su alma.

Pero existía una condición fundamental.

Nadie podía ser obligado.

La elección debía pertenecer al individuo.

Ninguna Casa tendría derecho a reclamar un alma humana.

Ningún gobernante podría decidir por otra persona.

Ninguna raza podría considerar a los Humanos como recursos.

La transformación tendría que comenzar con una decisión.

Una elección consciente.

Un pacto.

Y para proteger esa elección, Borghild necesitaría crear algo que todavía no existía.

      Las Casas de Maledicta.`
    }, {
      title: 'Tomo VI — El gran pacto de Maledicta',
      body: `Borghild sabía que descubrir la verdad no era suficiente.

El mundo no cambiaría simplemente porque una humana hubiera encontrado antiguos registros.

Necesitaba convencer a quienes habían pasado generaciones enteras luchando entre sí.

Por eso comenzó la tarea más peligrosa de su vida.

Reunir a los gobernantes de los distintos pueblos.

Su primer viaje la llevó hasta las ciudades de los Enanos.

Allí explicó que la crisis espiritual no podía solucionarse mediante la guerra.

Los Enanos escucharon.

Pero no confiaron.

Durante generaciones habían defendido sus montañas de invasores y enemigos.

No estaban dispuestos a entregar sus conocimientos a un reino que todavía no existía.

Borghild no les pidió que entregaran nada.

Les ofreció un lugar donde sus conocimientos pudieran sobrevivir.

Un territorio donde la forja, la construcción y la resistencia de los Enanos pudieran convertirse en parte de un nuevo futuro.

Después viajó hacia los territorios Élficos.

Los Elfos exigieron pruebas.

Borghild presentó los registros antiguos.

Mostró las anomalías de la naturaleza.

Y explicó que la Marchitez no respetaba fronteras.

Los bosques no podían protegerse si el mundo entero estaba muriendo.

Los sabios Élficos aceptaron continuar las conversaciones.

Los Dracónidos fueron mucho más difíciles de convencer.

Consideraban que su sangre provenía de los primeros guardianes del mundo.

No aceptaban fácilmente la idea de compartir sus conocimientos con otros pueblos.

Borghild les hizo una pregunta.

Si el mundo desaparecía, ¿de qué serviría conservar el linaje?

Los Dracónidos no respondieron.

Pero aceptaron escuchar.

Los Elementales tampoco confiaban en los Humanos.

Sus líderes temían que cualquier alianza pudiera utilizar sus fuerzas primordiales como armas.

Borghild estableció una condición.

Ninguna esencia podría ser utilizada sin consentimiento.

Ningún pueblo tendría derecho a controlar las fuerzas de otro.

Los Cambiapieles y Yokai exigieron todavía más.

No querían templos.

No querían fronteras.

Querían libertad.

Borghild aceptó.

El nuevo reino no obligaría a nadie a abandonar sus tradiciones.

Los Semi-Gigantes exigieron territorios donde sus comunidades pudieran vivir sin ser tratados como simples guerreros.

Los Serpentinos pidieron autonomía sobre sus regiones.

Los Cirrus exigieron reconocimiento de sus dos almas como parte de una misma identidad.

Cada pueblo presentó sus condiciones.

Cada uno defendía sus propios intereses.

Y Borghild comprendió que aquella era precisamente la razón por la que el pacto podía funcionar.

No necesitaban convertirse en iguales.

Necesitaban aceptar sus diferencias.

Pero todavía quedaban dos pueblos que prácticamente nadie quería mencionar.

Los Dhampiros.

Y los Licántropos.

Durante generaciones habían sido perseguidos por las demás razas.

Muchos gobernantes consideraban que sus maldiciones los convertían en una amenaza.

Borghild no aceptó aquella conclusión.

Los buscó.

Los encontró lejos de las grandes ciudades.

Y les ofreció algo que nadie les había ofrecido durante siglos.

Un lugar dentro del nuevo orden.

No como prisioneros.

No como monstruos.

No como herramientas.

Como pueblos.

Los Dhampiros aceptaron escuchar.

Los Licántropos también.

Pero ambos dejaron claro que no olvidarían el pasado.

Borghild tampoco les pidió que lo olvidaran.

Finalmente, representantes de los distintos pueblos se reunieron en un territorio neutral.

Allí se firmó el acuerdo que cambiaría la historia.

El Pacto de las Seis Esencias.

El nombre hacía referencia a las seis grandes corrientes espirituales que habían dado forma al mundo conocido.

Pero el pacto no pertenecía exclusivamente a seis pueblos.

Era un acuerdo destinado a proteger el equilibrio entre todas las razas.

El nuevo reino recibiría un nombre.

Maledicta.

Un territorio neutral.

Un lugar donde los Humanos podrían llegar voluntariamente para descubrir la esencia con la que su alma resonaba.

Los Humanos no serían esclavos.

No serían sacrificios.

No serían propiedad de ninguna Casa.

Serían participantes del pacto.

Cada individuo tendría derecho a permanecer humano.

Podría vivir en Maledicta sin elegir ninguna esencia.

Podría abandonar el reino.

Podría rechazar una Casa.

Podría cambiar su camino mientras el proceso espiritual todavía lo permitiera.

La transformación sería voluntaria.

Pero aquellos que decidieran comenzar el proceso tendrían que aceptar una condición.

Deberían entregar una parte de su alma al Pacto.

Ese acto recibiría el nombre de Ofrenda del Primer Vínculo.

La Ofrenda no destruiría el alma humana.

La conectaría con el sistema espiritual de Maledicta.

A partir de ese momento, la transformación comenzaría.

Las Casas serían las encargadas de guiar a los iniciados.

Cada una protegería una esencia.

Cada una desarrollaría sus propios métodos.

Y todas responderían ante la Corona.

Finalmente, los representantes de los pueblos reconocieron a Borghild como soberana.

No porque perteneciera a la raza más poderosa.

No porque tuviera el ejército más grande.

Sino porque había sido la única capaz de sentar a todos en la misma mesa.

Borghild fue coronada como la Primera Reina de Maledicta.

Y ante todos los presentes pronunció el principio que definiría el nuevo reino:

Ninguna raza gobernaría sobre las demás.

Ninguna esencia tendría derecho a reclamar un alma.

Y ningún humano sería obligado a convertirse en algo que no hubiera elegido ser.

El mundo acababa de conocer una nueva nación.

Pero nadie comprendía todavía el verdadero precio del pacto.

Porque la Marchitez no había desaparecido.

      Solo había sido contenida.`
    }, {
      title: 'Tomo VII — La ofrenda del Primer Vínculo y la transformación',
      body: `La creación de Maledicta estableció una nueva posibilidad para la humanidad.

Pero también creó un proceso que debía ser comprendido.

Un humano no podía convertirse en otra raza de un día para otro.

La transformación no era una enfermedad.

No era una maldición.

Tampoco era una simple alteración física.

Era una transformación espiritual.

Cada humano que llegaba a Maledicta conservaba su identidad.

Su cuerpo.

Sus recuerdos.

Sus emociones.

Su voluntad.

Pero dentro de su alma existían posibilidades que todavía no habían despertado.

Los Custodios del Pacto fueron creados para estudiar esas posibilidades.

Su primera tarea consistía en examinar al individuo.

No buscaban únicamente sus habilidades.

Observaban sus sueños.

Sus instintos.

Sus deseos.

Sus recuerdos.

Sus emociones dominantes.

La manera en que reaccionaba ante diferentes fuerzas.

La forma en que su alma respondía ante las distintas esencias.

Aquello permitía determinar qué camino podía resultar compatible con su naturaleza.

Pero la decisión final siempre pertenecía al humano.

Ningún Custodio podía elegir por él.

Ninguna Casa podía reclamarlo.

El individuo podía aceptar la afinidad que los Custodios habían descubierto.

Podía rechazarla.

O podía decidir permanecer completamente humano.

Aquellos que aceptaban comenzar la transformación realizaban la ceremonia conocida como la Ofrenda del Primer Vínculo.

Durante la ceremonia, el humano entregaba una pequeña parte de su esencia al Pacto.

No era una mutilación del alma.

No significaba perder recuerdos.

No significaba abandonar la humanidad.

Era la creación de un vínculo.

A partir de ese momento, la esencia elegida comenzaba a interactuar con el alma humana.

Y la transformación podía comenzar.

PRIMERA ETAPA — RESONANCIA

La primera etapa era conocida como Resonancia.

Durante este período, la transformación era prácticamente invisible.

El individuo continuaba siendo completamente humano.

Sin embargo, comenzaban a aparecer pequeñas señales.

Un humano vinculado a una esencia dracónica podía comenzar a sentir calor en el pecho.

Uno conectado con una esencia elemental podía percibir cambios en su elemento con mayor facilidad.

Un futuro Celestial podía experimentar sueños relacionados con estrellas o recibir sensaciones difíciles de explicar.

Un Cambiapieles podía comenzar a sentir la presencia de un espíritu animal.

Un Elfo podía experimentar una conexión más profunda con determinados lugares naturales.

Un Enano podía sentir una afinidad particular hacia las montañas y los metales.

Un Serpentino podía percibir vibraciones que antes ignoraba.

Cada individuo experimentaba la Resonancia de una manera diferente.

Algunos apenas notaban cambios.

Otros comenzaban a experimentar transformaciones desde los primeros días.

Durante esta etapa, todavía era posible abandonar el proceso sin completar la transformación.

SEGUNDA ETAPA — VINCULACIÓN

Si el individuo decidía continuar, comenzaba la segunda etapa.

La Vinculación.

La esencia elegida empezaba a fusionarse progresivamente con el alma humana.

Los cambios comenzaban a manifestarse físicamente.

Un futuro Dracónido podía desarrollar pequeñas escamas.

Un futuro Celestial podía manifestar una luminosidad sobrenatural.

Un Elemental podía alterar parcialmente su cuerpo según su afinidad.

Un Cambiapieles podía desarrollar rasgos relacionados con su espíritu animal.

Un Semi-Gigante podía comenzar a desarrollar mayor masa y resistencia.

Un Serpentino podía experimentar cambios en sus sentidos.

Un Cirrus podía comenzar a percibir con mayor claridad a su segunda alma.

Los cambios no eran idénticos para todos.

La esencia respondía a la personalidad del individuo.

Dos personas pertenecientes a una misma Casa podían experimentar transformaciones completamente diferentes.

Por eso los Custodios consideraban que la transformación era tanto espiritual como individual.

TERCERA ETAPA — DESPERTAR

La tercera etapa era conocida como Despertar.

En este momento, la esencia había alcanzado suficiente estabilidad dentro del alma.

La transformación física y espiritual se volvía evidente.

El individuo comenzaba a desarrollar capacidades propias de la esencia que había elegido.

Ya no era simplemente un humano conectado a una esencia.

Había comenzado a convertirse en algo nuevo.

Durante esta etapa, la persona era reconocida oficialmente por su Casa.

Recibía entrenamiento.

Aprendía a controlar sus nuevas capacidades.

Y comenzaba a comprender las responsabilidades que implicaba formar parte del Pacto.

Sin embargo, todavía conservaba una conexión profunda con su origen humano.

La humanidad no desaparecía.

Se integraba.

CUARTA ETAPA — ASCENSIÓN

La última etapa era conocida como Ascensión.

Era el punto máximo de la transformación.

La esencia ancestral alcanzaba su plena expresión.

El individuo se convertía en un verdadero representante de su linaje.

Su cuerpo podía cambiar de manera permanente.

Sus capacidades espirituales alcanzaban niveles que un humano común no podía conseguir.

Y su conexión con la Casa se volvía completa.

Pero la Ascensión no significaba que el individuo hubiera dejado de ser humano.

Al contrario.

Para los Custodios, aquello demostraba la verdadera naturaleza de la humanidad.

Los Humanos nunca habían sido una raza incompleta.

Habían sido una raza capaz de contener múltiples posibilidades.

La transformación simplemente despertaba una de ellas.

Por eso, en Maledicta, convertirse en otra raza no significaba abandonar la humanidad.

Significaba descubrir una parte de ella que había permanecido dormida durante generaciones.

Sin embargo, existía una razón por la cual Borghild había impuesto límites estrictos al proceso.

El Pacto necesitaba equilibrio.

Si demasiadas almas comenzaban a alimentar una misma esencia, esa esencia podía crecer más allá de lo permitido.

Y si una sola corriente espiritual llegaba a dominar a las demás, el equilibrio que mantenía contenido a la Marchitez podía romperse.

Borghild sabía esto.

Los Custodios más antiguos también lo sabían.

Pero la mayoría de los habitantes de Maledicta jamás conocerían la verdad.

Porque detrás del sistema de Casas, detrás de las ceremonias y detrás de la transformación existía un secreto que la Primera Reina había decidido ocultar.

La Marchitez no había sido destruida.

Solo estaba siendo alimentada.

      Y cada alma vinculada al Pacto formaba parte de ese equilibrio.`
    }, {
      title: 'Tomo VIII — Las Casas de Maledicta',
      body: `Cuando Borghild estableció el Pacto de las Seis Esencias, comprendió que una simple ceremonia no sería suficiente para mantener unido al nuevo reino.

Los Humanos necesitaban orientación.

Las distintas esencias necesitaban guardianes.

Y cada individuo que decidiera iniciar su transformación necesitaba un lugar al cual pertenecer.

Así nacieron las Casas de Maledicta.

Las Casas no eran simples familias.

Eran instituciones.

Cada una representaba una determinada tradición espiritual y protegía los conocimientos relacionados con una esencia.

Su función era enseñar, proteger y guiar a quienes decidieran recorrer el camino de la transformación.

Sin embargo, ninguna Casa podía reclamar un humano.

Ese principio fue establecido por Borghild desde el nacimiento de Maledicta.

La elección pertenecía siempre al individuo.

Las Casas podían enseñar.

Podían orientar.

Podían presentar sus tradiciones.

Pero no podían obligar.

Cada Casa desarrolló su propia identidad.

Sus propios rituales.

Sus propios maestros.

Y sus propios métodos para ayudar a los iniciados a controlar sus nuevas capacidades.

Con el tiempo, algunas Casas se convirtieron en centros de conocimiento.

Otras en academias de combate.

Algunas protegían templos.

Otras controlaban territorios enteros.

Pero todas respondían ante la Corona.

LA CASA CELESTIAL

Los Celestiales consideraban que el alma humana podía contener una conexión con fuerzas superiores.

Su Casa se convirtió en un lugar de estudio espiritual, disciplina y protección.

Los iniciados aprendían a controlar la energía celestial y a utilizarla para proteger a otros.

Aquellos que alcanzaban niveles superiores podían manifestar alas de luz o desarrollar formas más complejas de conexión con las fuerzas superiores.

Sin embargo, los Celestiales no consideraban que todo aquel que siguiera su camino estuviera destinado a convertirse en un ser perfecto.

La esencia celestial respondía también a las decisiones del individuo.

Algunos desarrollaban una naturaleza luminosa.

Otros manifestaban aspectos más oscuros.

Borghild permitió ambas posibilidades.

La Casa debía enseñar a controlar la esencia.

No decidir qué debía ser la persona.

LA CASA ÉLFICA

Los Elfos dedicaron su Casa al conocimiento, la percepción y la conexión con la naturaleza.

Sus maestros enseñaban a los iniciados a escuchar aquello que otros no podían percibir.

Los sonidos más pequeños.

Los cambios del viento.

Las alteraciones de la vegetación.

Las huellas dejadas por criaturas.

Los ecos de acontecimientos antiguos.

Los iniciados también aprendían a preservar conocimientos y memorias.

La Casa Élfica consideraba que olvidar el pasado era una de las mayores amenazas para cualquier civilización.

Por eso sus bibliotecas se convirtieron en algunos de los lugares más importantes de Maledicta.

LA CASA DRACÓNIDA

La Casa Dracónida protegía los conocimientos relacionados con la sangre ancestral.

Sus maestros enseñaban disciplina, resistencia y control del poder elemental.

Los iniciados aprendían a soportar la transformación de su cuerpo y a controlar las capacidades que despertaban dentro de ellos.

Las escamas.

Los cuernos.

La resistencia.

Y finalmente el Aliento Ancestral.

Los miembros más avanzados podían desarrollar una conexión mucho más profunda con su linaje dracónico.

La Casa consideraba que el poder sin control era simplemente otra forma de debilidad.

LA CASA ELEMENTAL

Los Elementales establecieron una Casa dedicada al estudio de las fuerzas primordiales.

Sus iniciados aprendían a controlar su afinidad elemental.

Fuego.

Agua.

Tierra.

Aire.

Y otras manifestaciones más extrañas que habían sido descubiertas con el paso de los siglos.

La Casa no enseñaba simplemente a utilizar elementos como armas.

También enseñaba a comprenderlos.

Un iniciado debía aprender cuándo utilizar su poder y cuándo dejar que el mundo siguiera su curso natural.

Los maestros Elementales repetían una frase que terminó convirtiéndose en parte de la tradición:

El elemento no obedece al que intenta dominarlo.

Responde al que aprende a comprenderlo.

LA CASA CAMBIA-PIEL

Los Cambiapieles y Yokai desarrollaron una Casa completamente diferente a las demás.

Sus enseñanzas estaban relacionadas con los espíritus, la transformación y el instinto.

Los iniciados aprendían que el cuerpo podía ser una frontera entre diferentes naturalezas.

Primero aprendían a reconocer su espíritu.

Después a escucharlo.

Y finalmente a transformarse sin perder el control.

La Casa enseñaba que la naturaleza sobrenatural no debía ser reprimida.

Pero tampoco debía gobernar completamente al individuo.

El objetivo era alcanzar un equilibrio entre la persona y la criatura que existía dentro de ella.

LA CASA DE LA FORJA

Los Enanos fundaron una Casa dedicada a la resistencia, la construcción y el dominio de la metalurgia.

Sus iniciados aprendían a sobrevivir en condiciones extremas.

Aprendían a utilizar herramientas.

A fabricar.

A reparar.

A construir.

Y a convertir materiales aparentemente inútiles en objetos capaces de durar generaciones.

La Casa también desarrolló técnicas para fabricar armas y armaduras destinadas a los miembros de las demás Casas.

Con el tiempo, los artesanos Enanos se convirtieron en una parte esencial de la economía de Maledicta.

LA CASA DEL COLOSO

Los Semi-Gigantes establecieron su propia tradición alrededor de la fuerza física y la resistencia.

Sus entrenamientos eran brutales.

Los iniciados aprendían a cargar pesos enormes.

Resistir impactos.

Mover obstáculos.

Y utilizar su tamaño sin convertirse en simples instrumentos de destrucción.

La Casa del Coloso enseñaba que la fuerza debía tener propósito.

Un cuerpo poderoso podía proteger.

Construir.

Transportar.

Combatir.

Pero también podía destruir aquello que intentaba proteger.

LA CASA SERPENTINA

Los Serpentinos desarrollaron una Casa basada en la supervivencia.

Sus miembros estudiaban venenos, rastreo, sigilo y adaptación.

Los iniciados aprendían a interpretar vibraciones.

Seguir rastros.

Sobrevivir en ambientes hostiles.

Y utilizar toxinas de manera controlada.

La Casa Serpentina también se convirtió en una de las principales fuentes de exploradores de Maledicta.

Sus miembros eran enviados a territorios donde otras razas no podían sobrevivir.

LA CASA CIRRUS

La Casa Cirrus fue quizás la más difícil de comprender.

Cada iniciado debía aprender a convivir con dos almas.

Dos voces.

Dos perspectivas.

Dos voluntades.

Los maestros Cirrus enseñaban que ninguna de las dos almas debía ser considerada automáticamente superior.

El objetivo era alcanzar cooperación.

Al principio, las dos almas podían discutir.

Después aprendían a comunicarse.

Más adelante podían alternar el control.

Y finalmente podían actuar juntas.

Los Cirrus que alcanzaban los niveles superiores eran capaces de realizar acciones que parecían imposibles para una sola persona.

Para ellos, la dualidad no era una enfermedad.

Era una forma diferente de existencia.

LAS CASAS MALDITAS

Los Dhampiros y Licántropos recibieron un lugar dentro del sistema de Maledicta, pero su incorporación fue diferente.

Sus linajes no habían nacido del mismo proceso espiritual que las demás Casas.

Sus transformaciones estaban relacionadas con antiguas maldiciones.

Por ello, Borghild decidió que sus conocimientos debían permanecer separados.

Los Dhampiros establecieron sus propios círculos de sangre y enseñaron a controlar el hambre, la velocidad y las capacidades nocturnas.

Los Licántropos formaron sus propias órdenes y enseñaron técnicas para controlar la transformación y mantener la conciencia durante la aparición de la bestia.

No todos los miembros de estos pueblos aceptaron formar parte de Maledicta.

Algunos permanecieron completamente independientes.

Otros consideraban que la Corona no tenía derecho a gobernarlos.

Borghild respetó aquella decisión.

La pertenencia al reino nunca sería utilizada como condición para reconocer la existencia de un pueblo.

Así, las Casas crecieron.

Algunas prosperaron.

Otras entraron en rivalidad.

Algunas desarrollaron alianzas.

Otras comenzaron a competir por la influencia dentro de la Corona.

Pero todas compartían una misma responsabilidad.

Proteger el Pacto.

Y aunque los habitantes de Maledicta creían que el Pacto existía para proteger el mundo de la Marchitez, solo unos pocos conocían la verdad.

Las Casas no solo estaban ayudando a preservar el equilibrio.

También estaban alimentándolo.

Cada alma vinculada fortalecía una esencia.

Cada esencia fortalecida contribuía a contener la Marchitez.

Y mientras el sistema funcionara, el mundo continuaría existiendo.

Pero Borghild sabía que ningún equilibrio podía mantenerse para siempre.

Especialmente cuando existían demasiadas almas.

Demasiadas esencias.

Y demasiados secretos.`
    }, {
      title: 'Tomo IX — Las razas malditas y los pueblos ocultos',
      body: `Mucho antes de que Maledicta fuera fundada, existían pueblos que las demás razas preferían no mencionar.

No porque fueran menos importantes. Sino porque su existencia recordaba a todos que las transformaciones del alma no siempre producían seres capaces de vivir en armonía.

Entre esos pueblos se encontraban los Dhampiros y los Licántropos. Durante siglos, sus nombres habían sido asociados con historias de sangre, violencia y maldiciones. Pero la realidad era mucho más compleja.

LOS DHAMPIROS

Los Dhampiros descendían de antiguos linajes vampíricos. No eran completamente humanos, pero tampoco pertenecían por completo a la naturaleza de los vampiros. Su sangre conservaba parte de aquella herencia. Su cuerpo podía resistir condiciones que afectarían a otras razas. La oscuridad favorecía sus sentidos. Sus reflejos podían superar los límites normales y, en determinadas circunstancias, su sangre podía recuperar parte de la vitalidad perdida.

Pero esa herencia tenía un precio.

El hambre.

La sangre no era simplemente alimento para un Dhampiro. Podía convertirse en una necesidad difícil de controlar. Por eso los primeros Dhampiros que llegaron a Maledicta desarrollaron métodos estrictos para controlar sus impulsos.

Los maestros de su linaje enseñaban que negar la existencia del hambre era peligroso. Había que reconocerla. Comprenderla. Y aprender a dominarla.

Los Dhampiros que perdían el control podían convertirse en una amenaza incluso para otros miembros de su propio pueblo. Aquellos que alcanzaban un dominio superior despertaban características cada vez más cercanas a sus antiguos ancestros vampíricos. Sus cuerpos se volvían más rápidos, sus sentidos más precisos y su capacidad para sobrevivir durante la noche aumentaba considerablemente.

Sin embargo, cada despertar de aquella herencia podía hacer más difícil mantener el equilibrio entre el individuo y su naturaleza.

LOS LICÁNTROPOS

Los Licántropos tenían una historia diferente. Su condición no provenía de una herencia vampírica, sino de una antigua maldición.

La transformación podía manifestarse de diferentes maneras. Algunos desarrollaban únicamente garras y sentidos animales. Otros podían alterar partes de su cuerpo. Los más poderosos eran capaces de transformarse completamente en bestias.

Pero el verdadero peligro no estaba en la transformación.

Estaba en perderse dentro de ella.

La maldición potenciaba emociones como la ira, el miedo y el instinto de supervivencia. Por eso los primeros maestros Licántropos desarrollaron métodos de disciplina destinados a mantener la conciencia durante la transformación.

La llamada Furia Lunar se convirtió en uno de los fenómenos más estudiados. Cuando un Licántropo sufría heridas graves o era llevado al límite, la maldición podía despertar con una intensidad extraordinaria. Su fuerza aumentaba, sus sentidos se agudizaban y su comportamiento se volvía más agresivo.

Para algunos, aquella transformación era una herramienta. Para otros, era una lucha constante.

EL MIEDO DE LAS OTRAS RAZAS

Durante siglos, las demás razas habían utilizado las historias sobre Dhampiros y Licántropos para justificar su persecución. Se hablaba de ellos como monstruos, como criaturas incapaces de convivir con otras sociedades y como descendientes de fuerzas que debían haber desaparecido.

Pero Borghild descubrió que muchas de aquellas historias habían sido exageradas.

Los Dhampiros no eran simplemente depredadores. Los Licántropos no eran simplemente bestias. Ambos pueblos poseían familias, tradiciones, lenguas, creencias y conflictos internos como cualquier otra sociedad.

Borghild comprendió entonces uno de los principios fundamentales de Maledicta:

Una naturaleza peligrosa no determina por sí sola el destino de una persona.

Por esa razón, se negó a convertir a estos pueblos en enemigos oficiales del reino. Sin embargo, tampoco ignoró los peligros que podían representar.

Maledicta estableció reglas especiales para sus comunidades. Los Dhampiros debían controlar sus prácticas relacionadas con la sangre. Los Licántropos debían responder por las transformaciones que pudieran poner en peligro a otros habitantes.

Las leyes no los castigaban por ser quienes eran. Castigaban las acciones cometidas contra otros. Aquella diferencia sería fundamental para la supervivencia del reino.

LOS PUEBLOS QUE NUNCA ENTRARON

No todos aceptaron el Pacto. Algunos grupos consideraban que Maledicta era simplemente otra forma de control. Otros desconfiaban de Borghild. Y algunos rechazaban completamente la idea de entregar parte de su esencia a una Corona.

Estos pueblos permanecieron fuera de las fronteras políticas del reino. Algunos vivían en regiones remotas. Otros se ocultaban dentro de las ciudades. Algunos incluso adoptaban identidades pertenecientes a otras razas para evitar ser perseguidos.

Borghild permitió que existieran. Mientras respetaran las leyes fundamentales del territorio, podían permanecer en Maledicta sin revelar su verdadera naturaleza.

Aquella decisión creó una situación desconocida hasta entonces.

Por primera vez, enemigos históricos podían caminar por las mismas calles. Un Elfo podía comerciar con un Dhampiro. Un Enano podía trabajar junto a un Licántropo. Un Celestial podía estudiar junto a un Cambiapieles. Un Serpentino podía compartir conocimiento con un Elemental. Y un Humano podía decidir voluntariamente qué esencia quería conocer.

La convivencia no eliminó el miedo. Tampoco eliminó los prejuicios. Pero creó algo que antes no existía:

la posibilidad de elegir.

EL PRIMER CONFLICTO

La integración de estos pueblos no tardó en provocar problemas. Algunos miembros de las Casas consideraban que los Dhampiros y Licántropos representaban una amenaza para el Pacto. Otros sostenían que sus maldiciones podían alterar el equilibrio de las almas.

Los debates llegaron hasta la Corona. Borghild escuchó ambas posiciones. Y finalmente estableció una nueva regla.

Ninguna raza sería considerada enemiga únicamente por su naturaleza. Pero ninguna naturaleza quedaría por encima de la ley.

Aquella decisión evitó una nueva guerra. Sin embargo, también dejó una pregunta sin respuesta.

Si la Marchitez estaba debilitando las almas del mundo...

¿qué ocurriría con las almas que habían sido alteradas por antiguas maldiciones?

Los primeros estudios realizados por los maestros de Maledicta encontraron algo inquietante. La sangre de los Dhampiros reaccionaba ante determinadas manifestaciones de la Marchitez. Y las transformaciones de los Licántropos parecían percibirla incluso antes que otras razas.

Aquello significaba que sus maldiciones podían no ser únicamente enfermedades espirituales. Podían estar relacionadas con algo mucho más antiguo.

Algo que existía antes del nacimiento de Maledicta.

Algo que quizá también había creado aquellas maldiciones.

Borghild ordenó que los estudios fueran ocultados. No quería provocar otra persecución.

Pero desde ese momento, los Dhampiros y Licántropos dejaron de ser considerados únicamente pueblos malditos. Se convirtieron en una pieza de un misterio mucho mayor.

Y mientras las Casas de Maledicta intentaban mantener el equilibrio entre las distintas esencias, algo comenzó a moverse bajo las raíces del reino.

Algo que había estado allí desde antes del Pacto.

Algo que había estado esperando.`
    }, {
      title: 'Tomo X — La corona de Borghild y el reino de Maledicta',
      body: `La creación del Pacto había evitado la destrucción del mundo.

Pero evitar una guerra no significaba construir un reino.

Maledicta necesitaba leyes. Necesitaba fronteras. Necesitaba instituciones. Y, sobre todo, necesitaba una autoridad capaz de mantener unidas a razas que durante siglos habían considerado enemigas.

Por decisión de los representantes del Pacto, Borghild fue reconocida como la primera Reina de Maledicta.

No recibió la corona por pertenecer a la raza más poderosa. Los Humanos no poseían la mayor fuerza física. No controlaban los elementos. No tenían sentidos sobrenaturales. No poseían alas ni sangre dracónica.

Su valor dentro del Pacto era precisamente otro.

Los Humanos podían adaptarse. Podían aprender de las demás razas. Podían establecer vínculos con distintas esencias. Y podían convertirse en un puente entre pueblos que jamás habían conseguido comprenderse.

Borghild convirtió esa característica en el fundamento de su gobierno.

UN REINO SIN DUEÑO

La primera decisión de Borghild fue establecer que Maledicta no pertenecería a una sola raza.

Ninguna Casa tendría soberanía absoluta. Ninguna esencia tendría derecho a gobernar sobre las demás. Los territorios del reino serían administrados mediante acuerdos entre las diferentes Casas y la Corona.

Los Humanos ocuparían una posición particular. Eran los participantes principales del proceso de transformación, pero no serían considerados superiores.

Su función era mantener el vínculo.

No dominarlo.

Este principio quedó grabado en las primeras leyes del reino.

Maledicta no pertenece a una raza.

Maledicta pertenece al Pacto.

EL CONSEJO DE LAS CASAS

Para evitar que la Corona se convirtiera en una monarquía absoluta, Borghild creó el Consejo de las Casas.

Cada tradición reconocida podía enviar representantes. Los Celestiales aportaban conocimientos sobre protección y energía espiritual. Los Elfos, conocimientos sobre naturaleza y memoria. Los Dracónidos, conocimientos sobre linajes ancestrales y fuerzas elementales. Los Enanos, conocimientos sobre construcción, metalurgia y resistencia. Los Cambiapieles y Yokai, conocimientos sobre espíritus y transformación. Los Elementales, conocimientos sobre las fuerzas primordiales. Los Semi-Gigantes, conocimientos sobre resistencia y fuerza física. Los Serpentinos, conocimientos sobre supervivencia, venenos y ambientes extremos. Los Cirrus, conocimientos sobre la dualidad del alma.

Los Dhampiros y Licántropos mantenían representantes propios cuando sus comunidades aceptaban participar en las decisiones del reino.

La Corona tenía la última autoridad política. Pero una decisión que afectara directamente al equilibrio entre las Casas debía ser discutida ante el Consejo.

Borghild sabía que ningún sistema podía eliminar completamente los conflictos. Su objetivo era impedir que los conflictos volvieran a convertirse en guerras.

LAS LEYES DEL PACTO

Durante los primeros años del reino se establecieron las Leyes Fundamentales de Maledicta.

La primera establecía que ninguna persona podía ser obligada a participar en el Ciclo de Renovación.

La segunda establecía que ninguna Casa podía reclamar la propiedad de un alma.

La tercera establecía que ninguna raza podía ser perseguida únicamente por su naturaleza.

La cuarta establecía que el uso de poderes capaces de afectar a grandes cantidades de personas debía estar regulado.

La quinta establecía que todo miembro de una Casa debía responder por las consecuencias de sus actos.

Y la sexta establecía el principio que Borghild consideraba más importante:

El poder recibido mediante el Pacto no elimina la responsabilidad de quien lo posee.

Estas leyes fueron aceptadas por la mayoría de los pueblos. Pero no todos estaban satisfechos.

Algunos consideraban que Borghild había concedido demasiadas libertades. Otros pensaban que había concedido demasiado poder a la Corona. Y algunos creían que el Pacto completo era un error.

EL CRECIMIENTO DE MALEDICTA

Con el paso de las décadas, Maledicta dejó de ser un pequeño territorio neutral. Se convirtió en una nación.

Las ciudades comenzaron a crecer alrededor de los centros de las Casas. Los Enanos construyeron enormes estructuras de piedra. Los Elfos establecieron bosques protegidos. Los Elementales crearon santuarios donde las fuerzas primordiales podían manifestarse. Los Celestiales levantaron templos. Los Dracónidos construyeron fortalezas. Los Serpentinos exploraron territorios peligrosos. Los Semi-Gigantes ayudaron a levantar murallas y estructuras que ninguna otra raza podía construir con tanta rapidez. Los Cambiapieles y Yokai establecieron lugares dedicados al estudio de los espíritus. Los Cirrus crearon centros para estudiar la naturaleza de las almas.

Los Dhampiros y Licántropos permanecieron principalmente en sus propias comunidades, aunque algunos comenzaron a integrarse en las ciudades del reino.

Maledicta se convirtió en algo que Borghild jamás había imaginado. Una sociedad donde seres de naturalezas completamente diferentes podían compartir una misma nación.

Pero aquella diversidad también creó nuevos problemas.

La convivencia generó matrimonios. Alianzas. Rivalidades. Religiones. Comercio. Familias. Y nuevas generaciones que nunca habían conocido el mundo anterior al Pacto.

Para ellos, la guerra entre las razas comenzó a convertirse en una historia antigua.

LA SEGUNDA GENERACIÓN

Los primeros Humanos que participaron en el Ciclo de Renovación comenzaron a experimentar transformaciones cada vez más profundas.

Sus hijos crecieron en un mundo diferente. Algunos nacían con una conexión más fuerte hacia determinadas esencias. Otros mostraban características que ningún maestro había visto anteriormente. Y algunos parecían capaces de establecer vínculos con más de una tradición.

Aquello preocupó a los maestros.

El Pacto había sido diseñado para mantener un equilibrio. Pero las nuevas generaciones estaban creando posibilidades que Borghild no había previsto.

Algunos Humanos podían manifestar características similares a las de otras razas sin abandonar completamente su naturaleza humana. Otros desarrollaban capacidades únicas. Y algunos mostraban señales de que sus almas estaban cambiando demasiado rápido.

Borghild ordenó que estos casos fueran estudiados. Los registros fueron almacenados en los archivos más protegidos del reino.

Pero los resultados nunca fueron publicados.

Porque los investigadores descubrieron algo imposible.

Las almas humanas no solo podían vincularse con las distintas esencias. También podían alterar la manera en que esas esencias se manifestaban.

El Humano no era simplemente un recipiente.

Era un catalizador.

LA CORONA Y EL SECRETO

Durante los últimos años de su reinado, Borghild comenzó a visitar personalmente los lugares donde se realizaban las ceremonias del Primer Vínculo.

Observaba a los iniciados. Escuchaba sus relatos. Y estudiaba los cambios que sufrían sus almas.

Cada ceremonia parecía fortalecer Maledicta.

Pero también aparecía el mismo patrón.

Después de cada gran ceremonia, los maestros detectaban pequeñas alteraciones en las profundidades del reino.

Vibraciones.

Cambios en la energía.

Sueños compartidos.

Y ocasionalmente, desapariciones de animales y criaturas que habitaban regiones cercanas.

Borghild comprendió finalmente la verdad que había estado intentando evitar.

El Pacto estaba funcionando.

La Marchitez estaba siendo contenida.

Pero algo estaba recibiendo aquella energía.

Algo debajo de Maledicta.

Algo que no pertenecía a ninguna Casa.

Algo que no respondía ante ninguna raza.

La Reina ordenó construir cámaras subterráneas para investigar las profundidades del reino.

Los primeros exploradores descendieron.

Algunos regresaron.

Otros no.

Los que volvieron hablaban de estructuras antiguas enterradas bajo la piedra. Eran anteriores a la fundación de Maledicta. Anterior incluso a las primeras ciudades conocidas.

Y en las paredes de aquellas estructuras aparecía repetido un símbolo.

Una forma circular.

Una espiral incompleta.

Borghild comprendió entonces que el Pacto no había comenzado la historia de Maledicta. Solo había continuado una historia mucho más antigua.

Y quizá, sin saberlo, los fundadores del reino habían vuelto a activar algo que había permanecido dormido durante siglos.

La Reina decidió mantener aquel descubrimiento en secreto.

No por ella.

Sino porque revelar la verdad podía destruir el Pacto que había dedicado toda su vida a construir.

Desde entonces, la Corona de Maledicta tuvo dos responsabilidades.

Gobernar el reino que todos podían ver.

Y proteger el secreto que existía debajo de él.`
    }, {
      title: 'Tomo XI — La Marchitez y el verdadero propósito del Pacto',
      body: `Durante generaciones, los habitantes de Maledicta creyeron que la Marchitez había sido derrotada.

Los libros hablaban de ella como una antigua calamidad. Los sacerdotes aseguraban que el Gran Pacto había salvado al mundo. Las Casas enseñaban que las almas humanas entregaban parte de su esencia para mantener el equilibrio. Y la mayoría aceptaba aquella explicación.

Pero la verdad era diferente.

La Marchitez nunca había desaparecido.

Había sido contenida.

LA ENFERMEDAD DEL MUNDO

La Marchitez no era una criatura. No era una raza. No era un ejército. Era un deterioro espiritual.

Las almas perdían lentamente su fuerza. Los lugares donde la energía espiritual era más débil comenzaban a deteriorarse. Los animales enfermaban. Las plantas perdían su vitalidad. Los sueños se volvían extraños. Las personas comenzaban a olvidar recuerdos importantes.

En los casos más graves, algunas almas simplemente dejaban de responder. El cuerpo continuaba existiendo. Pero aquello que lo hacía verdaderamente una persona comenzaba a desaparecer.

Los antiguos pueblos habían interpretado estos fenómenos de diferentes maneras. Los Celestiales hablaban de una desconexión con las fuerzas superiores. Los Elfos hablaban de una enfermedad de la naturaleza. Los Dracónidos creían que las antiguas energías del mundo estaban muriendo. Los Elementales detectaban alteraciones en las fuerzas primordiales. Los Cambiapieles y Yokai hablaban de espíritus que desaparecían. Los Cirrus describían la pérdida de una de las dos almas. Los Dhampiros y Licántropos percibían la Marchitez de una manera diferente, a través de sus propios instintos y sentidos.

Pero todas aquellas interpretaciones describían partes de un mismo fenómeno.

El mundo estaba perdiendo energía.

EL DESCUBRIMIENTO DE BORGHILD

Borghild fue la primera en comprender qué relación existía entre la Marchitez y los Humanos.

La adaptabilidad de los Humanos no era solamente una característica física o cultural. También existía en sus almas.

Una esencia humana podía establecer vínculos que otras razas no podían reproducir de la misma manera. Podía resonar con distintas fuerzas. Podía aprender de ellas. Y, bajo determinadas condiciones, podía transferir parte de esa energía.

El Gran Pacto utilizaba precisamente esa propiedad. Cada Humano que participaba voluntariamente en el Ciclo de Renovación establecía un vínculo con una esencia. Una pequeña parte de su alma comenzaba a alimentar aquella conexión. Y esa energía terminaba reforzando el equilibrio espiritual de Maledicta.

Pero había algo más.

La energía no desaparecía.

Era recibida.

EL VERDADERO RECEPTOR

Las primeras investigaciones de Borghild habían supuesto que la energía del Pacto simplemente se distribuía por el mundo. Con el tiempo descubrió que no era así.

Una parte de aquella energía descendía. Se filtraba hacia las profundidades. Atravesaba las estructuras antiguas enterradas bajo Maledicta. Y desaparecía en lugares que ninguna Casa había conseguido explorar completamente.

Aquello significaba que el Pacto tenía un segundo efecto.

Mientras protegía al mundo de la Marchitez, también estaba alimentando algo.

Borghild no sabía qué era. Pero sabía que existía. Y cuanto más investigaba, más antigua parecía aquella presencia.

EL EQUILIBRIO DE LAS ESENCIAS

La Corona descubrió entonces otro peligro.

El Pacto no podía crecer indefinidamente. Cada esencia necesitaba mantener un equilibrio.

Si demasiadas almas humanas establecían vínculos con una misma esencia, aquella fuerza podía comenzar a crecer de manera desproporcionada.

Un exceso de energía celestial podía alterar la relación entre voluntad y espíritu. Una acumulación excesiva de energía dracónica podía provocar manifestaciones elementales incontrolables. Una concentración extrema de energía cambiapieles podía afectar la frontera entre cuerpo y espíritu.

Los Elementales podían provocar alteraciones físicas en el territorio. Los Cirrus podían sufrir conflictos cada vez mayores entre sus dos almas. Incluso las esencias relacionadas con las antiguas maldiciones podían generar consecuencias impredecibles.

Por esa razón, las Casas comenzaron a registrar cuidadosamente cada nuevo vínculo. La elección de una esencia dejó de ser solamente una cuestión espiritual.

Se convirtió también en una cuestión de equilibrio.

EL CICLO DE RENOVACIÓN

El sistema creado por Borghild comenzó a adquirir una estructura precisa.

Un Humano llegaba a la edad suficiente para tomar una decisión. Los Custodios estudiaban su personalidad, sus recuerdos, sus instintos y sus aspiraciones. Después le presentaban las diferentes tradiciones.

El individuo podía aceptar. Podía rechazar. Podía esperar. Incluso podía cambiar de opinión.

Si aceptaba, comenzaba el proceso. Primero aparecía la Resonancia. Después la Vinculación. Más adelante podía producirse el Despertar. Y finalmente, aquellos que alcanzaban un dominio excepcional podían llegar a la Ascensión.

Cada etapa fortalecía el vínculo. Y cada vínculo ayudaba a mantener la Marchitez bajo control.

Pero el precio no era siempre evidente.

Cuanto más profunda era la transformación, más difícil podía resultar para un individuo regresar completamente a su estado anterior.

Por eso Borghild insistió en que nadie debía ser obligado.

El Pacto necesitaba almas dispuestas.

No almas sometidas.

EL SECRETO DE LA REINA

Borghild ocultó esta verdad al pueblo. No podía decirles que el sistema que había salvado al mundo también estaba alimentando una presencia desconocida.

Si las personas descubrían que sus almas estaban siendo utilizadas como parte de algo que no comprendían, el Pacto podía destruirse.

Y si el Pacto se destruía...

La Marchitez regresaría.

Borghild quedó atrapada entre dos posibilidades. Decir la verdad y arriesgarse a provocar el colapso de Maledicta. O mantener el secreto y permitir que el sistema continuara funcionando.

Eligió la segunda opción.

Desde entonces, solo un pequeño grupo de personas conocía la verdad. La Reina. Los Custodios más antiguos. Algunos miembros del Consejo. Y los guardianes de las cámaras subterráneas.

El secreto pasó de generación en generación. Pero cada generación conocía menos detalles que la anterior.

Con el tiempo, la razón original del Pacto comenzó a convertirse en una leyenda. La gente recordaba que las almas debían ser vinculadas, pero olvidaba por qué. Recordaba que Maledicta debía proteger el equilibrio, pero olvidaba qué estaba siendo contenido.

Y las cámaras subterráneas fueron selladas.

LA PREGUNTA QUE NADIE PODÍA RESPONDER

Durante los últimos años de su vida, Borghild escribió una última advertencia.

No fue entregada al Consejo. No fue colocada en los archivos reales. Fue escondida dentro de una cámara construida debajo del palacio.

En ella dejó registrada una única pregunta:

Si la Marchitez se alimenta de las almas del mundo... ¿qué estaba esperando aquello que se alimentaba del Pacto?

Borghild nunca encontró la respuesta.

Pero sabía que algún día alguien la encontraría.

Porque las estructuras bajo Maledicta continuaban expandiéndose. Las vibraciones eran cada vez más frecuentes. Los sueños comenzaban a repetirse entre personas que nunca se habían conocido.

Y, en las regiones más antiguas del reino, algunos Custodios comenzaron a escuchar una voz durante las ceremonias.

Una voz que no pertenecía a ninguna de las esencias conocidas.

Una voz que no pedía. No amenazaba. No negociaba.

Simplemente esperaba.

Y mientras el pueblo celebraba el éxito del Gran Pacto, aquella presencia continuaba alimentándose de cada nueva alma que entraba en el Ciclo de Renovación.

Maledicta había salvado al mundo.

Pero todavía nadie sabía exactamente de qué.`
    }]
  },
  ciudades: {
    title: 'Ciudades y localizaciones',
    description: 'Asentamientos, regiones y lugares de importancia.',
    entries: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  dioses: {
    title: 'Dioses y entidades',
    description: 'Deidades, fuerzas y presencias divinas del universo.',
    entries: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  eventos: {
    title: 'Eventos',
    description: 'Acontecimientos actuales e históricos del servidor.',
    entries: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  },
  bosses: {
    title: 'Bosses de Maledicta',
    description: 'Jefes, botín, horarios y ubicaciones conocidos en Maledicta.',
    entries: [
      {
        id: 'arbol-decadente',
        name: 'El árbol decadente',
        creature: 'Ent EAA (De MOD)',
        health: '150000',
        loot: [
          { chance: '100%', item: 'entre 40 y 75 platas' },
          { chance: '2%', item: '1 oro' },
          { chance: '1%', item: 'Runa de vida' }
        ],
        spawn: '3 horas',
        location: 'Isla ubicada en isla P8'
      },
      {
        id: 'el-desterrado',
        name: 'El desterrado',
        creature: 'Death Night Boss EAA (De MOD)',
        health: '300000',
        loot: [
          { chance: '100%', item: 'entre 75 y 150 platas' },
          { chance: '1%', item: 'entre 1 y 2 oros' },
          { chance: '1%', item: 'Runa de poder' }
        ],
        spawn: '3 horas',
        location: 'Ciudad sin nombre D6'
      },
      {
        id: 'meruen-segundo-archivista',
        name: 'Meruen el segundo archivista',
        creature: 'Lich Boss EAA (De MOD)',
        health: '120000',
        loot: [
          { chance: '100%', item: 'entre 35 y 70 platas' },
          { chance: '1%', item: 'Black fire staff' },
          { chance: '1%', item: 'Runa del sueño' }
        ],
        spawn: '3 horas',
        location: 'Forlon temple K12'
      },
      {
        id: 'ursula-la-perdida',
        name: 'Úrsula la perdida',
        creature: 'Banshee Boss EAA (De MOD)',
        health: '175000',
        loot: [
          { chance: '100%', item: 'entre 55 y 80 platas' },
          { chance: '75%', item: 'entre 1 y 3 Mechones de mujer muerta' },
          { chance: '1%', item: 'Runa del caos' },
          { chance: '35%', item: 'entre 1 y 5 esencia de alma' },
          { chance: '15%', item: 'Garras de la plaga' }
        ],
        spawn: '3 horas',
        location: 'Los túmulos devastados B11 (tierra de espectros)'
      },
      {
        id: 'senor-del-nucleo',
        name: 'El señor del núcleo',
        creature: 'Rampage Boss EAA (De MOD)',
        health: '750000',
        loot: [
          { chance: '100%', item: 'entre 80 y 160 platas' },
          { chance: '1%', item: '1 esmeralda' },
          { chance: '1%', item: 'Runa de la tierra' },
          { chance: '1%', item: 'entre 1 y 2 oros' },
          { chance: '15%', item: 'Everburn pairblades' }
        ],
        spawn: '3 horas',
        location: 'El volcán G13'
      },
      {
        id: 'morguith-primer-archivista',
        name: 'Morguith el primer archivista',
        creature: 'Blodmoon Beast Boss EAA (De MOD)',
        health: '975000',
        loot: [
          { chance: '100%', item: 'entre 90 y 170 platas' },
          { chance: '1%', item: 'entre 1 y 3 oros' },
          { chance: '1%', item: 'Runa de espíritu' },
          { chance: '2%', item: 'entre 1 y 3 esmeraldas' },
          { chance: '5%', item: 'Bloodborne legacy' }
        ],
        spawn: '3 horas',
        location: 'Citadel de la flama negra J15'
      }
    ]
  },
  actualizaciones: {
    title: 'Actualizaciones',
    description: 'Cambios recientes del servidor y del lore.',
    entries: [{ title: 'Contenido pendiente', body: CONTENT_PENDING }]
  }
};

export const NEWS = [];

export const OTHER_GAMES = [
  {
    id: 'silencio-entre-nosotros',
    title: 'Silencio entre nosotros',
    url: 'https://html-classic.itch.zone/html/19757883/index.html?v=1791982589'
  }
];

export const GUIDES = [
  {
    id: 'primeros-pasos',
    title: 'Primeros pasos',
    summary: 'Qué hacer después de crear tu personaje.',
    body: 'Completa el registro en esta web, descarga tu ficha y abre un ticket de validación en el Discord de Maledicta.'
  },
  {
    id: 'como-comenzar',
    title: 'Cómo comenzar',
    summary: 'El camino desde la bienvenida hasta el servidor.',
    body: 'Pulsa "Crear Personaje", completa cada paso del registro, lee el lore y las normativas, genera tu ficha y entrégala al Staff por Discord.'
  },
  {
    id: 'roleplay',
    title: 'Roleplay',
    summary: 'Guía de interpretación en Maledicta.',
    body: CONTENT_PENDING
  },
  {
    id: 'economia',
    title: 'Economía',
    summary: 'Sistemas económicos del servidor.',
    body: CONTENT_PENDING
  },
  {
    id: 'sistemas',
    title: 'Sistemas del servidor',
    summary: 'Mecánicas y reglas de juego.',
    body: CONTENT_PENDING
  }
];

export const FAQ = [
  {
    question: '¿Qué necesito para entrar al servidor?',
    answer:
      'Completar el registro de personaje en esta web, descargar la ficha generada e ingresar al Discord de Maledicta para abrir un ticket de validación con tu documento.'
  },
  {
    question: '¿Por qué mi personaje debe ser humano?',
    answer:
      'La condición de personajes humanos forma parte del lore oficial de Maledicta. Consulta la sección "¿Por qué todos los jugadores son humanos?" en el apartado de Lore cuando el Staff publique el contenido completo.'
  },
  {
    question: '¿Dónde entrego mi ficha?',
    answer:
      'En el Discord de Maledicta, abriendo un ticket de validación y adjuntando la ficha descargada desde esta web. La web no reemplaza el proceso de revisión del Staff.'
  },
  {
    question: '¿Cómo puedo consultar nuevamente mi ficha?',
    answer:
      'Una vez completado el registro, accede a "Mi Personaje" desde el Centro de Información. Podrás revisar tus datos, descargar e imprimir la ficha cuando lo necesites.'
  },
  {
    question: '¿Pierdo mi progreso si cierro la web?',
    answer:
      'No. Tu progreso y ficha se guardan automáticamente en este navegador. Al volver, retomarás donde lo dejaste.'
  }
];

export const STAFF_DELIVERY = {
  title: 'Tu personaje está listo',
  steps: [
    'Descarga tu ficha desde el botón correspondiente.',
    'Ingresa al Discord de Maledicta.',
    'Abre un ticket de validación.',
    'Adjunta la ficha descargada.',
    'Espera la revisión del Staff.'
  ],
  reminder:
    'Esta web prepara y entrega tu ficha. La validación oficial siempre ocurre en Discord mediante ticket.'
};
