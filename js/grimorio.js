const CATEGORY_NAMES = {
  exploration: 'Viaje y exploración',
  combat: 'Combate y control',
  intrigue: 'Intriga y sigilo',
  survival: 'Sostén y supervivencia',
  ritual: 'Rituales y magia oculta'
};

const CATEGORY_SPELLS = {
  exploration: ['Air Step', 'Soar and Glide', 'Slow Fall', 'Translocation', 'Grappling Hook'],
  combat: ['Fireball', 'Tornado', 'Malevolent Chains', 'Shield Dome', 'Psychic Attack'],
  intrigue: ['Invisibility', 'False Shadow', 'Charm', 'Stolen Shadow', 'Circle of Lesser Concealment'],
  survival: ['Meditation', 'Healing', 'Nature Rejuvenation', 'Goliath Shield', 'Mineral Spring'],
  ritual: ['Resurrection', 'Dark Monolith', 'Haruspicy', 'Talionis', 'The Crucible of Memory']
};

const schools = [
  {
    id: 'aire', name: 'Aire', count: 6, image: 'escuela-01.jpg', glyph: '༄', affinity: 'air',
    description: 'Movimiento, viento y descarga eléctrica.',
    spells: [
      ['Air Step', 'Desplazamiento corto asistido por aire; movilidad y evasión.'],
      ['Lightning Beam', 'Descarga eléctrica canalizada en línea contra un objetivo.'],
      ['Lightning Spear', 'Lanza de rayo para un impacto dirigido a distancia.'],
      ['Lightning Stems', 'Rayos ramificados que sugieren presión sobre varios enemigos.'],
      ['Soar and Glide', 'Planear y desplazarse por el aire para cruzar obstáculos.', true],
      ['Tornado', 'Torbellino de control del espacio y presión sobre grupos.']
    ]
  },
  {
    id: 'arcana', name: 'Arcana', count: 6, image: 'escuela-14.jpg', glyph: '✧', affinity: 'arcana',
    description: 'Manipulación de energía, espacio y reserva mágica.',
    spells: [
      ['Arcane Salvo', 'Ráfaga de proyectiles arcanos destinada al hostigamiento.'],
      ['Astral Vault', 'Acceso a un depósito astral; utilidad y custodia de objetos.'],
      ['Meditation', 'Recupera maná y puede aumentar su reserva y regeneración con cargas.', true],
      ['Phase Shift', 'Cambio de fase que sugiere evasión o cruce momentáneo.'],
      ['Slow Fall', 'Ralentiza la caída para descender con mayor seguridad.', true],
      ['Translocation', 'Desplazamiento espacial o teletransporte de utilidad.']
    ]
  },
  {
    id: 'maldicion', name: 'Maldición', count: 7, image: 'escuela-07.jpg', glyph: '☽', affinity: 'curse',
    description: 'Debilitación, castigos y hechicería hostil.',
    spells: [
      ['Armor Weakening', 'Reduce la armadura del objetivo; el ajuste se expresa en porcentaje.', true],
      ['Bewitched Totem', 'Tótem embrujado asociado a la aplicación de otros hechizos.'],
      ['Curse of Persecution', 'Maldición de persecución para acosar al adversario.'],
      ['Dark Monolith', 'Manifiesta un monolito oscuro con función de amenaza o área.'],
      ['Malevolent Chains', 'Cadenas maléficas para someter o dificultar movimientos.'],
      ['Sword of Damocles', 'Castigo amenazante vinculado a una espada suspendida.'],
      ['Talionis', 'Hechizo de represalia: el daño o castigo retorna narrativamente.']
    ]
  },
  {
    id: 'sangre', name: 'Sangre', count: 7, image: 'escuela-15.jpg', glyph: '✺', affinity: 'blood',
    description: 'Vínculos vitales, hemorragias y poder sacrificial.',
    spells: [
      ['Bleeding Rupture', 'Ruptura sanguínea ofensiva asociada a heridas persistentes.'],
      ['Blood Raven', 'Forma o proyectil de cuervo sanguíneo; ataque o emisario.'],
      ['Bloodlust', 'Estado de furia alimentada por sangre para combate agresivo.'],
      ['Crimson Tide', 'Oleada carmesí que sugiere presión ofensiva en un área.'],
      ['Haruspicy', 'Lectura ritual de vísceras; base ideal para adivinación de rol.'],
      ['Venesection', 'Extracción o corte de sangre con intención mágica.'],
      ['Minor Arcana: Three of Swords', 'Arcano menor de tres espadas; simbolismo de heridas y sacrificio.']
    ]
  },
  {
    id: 'hueso', name: 'Hueso', count: 3, image: 'escuela-02.jpg', glyph: '†', affinity: 'bone',
    description: 'Proyectiles óseos, restos mortales y formas espectrales.',
    spells: [
      ['Bone Spike', 'Púa de hueso que irrumpe como ataque directo.'],
      ['Bone Spirit', 'Espíritu óseo proyectado o vinculado a restos mortales.'],
      ['Skull Throw', 'Lanzamiento de cráneo como proyectil nigromántico.']
    ]
  },
  {
    id: 'tierra', name: 'Tierra', count: 7, image: 'escuela-13.jpg', glyph: '❧', affinity: 'earth',
    description: 'Roca, vegetación y fuerzas regenerativas.',
    spells: [
      ['Boulder', 'Bloque de piedra empleado como impacto pesado.'],
      ['Mandrake', 'Invocación o manifestación de mandrágora; naturaleza extraña.'],
      ['Nature Rejuvenation', 'Rejuvenecimiento natural; afinidad con recuperación.'],
      ['Nature’s Gifts', 'Don de la naturaleza con posible efecto de apoyo o recurso.'],
      ['Rolling Stone', 'Roca en movimiento para presión ofensiva o bloqueo.'],
      ['Weaved Pillar', 'Pilar moldeado como obstáculo, cobertura o construcción.'],
      ['Wild Blooming', 'Floración súbita para alterar un entorno.']
    ]
  },
  {
    id: 'eldritch', name: 'Eldritch', count: 5, image: 'escuela-11.jpg', glyph: '𖤐', affinity: 'eldritch',
    description: 'Éter, sombras y manifestaciones antinaturales.',
    spells: [
      ['Ectoplasm', 'Materia ectoplásmica con aplicación espectral u ofensiva.'],
      ['False Shadow', 'Sombra falsa asociada a engaño y ocultación visual.', true],
      ['Inhuman Scream', 'Alarido sobrenatural para intimidación o disrupción.'],
      ['Stolen Shadow', 'Manipulación de la sombra de otra criatura.'],
      ['Winds of Ether', 'Corrientes de éter para impacto, defensa o desplazamiento.']
    ]
  },
  {
    id: 'ferromancia', name: 'Ferromancia', count: 5, image: 'escuela-04.jpg', glyph: '⌘', affinity: 'iron',
    description: 'Metal, sujeción, movilidad y refuerzo.',
    spells: [
      ['Grappling Hook', 'Gancho mágico para atracción o movilidad vertical.'],
      ['Grip of Iron', 'Presa férrea: concepto de sujeción sobre objetivos.'],
      ['Slag Blast', 'Explosión de escoria o metal recalentado.'],
      ['The Crucible of Memory', 'Crisol vinculado a memorias; ritual de reconstrucción simbólica.'],
      ['Word of Steel: Unchain', 'Palabra de acero para romper ataduras o liberar metal.']
    ]
  },
  {
    id: 'fuego', name: 'Fuego', count: 11, image: 'escuela-05.jpg', glyph: '♨', affinity: 'fire',
    description: 'Combate incendiario y control térmico.',
    spells: [
      ['Blast Wave', 'Onda expansiva para golpear o apartar enemigos.'],
      ['Burning Embers', 'Ascuas abrasadoras: hostigamiento o daño residual.'],
      ['Enchanted Campfire', 'Fuego encantado de utilidad ambiental o ritual.'],
      ['Fireball', 'Bola de fuego destinada a daño explosivo a distancia.'],
      ['Firework', 'Efecto pirotécnico que puede servir como señal o distracción.'],
      ['Heat Wave', 'Oleada de calor que afecta un espacio frontal.'],
      ['Hellfire', 'Llama infernal de carácter destructivo e intimidante.'],
      ['Magmatic Wall', 'Muro magmático para bloquear paso y crear zonas peligrosas.'],
      ['Meteor Shower', 'Lluvia de meteoros orientada al ataque de área.'],
      ['Small Fireball', 'Versión reducida de un proyectil ígneo.'],
      ['The Scorching Haze', 'Bruma abrasadora o calor difuso que amenaza un sector.']
    ]
  },
  {
    id: 'luz', name: 'Luz', count: 6, image: 'escuela-03.jpg', glyph: '☼', affinity: 'light',
    description: 'Rayos, percepción y ocultación.',
    spells: [
      ['Invisibility', 'Oculta por completo al mago frente a quienes no son aliados.', true],
      ['Light Beam', 'Haz luminoso proyectado de manera directa.'],
      ['Star Ray', 'Rayo estelar dirigido a un enemigo.'],
      ['Starflare', 'Destello estelar de gran intensidad; presión luminosa.'],
      ['Spark of Light', 'Pequeña chispa de luz con función utilitaria.'],
      ['Transcendent Vision', 'Visión trascendente; percepción extraordinaria en rol.']
    ]
  },
  {
    id: 'mental', name: 'Mental', count: 5, image: 'escuela-09.jpg', glyph: '◉', affinity: 'mind',
    description: 'Sueño, voluntad y fuerza psíquica.',
    spells: [
      ['Call to Slumber', 'Llamada al sueño para neutralización no letal.'],
      ['Charm', 'Encantamiento de voluntad o influencia sobre otro ser.'],
      ['Psychic Attack', 'Agresión psíquica; alternativa narrativa a golpes físicos.'],
      ['Psychokinesis Push', 'Empuje telequinético para desplazar objetivos.'],
      ['Prismatic Cone', 'Cono prismático con potencial de alteración perceptiva.']
    ]
  },
  {
    id: 'sigilos', name: 'Sigilos', count: 7, image: 'escuela-10.jpg', glyph: '⌖', affinity: 'sigil',
    description: 'Círculos protectores, trampas y geometría ritual.',
    spells: [
      ['Abyssal Keep', 'Fortificación o recinto abisal para control territorial.'],
      ['Circle of Lesser Concealment', 'Círculo de ocultación menor para encubrir una posición.'],
      ['Demon’s Web', 'Trama demoníaca orientada a retener o dificultar paso.'],
      ['Last Breath', 'Sello del último aliento; apto para una escena límite.'],
      ['Trap', 'Trampa mágica que se activa en condiciones determinadas.'],
      ['Sigil of Enmity', 'Sigilo que marca hostilidad o enemistad.'],
      ['Shield Dome', 'Cúpula defensiva que repele intrusos; radio según habilidad.', true]
    ]
  },
  {
    id: 'invocacion', name: 'Invocación', count: 0, image: 'escuela-12.jpg', glyph: '⟁', affinity: 'summon',
    description: 'Escuela reconocida; lista de hechizos individuales no verificada.',
    spells: [],
    pending: 'La escuela de Invocación aparece entre los tomos del complemento, pero la lista consultada no incluye páginas de hechizos individuales bajo este apartado. No se atribuyen nombres ni mecánicas no comprobadas.',
    adminNote: 'Mantener esta disciplina bloqueada hasta verificar el grimorio instalado. Una vez confirmadas sus invocaciones, establecer límites de criaturas, duración, control y convivencia con otras mecánicas del servidor.'
  },
  {
    id: 'venenomancia', name: 'Venenomancia', count: 3, image: 'escuela-16.jpg', glyph: '♆', affinity: 'venom',
    description: 'Serpientes, toxinas y emanaciones nocivas.',
    spells: [
      ['Ophiuchus', 'Arte serpentario de nombre zodiacal; efecto por verificar.'],
      ['Poison Breath', 'Exhalación venenosa en cono; área recalculada en actualización.', true],
      ['Aspids Fangs', 'Colmillos de áspid: concepto de ataque tóxico.']
    ]
  },
  {
    id: 'agua', name: 'Agua', count: 7, image: 'escuela-08.jpg', glyph: '≈', affinity: 'water',
    description: 'Hielo, caudales y fenómenos acuáticos.',
    spells: [
      ['Arctic Flow', 'Corriente helada canalizada que afecta su dirección frontal.', true],
      ['Frozen Orb', 'Orbe de hielo para hostigar o controlar distancia.'],
      ['Geyser', 'Chorro de agua eruptiva procedente del suelo.'],
      ['Ice Arrow', 'Flecha helada para ataque preciso.'],
      ['Pure Water', 'Agua pura con utilidad ritual o de supervivencia.'],
      ['Tidal Wave', 'Oleada acuática para presión sobre varios objetivos.'],
      ['Water Sphere', 'Esfera de agua para encierro, defensa u otra utilidad a comprobar.']
    ]
  },
  {
    id: 'taumaturgia-blanca', name: 'Taumaturgia Blanca', count: 8, image: 'escuela-06.jpg', glyph: '✥', affinity: 'white',
    description: 'Protecciones, auxilio y milagros.',
    spells: [
      ['Bless of Quickness', 'Bendición de rapidez para mejorar movimiento o reacción.'],
      ['Blessed Candles', 'Velas bendecidas como soporte luminoso o ritual.'],
      ['Borrowed Time', 'Tiempo prestado: supervivencia contra un desenlace próximo.'],
      ['Divine Hammer', 'Martillo divino manifestado como golpe sagrado.'],
      ['Goliath Shield', 'Escudo colosal para protección o bloqueo.'],
      ['Healing', 'Hechizo de curación incorporado a la escuela blanca.', true],
      ['Holy Arrow', 'Flecha sagrada usada para ataque luminoso.'],
      ['Resurrection', 'Regreso de un caído; límites jugables por confirmar.']
    ]
  }
];

