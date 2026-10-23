export const CREATION_STEPS = [
  { id: 'datos', label: 'PERSONAJE', title: 'Datos básicos', nav: 'Personaje' },
  { id: 'apariencia', label: 'APARIENCIA', title: 'Apariencia física', nav: 'Apariencia' },
  { id: 'etnia', label: 'RAZA', title: 'Raza', nav: 'Raza' },
  { id: 'imagen', label: 'IMAGEN', title: 'Imagen del personaje', nav: 'Imagen' },
  { id: 'lore', label: 'LORE', title: 'El mundo de Maledicta', nav: 'Lore' },
  { id: 'normativas', label: 'NORMAS', title: 'Normativas del servidor', nav: 'Normativas' },
  { id: 'confirmacion', label: 'CONFIRMACIÓN', title: 'Aceptar condiciones', nav: 'Confirmación' },
  { id: 'revision', label: 'FICHA', title: 'Revisión y generación', nav: 'Ficha' }
];

export const HUB_SECTIONS = [
  { id: 'inicio', label: 'Inicio', icon: '◈' },
  { id: 'mi-personaje', label: 'Mi Personaje', icon: '✦', requiresCharacter: true },
  { id: 'razas', label: 'Razas', icon: '☘' },
  { id: 'historia', label: 'Historia', icon: '⌛' },
  { id: 'eventos', label: 'Eventos', icon: '⚡' },
  { id: 'bosses-de-maledicta', label: 'Bosses de Maledicta', icon: '♜' },
  { id: 'noticias', label: 'Noticias', icon: '▣' },
  { id: 'guias', label: 'Guías', icon: '❖' },
  { id: 'faq', label: 'FAQ', icon: '?' },
  { id: 'normativas', label: 'Normas', icon: '⚖' },
  // Ajeno al universo Maledicta: siempre al final.
  { id: 'otros-juegos', label: 'Otros juegos', icon: '▷' }
];

export const ETHNICITIES = [
  {
    value: 'Humanos',
    description: 'La raza humana: adaptable, resistente y capaz de aprender de otras civilizaciones.'
  },
  {
    value: 'Elementales',
    description: 'Son criaturas nativas de los Planos Elementales de Fuego, Agua, Aire y Tierra, formadas por la energía pura y la materia viva de su entorno. Su naturaleza les permite prescindir de las necesidades biológicas habituales, por lo que no necesitan comer, beber, respirar ni dormir. Suelen desempeñar funciones de guardianes, protectores y custodios de lugares vinculados a su elemento.'
  },
  {
    value: 'Semi-Gigantes',
    description: 'Son seres fruto de la unión entre humanos y gigantes. Se distinguen por su gran tamaño, su fuerza física sobresaliente y un carácter directo y obstinado. Sus cualidades los convierten en excelentes guerreros, trabajadores y guardaespaldas, capaces de destacar en tareas que requieren resistencia, potencia física y determinación.'
  },
  {
    value: 'Serpentinos',
    description: 'Son criaturas humanoides con rasgos de serpiente, reconocidas por su astucia, su naturaleza carnívora y su larga historia de culto a deidades ofídicas. Sus costumbres, creencias y características físicas los distinguen de las demás razas, y su vínculo con antiguas tradiciones religiosas forma parte de su identidad cultural.'
  },
  {
    value: 'Cirrus',
    description: 'Cirrus es una raza o condición mística en la que un individuo alberga dos espíritus o mentes distintas que comparten un mismo cuerpo físico. Esta dualidad suele estar compuesta por un alma mortal nativa y un fragmento espiritual, que puede proceder de un ser de los sueños, un ancestro o una entidad elemental del aire. La coexistencia de ambas presencias define su naturaleza y hace honor a su nombre, relacionado con las nubes y el cielo.'
  }
];

export const IMAGE_LIMITS = {
  maxBytes: 10 * 1024 * 1024,
  minSize: 512,
  types: ['image/png', 'image/jpeg']
};

export const BOSS_GALLERY_LIMITS = {
  maxBytes: 10 * 1024 * 1024,
  types: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
};

