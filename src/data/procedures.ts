
export const procedures = [
  {
    title: 'Carga Geral',
    subtext: 'Transporte de mercadorias diversas, embaladas ou paletizadas, com manuseio cuidadoso e entrega segura.',
    procedures: ['Paletizada', 'Granel', 'Embalada', 'Conteineirizada'],
  },
  {
    title: 'Carga Refrigerada',
    subtext: 'Controle de temperatura de -18 a +12 graus para produtos que exigem cadeia fria ininterrupta.',
    procedures: ['Alimentos', 'Farmaceuticos', 'Quimicos', 'Flores'],
  },
  {
    title: 'Carga Fracionada',
    subtext: 'Solucao economica para volumes menores. Sua carga compartilha o espaco com seguranca e rapidez.',
    procedures: ['Pequenos volumes', 'Encomendas', 'Pecas'],
  },
  {
    title: 'Carga Perigosa',
    subtext: 'Transporte especializado de produtos quimicos, inflamaveis e materiais perigosos conforme normas MOPP.',
    procedures: ['Quimicos', 'Inflamaveis', 'Corrosivos', 'MOPP'],
  },
  {
    title: 'Mudancas e Transferencias',
    subtext: 'Servico completo de mudanca residencial e corporativa com embalagem, transporte e entrega.',
    procedures: ['Residencial', 'Corporativo', 'Internacional'],
  },
  {
    title: 'Logistica Dedicada',
    subtext: 'Frota exclusiva e motorista dedicado para operacoes continuas com SLA garantido.',
    procedures: ['Frota exclusiva', 'Contrato', 'SLA'],
  },
];

export const procedureGroups = [
  {
    label: 'Cargas Gerais',
    options: [
      'Carga Geral Paletizada',
      'Carga Geral a Granel',
      'Carga Fracionada',
    ],
  },
  {
    label: 'Cargas Especiais',
    options: [
      'Carga Refrigerada (frio)',
      'Carga Refrigerada (congelada)',
      'Carga Perigosa (MOPP)',
      'Carga Superdimednsionada',
      'Carga de Alto Valor',
    ],
  },
  {
    label: 'Servicos Especificos',
    options: [
      'Mudanca Residencial',
      'Mudanca Corporativa',
      'Logistica Dedicada (contrato)',
      'Distribuicao Urbana',
      'Cross-docking',
    ],
  },
  {
    label: 'Outros',
    options: ['Outro (especificar nas observacoes)'],
  },
];