const recentDiscoveries = [
  {
    name: 'Mineral Spring', school: 'Agua + Tierra', schools: ['agua', 'tierra'], source: 'Notas del 21 nov. 2026',
    description: 'Invoca un manantial termal: descansar allí aumenta el aguante. Requiere ambas escuelas a rango 3.',
    categories: ['survival']
  },
  {
    name: 'Firebrand Weapon', school: 'Fuego', schools: ['fuego'], source: 'Notas del 21 nov. 2026',
    description: 'Encantamiento modal del arma: causa quemaduras al golpear en combate cuerpo a cuerpo.',
    categories: ['combat']
  },
  {
    name: 'Body of Iron', school: 'Ferromancia', schools: ['ferromancia'], source: 'Notas del 21 nov. 2026',
    description: 'Refuerza armadura, devuelve parte del daño e impide derribos, a cambio de maná y velocidad.',
    categories: ['combat', 'survival']
  },
  {
    name: 'Thermal Beam', school: 'Luz + Fuego', schools: ['luz', 'fuego'], source: 'Notas del 26 oct. 2026',
    description: 'Rayo térmico híbrido; combina Light Beam y dominio del fuego.',
    categories: ['combat']
  }
];

const utilityCategories = [
  {
    id: 'exploration', icon: '⌁', title: 'Viaje y exploración',
    spells: CATEGORY_SPELLS.exploration,
    description: 'Acortan trayectos o resuelven terrenos difíciles. Conviene fijar restricciones de zonas y eventos.'
  },
  {
    id: 'combat', icon: '⚔', title: 'Combate y control',
    spells: CATEGORY_SPELLS.combat,
    description: 'Aportan ofensiva, protección y control. Equilibrar su uso contra el PvP y jefes.'
  },
  {
    id: 'intrigue', icon: '◌', title: 'Intriga y sigilo',
    spells: CATEGORY_SPELLS.intrigue,
    description: 'Perfectos para infiltración e investigación, con límites claros al consentimiento y percepción.'
  },
  {
    id: 'survival', icon: '✥', title: 'Sostén y supervivencia',
    spells: CATEGORY_SPELLS.survival,
    description: 'Útiles fuera y dentro del combate; definir descansos, recuperación y recursos.'
  },
  {
    id: 'ritual', icon: '☽', title: 'Rituales y magia oculta',
    spells: CATEGORY_SPELLS.ritual,
    description: 'Buenos candidatos a secretos narrativos, tras comprobar su mecánica real en servidor.'
  }
];

