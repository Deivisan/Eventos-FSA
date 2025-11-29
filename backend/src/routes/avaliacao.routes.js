/**
 * Rotas de Avaliações
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * GET /api/avaliacoes/artista/:id
 * Avaliações de um artista
 */
router.get('/artista/:id', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const artista = db.findById('artistas', req.params.id);
  if (!artista) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  let avaliacoes = db.findAll('avaliacoes', { artistaId: req.params.id });
  
  // Ordenar por data
  avaliacoes.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

  const result = paginate(avaliacoes, parseInt(page), parseInt(limit));

  // Distribuição de notas
  const distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  avaliacoes.forEach(a => {
    distribuicao[a.nota] = (distribuicao[a.nota] || 0) + 1;
  });

  res.json({
    success: true,
    ...result,
    resumo: {
      media: artista.avaliacao,
      total: artista.totalAvaliacoes,
      distribuicao
    }
  });
}));

/**
 * GET /api/avaliacoes/estabelecimento/:id
 * Avaliações de um estabelecimento
 */
router.get('/estabelecimento/:id', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const estabelecimento = db.findById('estabelecimentos', req.params.id);
  if (!estabelecimento) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  let avaliacoes = db.findAll('avaliacoes', { estabelecimentoId: req.params.id });
  avaliacoes.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

  const result = paginate(avaliacoes, parseInt(page), parseInt(limit));

  const distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  avaliacoes.forEach(a => {
    distribuicao[a.nota] = (distribuicao[a.nota] || 0) + 1;
  });

  res.json({
    success: true,
    ...result,
    resumo: {
      media: estabelecimento.avaliacao,
      total: estabelecimento.totalAvaliacoes,
      distribuicao
    }
  });
}));

/**
 * POST /api/avaliacoes/artista/:id
 * Avaliar artista
 */
router.post('/artista/:id', authenticate, [
  body('nota').isInt({ min: 1, max: 5 }).withMessage('Nota deve ser de 1 a 5'),
  body('comentario').optional().isLength({ max: 500 })
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const artista = db.findById('artistas', req.params.id);
  if (!artista) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Verificar se já avaliou
  const avaliacaoExistente = db.findAll('avaliacoes', { 
    artistaId: req.params.id 
  }).find(a => a.avaliadorId === req.user.id);

  if (avaliacaoExistente) {
    return res.status(400).json({
      success: false,
      message: 'Você já avaliou este artista'
    });
  }

  const { nota, comentario } = req.body;

  const avaliacao = db.create('avaliacoes', {
    artistaId: req.params.id,
    avaliadorId: req.user.id,
    avaliadorNome: req.user.nome,
    nota: parseInt(nota),
    comentario: comentario || '',
    tipo: 'artista'
  });

  // Recalcular média do artista
  const todasAvaliacoes = db.findAll('avaliacoes', { artistaId: req.params.id });
  const novaMedia = todasAvaliacoes.reduce((sum, a) => sum + a.nota, 0) / todasAvaliacoes.length;

  db.update('artistas', req.params.id, {
    avaliacao: parseFloat(novaMedia.toFixed(1)),
    totalAvaliacoes: todasAvaliacoes.length
  });

  logger.info(`Avaliação criada`, {
    artista: artista.nomeArtistico,
    nota,
    avaliador: req.user.nome
  });

  res.status(201).json({
    success: true,
    message: 'Avaliação enviada!',
    avaliacao
  });
}));

/**
 * POST /api/avaliacoes/estabelecimento/:id
 * Avaliar estabelecimento
 */
router.post('/estabelecimento/:id', authenticate, [
  body('nota').isInt({ min: 1, max: 5 }).withMessage('Nota deve ser de 1 a 5'),
  body('comentario').optional().isLength({ max: 500 })
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const estabelecimento = db.findById('estabelecimentos', req.params.id);
  if (!estabelecimento) {
    return res.status(404).json({
      success: false,
      message: 'Estabelecimento não encontrado'
    });
  }

  const avaliacaoExistente = db.findAll('avaliacoes', { 
    estabelecimentoId: req.params.id 
  }).find(a => a.avaliadorId === req.user.id);

  if (avaliacaoExistente) {
    return res.status(400).json({
      success: false,
      message: 'Você já avaliou este estabelecimento'
    });
  }

  const { nota, comentario } = req.body;

  const avaliacao = db.create('avaliacoes', {
    estabelecimentoId: req.params.id,
    avaliadorId: req.user.id,
    avaliadorNome: req.user.nome,
    nota: parseInt(nota),
    comentario: comentario || '',
    tipo: 'estabelecimento'
  });

  // Recalcular média
  const todasAvaliacoes = db.findAll('avaliacoes', { estabelecimentoId: req.params.id });
  const novaMedia = todasAvaliacoes.reduce((sum, a) => sum + a.nota, 0) / todasAvaliacoes.length;

  db.update('estabelecimentos', req.params.id, {
    avaliacao: parseFloat(novaMedia.toFixed(1)),
    totalAvaliacoes: todasAvaliacoes.length
  });

  logger.info(`Avaliação criada`, {
    estabelecimento: estabelecimento.nomeFantasia,
    nota
  });

  res.status(201).json({
    success: true,
    message: 'Avaliação enviada!',
    avaliacao
  });
}));

/**
 * DELETE /api/avaliacoes/:id
 * Remover avaliação (própria ou admin)
 */
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const avaliacao = db.findById('avaliacoes', req.params.id);

  if (!avaliacao) {
    return res.status(404).json({
      success: false,
      message: 'Avaliação não encontrada'
    });
  }

  if (avaliacao.avaliadorId !== req.user.id && req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Sem permissão'
    });
  }

  db.delete('avaliacoes', req.params.id);

  // Recalcular médias
  if (avaliacao.artistaId) {
    const avaliacoes = db.findAll('avaliacoes', { artistaId: avaliacao.artistaId });
    const media = avaliacoes.length > 0 
      ? avaliacoes.reduce((sum, a) => sum + a.nota, 0) / avaliacoes.length 
      : 0;
    db.update('artistas', avaliacao.artistaId, {
      avaliacao: parseFloat(media.toFixed(1)),
      totalAvaliacoes: avaliacoes.length
    });
  }

  if (avaliacao.estabelecimentoId) {
    const avaliacoes = db.findAll('avaliacoes', { estabelecimentoId: avaliacao.estabelecimentoId });
    const media = avaliacoes.length > 0 
      ? avaliacoes.reduce((sum, a) => sum + a.nota, 0) / avaliacoes.length 
      : 0;
    db.update('estabelecimentos', avaliacao.estabelecimentoId, {
      avaliacao: parseFloat(media.toFixed(1)),
      totalAvaliacoes: avaliacoes.length
    });
  }

  res.json({
    success: true,
    message: 'Avaliação removida'
  });
}));

module.exports = router;
