
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
    title: 'Escavadeiras',
    subtext: 'Peso operacional 22.500 kg, cacamba 1,2 m3. Alta performance para terraplanagem e mineracao.',
    procedures: ['22.500 kg', '1,2 m3', 'Terraplanagem', 'Mineracao'],
  },
  {
    title: 'Retroescavadeiras',
    subtext: 'Peso 8.185 kg, escavacao ate 4,54 m. Ideal para obras urbanas e servicos agricolas.',
    procedures: ['8.185 kg', '4,54 m', 'Obras Urbanas', 'Agricola'],
  },
  {
    title: 'Carregadeiras',
    subtext: 'Capacidade de cacamba ate 3,0 m3. Carregamento a granel e movimentacao de terra.',
    procedures: ['3,0 m3', 'Carregamento', 'Mineracao', 'Terraplanagem'],
  },
];

// Opções para aba "Aluguel de Equipamentos"
export const rentalGroups = [
  {
    label: 'Caminhões',
    options: [
      'Caminhões Basculantes — MB Axor 3131',
      'Caminhões Basculantes — VW 3260',
      'Caminhões Pipa — MB Axor 3131',
      'Caminhões Munck — Ford Cargo 2629 6x4',
      'Caminhões Munck — MB Atego 3133/48 6x4',
    ],
  },
  {
    label: 'Máquinas e Equipamentos',
    options: [
      'Escavadeiras (22.500 kg)',
      'Retroescavadeiras (8.185 kg)',
      'Carregadeiras',
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
      'Escavação em Mineração — Escavadeiras',
      'Carregamento a Granel — Mineração',
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
      'Limpeza de Estábulos — Agronegócio',
      'Carregamento de Insumos — Agronegócio',
      'Obras Rurais — Escavadeiras',
      'Serviços Agrícolas — Retroescavadeiras',
      'Transporte em Obras Rurais — Caminhões Basculantes',
    ],
  },
  {
    label: 'Indústrias e Áreas Industriais',
    options: [
      'Terraplanagem Industrial',
      'Escavação para Fundações — Industrial',
      'Carregamento a Granel — Industrial',
      'Movimentação de Carga — Industrial',
      'Manutenção de Infraestrutura — Industrial',
      'Demolição e Infraestrutura — Escavadeiras',
      'Construção Civil — Escavadeiras',
      'Construção Civil — Munck',
    ],
  },
  {
    label: 'Terraplanagem e Obras',
    options: [
      'Terraplanagem e Nivelamento — Retroescavadeiras',
      'Escavação Profunda — Retroescavadeiras',
      'Carregamento de Materiais — Retroescavadeiras',
      'Limpeza de Terrenos — Retroescavadeiras',
      'Transporte em Terraplanagem — Caminhões Basculantes',
    ],
  },
  {
    label: 'Carregadeiras',
    options: [
      'Carregamento a Granel — Carregadeiras',
      'Movimentação de Terra — Carregadeiras',
      'Suporte à Mineração — Carregadeiras',
      'Obras Rurais — Carregadeiras',
    ],
  },
  {
    label: 'Caminhões Munck',
    options: [
      'Içamento de Cargas Pesadas — Munck',
      'Transporte e Logística — Munck',
      'Operações com Cesto Aéreo — Munck',
    ],
  },
  {
    label: 'Caminhões Pipa',
    options: [
      'Umectação de Solo — Pipa',
      'Terraplanagem — Pipa',
      'Limpeza — Pipa',
      'Irrigação — Pipa',
    ],
  },
  {
    label: 'Uso Residencial',
    options: [
      'Limpeza de Entulhos — Residencial',
      'Içamento e Movimentação — Residencial',
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
      'Caminhões Basculantes — MB Axor 3131',
      'Caminhões Basculantes — VW 3260',
      'Caminhões Pipa — MB Axor 3131',
      'Caminhões Munck — Ford Cargo 2629 6x4',
      'Caminhões Munck — MB Atego 3133/48 6x4',
      'Escavadeiras (22.500 kg)',
      'Retroescavadeiras (8.185 kg)',
      'Carregadeiras',
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