export const SEX_OPTIONS = [
  { value: 'Masculino', description: 'Identidad masculina.' },
  { value: 'Femenino', description: 'Identidad femenina.' },
  { value: 'No binario', description: 'Identidad fuera del binario tradicional.' },
  { value: 'Prefiero no decir', description: 'Sin especificar.' }
];

export const CHARACTER_CATALOG = {
  classes: [
    { value: 'Paladines', description: 'Defienden la fe, el honor y la línea entre la luz y la corrupción.' },
    { value: 'Monje', description: 'Equilibra disciplina corporal, meditación y fuerza interior.' },
    { value: 'Bardo', description: 'Canta historias, manipula la emoción y seduce la atención.' },
    { value: 'Clérigos', description: 'Canalizan la voluntad divina y la protección sacra.' },
    { value: 'Guerrero', description: 'Domina la fuerza bruta, la resistencia y la disciplina de combate.' },
    { value: 'Brujos', description: 'Se entregan a pactos oscuros y fuerzas prohibidas.' },
    { value: 'Magos', description: 'Controlan energía arcana con cálculo y paciencia.' },
    { value: 'Druidas', description: 'Se conectan con la naturaleza, el ciclo y la magia viva.' },
    { value: 'Pícaro', description: 'Actúa con rapidez, sigilo y una inteligencia despiadada.' }
  ],

  archetypes: [
    {
      value: 'Humanos',
      description: 'Identidad racial: Adaptabilidad, supervivencia y capacidad para aprender de otras civilizaciones.',
      abilities: [
        ['Nivel 1 — Adaptación', 'Pueden adaptarse rápidamente a situaciones desconocidas y obtienen una pequeña bonificación al realizar una habilidad que no hayan utilizado recientemente.'],
        ['Nivel 2 — Versatilidad', 'Pueden elegir temporalmente una especialización entre varias disciplinas y obtener una bonificación moderada durante un período limitado.'],
        ['Nivel 3 — Experiencia Compartida', 'Al presenciar a un aliado realizar correctamente una acción especializada, pueden obtener temporalmente parte de ese conocimiento.'],
        ['Nivel 4 — Determinación', 'Una vez por período de descanso, cuando fallan una acción importante, pueden repetirla inmediatamente, aceptando una consecuencia menor determinada por la situación.'],
        ['Nivel 5 — Legado del Pacto', 'Pueden combinar temporalmente dos especializaciones diferentes para realizar una acción excepcional.']
      ]
    },
    {
      value: 'Enanos',
      description: 'Identidad racial: Resistencia, metalurgia, construcción y dominio de las montañas.',
      abilities: [
        ['Nivel 1 — Sangre de la Montaña', 'Soportan mejor el frío, la fatiga y las condiciones ambientales extremas. También pueden transportar cargas mayores.'],
        ['Nivel 2 — Piel de Hierro', 'Su cuerpo compacto resiste mejor los impactos físicos y reduce la eficacia de los efectos que intenten derribarlos o desplazarlos.'],
        ['Nivel 3 — Maestro Artesano', 'Obtienen ventajas al reparar, fabricar y mejorar equipamiento, y reconocen con facilidad materiales de calidad o estructuras deterioradas.'],
        ['Nivel 4 — Anclaje', 'Pueden adoptar una postura defensiva que dificulta enormemente moverlos, sacrificando parte de su movilidad.'],
        ['Nivel 5 — Corazón de la Forja', 'Pueden reforzar temporalmente un arma, armadura u objeto aliado y otorgarle una propiedad especial.']
      ]
    },
    {
      value: 'Elfos',
      description: 'Identidad racial: Percepción, naturaleza, precisión y conocimiento ancestral.',
      abilities: [
        ['Nivel 1 — Sentidos Élficos', 'Poseen una percepción superior y detectan detalles, sonidos o movimientos que otras razas podrían ignorar.'],
        ['Nivel 2 — Paso Silencioso', 'Se desplazan con menor ruido y dejan menos señales de su presencia, especialmente en bosques y terrenos naturales.'],
        ['Nivel 3 — Memoria Ancestral', 'Pueden recordar información sobre lugares, criaturas, símbolos o acontecimientos que hayan estudiado previamente.'],
        ['Nivel 4 — Ojo del Cazador', 'Después de observar a un objetivo, pueden identificar una vulnerabilidad y obtener una ventaja contra él durante un período limitado.'],
        ['Nivel 5 — Comunión Natural', 'Establecen una conexión temporal con el entorno natural, detectando presencias cercanas y lo ocurrido recientemente en la zona.']
      ]
    },
    {
      value: 'Dracónidos',
      description: 'Identidad racial: Poder físico, linaje dracónico y dominio elemental.',
      abilities: [
        ['Nivel 1 — Sangre Dracónica', 'Poseen resistencia natural frente a un tipo de daño elemental asociado a su linaje.'],
        ['Nivel 2 — Escamas', 'Sus escamas funcionan como protección natural y reducen parcialmente determinados ataques físicos.'],
        ['Nivel 3 — Aliento Ancestral', 'Pueden liberar una descarga elemental de corto alcance cuyo tipo depende de su linaje.'],
        ['Nivel 4 — Furia del Dragón', 'Cuando su vida disminuye considerablemente, despiertan su naturaleza dracónica y obtienen mayor capacidad ofensiva temporal.'],
        ['Nivel 5 — Herencia Primordial', 'Liberan una manifestación poderosa de su linaje que afecta una zona con su elemento y requiere un tiempo de reutilización elevado.']
      ]
    },
    {
      value: 'Cambiapieles / Yokai',
      description: 'Identidad racial: Transformación, instinto, engaño y naturaleza sobrenatural.',
      abilities: [
        ['Nivel 1 — Instinto Bestial', 'Perciben rastros recientes, detectan determinadas presencias y siguen criaturas con mayor facilidad.'],
        ['Nivel 2 — Rostro Prestado', 'Adoptan temporalmente una apariencia alternativa de su propia naturaleza, sin copiar habilidades físicas de otra raza.'],
        ['Nivel 3 — Forma Salvaje', 'Se transforman parcialmente y obtienen una mejora temporal relacionada con su animal espiritual.'],
        ['Nivel 4 — Espíritu Errante', 'Pueden separar parcialmente su esencia del cuerpo durante unos instantes y percibir aquello que normalmente quedaría fuera de sus sentidos.'],
        ['Nivel 5 — Verdadera Forma', 'Liberan completamente su naturaleza Yokai durante un período limitado y obtienen capacidades únicas determinadas por su linaje.']
      ]
    },
    {
      value: 'Celestiales',
      description: 'Identidad racial: Luz, voluntad, protección y conexión con fuerzas superiores.',
      abilities: [
        ['Nivel 1 — Aura Serena', 'Generan una presencia que ayuda a mantener la calma de los aliados cercanos y dificulta determinados efectos de miedo.'],
        ['Nivel 2 — Luz Protectora', 'Envuelven temporalmente a un aliado con energía celestial y reducen parcialmente el impacto de un ataque o efecto negativo.'],
        ['Nivel 3 — Juicio', 'Pueden marcar a una criatura considerada una amenaza para que determinadas acciones contra ella sean más eficaces.'],
        ['Nivel 4 — Alas del Firmamento', 'Manifiestan energía celestial que mejora temporalmente su movilidad y permite maniobras extraordinarias.'],
        ['Nivel 5 — Milagro Celestial', 'Invocan una manifestación de poder superior capaz de afectar a varios aliados o enemigos dentro de una zona.']
      ]
    },
    {
      value: 'Elementales',
      description: 'Identidad racial: Manipulación de las fuerzas primordiales.',
      abilities: [
        ['Nivel 1 — Afinidad Elemental', 'Poseen afinidad natural con un elemento determinado y resistencia frente a él.'],
        ['Nivel 2 — Manifestación', 'Crean pequeñas manifestaciones de su elemento para interactuar con el entorno y generar efectos menores.'],
        ['Nivel 3 — Forma Elemental', 'Durante un período limitado, parte de su cuerpo se convierte en su elemento y modifica sus capacidades físicas y resistencia.'],
        ['Nivel 4 — Dominio Primordial', 'Alteran temporalmente una pequeña zona del entorno mediante su elemento.'],
        ['Nivel 5 — Avatar Elemental', 'Adoptan durante un tiempo limitado una forma completamente dominada por su elemento.']
      ]
    },
    {
      value: 'Semi-Gigantes',
      description: 'Identidad racial: Tamaño, fuerza, resistencia y presencia física.',
      abilities: [
        ['Nivel 1 — Sangre Titánica', 'Pueden cargar grandes cantidades de peso y realizar esfuerzos físicos prolongados sin agotarse con facilidad.'],
        ['Nivel 2 — Pisada Pesada', 'Ejercen mayor impacto al empujar, derribar o desplazar objetos y criaturas.'],
        ['Nivel 3 — Piel de Titán', 'Su cuerpo se vuelve extremadamente resistente frente a determinados tipos de daño físico.'],
        ['Nivel 4 — Rugido del Coloso', 'Emiten un poderoso rugido capaz de intimidar a criaturas cercanas y alterar momentáneamente su comportamiento.'],
        ['Nivel 5 — Legado del Titán', 'Alcanzan una manifestación de su sangre titánica que aumenta su capacidad física, pero reduce su movilidad y sutileza.']
      ]
    },
    {
      value: 'Serpentinos',
      description: 'Identidad racial: Veneno, supervivencia, sigilo y adaptación a ambientes hostiles.',
      abilities: [
        ['Nivel 1 — Sangre Fría', 'Toleran mejor ambientes cálidos y poseen resistencia natural frente a determinados venenos.'],
        ['Nivel 2 — Sentido Vibratorio', 'Perciben vibraciones cercanas a través del suelo y detectan movimiento con visibilidad limitada.'],
        ['Nivel 3 — Veneno Serpentino', 'Aplican una toxina natural a sus ataques que provoca un efecto progresivo sobre el objetivo.'],
        ['Nivel 4 — Muda', 'Pueden desprenderse temporalmente de una capa de piel para liberarse de ciertos efectos físicos negativos o restricciones.'],
        ['Nivel 5 — Depredador Ancestral', 'Sus sentidos e instintos alcanzan su máxima expresión para rastrear, emboscar y atacar con eficacia excepcional.']
      ]
    },
    {
      value: 'Cirrus',
      description: 'Identidad racial: Dos almas, dualidad y conflicto interno.',
      abilities: [
        ['Nivel 1 — Segundo Susurro', 'La segunda alma puede advertir de determinados peligros y proporcionar una percepción adicional en situaciones críticas.'],
        ['Nivel 2 — Dualidad', 'Pueden alternar entre sus dos personalidades espirituales, cada una con una tendencia o especialización diferente.'],
        ['Nivel 3 — Alma Dominante', 'En situaciones extremas, una de las almas puede tomar temporalmente el control y modificar determinadas capacidades.'],
        ['Nivel 4 — Sincronía', 'Ambas almas cooperan simultáneamente para realizar acciones complejas que normalmente requerirían dos personas.'],
        ['Nivel 5 — Convergencia', 'Durante un período muy limitado, ambas almas se fusionan y utilizan simultáneamente sus fortalezas.']
      ]
    },
    {
      value: 'Vampiros',
      description: 'Identidad racial: Sangre vampírica, hambre, velocidad y supervivencia nocturna.',
      abilities: [
        ['Nivel 1 — Sangre Nocturna', 'Poseen adaptación natural a la oscuridad y perciben mejor durante la noche.'],
        ['Nivel 2 — Hambre de Sangre', 'Al herir a una criatura, pueden recuperar una pequeña cantidad de vitalidad bajo determinadas condiciones.'],
        ['Nivel 3 — Paso de la Noche', 'Se desplazan rápidamente durante breves períodos y dejan una silueta difícil de seguir visualmente.'],
        ['Nivel 4 — Dominio del Hambre', 'Cuando su vitalidad es baja, obtienen mejoras físicas temporales, pero aumenta su necesidad de alimentarse.'],
        ['Nivel 5 — Herencia Vampírica', 'Liberan su sangre ancestral y manifiestan características vampíricas superiores, afrontando después sus consecuencias.']
      ]
    },
    {
      value: 'Licántropos',
      description: 'Identidad racial: Maldición, transformación, instinto y brutalidad.',
      abilities: [
        ['Nivel 1 — Instinto del Cazador', 'Detectan y siguen rastros de criaturas con mayor facilidad.'],
        ['Nivel 2 — Garras de la Maldición', 'La transformación se manifiesta físicamente y permite utilizar garras con ventajas en combate cuerpo a cuerpo.'],
        ['Nivel 3 — Transformación Parcial', 'Transforman partes de su cuerpo para aumentar temporalmente fuerza, velocidad o percepción.'],
        ['Nivel 4 — Furia Lunar', 'Al recibir grandes cantidades de daño, aumenta temporalmente su capacidad ofensiva.'],
        ['Nivel 5 — Bestia Completa', 'Liberan la maldición y adoptan su forma bestial, obteniendo capacidades físicas extraordinarias con posible pérdida de control.']
      ]
    }
  ],

  alignments: [
    { value: 'Legal', description: 'Actúa bajo juramentos, obligaciones y honor.' },
    { value: 'Neutral', description: 'Decide según el equilibrio entre necesidad y riesgo.' },
    { value: 'Caótica', description: 'Se mueve por impulso, libertad y cambio constante.' },
    { value: 'Oscura', description: 'Acepta lo prohibido como camino inevitable.' }
  ]
};