const initiations = [
  ['I', 'Descubrir', 'Rumor, inscripción, testigo o página que indique dónde empieza la búsqueda.'],
  ['II', 'Investigar', 'Localizar fuentes y resolver una prueba de Hechicería; el fallo genera pistas incompletas o contratiempos.'],
  ['III', 'Reunir', 'Conseguir un tomo, catalizador, maestro o lugar singular; preferiblemente con escena compartida.'],
  ['IV', 'Descifrar', 'Tirada de Hechicería para comprender el patrón sin dominarlo aún.'],
  ['V', 'Soportar', 'Tirada de Aguante para resistir desgaste, canalización y consecuencias físicas del rito.'],
  ['VI', 'Consagrar', 'Rito final, condición narrativa y autorización del administrador para desbloquear la magia.']
];

const occultCases = [
  {
    number: '01', name: 'Resurrection', school: 'Taumaturgia Blanca',
    story: 'Búsqueda del Libro de los Últimos Nombres. La prueba de Hechicería descifra el principio vital; la de Aguante mide si el oficiante resiste el rito. El desenlace requiere arbitraje de muerte y resurrección en rol.',
    tests: 'Hechicería para descifrar el principio vital; Aguante para resistir el rito.',
    risk: 'Muy alta: altera el peso narrativo de la muerte.'
  },
  {
    number: '02', name: 'Sword of Damocles', school: 'Maldición',
    story: 'La espada solo se enseña al recuperar un juramento profanado. Hechicería permite comprender la sentencia; Aguante determina el precio de sostener una maldición prolongada.',
    tests: 'Hechicería para comprender la sentencia; Aguante para sostener la maldición.',
    risk: 'Alta: exige evitar ejecuciones automáticas sin contrajuego.'
  },
  {
    number: '03', name: 'The Crucible of Memory', school: 'Ferromancia',
    story: 'El buscador reúne memorias materiales en un yunque antiguo. Hechicería reconstruye la fórmula y Aguante soporta su resonancia. Se negocia qué recuerdos son accesibles.',
    tests: 'Hechicería para reconstruir la fórmula; Aguante para soportar su resonancia.',
    risk: 'Media/alta: efecto jugable exacto todavía no documentado.'
  }
];

