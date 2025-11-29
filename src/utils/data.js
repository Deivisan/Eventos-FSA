/**
 * EventosFSA - Dados Mockados
 * Arquivo central com todos os dados de demonstração
 */

// ========== BAIRROS DE FEIRA DE SANTANA ==========
const BAIRROS = {
  centro: [
    'Centro', 'Ponto Central', 'Queimadinha', 'Capuchinhos', 'Kalilândia', 'Sobradinho'
  ],
  norte: [
    'Tomba', 'Feira X', 'Parque Ipê', 'Campo Limpo', 'Aviário', 'Subaé',
    'Cidade Nova', 'Conceição I', 'Conceição II', 'Conceição III', 'Conceição IV',
    'Gabriela I', 'Gabriela II', 'Gabriela III', 'Viveiros', 'Feira VII', 'Feira IX',
    'Feira VI', 'Morada das Árvores', 'Rua Nova'
  ],
  sul: [
    'SIM', 'Mangabeira', 'Brasília', 'Papagaio', 'Santa Mônica', 'Jardim Cruzeiro',
    'Jardim Acácia', 'Lagoa Salgada', 'Lagoa Grande', 'Pedra do Descanso', 'Asa Branca',
    'Caseb I', 'Caseb II', 'Caseb III', 'Serraria Brasil', 'Pampalona', 'Ponto Novo'
  ],
  leste: [
    '35º BI', 'Baraúnas', 'Santo Antônio dos Prazeres', 'George Américo',
    'Novo Horizonte', 'Panorama', 'Limoeiro', 'Muchila I', 'Muchila II',
    'Registro', 'CIS', 'Feira IV'
  ],
  oeste: [
    'Calumbi', 'Jomafa', 'Parque Getúlio Vargas', 'São João', 'Aeroporto',
    'Artêmia Pires', 'Olhos D\'Água', 'Barroquinha', 'Rocinha', 'Liberdade',
    'Tanque da Nação', 'Jardim Tropical', 'Fraera Maia'
  ],
  distritos: [
    'Bonfim de Feira', 'Governador João Durval Carneiro (Ipuaçu)', 'Humildes',
    'Jaíba', 'Jaguara', 'Maria Quitéria (São José)', 'Matinha', 'Tiquaruçu'
  ]
};

