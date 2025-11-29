/**
 * Rotas de Estabelecimentos
 * Suporta: Bares, Restaurantes, Casas de Show, Pubs, Choperias
 */

const express = require('express');
const router = express.Router();
const { query, param, body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, isEstabelecimento } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate, sanitizeSearch } = require('../utils/helpers');
const logger = require('../utils/logger');

// Tipos de estabelecimento suportados
const TIPOS_ESTABELECIMENTO = ['bar', 'restaurante', 'casa-show', 'pub', 'choperia', 'espaco-eventos'];

/**
 * GET /api/estabelecimentos
 * Lista todos os estabelecimentos (público)
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('tipo').optional().isIn(TIPOS_ESTABELECIMENTO),
  query('bairro').optional().isString(),
  query('genero').optional().isString(),
  query('ordenar').optional().isIn(['avaliacao', 'eventos', 'capacidade', 'nome'])
], asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 12, 
    tipo,
    bairro, 
    genero,
    ordenar = 'avaliacao',
    busca,
    aberto // Filtro se está aberto agora
  } = req.query;

  let estabelecimentos = db.findAll('estabelecimentos', { ativo: true });

  // Filtro por tipo (bar, restaurante, casa-show, etc)
  if (tipo) {
    estabelecimentos = estabelecimentos.filter(e => 
      e.tipoCategoria === tipo || 
      sanitizeSearch(e.tipo).includes(sanitizeSearch(tipo))
    );
  }

  // Filtro por bairro
  if (bairro) {
    estabelecimentos = estabelecimentos.filter(e => 
      sanitizeSearch(e.bairro).includes(sanitizeSearch(bairro))
    );
  }

  // Filtro por gênero musical
  if (genero) {
    estabelecimentos = estabelecimentos.filter(e => 
      e.generosPrincipais.some(g => sanitizeSearch(g).includes(sanitizeSearch(genero)))
    );
  }

  // Busca textual
  if (busca) {
    const search = sanitizeSearch(busca);
    estabelecimentos = estabelecimentos.filter(e => 
      sanitizeSearch(e.nomeFantasia).includes(search) ||
      sanitizeSearch(e.descricao).includes(search) ||
      sanitizeSearch(e.bairro).includes(search)
    );
  }

  // Filtro se está aberto agora
  if (aberto === 'true') {
    const agora = new Date();
    const diaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][agora.getDay()];
    const horaAtual = agora.getHours() * 100 + agora.getMinutes();
    
    estabelecimentos = estabelecimentos.filter(e => {
      const horario = e.horarioFuncionamento?.[diaSemana];
      if (!horario) return false;
      
      const [abertura, fechamento] = horario.split('-').map(h => {
        const [hora, min] = h.split(':').map(Number);
        return hora * 100 + min;
      });
      
      return horaAtual >= abertura && horaAtual <= fechamento;
    });
  }

  // Ordenação
  switch (ordenar) {
    case 'avaliacao':
      estabelecimentos.sort((a, b) => b.avaliacao - a.avaliacao);
      break;
    case 'eventos':
      estabelecimentos.sort((a, b) => b.eventosRealizados - a.eventosRealizados);
      break;
    case 'capacidade':
      estabelecimentos.sort((a, b) => b.capacidade - a.capacidade);
      break;
    case 'nome':
      estabelecimentos.sort((a, b) => a.nomeFantasia.localeCompare(b.nomeFantasia));
      break;
  }

  // Premium primeiro
  estabelecimentos.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));

  // Paginar
  const result = paginate(estabelecimentos, parseInt(page), parseInt(limit));

  // Remover dados sensíveis
  result.data = result.data.map(({ senha, email, cnpj, ...estab }) => estab);

  res.json({
    success: true,
    ...result,
    tiposDisponiveis: TIPOS_ESTABELECIMENTO
  });
}));

/**
 * GET /api/estabelecimentos/tipos
 * Lista tipos de estabelecimento disponíveis
 */
router.get('/tipos', (req, res) => {
  res.json({
    success: true,
    tipos: [
      { id: 'bar', nome: 'Bar', icone: 'fas fa-beer', descricao: 'Bares e botequins' },
      { id: 'restaurante', nome: 'Restaurante', icone: 'fas fa-utensils', descricao: 'Restaurantes com música ao vivo' },
      { id: 'casa-show', nome: 'Casa de Shows', icone: 'fas fa-music', descricao: 'Casas de show e eventos' },
      { id: 'pub', nome: 'Pub', icone: 'fas fa-glass-whiskey', descricao: 'Pubs e bistrôs' },
      { id: 'choperia', nome: 'Choperia', icone: 'fas fa-beer', descricao: 'Choperias e cervejarias' },
      { id: 'espaco-eventos', nome: 'Espaço de Eventos', icone: 'fas fa-star', descricao: 'Espaços para festas e eventos' }
    ]
  });
});

/**
 * GET /api/estabelecimentos/bairros
 * Lista bairros com estabelecimentos
 */