const state = {
  openSpell: null,
  openSchool: null,
  returnSchool: null,
  returnFocus: null,
  search: '',
  schoolFilter: '',
  categoryFilter: ''
};

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const categoriesForSpell = (spellName) => Object.keys(CATEGORY_SPELLS)
  .filter((categoryId) => CATEGORY_SPELLS[categoryId].includes(spellName));

const allSpells = () => schools.flatMap((school) => school.spells.map(([name, description, verified]) => ({
  name, description, verified: Boolean(verified), school: school.name, schoolId: school.id, categories: categoriesForSpell(name)
})));

const getSpell = (name) => {
  const catalogSpell = allSpells().find((spell) => spell.name === name);
  if (catalogSpell) return catalogSpell;
  const recentSpell = recentDiscoveries.find((spell) => spell.name === name);
  return recentSpell ? {
    ...recentSpell, verified: true, schoolId: recentSpell.schools[0], categories: recentSpell.categories
  } : null;
};

const renderSpellButton = (name, description, school, verified, categories = [], extraClass = '') => `
  <article class="grim-spell-card grim-affinity--${schools.find((item) => item.name === school)?.id || recentDiscoveries.find((item) => item.name === name)?.schools[0] || 'arcana'} ${extraClass}" data-spell-name="${escapeHtml(name)}"
    data-school="${escapeHtml(schools.find((item) => item.name === school)?.id || recentDiscoveries.find((item) => item.name === name)?.schools.join(' ') || '')}"
    data-categories="${escapeHtml(categories.join(' '))}">
    <button class="grim-spell-name" type="button" data-grim-action="spell" data-spell="${escapeHtml(name)}">
      <span>${escapeHtml(name)}</span><span class="grim-spell-arrow" aria-hidden="true">↗</span>
    </button>
    <p>${escapeHtml(description)}</p>
    <div class="grim-spell-meta">
      <span class="grim-school-tag">${escapeHtml(school)}</span>
      <span class="grim-status ${verified ? 'is-verified' : ''}">${verified ? 'Verificado' : 'Lectura para rol'}</span>
    </div>
  </article>
`;