// ========== USUÁRIOS DO SISTEMA ==========
const USUARIOS = {
  admin: {
    id: 1,
    nome: 'Administrador',
    email: 'admin@eventosfsa.com.br',
    senha: 'admin123',
    tipo: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=FF6B35&color=fff',
    telefone: '(75) 99999-0001',
    criadoEm: '2024-01-01'
  },
  artistas: [
    {
      id: 101,
      nome: 'Weslei Ribeiro',
      nomeArtistico: 'Weslei Ribeiro',
      email: 'weslei@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      generos: ['MPB', 'Pop', 'Voz e Violão'],
      avaliacao: 4.8,
      totalAvaliacoes: 156,
      cacheMedio: 350,
      bio: 'Cantor e compositor feirense, apaixonado por MPB e música popular.',
      telefone: '(75) 99999-1001',
      pix: 'weslei@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 234,
      gorjetasRecebidas: 4520.00,
      ranking: 1,
      bairro: 'Centro',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-02-15'
    },
    {
      id: 102,
      nome: 'Flaviano Gallo',
      nomeArtistico: 'Flaviano Gallo',
      email: 'flaviano@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      generos: ['Rock', 'Blues', 'Rock Nacional'],
      avaliacao: 4.7,
      totalAvaliacoes: 142,
      cacheMedio: 400,
      bio: 'Músico veterano da cena feirense, referência no rock e blues local.',
      telefone: '(75) 99999-1002',
      pix: 'flaviano@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 312,
      gorjetasRecebidas: 5830.00,
      ranking: 2,
      bairro: 'Kalilândia',
      disponibilidade: ['qui', 'sex', 'sab'],
      criadoEm: '2024-01-20'
    },
    {
      id: 103,
      nome: 'Marina Santos',
      nomeArtistico: 'Marina Santos',
      email: 'marina@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      generos: ['Pop', 'MPB', 'Indie'],
      avaliacao: 4.9,
      totalAvaliacoes: 98,
      cacheMedio: 380,
      bio: 'Revelação da música feirense, voz marcante e repertório eclético.',
      telefone: '(75) 99999-1003',
      pix: 'marina@pix.com',
      verificado: true,
      premium: false,
      showsRealizados: 89,
      gorjetasRecebidas: 2150.00,
      ranking: 3,
      bairro: 'SIM',
      disponibilidade: ['sex', 'sab'],
      criadoEm: '2024-03-10'
    },
    {
      id: 104,
      nome: 'Pedro Henrique Silva',
      nomeArtistico: 'Pedro Viola',
      email: 'pedro@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      generos: ['Forró', 'Sertanejo', 'Xote'],
      avaliacao: 4.6,
      totalAvaliacoes: 187,
      cacheMedio: 300,
      bio: 'Especialista em forró pé de serra e sertanejo raiz.',
      telefone: '(75) 99999-1004',
      pix: 'pedro@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 267,
      gorjetasRecebidas: 3890.00,
      ranking: 4,
      bairro: 'Tomba',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-01-05'
    },
    {
      id: 105,
      nome: 'Ana Paula Costa',
      nomeArtistico: 'Ana Paula',
      email: 'anapaula@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      generos: ['MPB', 'Bossa Nova', 'Jazz'],
      avaliacao: 4.8,
      totalAvaliacoes: 123,
      cacheMedio: 420,
      bio: 'Intérprete sofisticada, especialista em clássicos da MPB e bossa nova.',
      telefone: '(75) 99999-1005',
      pix: 'anapaula@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 178,
      gorjetasRecebidas: 4120.00,
      ranking: 5,
      bairro: 'Capuchinhos',
      disponibilidade: ['qua', 'qui', 'sex', 'sab'],
      criadoEm: '2024-02-01'
    },
    {
      id: 106,
      nome: 'Lucas Santana',
      nomeArtistico: 'Lucas Sertanejo',
      email: 'lucas@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      generos: ['Sertanejo', 'Sertanejo Universitário', 'Country'],
      avaliacao: 4.5,
      totalAvaliacoes: 210,
      cacheMedio: 320,
      bio: 'O melhor do sertanejo universitário e modão de qualidade.',
      telefone: '(75) 99999-1006',
      pix: 'lucas@pix.com',
      verificado: true,
      premium: false,
      showsRealizados: 298,
      gorjetasRecebidas: 3450.00,
      ranking: 6,
      bairro: 'Mangabeira',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-01-18'
    },
    {
      id: 107,
      nome: 'Juliana Moreira',
      nomeArtistico: 'Ju Samba',
      email: 'juliana@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      generos: ['Samba', 'Pagode', 'Samba de Roda'],
      avaliacao: 4.7,
      totalAvaliacoes: 165,
      cacheMedio: 350,
      bio: 'Rainha do samba feirense, energia e alegria em cada show.',
      telefone: '(75) 99999-1007',
      pix: 'juliana@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 201,
      gorjetasRecebidas: 3780.00,
      ranking: 7,
      bairro: 'Papagaio',
      disponibilidade: ['sab', 'dom'],
      criadoEm: '2024-02-20'
    },
    {
      id: 108,
      nome: 'Rafael Oliveira',
      nomeArtistico: 'Rafa Rock',
      email: 'rafael@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      generos: ['Rock', 'Rock Nacional', 'Pop Rock'],
      avaliacao: 4.4,
      totalAvaliacoes: 134,
      cacheMedio: 380,
      bio: 'Rock\'n\'roll na veia! Covers e autorais que fazem o público vibrar.',
      telefone: '(75) 99999-1008',
      pix: 'rafael@pix.com',
      verificado: false,
      premium: false,
      showsRealizados: 156,
      gorjetasRecebidas: 2890.00,
      ranking: 8,
      bairro: 'Brasília',
      disponibilidade: ['sex', 'sab'],
      criadoEm: '2024-03-05'
    },
    {
      id: 109,
      nome: 'Thiago Aquino Junior',
      nomeArtistico: 'Thiago Arrocha',
      email: 'thiago@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
      generos: ['Arrocha', 'Piseiro', 'Forró'],
      avaliacao: 4.6,
      totalAvaliacoes: 198,
      cacheMedio: 450,
      bio: 'O melhor do arrocha e piseiro para animar qualquer festa!',
      telefone: '(75) 99999-1009',
      pix: 'thiago@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 287,
      gorjetasRecebidas: 5120.00,
      ranking: 9,
      bairro: 'Campo Limpo',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-01-12'
    },
    {
      id: 110,
      nome: 'Fernanda Lima',
      nomeArtistico: 'Nanda Axé',
      email: 'fernanda@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      generos: ['Axé', 'Pagodão', 'Swingueira'],
      avaliacao: 4.5,
      totalAvaliacoes: 176,
      cacheMedio: 400,
      bio: 'A energia do axé baiano em cada apresentação!',
      telefone: '(75) 99999-1010',
      pix: 'fernanda@pix.com',
      verificado: true,
      premium: false,
      showsRealizados: 189,
      gorjetasRecebidas: 3340.00,
      ranking: 10,
      bairro: 'Santa Mônica',
      disponibilidade: ['sex', 'sab'],
      criadoEm: '2024-02-28'
    },
    {
      id: 111,
      nome: 'Roberto Carlos Silva',
      nomeArtistico: 'Beto Romântico',
      email: 'roberto@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
      generos: ['Romântico', 'MPB', 'Bolero'],
      avaliacao: 4.3,
      totalAvaliacoes: 112,
      cacheMedio: 280,
      bio: 'Para momentos especiais, músicas que tocam o coração.',
      telefone: '(75) 99999-1011',
      pix: 'roberto@pix.com',
      verificado: false,
      premium: false,
      showsRealizados: 134,
      gorjetasRecebidas: 1980.00,
      ranking: 11,
      bairro: 'Feira X',
      disponibilidade: ['qua', 'qui', 'sex'],
      criadoEm: '2024-03-15'
    },
    {
      id: 112,
      nome: 'DJ Bahia Beat',
      nomeArtistico: 'DJ Bahia Beat',
      email: 'djbahia@email.com',
      senha: 'artista123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150',
      generos: ['Eletrônico', 'House', 'Techno'],
      avaliacao: 4.7,
      totalAvaliacoes: 89,
      cacheMedio: 500,
      bio: 'Sets exclusivos que levam a pista à loucura!',
      telefone: '(75) 99999-1012',
      pix: 'djbahia@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 112,
      gorjetasRecebidas: 2670.00,
      ranking: 12,
      bairro: 'Centro',
      disponibilidade: ['sex', 'sab'],
      criadoEm: '2024-02-10'
    }
  ],
  bandas: [
    {
      id: 201,
      nome: 'Banda Secreta',
      nomeArtistico: 'Banda Secreta',
      email: 'bandasecreta@email.com',
      senha: 'banda123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150',
      generos: ['Rock', 'Rock Alternativo', 'Indie'],
      integrantes: 5,
      avaliacao: 4.6,
      totalAvaliacoes: 87,
      cacheMedio: 1500,
      bio: 'Rock autoral de qualidade, misturando influências nacionais e internacionais.',
      telefone: '(75) 99999-2001',
      pix: 'bandasecreta@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 98,
      gorjetasRecebidas: 1890.00,
      ranking: 1,
      bairro: 'Centro',
      disponibilidade: ['sex', 'sab'],
      criadoEm: '2024-01-25'
    },
    {
      id: 202,
      nome: 'Os Sertanejos FSA',
      nomeArtistico: 'Os Sertanejos',
      email: 'ossertanejos@email.com',
      senha: 'banda123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=150',
      generos: ['Sertanejo', 'Sertanejo Universitário', 'Country'],
      integrantes: 6,
      avaliacao: 4.5,
      totalAvaliacoes: 134,
      cacheMedio: 2000,
      bio: 'A melhor banda de sertanejo de Feira de Santana!',
      telefone: '(75) 99999-2002',
      pix: 'ossertanejos@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 156,
      gorjetasRecebidas: 2340.00,
      ranking: 2,
      bairro: 'SIM',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-01-10'
    },
    {
      id: 203,
      nome: 'Pagode da Feira',
      nomeArtistico: 'Pagode da Feira',
      email: 'pagodedafeira@email.com',
      senha: 'banda123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=150',
      generos: ['Pagode', 'Samba', 'Axé'],
      integrantes: 7,
      avaliacao: 4.7,
      totalAvaliacoes: 178,
      cacheMedio: 1800,
      bio: 'O melhor pagode baiano com um toque feirense especial!',
      telefone: '(75) 99999-2003',
      pix: 'pagodedafeira@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 234,
      gorjetasRecebidas: 4560.00,
      ranking: 3,
      bairro: 'Tomba',
      disponibilidade: ['sab', 'dom'],
      criadoEm: '2024-02-05'
    },
    {
      id: 204,
      nome: 'Quixabeira da Matinha',
      nomeArtistico: 'Quixabeira',
      email: 'quixabeira@email.com',
      senha: 'banda123',
      tipo: 'artista',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
      generos: ['Forró', 'Forró Pé de Serra', 'Xote'],
      integrantes: 5,
      avaliacao: 4.8,
      totalAvaliacoes: 245,
      cacheMedio: 2500,
      bio: 'Tradição do forró pé de serra levada para todo o Brasil!',
      telefone: '(75) 99999-2004',
      pix: 'quixabeira@pix.com',
      verificado: true,
      premium: true,
      showsRealizados: 312,
      gorjetasRecebidas: 6780.00,
      ranking: 4,
      bairro: 'Matinha',
      disponibilidade: ['sex', 'sab', 'dom'],
      criadoEm: '2024-01-01'
    }
  ]
};