/**
 * Orden jerárquico del libro de Razas (pestaña Razas).
 * `race` debe coincidir con un `value` de CHARACTER_CATALOG.archetypes; `label` cambia el nombre mostrado.
 */
export const RACE_GROUPS = [
  {
    id: 'pacto',
    title: 'Razas del pacto',
    description: 'Los pueblos con los que un humano puede firmar el pacto para acceder a sus habilidades, conocimientos y forma de vida.',
    races: [
      { race: 'Humanos' },
      { race: 'Enanos' },
      { race: 'Elfos' },
      { race: 'Dracónidos' },
      { race: 'Cambiapieles / Yokai' },
      { race: 'Celestiales' }
    ]
  },
  {
    id: 'sub-razas',
    title: 'Sub razas',
    description: 'Razas con las que se puede iniciar directamente y subir de nivel con ellas.',
    races: [
      { race: 'Elementales' },
      { race: 'Semi-Gigantes' },
      { race: 'Serpentinos' },
      { race: 'Cirrus' }
    ]
  },
  {
    id: 'malditos',
    title: 'Malditos',
    description: 'Linajes perseguidos durante siglos, marcados por la sangre y la maldición.',
    races: [
      { race: 'Vampiros' },
      { race: 'Licántropos', label: 'Lycans' }
    ]
  }
];

export const raceSlug = (name) => name
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const ACCEPTANCE_ITEMS = [
  { key: 'lore', label: 'He leído el lore de Maledicta.' },
  { key: 'rules', label: 'He leído las normativas del servidor.' },
  { key: 'age', label: 'Declaro que tengo más de 18 años.' },
  { key: 'conditions', label: 'Acepto las condiciones del servidor.' }
];

export const defaultCharacter = () => ({
  name: '',
  age: '',
  sex: '',
  origin: '',
  height: '',
  distinctiveFeatures: '',
  physicalDescription: '',
  personalityTrait: '',
  ethnicity: '',
  ethnicityDetail: '',
  imageStatus: 'missing',
  imageError: '',
  image: {
    dataUrl: null,
    name: null,
    size: null,
    width: null,
    height: null,
    uploadedAt: null,
    serverValidated: false
  },
  validationCode: null,
  sheetGeneratedAt: null,
  lastEditedAt: null
});

export const defaultAcceptances = () => ({
  lore: false,
  rules: false,
  age: false,
  conditions: false
});