const renderSchoolCard = (school, index) => `
  <article class="grim-atlas-card grim-affinity--${school.affinity}" style="--card-index:${index}">
    <button class="grim-atlas-art" type="button" data-grim-action="artwork" data-school="${school.id}"
      aria-label="Ampliar ilustración: ${escapeHtml(school.name)}">
      <img src="./assets/grimorio/${school.image}" alt="Ilustración temática de ${escapeHtml(school.name)}"
        loading="lazy" width="293" height="293" />
      <span class="grim-rune" aria-hidden="true">${school.glyph}</span>
      <span class="grim-art-open">Abrir ilustración</span>
    </button>
    <div class="grim-atlas-copy">
      <button class="grim-atlas-title" type="button" data-grim-action="school" data-school="${school.id}">
        ${escapeHtml(school.name)} <span aria-hidden="true">↗</span>
      </button>
      <div class="grim-atlas-meta">
        <span>${school.count ? `${school.count} hechizos` : 'Catálogo pendiente'}</span>
        <span class="grim-glyph" aria-hidden="true">${school.glyph}</span>
      </div>
    </div>
  </article>
`;

const renderSchoolSection = (school, index) => `
  <section class="grim-school-section grim-affinity--${school.affinity}" id="grim-school-${school.id}" data-school-section="${school.id}">
    <div class="grim-school-heading">
      <div class="grim-school-heading-art">
        <img src="./assets/grimorio/${school.image}" alt="" loading="lazy" width="293" height="293" />
        <span aria-hidden="true">${school.glyph}</span>
      </div>
      <div class="grim-school-heading-copy">
        <p class="grim-kicker">Tomo ${String(index + 1).padStart(2, '0')} · Escuela arcana</p>
        <h3>${escapeHtml(school.name)}</h3>
        <p>${escapeHtml(school.description)}</p>
        <span class="grim-count">${school.count ? `${school.count} hechizos identificados` : 'Catálogo pendiente de verificación'}</span>
      </div>
      <button class="grim-back-atlas" type="button" data-grim-action="atlas">↑ Volver al Atlas</button>
    </div>
    ${school.spells.length
      ? `<div class="grim-spell-grid">${school.spells.map(([name, description, verified]) =>
        renderSpellButton(name, description, school.name, verified, categoriesForSpell(name))).join('')}</div>`
      : `<div class="grim-invocation-note"><p>${escapeHtml(school.pending)}</p><aside><span>Propuesta para administración</span><p>${escapeHtml(school.adminNote)}</p></aside></div>`}
    <div class="grim-school-turn">
      <span>El folio ${String(index + 1).padStart(2, '0')} de 16</span>
      <div class="grim-school-turn-actions">
        ${schools[index - 1] ? `<button type="button" data-grim-action="school" data-school="${schools[index - 1].id}">← ${escapeHtml(schools[index - 1].name)}</button>` : ''}
        ${schools[index + 1]
          ? `<button type="button" data-grim-action="school" data-school="${schools[index + 1].id}">${escapeHtml(schools[index + 1].name)} →</button>`
          : '<button type="button" data-grim-action="atlas">Regresar al Atlas ↑</button>'}
      </div>
    </div>
  </section>
`;

const renderCategory = (category) => `
  <details class="grim-utility-card grim-affinity--${category.id}" data-utility="${category.id}">
    <summary>
      <span class="grim-utility-icon" aria-hidden="true">${category.icon}</span>
      <span class="grim-utility-title">${escapeHtml(category.title)}</span>
      <span class="grim-utility-count">${category.spells.length} referencias</span>
    </summary>
    <p>${escapeHtml(category.description)}</p>
    <div class="grim-utility-spells">
      ${category.spells.map((name) => {
        const spell = getSpell(name);
        return spell ? `
          <article class="grim-utility-spell">
            <button type="button" data-grim-action="spell" data-spell="${escapeHtml(name)}">${escapeHtml(name)}</button>
            <p>${escapeHtml(spell.description)}</p>
            <div><span>${escapeHtml(spell.school)}</span><span class="grim-status ${spell.verified ? 'is-verified' : ''}">${spell.verified ? 'Verificado' : 'Lectura para rol'}</span></div>
          </article>` : '';
      }).join('')}
    </div>
  </details>
`;