// ========== TIPOS DE ESTABELECIMENTOS ==========
const TIPOS_ESTABELECIMENTO = [
  { id: 'bar', nome: 'Bar', icone: 'fas fa-beer', descricao: 'Bares e botequins com música ao vivo' },
  { id: 'restaurante', nome: 'Restaurante', icone: 'fas fa-utensils', descricao: 'Restaurantes com música ambiente ou ao vivo' },
  { id: 'casa-show', nome: 'Casa de Shows', icone: 'fas fa-music', descricao: 'Casas de show e espaços para eventos' },
  { id: 'pub', nome: 'Pub', icone: 'fas fa-glass-whiskey', descricao: 'Pubs e bistrôs com ambiente descolado' },
  { id: 'choperia', nome: 'Choperia', icone: 'fas fa-beer', descricao: 'Choperias e cervejarias artesanais' },
  { id: 'espaco-eventos', nome: 'Espaço de Eventos', icone: 'fas fa-star', descricao: 'Espaços para festas, casamentos e eventos corporativos' },
  { id: 'boteco', nome: 'Boteco', icone: 'fas fa-glass-cheers', descricao: 'Botecos tradicionais com petiscos' },
  { id: 'pizzaria', nome: 'Pizzaria', icone: 'fas fa-pizza-slice', descricao: 'Pizzarias com música ao vivo' },
  { id: 'cafe', nome: 'Café/Bistrô', icone: 'fas fa-coffee', descricao: 'Cafés e bistrôs com apresentações intimistas' }
];

// ========== ESTRUTURA DE ESTABELECIMENTO ==========
const ESTRUTURA_PADRAO = {
  palco: false,
  som: false,
  iluminacao: false,
  estacionamento: false,
  acessibilidade: false,
  arCondicionado: false,
  areaExterna: false,
  wifi: false
};

