/**
 * Database em memória (para desenvolvimento)
 * Em produção, substituir por PostgreSQL/MongoDB
 */

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// ============================================
// DADOS MOCKADOS (espelhando data.js do frontend)
// ============================================

const db = {
  // Usuários (todos os tipos)
  users: [
    {
      id: 'u-admin-1',
      tipo: 'admin',
      nome: 'Administrador',
      email: 'admin@eventosfsa.com.br',
      senha: bcrypt.hashSync('admin123', 10),
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=DC2626&color=fff',
      ativo: true,
      criadoEm: '2024-01-01T00:00:00Z'
    }
  ],

  // Artistas
  artistas: [
    {
      id: 'art-1',
      userId: 'u-art-1',
      nomeArtistico: 'Weslei Ribeiro',
      nome: 'Weslei Ribeiro Santos',
      email: 'weslei@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'solo',
      generos: ['MPB', 'Pop', 'Bossa Nova'],
      descricao: 'Cantor e violonista com mais de 10 anos de experiência em música ao vivo.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      fotos: [],
      videos: ['https://youtube.com/watch?v=example'],
      cacheMinimo: 350,
      cacheMaximo: 600,
      equipamentoProprio: true,
      disponibilidade: ['sexta', 'sabado'],
      bairro: 'Kalilândia',
      cidade: 'Feira de Santana',
      telefone: '75999991111',
      instagram: '@wesleiribeiromusic',
      avaliacao: 4.9,
      totalAvaliacoes: 156,
      showsRealizados: 234,
      gorjetasRecebidas: 4520,
      verificado: true,
      premium: true,
      ativo: true,
      ranking: 1,
      criadoEm: '2024-01-15T00:00:00Z'
    },
    {
      id: 'art-2',
      userId: 'u-art-2',
      nomeArtistico: 'Manu',
      nome: 'Manuela Costa',
      email: 'manu@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'solo',
      generos: ['MPB', 'Pop', 'Soul'],
      descricao: 'Cantora com voz marcante, especializada em MPB e Pop.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      fotos: [],
      videos: [],
      cacheMinimo: 380,
      cacheMaximo: 550,
      equipamentoProprio: true,
      disponibilidade: ['quinta', 'sexta', 'sabado'],
      bairro: 'Centro',
      cidade: 'Feira de Santana',
      telefone: '75999992222',
      instagram: '@manumusica',
      avaliacao: 4.8,
      totalAvaliacoes: 89,
      showsRealizados: 156,
      gorjetasRecebidas: 2830,
      verificado: true,
      premium: false,
      ativo: true,
      ranking: 2,
      criadoEm: '2024-02-01T00:00:00Z'
    },
    {
      id: 'art-3',
      userId: 'u-art-3',
      nomeArtistico: 'Pedro Rocha',
      nome: 'Pedro Henrique Rocha',
      email: 'pedro@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'solo',
      generos: ['Rock', 'Blues', 'Classic Rock'],
      descricao: 'Guitarrista e vocalista de rock e blues.',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      fotos: [],
      videos: [],
      cacheMinimo: 400,
      cacheMaximo: 700,
      equipamentoProprio: true,
      disponibilidade: ['sexta', 'sabado'],
      bairro: 'SIM',
      cidade: 'Feira de Santana',
      telefone: '75999993333',
      instagram: '@pedrorochamusic',
      avaliacao: 4.7,
      totalAvaliacoes: 67,
      showsRealizados: 98,
      gorjetasRecebidas: 1540,
      verificado: true,
      premium: false,
      ativo: true,
      ranking: 5,
      criadoEm: '2024-02-15T00:00:00Z'
    },
    {
      id: 'art-4',
      userId: 'u-art-4',
      nomeArtistico: 'Duo Acústico',
      nome: 'Rafael e Jéssica',
      email: 'duoacustico@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'duo',
      generos: ['MPB', 'Sertanejo', 'Pop'],
      descricao: 'Duo versátil com repertório variado para todos os gostos.',
      avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300',
      fotos: [],
      videos: [],
      cacheMinimo: 500,
      cacheMaximo: 900,
      equipamentoProprio: true,
      disponibilidade: ['quinta', 'sexta', 'sabado', 'domingo'],
      bairro: 'Capuchinhos',
      cidade: 'Feira de Santana',
      telefone: '75999994444',
      instagram: '@duoacustico',
      avaliacao: 4.6,
      totalAvaliacoes: 45,
      showsRealizados: 78,
      gorjetasRecebidas: 980,
      verificado: true,
      premium: false,
      ativo: true,
      ranking: 8,
      criadoEm: '2024-03-01T00:00:00Z'
    },
    {
      id: 'art-5',
      userId: 'u-art-5',
      nomeArtistico: 'Banda Somzeira',
      nome: 'Banda Somzeira',
      email: 'somzeira@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'banda',
      generos: ['Forró', 'Axé', 'Pagode'],
      descricao: 'Banda animada para festas e eventos com repertório nordestino.',
      avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=300',
      fotos: [],
      videos: [],
      cacheMinimo: 1500,
      cacheMaximo: 3000,
      equipamentoProprio: true,
      disponibilidade: ['sexta', 'sabado'],
      bairro: 'Tomba',
      cidade: 'Feira de Santana',
      telefone: '75999995555',
      instagram: '@bandasomzeira',
      avaliacao: 4.8,
      totalAvaliacoes: 112,
      showsRealizados: 189,
      gorjetasRecebidas: 5670,
      verificado: true,
      premium: true,
      ativo: true,
      ranking: 3,
      criadoEm: '2024-01-20T00:00:00Z'
    }
  ],

  // Estabelecimentos (bares, restaurantes, casas de show)
  estabelecimentos: [
    {
      id: 'est-1',
      userId: 'u-est-1',
      nomeFantasia: 'A Vendinha',
      razaoSocial: 'A Vendinha Bar e Restaurante LTDA',
      cnpj: '12.345.678/0001-90',
      email: 'avendinha@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'Bar',
      tipoCategoria: 'bar', // bar, restaurante, casa-show, pub, choperia
      descricao: 'Bar aconchegante com música ao vivo toda semana. Ambiente familiar e petiscos artesanais.',
      avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300',
      fotos: [],
      endereco: 'Rua das Flores, 123',
      bairro: 'Kalilândia',
      cidade: 'Feira de Santana',
      cep: '44001-000',
      telefone: '75988881111',
      instagram: '@avendinhabar',
      generosPrincipais: ['MPB', 'Pop', 'Samba'],
      capacidade: 80,
      horarioFuncionamento: {
        segunda: null,
        terca: null,
        quarta: '18:00-23:00',
        quinta: '18:00-23:00',
        sexta: '18:00-02:00',
        sabado: '18:00-02:00',
        domingo: '16:00-22:00'
      },
      estrutura: {
        palco: true,
        som: true,
        iluminacao: true,
        estacionamento: true,
        acessibilidade: true
      },
      avaliacao: 4.7,
      totalAvaliacoes: 234,
      eventosRealizados: 89,
      verificado: true,
      premium: true,
      ativo: true,
      criadoEm: '2024-01-10T00:00:00Z'
    },
    {
      id: 'est-2',
      userId: 'u-est-2',
      nomeFantasia: 'Dom Vicente',
      razaoSocial: 'Dom Vicente Restaurante LTDA',
      cnpj: '98.765.432/0001-10',
      email: 'domvicente@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'Restaurante',
      tipoCategoria: 'restaurante',
      descricao: 'Restaurante sofisticado com cozinha contemporânea e música ao vivo nos finais de semana.',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
      fotos: [],
      endereco: 'Av. Getúlio Vargas, 456',
      bairro: 'Capuchinhos',
      cidade: 'Feira de Santana',
      cep: '44002-000',
      telefone: '75988882222',
      instagram: '@domvicente',
      generosPrincipais: ['Jazz', 'Bossa Nova', 'MPB'],
      capacidade: 120,
      horarioFuncionamento: {
        segunda: null,
        terca: '18:00-23:00',
        quarta: '18:00-23:00',
        quinta: '18:00-23:00',
        sexta: '18:00-00:00',
        sabado: '12:00-00:00',
        domingo: '12:00-16:00'
      },
      estrutura: {
        palco: true,
        som: true,
        iluminacao: true,
        estacionamento: true,
        acessibilidade: true
      },
      avaliacao: 4.9,
      totalAvaliacoes: 456,
      eventosRealizados: 67,
      verificado: true,
      premium: true,
      ativo: true,
      criadoEm: '2024-01-05T00:00:00Z'
    },
    {
      id: 'est-3',
      userId: 'u-est-3',
      nomeFantasia: 'Cidade da Cultura',
      razaoSocial: 'Centro Cultural Cidade LTDA',
      cnpj: '11.222.333/0001-44',
      email: 'cidadedacultura@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'Casa de Shows',
      tipoCategoria: 'casa-show',
      descricao: 'Espaço cultural com programação diversificada e capacidade para grandes eventos.',
      avatar: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300',
      fotos: [],
      endereco: 'Praça da Cultura, s/n',
      bairro: 'Centro',
      cidade: 'Feira de Santana',
      cep: '44000-000',
      telefone: '75988883333',
      instagram: '@cidadedacultura',
      generosPrincipais: ['MPB', 'Rock', 'Forró', 'Axé'],
      capacidade: 500,
      horarioFuncionamento: {
        segunda: null,
        terca: null,
        quarta: null,
        quinta: '19:00-23:00',
        sexta: '19:00-02:00',
        sabado: '19:00-02:00',
        domingo: null
      },
      estrutura: {
        palco: true,
        som: true,
        iluminacao: true,
        estacionamento: true,
        acessibilidade: true
      },
      avaliacao: 4.6,
      totalAvaliacoes: 678,
      eventosRealizados: 156,
      verificado: true,
      premium: true,
      ativo: true,
      criadoEm: '2024-01-01T00:00:00Z'
    },
    {
      id: 'est-4',
      userId: 'u-est-4',
      nomeFantasia: 'Boteco do Seu Zé',
      razaoSocial: 'Boteco do Seu Zé ME',
      cnpj: '44.555.666/0001-77',
      email: 'boteco@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'Bar',
      tipoCategoria: 'bar',
      descricao: 'Boteco tradicional com cerveja gelada e música ao vivo aos finais de semana.',
      avatar: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=300',
      fotos: [],
      endereco: 'Rua Conselheiro Franco, 789',
      bairro: 'Centro',
      cidade: 'Feira de Santana',
      cep: '44000-100',
      telefone: '75988884444',
      instagram: '@botecoseuzefsa',
      generosPrincipais: ['Pagode', 'Samba', 'Forró'],
      capacidade: 60,
      horarioFuncionamento: {
        segunda: null,
        terca: null,
        quarta: null,
        quinta: '17:00-23:00',
        sexta: '17:00-01:00',
        sabado: '14:00-01:00',
        domingo: '14:00-20:00'
      },
      estrutura: {
        palco: false,
        som: true,
        iluminacao: false,
        estacionamento: false,
        acessibilidade: false
      },
      avaliacao: 4.5,
      totalAvaliacoes: 123,
      eventosRealizados: 45,
      verificado: true,
      premium: false,
      ativo: true,
      criadoEm: '2024-02-10T00:00:00Z'
    },
    {
      id: 'est-5',
      userId: 'u-est-5',
      nomeFantasia: 'Irish Pub FSA',
      razaoSocial: 'Irish Pub Feira LTDA',
      cnpj: '77.888.999/0001-11',
      email: 'irishpub@email.com',
      senha: bcrypt.hashSync('123456', 10),
      tipo: 'Pub',
      tipoCategoria: 'pub',
      descricao: 'Pub irlandês com cervejas importadas e música ao vivo.',
      avatar: 'https://images.unsplash.com/photo-1571024057263-9a51b9c9b8a5?w=300',
      fotos: [],
      endereco: 'Av. Maria Quitéria, 1500',
      bairro: 'Santa Mônica',
      cidade: 'Feira de Santana',
      cep: '44050-000',
      telefone: '75988885555',
      instagram: '@irishpubfsa',
      generosPrincipais: ['Rock', 'Blues', 'Folk'],
      capacidade: 100,
      horarioFuncionamento: {
        segunda: null,
        terca: '18:00-00:00',
        quarta: '18:00-00:00',
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
        acessibilidade: true
      },
      avaliacao: 4.8,
      totalAvaliacoes: 234,
      eventosRealizados: 78,
      verificado: true,
      premium: false,
      ativo: true,
      criadoEm: '2024-01-25T00:00:00Z'
    }
  ],

  // Eventos
  eventos: [],

  // Propostas
  propostas: [],

  // Gorjetas
  gorjetas: [],

  // Avaliações
  avaliacoes: [],

  // Notificações
  notificacoes: []
};

