export const STEPS = [
  { id: 'identity', label: 'IDENTIDAD', title: 'Identidad' },
  { id: 'story', label: 'HISTORIA', title: 'Historia' },
  { id: 'consent', label: 'CONSENTIMIENTOS', title: 'Consentimientos' },
  { id: 'image', label: 'IMAGEN', title: 'Imagen del Personaje' },
  { id: 'review', label: 'REVISIÓN', title: 'Revisión' }
];

export const CHARACTER_CATALOG = {
  professions: [
    { value: 'Rúnico', description: 'Escribe poder sobre metal, piedra y memoria ancestral.' },
    { value: 'Recolector', description: 'Recorre la naturaleza y sabe dónde yace lo útil.' },
    { value: 'Sanador', description: 'Domina la curación, la continuidad y la protección corporal.' },
    { value: 'Herrero', description: 'Forja armas, armaduras y límites de resistencia.' },
    { value: 'Tabernero', description: 'Conoce secretos, rumores y la moral de cada rincón.' },
    { value: 'Alquimista', description: 'Transforma elementos, venenos y brebajes con precisión.' }
  ],
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
    { value: 'Feéricos', description: 'Entienden el misterio, la gracia y la fragilidad del mundo.' },
    { value: 'Ogroides', description: 'Tienen fuerza ancestral, resistencia y presencia intimidante.' },
    { value: 'Bestiales', description: 'Se mueven por instinto, ferocidad y conexión primigenia.' },
    { value: 'Humanoides', description: 'Representan la complejidad del deseo, la historia y la ambición.' },
    { value: 'Celestiales', description: 'Llevan un fuego divino, justicia y visión superior.' },
    { value: 'Infernales', description: 'Aceptan fuego, decadencia y verdad aún más profunda.' }
  ],
  alignments: [
    { value: 'Legal', description: 'Actúa bajo juramentos, obligaciones y honor.' },
    { value: 'Neutral', description: 'Decide según el equilibrio entre necesidad y riesgo.' },
    { value: 'Caótica', description: 'Se mueve por impulso, libertad y cambio constante.' },
    { value: 'Oscura', description: 'Acepta lo prohibido como camino inevitable.' }
  ]
};

export const CONSENT_CATEGORIES = [
  {
    key: 'violence',
    title: 'Violencia',
    prompt: '¿Qué nivel de violencia aceptás dentro del rol?',
    options: [
      { value: 'nada', label: 'Nada', description: 'Sin violencia activa ni amenaza directa.' },
      { value: 'leve', label: 'Leve', description: 'Golpes, discusiones y conflictos breves.' },
      { value: 'moderada', label: 'Moderada', description: 'Combates presentes y consecuencias visibles.' },
      { value: 'alta', label: 'Alta', description: 'Violencia intensa, cruenta y decisiva.' }
    ]
  },
  {
    key: 'gore',
    title: 'Gore',
    prompt: '¿Qué nivel de gore tolerás visual o descriptivo?',
    options: [
      { value: 'nada', label: 'Nada', description: 'Sin descripciones explícitas ni detalles corporales.' },
      { value: 'leve', label: 'Leve', description: 'Heridas y sangre moderada.' },
      { value: 'moderada', label: 'Moderada', description: 'Desgarramientos, sangre y mutilación puntual.' },
      { value: 'alto', label: 'Alto', description: 'Escenas impactantes y detalles intensos.' }
    ]
  },
  {
    key: 'erp',
    title: 'ERP / Rol sexual',
    prompt: '¿Qué intensidad de contenido íntimo o erótico aceptás?',
    options: [
      { value: 'nada', label: 'Nada', description: 'Sin contenido sexual ni sugerencias explícitas.' },
      { value: 'subtil', label: 'Subtil', description: 'Tensión romántica o insinuaciones leves.' },
      { value: 'sugerido', label: 'Sugerido', description: 'Escenas sugeridas, sin detalle explícito.' },
      { value: 'explicito', label: 'Explícito', description: 'Contenido sexual claro y detallado.' }
    ]
  },
  {
    key: 'confinementTemporary',
    title: 'Confinamiento temporal',
    prompt: '¿Aceptás escenarios de encierro breve o incomodidad temporal?',
    options: [
      { value: 'nada', label: 'Nada', description: 'No acepto limitación de movimiento ni cautiverio.' },
      { value: 'leve', label: 'Leve', description: 'Restricciones breves e incidentales.' },
      { value: 'moderado', label: 'Moderado', description: 'Confinamiento corto con presión emocional.' },
      { value: 'alto', label: 'Alto', description: 'Cautiverio temporal con mayor intensidad.' }
    ]
  },
  {
    key: 'confinementPermanent',
    title: 'Confinamiento permanente',
    prompt: '¿Aceptás encierro prolongado, institucional o eterno?',
    options: [
      { value: 'nada', label: 'Nada', description: 'Sin escenarios de encierro permanente.' },
      { value: 'leve', label: 'Leve', description: 'Restricción prolongada, sin ataduras eternas.' },
      { value: 'moderado', label: 'Moderado', description: 'Prisiones prolongadas con impacto narrativo.' },
      { value: 'alto', label: 'Alto', description: 'Cautiverio prolongado o condición casi irreversible.' }
    ]
  }
];

export const defaultCharacter = () => ({
  name: '',
  age: '',
  profession: '',
  classType: '',
  archetype: '',
  alignment: '',
  story: '',
  consent: {
    violence: '',
    gore: '',
    erp: '',
    confinementTemporary: '',
    confinementPermanent: ''
  },
  image: {
    dataUrl: null,
    name: null,
    size: null,
    width: null,
    height: null,
    uploadedAt: null
  }
});