// ========== ESTABELECIMENTOS (BARES/RESTAURANTES/CASAS DE SHOW) ==========
const ESTABELECIMENTOS = [
  {
    id: 301,
    nome: 'Cidade da Cultura',
    tipo: 'Casa de Shows',
    tipoCategoria: 'casa-show',
    email: 'contato@cidadedacultura.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150',
    endereco: 'Av. Maria Quitéria, 1500',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-000',
    telefone: '(75) 3223-1234',
    whatsapp: '(75) 99999-1234',
    capacidade: 500,
    generosPrincipais: ['MPB', 'Axé', 'Forró', 'Sertanejo'],
    avaliacao: 4.7,
    totalAvaliacoes: 345,
    verificado: true,
    premium: true,
    eventosRealizados: 234,
    descricao: 'O maior espaço cultural de Feira de Santana, palco dos melhores shows da região. Estrutura completa para grandes eventos.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: null,
      quinta: '18:00-02:00',
      sexta: '18:00-03:00',
      sabado: '18:00-03:00',
      domingo: '16:00-00:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: true,
      wifi: true,
      camarim: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    faixaPreco: '$$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@cidadedacultura',
      facebook: '/cidadedacultura'
    },
    fotos: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500',
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500'
    ]
  },
  {
    id: 302,
    nome: 'A Vendinha',
    tipo: 'Bar',
    tipoCategoria: 'bar',
    email: 'contato@avendinha.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=150',
    endereco: 'Rua Conselheiro Franco, 200',
    bairro: 'Kalilândia',
    cidade: 'Feira de Santana',
    cep: '44025-200',
    telefone: '(75) 3221-5678',
    whatsapp: '(75) 99888-5678',
    capacidade: 120,
    generosPrincipais: ['Samba', 'Pagode', 'MPB'],
    avaliacao: 4.8,
    totalAvaliacoes: 267,
    verificado: true,
    premium: true,
    eventosRealizados: 189,
    descricao: 'Ambiente aconchegante com os melhores petiscos e música ao vivo. Reduto do samba de raiz em Feira de Santana.',
    horarioFuncionamento: {
      segunda: null,
      terca: '17:00-00:00',
      quarta: '17:00-00:00',
      quinta: '17:00-00:00',
      sexta: '17:00-02:00',
      sabado: '15:00-02:00',
      domingo: '15:00-23:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: false,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: true,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: false,
      bebidas: true,
      drinks: false
    },
    especialidades: ['Petiscos Baianos', 'Acarajé', 'Cerveja Gelada'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@avendinhafsa',
      facebook: '/avendinhafsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500'
    ]
  },
  {
    id: 303,
    nome: 'Cervejaria Sertões',
    tipo: 'Cervejaria/Brewpub',
    tipoCategoria: 'choperia',
    email: 'contato@cervejariasertoes.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=150',
    endereco: 'Av. Getúlio Vargas, 800',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-500',
    telefone: '(75) 3224-9012',
    whatsapp: '(75) 99777-9012',
    capacidade: 150,
    generosPrincipais: ['Rock', 'Indie', 'Blues'],
    avaliacao: 4.6,
    totalAvaliacoes: 198,
    verificado: true,
    premium: false,
    eventosRealizados: 156,
    descricao: 'Cervejas artesanais produzidas no local e rock de qualidade. 12 torneiras com rótulos exclusivos.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: '18:00-01:00',
      quinta: '18:00-01:00',
      sexta: '18:00-02:00',
      sabado: '16:00-02:00',
      domingo: null
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: false,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: false
    },
    especialidades: ['Cervejas Artesanais', 'IPA', 'Stout', 'Hamburguers Gourmet'],
    faixaPreco: '$$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@cervejariasertoes',
      facebook: '/cervejariasertoes'
    },
    fotos: [
      'https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=500'
    ]
  },
  {
    id: 304,
    nome: 'Seriguela',
    tipo: 'Bar/Restaurante',
    tipoCategoria: 'restaurante',
    email: 'contato@seriguela.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=150',
    endereco: 'Rua São Domingos, 450',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-100',
    telefone: '(75) 3222-3456',
    whatsapp: '(75) 99666-3456',
    capacidade: 200,
    generosPrincipais: ['Forró', 'MPB', 'Regional'],
    avaliacao: 4.5,
    totalAvaliacoes: 312,
    verificado: true,
    premium: true,
    eventosRealizados: 178,
    descricao: 'Culinária regional baiana e nordestina com forró de qualidade em ambiente familiar. Especialistas em comida de fazenda.',
    horarioFuncionamento: {
      segunda: null,
      terca: '11:00-00:00',
      quarta: '11:00-00:00',
      quinta: '11:00-00:00',
      sexta: '11:00-01:00',
      sabado: '11:00-01:00',
      domingo: '11:00-22:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: true,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    cozinha: {
      tipo: 'Regional Baiana',
      almoco: true,
      jantar: true,
      delivery: false
    },
    especialidades: ['Buchada', 'Sarapatel', 'Carne de Sol', 'Pirão', 'Moquecas'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@seriguelafsa',
      facebook: '/seriguelafsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500'
    ]
  },
  {
    id: 305,
    nome: 'Dom Vicente',
    tipo: 'Restaurante',
    tipoCategoria: 'restaurante',
    email: 'contato@domvicente.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150',
    endereco: 'Av. Presidente Dutra, 1200',
    bairro: 'Capuchinhos',
    cidade: 'Feira de Santana',
    cep: '44076-000',
    telefone: '(75) 3225-7890',
    whatsapp: '(75) 99555-7890',
    capacidade: 180,
    generosPrincipais: ['MPB', 'Voz e Violão', 'Jazz', 'Bossa Nova'],
    avaliacao: 4.7,
    totalAvaliacoes: 423,
    verificado: true,
    premium: true,
    eventosRealizados: 145,
    descricao: 'Gastronomia refinada com música de qualidade. O melhor restaurante com música ao vivo de Feira de Santana.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: null,
      quinta: '19:00-00:00',
      sexta: '19:00-00:00',
      sabado: '19:00-01:00',
      domingo: null
    },
    estrutura: {
      palco: false,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: false,
      wifi: true,
      valet: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    cozinha: {
      tipo: 'Contemporânea',
      almoco: false,
      jantar: true,
      delivery: false
    },
    especialidades: ['Carnes Nobres', 'Frutos do Mar', 'Carta de Vinhos Premium'],
    faixaPreco: '$$$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@domvicentefsa',
      facebook: '/domvicentefsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500'
    ]
  },
  {
    id: 306,
    nome: 'The House Pub',
    tipo: 'Pub',
    tipoCategoria: 'pub',
    email: 'contato@thehouse.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=150',
    endereco: 'Rua Castro Alves, 300',
    bairro: 'Fraga Maia',
    cidade: 'Feira de Santana',
    cep: '44077-100',
    telefone: '(75) 3226-1234',
    whatsapp: '(75) 99444-1234',
    capacidade: 100,
    generosPrincipais: ['Rock', 'Pop', 'Indie', 'Alternativo'],
    avaliacao: 4.4,
    totalAvaliacoes: 156,
    verificado: true,
    premium: false,
    eventosRealizados: 112,
    descricao: 'Pub com ambiente descolado estilo irlandês e boa música. O point alternativo de Feira.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: '19:00-02:00',
      quinta: '19:00-02:00',
      sexta: '19:00-03:00',
      sabado: '18:00-03:00',
      domingo: null
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: false,
      acessibilidade: false,
      arCondicionado: true,
      areaExterna: false,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: false,
      bebidas: true,
      drinks: true
    },
    especialidades: ['Whisky', 'Cervejas Importadas', 'Fish and Chips', 'Nachos'],
    faixaPreco: '$$',
    aceitaReserva: false,
    redesSociais: {
      instagram: '@thehousefsa',
      facebook: '/thehousefsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500'
    ]
  },
  {
    id: 307,
    nome: 'Cúpula do Som',
    tipo: 'Bar',
    tipoCategoria: 'bar',
    email: 'contato@cupuladosom.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=150',
    endereco: 'Rua da Aurora, 150',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-050',
    telefone: '(75) 3227-5678',
    whatsapp: '(75) 99333-5678',
    capacidade: 80,
    generosPrincipais: ['Rock', 'Metal', 'Alternativo', 'Punk'],
    avaliacao: 4.5,
    totalAvaliacoes: 134,
    verificado: true,
    premium: false,
    eventosRealizados: 98,
    descricao: 'O point do rock e metal em Feira de Santana. Underground e autêntico.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: null,
      quinta: '20:00-03:00',
      sexta: '20:00-04:00',
      sabado: '20:00-04:00',
      domingo: null
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: false,
      acessibilidade: false,
      arCondicionado: false,
      areaExterna: false,
      wifi: false
    },
    cardapio: {
      petiscos: true,
      refeicoes: false,
      bebidas: true,
      drinks: false
    },
    especialidades: ['Cerveja Barata', 'Ambiente Underground'],
    faixaPreco: '$',
    aceitaReserva: false,
    redesSociais: {
      instagram: '@cupuladosom',
      facebook: '/cupuladosom'
    },
    fotos: [
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500'
    ]
  },
  {
    id: 308,
    nome: 'Boteco do Seu Zé',
    tipo: 'Boteco',
    tipoCategoria: 'boteco',
    email: 'contato@seuze.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150',
    endereco: 'Av. Senhor dos Passos, 600',
    bairro: 'Tomba',
    cidade: 'Feira de Santana',
    cep: '44090-000',
    telefone: '(75) 3228-9012',
    whatsapp: '(75) 99222-9012',
    capacidade: 60,
    generosPrincipais: ['Pagode', 'Samba', 'Forró', 'Arrocha'],
    avaliacao: 4.3,
    totalAvaliacoes: 89,
    verificado: false,
    premium: false,
    eventosRealizados: 87,
    descricao: 'Boteco tradicional de bairro com música ao vivo aos finais de semana. Petiscos de qualidade e cerveja gelada.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: null,
      quinta: null,
      sexta: '18:00-01:00',
      sabado: '15:00-01:00',
      domingo: '12:00-22:00'
    },
    estrutura: {
      palco: false,
      som: true,
      iluminacao: false,
      estacionamento: false,
      acessibilidade: false,
      arCondicionado: false,
      areaExterna: true,
      wifi: false
    },
    cardapio: {
      petiscos: true,
      refeicoes: false,
      bebidas: true,
      drinks: false
    },
    especialidades: ['Caldinho', 'Torresmo', 'Carne de Sol Acebolada'],
    faixaPreco: '$',
    aceitaReserva: false,
    redesSociais: {
      instagram: '@seuzefsa',
      facebook: '/seuzefsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500'
    ]
  },
  {
    id: 309,
    nome: 'Cortico Drinks & Jazz',
    tipo: 'Bar/Coquetelaria',
    tipoCategoria: 'bar',
    email: 'contato@corticodrinks.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=150',
    endereco: 'Rua Maestro José de Alencar, 100',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-200',
    telefone: '(75) 3229-3456',
    whatsapp: '(75) 99111-3456',
    capacidade: 90,
    generosPrincipais: ['Jazz', 'Blues', 'Lounge', 'Bossa Nova'],
    avaliacao: 4.6,
    totalAvaliacoes: 201,
    verificado: true,
    premium: true,
    eventosRealizados: 134,
    descricao: 'Drinks exclusivos e música sofisticada. Coquetelaria de autor com ambiente intimista.',
    horarioFuncionamento: {
      segunda: null,
      terca: null,
      quarta: '18:00-02:00',
      quinta: '18:00-02:00',
      sexta: '18:00-03:00',
      sabado: '18:00-03:00',
      domingo: null
    },
    estrutura: {
      palco: false,
      som: true,
      iluminacao: true,
      estacionamento: false,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: false,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: false,
      bebidas: true,
      drinks: true
    },
    especialidades: ['Cocktails Clássicos', 'Drinks Autorais', 'Gin Tônica', 'Whisky Premium'],
    faixaPreco: '$$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@corticodrinks',
      facebook: '/corticodrinks'
    },
    fotos: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500'
    ]
  },
  {
    id: 310,
    nome: 'Saideira Beer',
    tipo: 'Choperia',
    tipoCategoria: 'choperia',
    email: 'contato@saideirabeer.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1575037614876-c38a4c44f5bd?w=150',
    endereco: 'Av. João Durval Carneiro, 2500',
    bairro: 'SIM',
    cidade: 'Feira de Santana',
    cep: '44085-000',
    telefone: '(75) 3230-7890',
    whatsapp: '(75) 99000-7890',
    capacidade: 200,
    generosPrincipais: ['Sertanejo', 'Pagode', 'Pop', 'Forró'],
    avaliacao: 4.4,
    totalAvaliacoes: 278,
    verificado: true,
    premium: true,
    eventosRealizados: 167,
    descricao: 'A maior choperia de Feira, com shows todas as noites. 20 torneiras de chopp gelado.',
    horarioFuncionamento: {
      segunda: null,
      terca: '17:00-02:00',
      quarta: '17:00-02:00',
      quinta: '17:00-02:00',
      sexta: '17:00-03:00',
      sabado: '15:00-03:00',
      domingo: '15:00-00:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: true,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    especialidades: ['Chopp Artesanal', 'Torres de Chopp', 'Porções Fartas', 'Happy Hour'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@saideirabeer',
      facebook: '/saideirabeer'
    },
    fotos: [
      'https://images.unsplash.com/photo-1575037614876-c38a4c44f5bd?w=500'
    ]
  },
  // ========== NOVOS ESTABELECIMENTOS ==========
  {
    id: 311,
    nome: 'Pizzaria Bella Napoli',
    tipo: 'Pizzaria',
    tipoCategoria: 'pizzaria',
    email: 'contato@bellanapoli.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150',
    endereco: 'Av. Getúlio Vargas, 1200',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-600',
    telefone: '(75) 3231-4567',
    whatsapp: '(75) 98888-4567',
    capacidade: 120,
    generosPrincipais: ['MPB', 'Pop', 'Voz e Violão'],
    avaliacao: 4.5,
    totalAvaliacoes: 345,
    verificado: true,
    premium: true,
    eventosRealizados: 98,
    descricao: 'As melhores pizzas de Feira com música ao vivo nas sextas e sábados. Forno a lenha tradicional.',
    horarioFuncionamento: {
      segunda: null,
      terca: '18:00-23:00',
      quarta: '18:00-23:00',
      quinta: '18:00-23:00',
      sexta: '18:00-00:00',
      sabado: '18:00-00:00',
      domingo: '18:00-23:00'
    },
    estrutura: {
      palco: false,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: false,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    cozinha: {
      tipo: 'Italiana',
      almoco: false,
      jantar: true,
      delivery: true
    },
    especialidades: ['Pizza Napolitana', 'Massas Artesanais', 'Vinhos Italianos'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@bellanapolifsa',
      facebook: '/bellanapolifsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'
    ]
  },
  {
    id: 312,
    nome: 'Café & Arte',
    tipo: 'Café/Bistrô',
    tipoCategoria: 'cafe',
    email: 'contato@cafeearte.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150',
    endereco: 'Rua Marechal Deodoro, 80',
    bairro: 'Centro',
    cidade: 'Feira de Santana',
    cep: '44001-300',
    telefone: '(75) 3232-8901',
    whatsapp: '(75) 98777-8901',
    capacidade: 40,
    generosPrincipais: ['MPB', 'Bossa Nova', 'Jazz', 'Indie'],
    avaliacao: 4.8,
    totalAvaliacoes: 156,
    verificado: true,
    premium: false,
    eventosRealizados: 67,
    descricao: 'Café cultural com apresentações intimistas, exposições de arte e ambiente acolhedor.',
    horarioFuncionamento: {
      segunda: '08:00-20:00',
      terca: '08:00-20:00',
      quarta: '08:00-22:00',
      quinta: '08:00-22:00',
      sexta: '08:00-23:00',
      sabado: '09:00-23:00',
      domingo: '14:00-20:00'
    },
    estrutura: {
      palco: false,
      som: true,
      iluminacao: true,
      estacionamento: false,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: false,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: false
    },
    cozinha: {
      tipo: 'Café/Bistrô',
      almoco: true,
      jantar: false,
      delivery: false
    },
    especialidades: ['Cafés Especiais', 'Bolos Artesanais', 'Brunch', 'Sanduíches Gourmet'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@cafeearte_fsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500'
    ]
  },
  {
    id: 313,
    nome: 'Espaço Mix Eventos',
    tipo: 'Espaço de Eventos',
    tipoCategoria: 'espaco-eventos',
    email: 'contato@espacomix.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=150',
    endereco: 'Av. Noide Cerqueira, 3000',
    bairro: 'Ponto Central',
    cidade: 'Feira de Santana',
    cep: '44075-000',
    telefone: '(75) 3233-2345',
    whatsapp: '(75) 98666-2345',
    capacidade: 800,
    generosPrincipais: ['Todos os Gêneros'],
    avaliacao: 4.6,
    totalAvaliacoes: 234,
    verificado: true,
    premium: true,
    eventosRealizados: 156,
    descricao: 'Espaço modular para eventos de todos os portes: casamentos, formaturas, shows, feiras e convenções.',
    horarioFuncionamento: {
      segunda: 'Sob demanda',
      terca: 'Sob demanda',
      quarta: 'Sob demanda',
      quinta: 'Sob demanda',
      sexta: 'Sob demanda',
      sabado: 'Sob demanda',
      domingo: 'Sob demanda'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: true,
      areaExterna: true,
      wifi: true,
      camarim: true,
      cozinhaIndustrial: true
    },
    cardapio: {
      petiscos: false,
      refeicoes: false,
      bebidas: false,
      drinks: false,
      buffet: true
    },
    tiposEvento: ['Casamentos', 'Formaturas', 'Shows', 'Corporativo', 'Feiras', 'Aniversários'],
    faixaPreco: '$$$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@espacomixfsa',
      facebook: '/espacomixfsa'
    },
    fotos: [
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500'
    ]
  },
  {
    id: 314,
    nome: 'Quintal da Feira',
    tipo: 'Bar/Restaurante',
    tipoCategoria: 'restaurante',
    email: 'contato@quintaldafeira.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150',
    endereco: 'Rua Barão do Rio Branco, 500',
    bairro: 'Queimadinha',
    cidade: 'Feira de Santana',
    cep: '44020-000',
    telefone: '(75) 3234-6789',
    whatsapp: '(75) 98555-6789',
    capacidade: 250,
    generosPrincipais: ['Forró', 'Sertanejo', 'Pagode', 'Axé'],
    avaliacao: 4.4,
    totalAvaliacoes: 456,
    verificado: true,
    premium: true,
    eventosRealizados: 234,
    descricao: 'O melhor da culinária nordestina ao ar livre com shows todos os dias. Ambiente familiar de dia, agitado à noite.',
    horarioFuncionamento: {
      segunda: null,
      terca: '11:00-00:00',
      quarta: '11:00-00:00',
      quinta: '11:00-01:00',
      sexta: '11:00-02:00',
      sabado: '11:00-02:00',
      domingo: '11:00-22:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: false,
      areaExterna: true,
      wifi: true,
      parquinho: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: true
    },
    cozinha: {
      tipo: 'Nordestina',
      almoco: true,
      jantar: true,
      delivery: true
    },
    especialidades: ['Carneiro Assado', 'Galinha Caipira', 'Baião de Dois', 'Carne de Sol'],
    faixaPreco: '$$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@quintaldafeira',
      facebook: '/quintaldafeira'
    },
    fotos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500'
    ]
  },
  {
    id: 315,
    nome: 'Espetaria do Cowboy',
    tipo: 'Bar/Espetaria',
    tipoCategoria: 'bar',
    email: 'contato@espetariacowboy.com',
    senha: 'bar123',
    avatar: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150',
    endereco: 'Av. Eduardo Fróes da Mota, 1500',
    bairro: 'SIM',
    cidade: 'Feira de Santana',
    cep: '44080-000',
    telefone: '(75) 3235-0123',
    whatsapp: '(75) 98444-0123',
    capacidade: 180,
    generosPrincipais: ['Sertanejo', 'Country', 'Forró'],
    avaliacao: 4.3,
    totalAvaliacoes: 287,
    verificado: true,
    premium: false,
    eventosRealizados: 145,
    descricao: 'Espetaria temática country com música sertaneja ao vivo. Os melhores espetinhos de Feira.',
    horarioFuncionamento: {
      segunda: null,
      terca: '17:00-00:00',
      quarta: '17:00-00:00',
      quinta: '17:00-01:00',
      sexta: '17:00-02:00',
      sabado: '15:00-02:00',
      domingo: '15:00-23:00'
    },
    estrutura: {
      palco: true,
      som: true,
      iluminacao: true,
      estacionamento: true,
      acessibilidade: true,
      arCondicionado: false,
      areaExterna: true,
      wifi: true
    },
    cardapio: {
      petiscos: true,
      refeicoes: true,
      bebidas: true,
      drinks: false
    },
    especialidades: ['Espetinhos Variados', 'Linguiça Artesanal', 'Picanha na Brasa'],
    faixaPreco: '$',
    aceitaReserva: true,
    redesSociais: {
      instagram: '@espetariacowboy',
      facebook: '/espetariacowboy'
    },
    fotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=500'
    ]
  }
];

