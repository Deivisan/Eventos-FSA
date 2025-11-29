/**
 * Rotas de Eventos
 */

const express = require('express');
const router = express.Router();
const { query, param, body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, hasRole } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate, sanitizeSearch, generateId } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * GET /api/eventos
 * Lista eventos (público)
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('data').optional().isISO8601(),
  query('genero').optional().isString(),
  query('bairro').optional().isString()
], asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 12,
    data,
    genero,
    bairro,
    estabelecimentoId,
    artistaId,
    busca,
    periodo // 'hoje', 'semana', 'mes'
  } = req.query;

  let eventos = db.findAll('eventos');

  // Filtro por data específica
  if (data) {
    const dataFiltro = new Date(data).toISOString().split('T')[0];
    eventos = eventos.filter(e => 
      new Date(e.data).toISOString().split('T')[0] === dataFiltro
    );
  }

  // Filtro por período
  if (periodo) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    switch (periodo) {
      case 'hoje':
        eventos = eventos.filter(e => {
          const dataEvento = new Date(e.data);
          dataEvento.setHours(0, 0, 0, 0);
          return dataEvento.getTime() === hoje.getTime();
        });
        break;
      case 'semana':
        const fimSemana = new Date(hoje);
        fimSemana.setDate(fimSemana.getDate() + 7);
        eventos = eventos.filter(e => {
          const dataEvento = new Date(e.data);
          return dataEvento >= hoje && dataEvento <= fimSemana;
        });
        break;
      case 'mes':
        const fimMes = new Date(hoje);
        fimMes.setMonth(fimMes.getMonth() + 1);
        eventos = eventos.filter(e => {
          const dataEvento = new Date(e.data);
          return dataEvento >= hoje && dataEvento <= fimMes;
        });
        break;
    }
  }

  // Filtros
  if (genero) {
    eventos = eventos.filter(e => 
      e.generos?.some(g => sanitizeSearch(g).includes(sanitizeSearch(genero)))
    );
  }

  if (bairro) {
    eventos = eventos.filter(e => 
      sanitizeSearch(e.bairro).includes(sanitizeSearch(bairro))
    );
  }

  if (estabelecimentoId) {
    eventos = eventos.filter(e => e.estabelecimentoId === estabelecimentoId);
  }

  if (artistaId) {
    eventos = eventos.filter(e => e.artistaId === artistaId);
  }

  if (busca) {
    const search = sanitizeSearch(busca);
    eventos = eventos.filter(e => 
      sanitizeSearch(e.titulo).includes(search) ||
      sanitizeSearch(e.descricao).includes(search) ||
      sanitizeSearch(e.artistaNome).includes(search) ||
      sanitizeSearch(e.estabelecimentoNome).includes(search)
    );
  }

  // Ordenar por data (mais próximos primeiro)
  eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

  // Paginar
  const result = paginate(eventos, parseInt(page), parseInt(limit));

  res.json({
    success: true,
    ...result
  });
}));

/**
 * GET /api/eventos/:id
 * Detalhes de um evento
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const evento = db.findById('eventos', req.params.id);

  if (!evento) {
    return res.status(404).json({
      success: false,
      message: 'Evento não encontrado'
    });
  }

  // Buscar dados relacionados
  const artista = db.findById('artistas', evento.artistaId);
  const estabelecimento = db.findById('estabelecimentos', evento.estabelecimentoId);

  res.json({
    success: true,
    evento,
    artista: artista ? {
      id: artista.id,
      nomeArtistico: artista.nomeArtistico,
      avatar: artista.avatar,
      generos: artista.generos,
      avaliacao: artista.avaliacao
    } : null,
    estabelecimento: estabelecimento ? {
      id: estabelecimento.id,
      nomeFantasia: estabelecimento.nomeFantasia,
      avatar: estabelecimento.avatar,
      endereco: estabelecimento.endereco,
      bairro: estabelecimento.bairro
    } : null
  });
}));

/**
 * POST /api/eventos
 * Criar evento (estabelecimento)
 */