const renderModal = () => {
  if (state.openSchool) {
    const index = schools.findIndex((item) => item.id === state.openSchool);
    const school = schools[index];
    if (!school) return '';
    return `
      <div class="grim-modal-backdrop" data-grim-action="close-modal">
        <section class="grim-school-modal grim-affinity--${school.affinity}" role="dialog" aria-modal="true"
          aria-labelledby="grim-modal-title" data-grim-dialog>
          <button class="grim-modal-close" type="button" data-grim-action="close-modal" aria-label="Cerrar">×</button>
          <header class="grim-school-modal-heading">
            <img src="./assets/grimorio/${school.image}" alt="Ilustración temática de ${escapeHtml(school.name)}" width="293" height="293" />
            <div><p class="grim-kicker">Tomo ${String(index + 1).padStart(2, '0')} · Escuela arcana</p>
              <h3 id="grim-modal-title">${escapeHtml(school.name)}</h3>
              <p>${escapeHtml(school.description)}</p>
              <span class="grim-count">${school.count ? `${school.count} hechizos identificados` : 'Catálogo pendiente de verificación'}</span>
            </div>
          </header>
          <p class="grim-school-modal-hint">Abre un hechizo para consultar su descripción completa y estado documental.</p>
          ${school.spells.length
            ? `<div class="grim-school-modal-spells">${school.spells.map(([name, description, verified]) =>
              renderSpellButton(name, description, school.name, verified, categoriesForSpell(name))).join('')}</div>`
            : `<div class="grim-invocation-note"><p>${escapeHtml(school.pending)}</p><aside><span>Propuesta para administración</span><p>${escapeHtml(school.adminNote)}</p></aside></div>`}
          <footer class="grim-school-modal-footer">
            ${schools[index - 1] ? `<button type="button" data-grim-action="school" data-school="${schools[index - 1].id}">← ${escapeHtml(schools[index - 1].name)}</button>` : '<span></span>'}
            <span>Folio ${String(index + 1).padStart(2, '0')} de 16</span>
            ${schools[index + 1] ? `<button type="button" data-grim-action="school" data-school="${schools[index + 1].id}">${escapeHtml(schools[index + 1].name)} →</button>` : '<span></span>'}
          </footer>
        </section>
      </div>`;
  }
  if (state.openSpell) {
    const spell = getSpell(state.openSpell);
    if (!spell) return '';
    const school = schools.find((item) => item.id === spell.schoolId);
    return `
      <div class="grim-modal-backdrop" data-grim-action="close-modal">
        <section class="grim-spell-modal grim-affinity--${school?.affinity || 'arcana'}" role="dialog" aria-modal="true"
          aria-labelledby="grim-modal-title" data-grim-dialog>
          <button class="grim-modal-close" type="button" data-grim-action="close-modal" aria-label="Cerrar">×</button>
          <div class="grim-modal-book-art" aria-hidden="true">
            ${school ? `<img src="./assets/grimorio/${school.image}" alt="" width="293" height="293" />` : ''}
            <span class="grim-modal-sigil">${school?.glyph || '✧'}</span>
          </div>
          <p class="grim-kicker">Expediente de hechizo · ${escapeHtml(spell.school)}</p>
          <h3 id="grim-modal-title">${escapeHtml(spell.name)}</h3>
          <p class="grim-modal-description">${escapeHtml(spell.description)}</p>
          <div class="grim-modal-status"><span>Escuela</span><strong>${escapeHtml(spell.school)}</strong>
            <span>Estado documental</span><strong class="grim-status ${spell.verified ? 'is-verified' : ''}">${spell.verified ? 'Verificado · respaldado por notas oficiales del mod' : 'Lectura para rol · interpretación basada en el nombre'}</strong>
          </div>
          ${spell.verified ? '' : '<p class="grim-modal-caveat">Esta lectura no confirma parámetros del juego. Comprueba el efecto en el servidor antes de fijar reglas.</p>'}
        </section>
      </div>`;
  }
  return '';
};