// ========== EVENTOS ==========
const EVENTOS = [
  {
    id: 401,
    titulo: 'Noite de MPB com Weslei Ribeiro',
    descricao: 'Uma noite especial com o melhor da MPB, interpretado por Weslei Ribeiro.',
    artistaId: 101,
    estabelecimentoId: 302,
    data: '2024-12-06',
    horarioInicio: '20:00',
    horarioFim: '23:00',
    genero: 'MPB',
    valor: 0,
    status: 'confirmado',
    destaque: true,
    imagemCapa: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
    criadoEm: '2024-11-20'
  },
  {
    id: 402,
    titulo: 'Rock Night - Banda Secreta',
    descricao: 'Uma noite de muito rock com a Banda Secreta e convidados especiais.',
    artistaId: 201,
    estabelecimentoId: 303,
    data: '2024-12-07',
    horarioInicio: '21:00',
    horarioFim: '02:00',
    genero: 'Rock',
    valor: 20,
    status: 'confirmado',
    destaque: true,
    imagemCapa: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500',
    criadoEm: '2024-11-18'
  },
  {
    id: 403,
    titulo: 'Pagode da Sexta',
    descricao: 'O melhor pagode com Pagode da Feira para começar bem o fim de semana.',
    artistaId: 203,
    estabelecimentoId: 308,
    data: '2024-12-06',
    horarioInicio: '19:00',
    horarioFim: '00:00',
    genero: 'Pagode',
    valor: 0,
    status: 'confirmado',
    destaque: false,
    imagemCapa: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500',
    criadoEm: '2024-11-22'
  },
  {
    id: 404,
    titulo: 'Forró Pé de Serra com Quixabeira',
    descricao: 'Tradicional forró pé de serra com a famosa banda Quixabeira da Matinha.',
    artistaId: 204,
    estabelecimentoId: 304,
    data: '2024-12-07',
    horarioInicio: '20:00',
    horarioFim: '01:00',
    genero: 'Forró',
    valor: 30,
    status: 'confirmado',
    destaque: true,
    imagemCapa: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=500',
    criadoEm: '2024-11-15'
  },
  {
    id: 405,
    titulo: 'Jazz & Blues Night',
    descricao: 'Noite intimista com Ana Paula Costa e seu repertório de jazz e bossa nova.',
    artistaId: 105,
    estabelecimentoId: 309,
    data: '2024-12-08',
    horarioInicio: '19:30',
    horarioFim: '23:00',
    genero: 'Jazz',
    valor: 25,
    status: 'confirmado',
    destaque: false,
    imagemCapa: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500',
    criadoEm: '2024-11-25'
  },
  {
    id: 406,
    titulo: 'Sertanejo Universitário - Os Sertanejos',
    descricao: 'O melhor do sertanejo universitário com a banda Os Sertanejos.',
    artistaId: 202,
    estabelecimentoId: 310,
    data: '2024-12-08',
    horarioInicio: '22:00',
    horarioFim: '03:00',
    genero: 'Sertanejo',
    valor: 35,
    status: 'confirmado',
    destaque: true,
    imagemCapa: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500',
    criadoEm: '2024-11-20'
  },
  {
    id: 407,
    titulo: 'Voz e Violão com Marina Santos',
    descricao: 'Show intimista com Marina Santos e seu repertório eclético.',
    artistaId: 103,
    estabelecimentoId: 305,
    data: '2024-12-13',
    horarioInicio: '20:00',
    horarioFim: '23:00',
    genero: 'Pop',
    valor: 0,
    status: 'pendente',
    destaque: false,
    imagemCapa: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500',
    criadoEm: '2024-11-28'
  },
  {
    id: 408,
    titulo: 'Electro Night com DJ Bahia Beat',
    descricao: 'Noite eletrônica com sets exclusivos do DJ Bahia Beat.',
    artistaId: 112,
    estabelecimentoId: 306,
    data: '2024-12-14',
    horarioInicio: '23:00',
    horarioFim: '05:00',
    genero: 'Eletrônico',
    valor: 40,
    status: 'confirmado',
    destaque: true,
    imagemCapa: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=500',
    criadoEm: '2024-11-26'
  }
];