// ============================================
// MÉTODOS DO DATABASE
// ============================================

const database = {
  // Buscar por ID
  findById(collection, id) {
    return db[collection]?.find(item => item.id === id) || null;
  },

  // Buscar por email
  findByEmail(collection, email) {
    return db[collection]?.find(item => item.email === email) || null;
  },

  // Buscar todos
  findAll(collection, filters = {}) {
    let results = [...(db[collection] || [])];
    
    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        results = results.filter(item => {
          if (Array.isArray(item[key])) {
            return item[key].includes(filters[key]);
          }
          return item[key] === filters[key];
        });
      }
    });
    
    return results;
  },

  // Criar
  create(collection, data) {
    const newItem = {
      id: uuidv4(),
      ...data,
      criadoEm: new Date().toISOString()
    };
    db[collection].push(newItem);
    return newItem;
  },

  // Atualizar
  update(collection, id, data) {
    const index = db[collection]?.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    db[collection][index] = {
      ...db[collection][index],
      ...data,
      atualizadoEm: new Date().toISOString()
    };
    return db[collection][index];
  },

  // Deletar
  delete(collection, id) {
    const index = db[collection]?.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    db[collection].splice(index, 1);
    return true;
  },

  // Contar
  count(collection, filters = {}) {
    return this.findAll(collection, filters).length;
  },

  // Buscar usuário por credenciais (login)
  findUserByCredentials(email, collection = null) {
    // Buscar em todas as coleções se não especificado
    const collections = collection 
      ? [collection] 
      : ['users', 'artistas', 'estabelecimentos'];
    
    for (const col of collections) {
      const user = this.findByEmail(col, email);
      if (user) return { ...user, _collection: col };
    }
    return null;
  },

  // Acesso direto ao db (para casos específicos)
  raw() {
    return db;
  }
};

module.exports = database;