export const renderGrimoire = () => {
  const catalogCount = schools.reduce((total, school) => total + school.count, 0);
  return `
    <main class="grimorio" aria-label="Grimorio de Maledicta">
      <div class="grim-reading-progress" aria-label="Progreso de lectura">
        <span class="grim-reading-progress__fill" data-grim-progress></span>
        <span class="grim-reading-progress__label" data-grim-progress-label>Lectura: 0%</span>
      </div>
      <section class="grim-hero" id="grimorio-portada">
        <div class="grim-hero__stars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="grim-hero__seal" aria-hidden="true"><img src="./assets/maledicta-logo.webp" alt="" /><span>✦</span></div>
        <p class="grim-kicker">Archivo arcano · Acceso restringido</p>
        <h2>Grimorio <span>de</span> Maledicta</h2>
        <p class="grim-hero__subtitle">Las dieciséis escuelas del conocimiento arcano</p>
        <p class="grim-hero__motto">El conocimiento arcano permanece escrito para quienes se atrevan a comprenderlo.</p>
        <div class="grim-open-book" aria-label="Representación de un libro antiguo abierto">
          <div class="grim-open-book__page grim-open-book__page--left"><span>ᚨ · ᛟ · ᚾ</span><i>✧</i><small>Lux in tenebris</small></div>
          <div class="grim-open-book__spine" aria-hidden="true"></div>
          <div class="grim-open-book__page grim-open-book__page--right"><span>☽ · ⟁ · ✥</span><i>☼</i><small>Ars memoriae</small></div>
        </div>
        <div class="grim-hero__actions">
          <button type="button" class="grim-primary-button" data-grim-action="atlas">Abrir el Atlas <span>↓</span></button>
          <span>${catalogCount} hechizos catalogados · 4 descubrimientos recientes</span>
        </div>
      </section>

      <section class="grim-decree" aria-labelledby="grim-decree-title">
        <div class="grim-decree__seal" aria-hidden="true">✥</div>
        <div><p class="grim-kicker" id="grim-decree-title">Decreto de acceso</p>
          <blockquote>Los que deseen tener algun tipo de magia del Grimorio de Maledicta, deberán de abrir un hilo en su ticket de pj aprobado y llamarlo "Canal-arcano" para mencionar dentro al staff quien se encargará de asignarte a un narrador.</blockquote>
        </div>
      </section>

      <section class="grim-section" id="grimorio-atlas" aria-labelledby="grim-atlas-title">
        <div class="grim-section-heading"><p class="grim-kicker">Índice ilustrado · 01—16</p>
          <h2 id="grim-atlas-title">Atlas de las 16 escuelas</h2>
          <p>Un mapa visual para encontrar rápidamente cada tipo de hechicería. Selecciona una ilustración para contemplarla o el título para abrir su tomo.</p>
        </div>
        <div class="grim-atlas-grid">${schools.map(renderSchoolCard).join('')}</div>
      </section>

      <section class="grim-section grim-search-section" aria-labelledby="grim-search-title">
        <div class="grim-section-heading"><p class="grim-kicker">Consulta de folios</p>
          <h2 id="grim-search-title">Buscar en el Grimorio</h2>
          <p>Filtra nombres y descripciones del catálogo, incluidos los descubrimientos recientes.</p>
        </div>
        <div class="grim-search-controls">
          <label>Nombre o descripción <input type="search" id="grim-search" value="${escapeHtml(state.search)}" placeholder="Ej. Translocation, invisibilidad…" autocomplete="off" /></label>
          <label>Escuela <select id="grim-school-filter"><option value="">Todas las escuelas</option>${schools.map((school) => `<option value="${school.id}" ${state.schoolFilter === school.id ? 'selected' : ''}>${escapeHtml(school.name)}</option>`).join('')}</select></label>
          <label>Categoría <select id="grim-category-filter"><option value="">Todas las categorías</option>${utilityCategories.map((category) => `<option value="${category.id}" ${state.categoryFilter === category.id ? 'selected' : ''}>${escapeHtml(category.title)}</option>`).join('')}</select></label>
          <p class="grim-search-count" aria-live="polite" data-grim-search-count>97 registros consultables · 93 del catálogo + 4 novedades</p>
        </div>
        <p class="grim-search-empty" data-grim-search-empty hidden>No hay folios que coincidan con esos filtros.</p>
      </section>

      <section class="grim-section grim-recent-section" id="grimorio-novedades" aria-labelledby="grim-recent-title">
        <div class="grim-section-heading"><p class="grim-kicker">Notas oficiales del mod · Actualizaciones 2026</p>
          <h2 id="grim-recent-title">Nuevos descubrimientos arcanos</h2>
          <p>Cuatro conocimientos incorporados a los archivos a partir de notas oficiales del mod. Las escuelas híbridas se indican como aparecen documentadas.</p>
        </div>
        <div class="grim-spell-grid grim-recent-grid">
          ${recentDiscoveries.map((spell) => renderSpellButton(spell.name, spell.description, spell.school, true, spell.categories, 'grim-spell-card--new')).join('')}
        </div>
        <p class="grim-small-note">Mineral Spring requiere Agua y Tierra a rango 3. Firebrand Weapon, Body of Iron y Thermal Beam conservan los requisitos conocidos en sus descripciones documentadas; no se añaden requisitos no publicados.</p>
        <p class="grim-small-note">En octubre se anunciaron tres hechizos de Halloween de efecto principalmente ambiental, pero sus nombres no figuran en las fuentes consultadas; no se inventan fichas para ellos.</p>
      </section>

      <section class="grim-section" id="grimorio-utilidad" aria-labelledby="grim-utility-title">
        <div class="grim-section-heading"><p class="grim-kicker">Índice para aventureros</p>
          <h2 id="grim-utility-title">Utilidad práctica para el rol</h2>
          <p>Clasificación editorial sugerida para elegir escenas y progresión; no equivale a la jerarquía, consumo o potencia oficial del mod.</p>
        </div>
        <div class="grim-utility-grid">${utilityCategories.map(renderCategory).join('')}</div>
      </section>

      <section class="grim-section grim-initiation" id="grimorio-protocolo" aria-labelledby="grim-initiation-title">
        <div class="grim-section-heading"><p class="grim-kicker">Propuesta narrativa · No es una regla oficial</p>
          <h2 id="grim-initiation-title">Protocolo de aprendizaje arcano</h2>
        </div>
        <div class="grim-initiation-path">${initiations.map(([roman, title, description], index) => `
          <details class="grim-initiation-step" ${index === 0 ? 'open' : ''}>
            <summary><span class="grim-initiation-seal">${roman}</span><span><small>Etapa ${roman}</small><strong>${title}</strong></span></summary>
            <p>${escapeHtml(description)}</p>
          </details>`).join('')}
        </div>
        <aside class="grim-director-note"><strong>Criterio para el director de juego</strong>
          <p>Usar dificultades compatibles con el dado real del sistema. Fallar Aguante nunca debería anular automáticamente una buena historia: puede implicar fatiga, cicatriz, pérdida temporal de recursos o una obligación argumental.</p>
          <p>La asignación de narradores y la aprobación de conocimientos mágicos quedan sujetas al procedimiento de Maledicta.</p>
        </aside>
      </section>

      <section class="grim-section grim-case-section" id="grimorio-expedientes" aria-labelledby="grim-cases-title">
        <div class="grim-section-heading"><p class="grim-kicker">Archivo sellado · Expedientes narrativos</p>
          <h2 id="grim-cases-title">Fichas modelo de magia oculta</h2>
          <p>Ejemplos de diseño narrativo, pendientes de configurar y validar en el servidor. No son métodos oficiales de desbloqueo del mod.</p>
        </div>
        <div class="grim-case-grid">${occultCases.map((entry) => `
          <article class="grim-case-file"><div class="grim-case-number">${entry.number} <span>EXPEDIENTE</span></div>
            <p class="grim-kicker">${escapeHtml(entry.school)}</p><h3>${escapeHtml(entry.name)}</h3>
            <p class="grim-case-story">${escapeHtml(entry.story)}</p>
            <div class="grim-case-tests"><strong>Pruebas sugeridas</strong><p>${escapeHtml(entry.tests)}</p></div>
            <div class="grim-case-risk"><strong>Riesgo de balance</strong><p>${escapeHtml(entry.risk)}</p></div>
          </article>`).join('')}
        </div>
      </section>

      <section class="grim-school-library" aria-label="Los tomos de las escuelas">
        <div class="grim-library-heading"><p class="grim-kicker">Colección completa · 93 hechizos identificados</p>
          <h2>Los tomos de las escuelas</h2>
          <p>Cada folio conserva su grado documental. Los valores exactos, rangos y costes dependen de las fórmulas y de la configuración del servidor.</p>
        </div>
        <div class="grim-all-school-spells">${schools.map(renderSchoolSection).join('')}</div>
      </section>

    </main>`;
};