// ========== PROPOSTAS DE CONTRATAÇÃO ==========
const PROPOSTAS = [
  {
    id: 501,
    estabelecimentoId: 302,
    artistaId: 101,
    dataEvento: '2024-12-20',
    horarioInicio: '20:00',
    horarioFim: '23:00',
    valor: 400,
    mensagem: 'Gostaríamos de convidar você para se apresentar em nossa casa. Show de MPB para um público especial.',
    status: 'pendente',
    criadoEm: '2024-11-28'
  },
  {
    id: 502,
    estabelecimentoId: 310,
    artistaId: 106,
    dataEvento: '2024-12-21',
    horarioInicio: '22:00',
    horarioFim: '02:00',
    valor: 500,
    mensagem: 'Precisamos de um cantor sertanejo para nossa noite especial de sábado.',
    status: 'aceita',
    criadoEm: '2024-11-25'
  },
  {
    id: 503,
    estabelecimentoId: 303,
    artistaId: 102,
    dataEvento: '2024-12-28',
    horarioInicio: '21:00',
    horarioFim: '01:00',
    valor: 450,
    mensagem: 'Noite de rock especial de fim de ano. Interessado?',
    status: 'pendente',
    criadoEm: '2024-11-29'
  },
  {
    id: 504,
    estabelecimentoId: 305,
    artistaId: 105,
    dataEvento: '2024-12-27',
    horarioInicio: '19:30',
    horarioFim: '23:00',
    valor: 550,
    mensagem: 'Jantar especial de fim de ano com música ao vivo.',
    status: 'aceita',
    criadoEm: '2024-11-24'
  },
  {
    id: 505,
    estabelecimentoId: 301,
    artistaId: 204,
    dataEvento: '2025-01-03',
    horarioInicio: '20:00',
    horarioFim: '02:00',
    valor: 3000,
    mensagem: 'Grande show de abertura do ano com a Quixabeira!',
    status: 'pendente',
    criadoEm: '2024-11-30'
  }
];