router.post('/', authenticate, hasRole('estabelecimento', 'admin'), [
  body('titulo').trim().notEmpty().withMessage('Título obrigatório'),
  body('data').isISO8601().withMessage('Data inválida'),
  body('horarioInicio').matches(/^\d{2}:\d{2}$/).withMessage('Horário inválido'),
  body('artistaId').notEmpty().withMessage('Artista obrigatório')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { 
    titulo, 
    descricao, 
    data, 
    horarioInicio, 
    horarioFim,
    artistaId,
    cache,
    generos,
    imagem
  } = req.body;

  // Buscar artista
  const artista = db.findById('artistas', artistaId);
  if (!artista) {
    return res.status(400).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Buscar estabelecimento
  const estabelecimento = db.findById('estabelecimentos', req.user.id);
  if (!estabelecimento) {
    return res.status(400).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  const evento = db.create('eventos', {
    titulo,
    descricao: descricao || '',
    data,
    horarioInicio,
    horarioFim: horarioFim || '',
    artistaId,
    artistaNome: artista.nomeArtistico,
    artistaAvatar: artista.avatar,
    estabelecimentoId: req.user.id,
    estabelecimentoNome: estabelecimento.nomeFantasia,
    estabelecimentoAvatar: estabelecimento.avatar,
    endereco: estabelecimento.endereco,
    bairro: estabelecimento.bairro,
    cache: cache || artista.cacheMinimo,
    generos: generos || artista.generos,
    imagem: imagem || artista.avatar,
    status: 'pendente', // pendente, confirmado, realizado, cancelado
    visualizacoes: 0,
    interessados: 0
  });

  // Criar proposta automática
  db.create('propostas', {
    eventoId: evento.id,
    artistaId,
    estabelecimentoId: req.user.id,
    cache,
    data,
    horarioInicio,
    horarioFim,
    mensagem: `Convite para ${titulo}`,
    status: 'pendente'
  });

  logger.info(`Evento criado: ${titulo}`, { 
    estabelecimento: estabelecimento.nomeFantasia,
    artista: artista.nomeArtistico
  });

  res.status(201).json({
    success: true,
    message: 'Evento criado! Aguardando confirmação do artista.',
    evento
  });
}));

/**
 * PUT /api/eventos/:id
 * Atualizar evento
 */
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  const evento = db.findById('eventos', req.params.id);

  if (!evento) {
    return res.status(404).json({
      success: false,
      message: 'Evento não encontrado'
    });
  }

  // Verificar permissão
  if (evento.estabelecimentoId !== req.user.id && req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Sem permissão para editar este evento'
    });
  }

  const allowedFields = ['titulo', 'descricao', 'data', 'horarioInicio', 'horarioFim', 'imagem'];
  const updates = {};
  
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const eventoAtualizado = db.update('eventos', req.params.id, updates);

  res.json({
    success: true,
    message: 'Evento atualizado!',
    evento: eventoAtualizado
  });
}));

/**
 * DELETE /api/eventos/:id
 * Cancelar evento
 */
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const evento = db.findById('eventos', req.params.id);

  if (!evento) {
    return res.status(404).json({
      success: false,
      message: 'Evento não encontrado'
    });
  }

  // Verificar permissão
  if (evento.estabelecimentoId !== req.user.id && req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Sem permissão para cancelar este evento'
    });
  }

  // Não deletar, apenas marcar como cancelado
  db.update('eventos', req.params.id, { status: 'cancelado' });

  logger.info(`Evento cancelado: ${evento.titulo}`);

  res.json({
    success: true,
    message: 'Evento cancelado'
  });
}));

/**
 * POST /api/eventos/:id/interesse
 * Marcar interesse em evento
 */
router.post('/:id/interesse', asyncHandler(async (req, res) => {
  const evento = db.findById('eventos', req.params.id);

  if (!evento) {
    return res.status(404).json({
      success: false,
      message: 'Evento não encontrado'
    });
  }

  db.update('eventos', req.params.id, { 
    interessados: (evento.interessados || 0) + 1 
  });

  res.json({
    success: true,
    message: 'Interesse registrado!'
  });
}));

module.exports = router;
