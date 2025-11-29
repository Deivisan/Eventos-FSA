/**
 * Rotas de Artistas
 */

const express = require('express');
const router = express.Router();
const { query, param, body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, isArtista, hasRole } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate, sanitizeSearch } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * GET /api/artistas
 * Lista todos os artistas (público)
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('genero').optional().isString(),
  query('tipo').optional().isIn(['solo', 'duo', 'banda']),
  query('bairro').optional().isString(),
  query('ordenar').optional().isIn(['avaliacao', 'shows', 'gorjetas', 'nome', 'cacheMinimo'])
], asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 12, 
    genero, 
    tipo, 
    bairro, 
    ordenar = 'avaliacao',
    busca 
  } = req.query;

  let artistas = db.findAll('artistas', { ativo: true });

  // Filtros
  if (genero) {
    artistas = artistas.filter(a => 
      a.generos.some(g => sanitizeSearch(g).includes(sanitizeSearch(genero)))
    );
  }

  if (tipo) {
    artistas = artistas.filter(a => a.tipo === tipo);
  }

  if (bairro) {
    artistas = artistas.filter(a => 
      sanitizeSearch(a.bairro).includes(sanitizeSearch(bairro))
    );
  }

  if (busca) {
    const search = sanitizeSearch(busca);
    artistas = artistas.filter(a => 
      sanitizeSearch(a.nomeArtistico).includes(search) ||
      sanitizeSearch(a.descricao).includes(search) ||
      a.generos.some(g => sanitizeSearch(g).includes(search))
    );
  }

  // Ordenação
  switch (ordenar) {
    case 'avaliacao':
      artistas.sort((a, b) => b.avaliacao - a.avaliacao);
      break;
    case 'shows':
      artistas.sort((a, b) => b.showsRealizados - a.showsRealizados);
      break;
    case 'gorjetas':
      artistas.sort((a, b) => b.gorjetasRecebidas - a.gorjetasRecebidas);
      break;
    case 'nome':
      artistas.sort((a, b) => a.nomeArtistico.localeCompare(b.nomeArtistico));
      break;
    case 'cacheMinimo':
      artistas.sort((a, b) => a.cacheMinimo - b.cacheMinimo);
      break;
  }

  // Premium primeiro
  artistas.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));

  // Paginar
  const result = paginate(artistas, parseInt(page), parseInt(limit));

  // Remover dados sensíveis
  result.data = result.data.map(({ senha, email, telefone, ...artista }) => artista);

  res.json({
    success: true,
    ...result
  });
}));

/**
 * GET /api/artistas/ranking
 * Top artistas por categoria
 */
router.get('/ranking', asyncHandler(async (req, res) => {
  const { genero, limite = 10 } = req.query;

  let artistas = db.findAll('artistas', { ativo: true });

  if (genero) {
    artistas = artistas.filter(a => 
      a.generos.some(g => sanitizeSearch(g).includes(sanitizeSearch(genero)))
    );
  }

  // Ordenar por avaliação e shows
  artistas.sort((a, b) => {
    if (b.avaliacao !== a.avaliacao) return b.avaliacao - a.avaliacao;
    return b.showsRealizados - a.showsRealizados;
  });

  // Top N
  const ranking = artistas.slice(0, parseInt(limite)).map((a, index) => ({
    posicao: index + 1,
    id: a.id,
    nomeArtistico: a.nomeArtistico,
    avatar: a.avatar,
    generos: a.generos,
    avaliacao: a.avaliacao,
    totalAvaliacoes: a.totalAvaliacoes,
    showsRealizados: a.showsRealizados,
    premium: a.premium,
    verificado: a.verificado
  }));

  res.json({
    success: true,
    genero: genero || 'Geral',
    ranking
  });
}));

/**
 * GET /api/artistas/:id
 * Detalhes de um artista (público)
 */
router.get('/:id', [
  param('id').notEmpty()
], asyncHandler(async (req, res) => {
  const artista = db.findById('artistas', req.params.id);

  if (!artista || !artista.ativo) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Remover dados sensíveis
  const { senha, ...artistaPublico } = artista;

  // Buscar últimas avaliações
  const avaliacoes = db.findAll('avaliacoes', { artistaId: artista.id })
    .slice(0, 5);

  res.json({
    success: true,
    artista: artistaPublico,
    avaliacoes
  });
}));

/**
 * PUT /api/artistas/perfil
 * Atualizar perfil do artista (autenticado)
 */
router.put('/perfil', authenticate, isArtista, [
  body('nomeArtistico').optional().trim().notEmpty(),
  body('descricao').optional().isLength({ max: 500 }),
  body('generos').optional().isArray(),
  body('cacheMinimo').optional().isNumeric(),
  body('cacheMaximo').optional().isNumeric()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const allowedFields = [
    'nomeArtistico', 'descricao', 'generos', 'cacheMinimo', 'cacheMaximo',
    'equipamentoProprio', 'disponibilidade', 'instagram', 'telefone', 'bairro'
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const artista = db.update('artistas', req.user.id, updates);

  if (!artista) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  const { senha, ...artistaAtualizado } = artista;

  logger.info(`Perfil atualizado: ${artista.nomeArtistico}`);

  res.json({
    success: true,
    message: 'Perfil atualizado com sucesso!',
    artista: artistaAtualizado
  });
}));

/**
 * GET /api/artistas/:id/agenda
 * Agenda de um artista
 */
router.get('/:id/agenda', asyncHandler(async (req, res) => {
  const artista = db.findById('artistas', req.params.id);

  if (!artista) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Buscar eventos confirmados
  const eventos = db.findAll('eventos', { artistaId: artista.id })
    .filter(e => e.status === 'confirmado')
    .map(e => ({
      id: e.id,
      data: e.data,
      horario: e.horario,
      local: e.estabelecimentoNome,
      bairro: e.bairro
    }));

  res.json({
    success: true,
    artistaId: artista.id,
    nomeArtistico: artista.nomeArtistico,
    disponibilidade: artista.disponibilidade,
    eventos
  });
}));

/**
 * GET /api/artistas/:id/estatisticas
 * Estatísticas do artista (autenticado, próprio)
 */
router.get('/:id/estatisticas', authenticate, asyncHandler(async (req, res) => {
  // Verificar se é o próprio artista ou admin
  if (req.user.id !== req.params.id && req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado'
    });
  }

  const artista = db.findById('artistas', req.params.id);

  if (!artista) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Estatísticas
  const gorjetas = db.findAll('gorjetas', { artistaId: artista.id });
  const avaliacoes = db.findAll('avaliacoes', { artistaId: artista.id });
  const propostas = db.findAll('propostas', { artistaId: artista.id });

  const stats = {
    showsRealizados: artista.showsRealizados,
    avaliacao: artista.avaliacao,
    totalAvaliacoes: artista.totalAvaliacoes,
    ranking: artista.ranking,
    gorjetas: {
      total: artista.gorjetasRecebidas,
      quantidade: gorjetas.length,
      mediaPorShow: artista.showsRealizados > 0 
        ? (artista.gorjetasRecebidas / artista.showsRealizados).toFixed(2)
        : 0
    },
    propostas: {
      total: propostas.length,
      pendentes: propostas.filter(p => p.status === 'pendente').length,
      aceitas: propostas.filter(p => p.status === 'aceita').length,
      recusadas: propostas.filter(p => p.status === 'recusada').length
    }
  };

  res.json({
    success: true,
    estatisticas: stats
  });
}));

module.exports = router;
