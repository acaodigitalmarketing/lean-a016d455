
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
    label: 'Serviços',
    options: [
      'Terraplanagem',
      'Mineração',
      'Obras Rurais e Agrícolas',
      'Construção Civil',
      'Movimentação de Cargas Especiais',
      'Escavação e Valas',
      'Nivelamento de Terreno',
    ],
  },
  {
    label: 'Outros',
    options: ['Outro (especificar nas observações)'],
  },
];

// Mantido por compatibilidade (ContactSection)
export const procedureGroups = [...rentalGroups];
