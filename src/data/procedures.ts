
export const procedures = [
  {
    title: 'Caminhoes Cacamba',
    subtext: 'Locacao de caminhoes cacamba para mineracao e terraplanagem — Mercedes Benz Axor 3131 e VW 3260.',
    procedures: ['MB Axor 3131', 'VW 3260', 'Mineracao', 'Terraplanagem'],
  },
  {
    title: 'Caminhao Munck',
    subtext: 'Icamento e movimentacao de cargas pesadas ate 10.000 kg — Ford Cargo 2629 e MB Atego 3133.',
    procedures: ['Ford Cargo 2629', 'MB Atego 3133', 'Icamento', 'Cesto Aereo'],
  },
  {
    title: 'Escavadeira XCMG',
    subtext: 'Peso operacional 22.500 kg, cacamba 1,2 m3. Alta performance para terraplanagem e mineracao.',
    procedures: ['22.500 kg', '1,2 m3', 'Terraplanagem', 'Mineracao'],
  },
  {
    title: 'Retroescavadeira JCB',
    subtext: 'Peso 8.185 kg, escavacao ate 4,54 m. Ideal para obras urbanas e servicos agricolas.',
    procedures: ['8.185 kg', '4,54 m', 'Obras Urbanas', 'Agricola'],
  },
];

// Opções para aba "Aluguel de Equipamentos"
export const rentalGroups = [
  {
    label: 'Caminhões',
    options: [
      'Caçamba — MB Axor 3131',
      'Caçamba — VW 3260',
      'Pipa — MB Axor 3131',
      'Munck — Ford Cargo 2629 6x4',
      'Munck — MB Atego 3133/48 6x4',
    ],
  },
  {
    label: 'Máquinas e Equipamentos',
    options: [
      'Escavadeira XCMG (22.500 kg)',
      'Retroescavadeira JCB (8.185 kg)',
    ],
  },
  {
    label: 'Outros',
    options: ['Outro (especificar nas observações)'],
  },
];

// Opções para aba "Prestação de Serviço"
export const serviceGroups = [
  {
    label: 'Mineração',
    options: [
      'Transporte de Minério — Mineração',
      'Transporte de Resíduos — Mineração',
      'Umectação de Solo — Mineração',
    ],
  },
  {
    label: 'Fazendas e Agronegócio',
    options: [
      'Abertura de Valas — Agronegócio',
      'Recuperação de Estradas — Agronegócio',
      'Limpeza de Terrenos — Agronegócio',
      'Carregamento de Materiais — Agronegócio',
      'Tanques e Represas — Agronegócio',
    ],
  },
  {
    label: 'Indústrias e Áreas Industriais',
    options: [
      'Terraplanagem Industrial',
      'Escavação para Fundações — Industrial',
      'Carregamento a Granel — Industrial',
      'Movimentação de Carga — Industrial',
    ],
  },
  {
    label: 'Uso Residencial',
    options: [
      'Limpeza de Entulhos — Residencial',
      'Preparação de Terreno — Residencial',
    ],
  },
  {
    label: 'Outros',
    options: ['Outro (especificar nas observações)'],
  },
];

// Unificado para ContactSection: equipamentos + serviços
export const procedureGroups = [
  {
    label: 'Locação de Equipamentos',
    options: [
      'Caçamba — MB Axor 3131',
      'Caçamba — VW 3260',
      'Pipa — MB Axor 3131',
      'Munck — Ford Cargo 2629 6x4',
      'Munck — MB Atego 3133/48 6x4',
      'Escavadeira XCMG (22.500 kg)',
      'Retroescavadeira JCB (8.185 kg)',
    ],
  },
  {
    label: 'Serviços — Mineração',
    options: [
      'Transporte de Minério',
      'Transporte de Resíduos',
      'Umectação de Solo',
    ],
  },
  {
    label: 'Serviços — Agronegócio',
    options: [
      'Abertura de Valas',
      'Recuperação de Estradas Rurais',
      'Limpeza de Terrenos',
      'Carregamento de Materiais',
      'Tanques e Represas',
      'Irrigação',
    ],
  },
  {
    label: 'Serviços — Industrial / Construção Civil',
    options: [
      'Terraplanagem Industrial',
      'Escavação para Fundações',
      'Carregamento a Granel',
      'Movimentação de Carga',
      'Içamento de Cargas Pesadas',
      'Demolição Moderada',
      'Obras de Infraestrutura',
    ],
  },
  {
    label: 'Serviços — Residencial',
    options: [
      'Limpeza de Entulhos',
      'Preparação de Terreno',
    ],
  },
  {
    label: 'Outros',
    options: ['Outro (especificar nas observações)'],
  },
];