router.get('/bairros', asyncHandler(async (req, res) => {
  const estabelecimentos = db.findAll('estabelecimentos', { ativo: true });
  
  const bairros = [...new Set(estabelecimentos.map(e => e.bairro))]
    .filter(Boolean)
    .sort();

  const bairrosComContagem = bairros.map(bairro => ({
    nome: bairro,
    quantidade: estabelecimentos.filter(e => e.bairro === bairro).length
  }));

  res.json({
    success: true,
    bairros: bairrosComContagem
  });
}));

/**
 * GET /api/estabelecimentos/:id
 * Detalhes de um estabelecimento (público)
 */
router.get('/:id', [
  param('id').notEmpty()
], asyncHandler(async (req, res) => {
  const estabelecimento = db.findById('estabelecimentos', req.params.id);

  if (!estabelecimento || !estabelecimento.ativo) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  // Remover dados sensíveis
  const { senha, cnpj, ...estabPublico } = estabelecimento;

  // Buscar últimas avaliações
  const avaliacoes = db.findAll('avaliacoes', { estabelecimentoId: estabelecimento.id })
    .slice(0, 5);

  // Próximos eventos
  const eventos = db.findAll('eventos', { estabelecimentoId: estabelecimento.id })
    .filter(e => new Date(e.data) >= new Date())
    .slice(0, 5);

  res.json({
    success: true,
    estabelecimento: estabPublico,
    avaliacoes,
    proximosEventos: eventos
  });
}));

/**
 * PUT /api/estabelecimentos/perfil
 * Atualizar perfil do estabelecimento (autenticado)
 */
router.put('/perfil', authenticate, isEstabelecimento, [
  body('nomeFantasia').optional().trim().notEmpty(),
  body('descricao').optional().isLength({ max: 500 }),
  body('tipoCategoria').optional().isIn(TIPOS_ESTABELECIMENTO),
  body('capacidade').optional().isInt({ min: 1 }),
  body('generosPrincipais').optional().isArray()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const allowedFields = [
    'nomeFantasia', 'descricao', 'tipo', 'tipoCategoria', 'endereco', 'bairro',
    'telefone', 'instagram', 'generosPrincipais', 'capacidade', 
    'horarioFuncionamento', 'estrutura'
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const estabelecimento = db.update('estabelecimentos', req.user.id, updates);

  if (!estabelecimento) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  const { senha, cnpj, ...estabAtualizado } = estabelecimento;

  logger.info(`Perfil atualizado: ${estabelecimento.nomeFantasia}`);

  res.json({
    success: true,
    message: 'Perfil atualizado com sucesso!',
    estabelecimento: estabAtualizado
  });
}));

/**
 * GET /api/estabelecimentos/:id/artistas-recomendados
 * Artistas recomendados para o estabelecimento
 */
router.get('/:id/artistas-recomendados', asyncHandler(async (req, res) => {
  const estabelecimento = db.findById('estabelecimentos', req.params.id);

  if (!estabelecimento) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  // Buscar artistas que tocam os gêneros do estabelecimento
  let artistas = db.findAll('artistas', { ativo: true });

  // Filtrar por gêneros compatíveis
  if (estabelecimento.generosPrincipais?.length > 0) {
    artistas = artistas.filter(a => 
      a.generos.some(g => 
        estabelecimento.generosPrincipais.some(eg => 
          sanitizeSearch(g).includes(sanitizeSearch(eg))
        )
      )
    );
  }

  // Ordenar por avaliação
  artistas.sort((a, b) => b.avaliacao - a.avaliacao);

  // Top 10
  const recomendados = artistas.slice(0, 10).map(({ senha, email, telefone, ...a }) => a);

  res.json({
    success: true,
    estabelecimentoId: estabelecimento.id,
    artistas: recomendados
  });
}));

/**
 * GET /api/estabelecimentos/:id/estatisticas
 * Estatísticas do estabelecimento (autenticado, próprio)
 */
router.get('/:id/estatisticas', authenticate, asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id && req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado'
    });
  }

  const estabelecimento = db.findById('estabelecimentos', req.params.id);

  if (!estabelecimento) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  const eventos = db.findAll('eventos', { estabelecimentoId: estabelecimento.id });
  const avaliacoes = db.findAll('avaliacoes', { estabelecimentoId: estabelecimento.id });
  const propostas = db.findAll('propostas', { estabelecimentoId: estabelecimento.id });

  const stats = {
    eventosRealizados: estabelecimento.eventosRealizados,
    avaliacao: estabelecimento.avaliacao,
    totalAvaliacoes: estabelecimento.totalAvaliacoes,
    eventos: {
      total: eventos.length,
      confirmados: eventos.filter(e => e.status === 'confirmado').length,
      realizados: eventos.filter(e => e.status === 'realizado').length
    },
    propostas: {
      total: propostas.length,
      pendentes: propostas.filter(p => p.status === 'pendente').length,
      aceitas: propostas.filter(p => p.status === 'aceita').length
    }
  };

  res.json({
    success: true,
    estatisticas: stats
  });
}));

module.exports = router;