// ========== GORJETAS ==========
const GORJETAS = [
  {
    id: 601,
    artistaId: 101,
    usuarioId: null,
    nomeUsuario: 'João Silva',
    valor: 20.00,
    mensagem: 'Show maravilhoso! Parabéns!',
    data: '2024-11-30',
    status: 'pago'
  },
  {
    id: 602,
    artistaId: 101,
    usuarioId: null,
    nomeUsuario: 'Maria Santos',
    valor: 50.00,
    mensagem: 'Melhor show que já vi em Feira!',
    data: '2024-11-29',
    status: 'pago'
  },
  {
    id: 603,
    artistaId: 107,
    usuarioId: null,
    nomeUsuario: 'Pedro Oliveira',
    valor: 30.00,
    mensagem: 'Samba nota 10!',
    data: '2024-11-30',
    status: 'pago'
  },
  {
    id: 604,
    artistaId: 102,
    usuarioId: null,
    nomeUsuario: 'Ana Lima',
    valor: 25.00,
    mensagem: 'Rock de qualidade!',
    data: '2024-11-28',
    status: 'pago'
  },
  {
    id: 605,
    artistaId: 103,
    usuarioId: null,
    nomeUsuario: 'Carlos Souza',
    valor: 15.00,
    mensagem: 'Voz linda!',
    data: '2024-11-27',
    status: 'pago'
  }
];