export const renderGrimoireModal = () => renderModal();

export const handleGrimoireAction = (target, onUpdate) => {
  const button = target.closest('[data-grim-action]');
  if (!button) return false;
  const action = button.dataset.grimAction;

  if (action === 'school') {
    state.returnFocus = { action: 'school', value: button.dataset.school };
    state.returnSchool = null;
    state.openSchool = button.dataset.school;
    state.openSpell = null;
    onUpdate();
    document.querySelector('[data-grim-dialog] .grim-modal-close')?.focus({ preventScroll: true });
    return true;
  }
  if (action === 'atlas') {
    document.querySelector('#grimorio-atlas')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    return true;
  }
  if (action === 'artwork') {
    state.returnFocus = { action: 'artwork', value: button.dataset.school };
    state.returnSchool = null;
    state.openSchool = button.dataset.school;
    state.openSpell = null;
    onUpdate();
    document.querySelector('[data-grim-dialog] .grim-modal-close')?.focus({ preventScroll: true });
    return true;
  }
  if (action === 'spell') {
    state.returnFocus = { action: 'spell', value: button.dataset.spell };
    state.returnSchool = state.openSchool;
    state.openSpell = button.dataset.spell;
    state.openSchool = null;
    onUpdate();
    document.querySelector('[data-grim-dialog] .grim-modal-close')?.focus({ preventScroll: true });
    return true;
  }
  if (action === 'close-modal') {
    if (button.hasAttribute('data-grim-dialog')) return true;
    if (button.classList.contains('grim-modal-backdrop') && target !== button) return true;
    state.openSchool = state.returnSchool;
    state.returnSchool = null;
    state.openSpell = null;
    onUpdate();
    restoreGrimoireFocus();
    return true;
  }
  return false;
};

const restoreGrimoireFocus = () => {
  const target = state.returnFocus;
  if (!target) return;
  const trigger = [...document.querySelectorAll('[data-grim-action]')]
    .find((element) => element.dataset.grimAction === target.action
      && (element.dataset.spell === target.value || element.dataset.school === target.value)
      && element.getClientRects().length > 0);
  trigger?.focus({ preventScroll: true });
  state.returnFocus = null;
};

export const handleGrimoireEscape = (onUpdate) => {
  if (!state.openSpell && !state.openSchool) return false;
  state.openSchool = state.returnSchool;
  state.returnSchool = null;
  state.openSpell = null;
  onUpdate();
  restoreGrimoireFocus();
  return true;
};

export const handleGrimoireTab = (event) => {
  const dialog = document.querySelector('[data-grim-dialog]');
  if (!dialog || event.key !== 'Tab') return false;
  const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return false;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
  return true;
};

export const handleGrimoireFilters = () => {
  const root = document.querySelector('.grimorio');
  if (!root) return;
  const query = normalize(root.querySelector('#grim-search')?.value);
  const schoolId = root.querySelector('#grim-school-filter')?.value || '';
  const categoryId = root.querySelector('#grim-category-filter')?.value || '';
  state.search = root.querySelector('#grim-search')?.value || '';
  state.schoolFilter = schoolId;
  state.categoryFilter = categoryId;
  const cards = [...root.querySelectorAll('.grim-spell-card')];
  let visible = 0;
  cards.forEach((card) => {
    const schoolMatch = !schoolId || card.dataset.school.split(/\s+/).includes(schoolId);
    const categoryMatch = !categoryId || card.dataset.categories.split(/\s+/).includes(categoryId);
    const queryMatch = !query || normalize(card.textContent).includes(query);
    const show = schoolMatch && categoryMatch && queryMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  root.querySelector('[data-grim-search-count]').textContent = `${visible} ${visible === 1 ? 'hechizo visible' : 'hechizos visibles'}`;
  root.querySelector('[data-grim-search-empty]').hidden = visible !== 0;
};

export const updateGrimoireProgress = () => {
  const root = document.querySelector('.grimorio');
  if (!root) return;
  const rect = root.getBoundingClientRect();
  const fullHeight = root.scrollHeight - window.innerHeight;
  const progress = fullHeight > 0 ? Math.max(0, Math.min(100, (-rect.top / fullHeight) * 100)) : 0;
  const fill = root.querySelector('[data-grim-progress]');
  const label = root.querySelector('[data-grim-progress-label]');
  if (fill) fill.style.width = `${progress}%`;
  if (label) label.textContent = `Lectura: ${Math.round(progress)}%`;
};

window.addEventListener('scroll', updateGrimoireProgress, { passive: true });