// ========== AVALIAÇÕES ==========
const AVALIACOES = [
  {
    id: 701,
    artistaId: 101,
    estabelecimentoId: 302,
    nota: 5,
    comentario: 'Excelente profissional, pontual e muito talentoso!',
    data: '2024-11-25'
  },
  {
    id: 702,
    artistaId: 102,
    estabelecimentoId: 303,
    nota: 5,
    comentario: 'Show incrível, o público adorou!',
    data: '2024-11-20'
  },
  {
    id: 703,
    artistaId: 107,
    estabelecimentoId: 308,
    nota: 4,
    comentario: 'Muito bom, animou a casa toda!',
    data: '2024-11-22'
  },
  {
    id: 704,
    artistaId: 105,
    estabelecimentoId: 309,
    nota: 5,
    comentario: 'Sofisticação e talento. Perfeito para nosso ambiente.',
    data: '2024-11-18'
  }
];

// ========== GÊNEROS MUSICAIS ==========
const GENEROS = [
  'MPB', 'Rock', 'Pop', 'Sertanejo', 'Forró', 'Pagode', 'Samba', 'Axé',
  'Jazz', 'Blues', 'Bossa Nova', 'Eletrônico', 'Funk', 'Reggae', 'Gospel',
  'Indie', 'Country', 'Voz e Violão', 'Piseiro', 'Arrocha', 'Swingueira'
];

// ========== CONFIGURAÇÕES DO SISTEMA ==========
const CONFIG_SISTEMA = {
  taxaComissao: 0.10, // 10% sobre contratações
  taxaGorjeta: 0.05,  // 5% sobre gorjetas
  planoPremiumArtista: 49.90,
  planoPremiumEstabelecimento: 99.90,
  gorjetasMinimo: 5.00,
  gorjetasSugeridas: [10, 20, 30, 50, 100]
};

// ========== ESTATÍSTICAS DO SISTEMA ==========
const ESTATISTICAS = {
  totalArtistas: USUARIOS.artistas.length + USUARIOS.bandas.length,
  totalEstabelecimentos: ESTABELECIMENTOS.length,
  totalEventos: EVENTOS.length,
  eventosMes: 67,
  gorjetasMes: 18750.00,
  comissoesMes: 12450.00,
  usuariosAtivos: 2345,
  // Estatísticas por tipo de estabelecimento
  porTipoEstabelecimento: {
    bares: ESTABELECIMENTOS.filter(e => ['bar', 'boteco', 'pub'].includes(e.tipoCategoria)).length,
    restaurantes: ESTABELECIMENTOS.filter(e => e.tipoCategoria === 'restaurante').length,
    casasShow: ESTABELECIMENTOS.filter(e => ['casa-show', 'espaco-eventos'].includes(e.tipoCategoria)).length,
    outros: ESTABELECIMENTOS.filter(e => ['choperia', 'pizzaria', 'cafe'].includes(e.tipoCategoria)).length
  }
};

// ========== EXPORTAÇÃO ==========
export {
  BAIRROS,
  USUARIOS,
  TIPOS_ESTABELECIMENTO,
  ESTRUTURA_PADRAO,
  ESTABELECIMENTOS,
  EVENTOS,
  PROPOSTAS,
  GORJETAS,
  AVALIACOES,
  GENEROS,
  CONFIG_SISTEMA,
  ESTATISTICAS
};

// Para uso sem módulos ES6
if (typeof window !== 'undefined') {
  window.EventosFSAData = {
    BAIRROS,
    USUARIOS,
    TIPOS_ESTABELECIMENTO,
    ESTRUTURA_PADRAO,
    ESTABELECIMENTOS,
    EVENTOS,
    PROPOSTAS,
    GORJETAS,
    AVALIACOES,
    GENEROS,
    CONFIG_SISTEMA,
    ESTATISTICAS
  };
}
