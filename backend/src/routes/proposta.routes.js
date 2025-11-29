/**
 * Rotas de Propostas
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, hasRole } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate, calculateCommission } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * GET /api/propostas
 * Lista propostas do usuário logado
 */
router.get('/', authenticate, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  let propostas;

  if (req.user.tipo === 'artista') {
    propostas = db.findAll('propostas', { artistaId: req.user.id });
  } else if (req.user.tipo === 'estabelecimento') {
    propostas = db.findAll('propostas', { estabelecimentoId: req.user.id });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Tipo de usuário não pode visualizar propostas'
    });
  }

  // Filtrar por status
  if (status) {
    propostas = propostas.filter(p => p.status === status);
  }

  // Ordenar por data (mais recentes primeiro)
  propostas.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

  // Enriquecer com dados
  propostas = propostas.map(p => {
    const artista = db.findById('artistas', p.artistaId);
    const estabelecimento = db.findById('estabelecimentos', p.estabelecimentoId);
    
    return {
      ...p,
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
        bairro: estabelecimento.bairro
      } : null
    };
  });

  const result = paginate(propostas, parseInt(page), parseInt(limit));

  res.json({
    success: true,
    ...result
  });
}));

/**
 * GET /api/propostas/:id
 * Detalhes de uma proposta
 */
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const proposta = db.findById('propostas', req.params.id);

  if (!proposta) {
    return res.status(404).json({
      success: false,
      message: 'Proposta não encontrada'
    });
  }

  // Verificar permissão
  if (proposta.artistaId !== req.user.id && 
      proposta.estabelecimentoId !== req.user.id && 
      req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Sem permissão para visualizar esta proposta'
    });
  }

  const artista = db.findById('artistas', proposta.artistaId);
  const estabelecimento = db.findById('estabelecimentos', proposta.estabelecimentoId);

  res.json({
    success: true,
    proposta: {
      ...proposta,
      artista: artista ? {
        id: artista.id,
        nomeArtistico: artista.nomeArtistico,
        avatar: artista.avatar,
        generos: artista.generos,
        avaliacao: artista.avaliacao,
        telefone: artista.telefone
      } : null,
      estabelecimento: estabelecimento ? {
        id: estabelecimento.id,
        nomeFantasia: estabelecimento.nomeFantasia,
        avatar: estabelecimento.avatar,
        endereco: estabelecimento.endereco,
        bairro: estabelecimento.bairro,
        telefone: estabelecimento.telefone
      } : null,
      calculo: calculateCommission(proposta.cache)
    }
  });
}));

/**
 * POST /api/propostas
 * Criar proposta (estabelecimento para artista)
 */
router.post('/', authenticate, hasRole('estabelecimento'), [
  body('artistaId').notEmpty().withMessage('Artista obrigatório'),
  body('data').isISO8601().withMessage('Data inválida'),
  body('cache').isNumeric().withMessage('Cachê inválido'),
  body('horarioInicio').matches(/^\d{2}:\d{2}$/).withMessage('Horário inválido')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { artistaId, data, horarioInicio, horarioFim, cache, mensagem } = req.body;

  // Verificar artista
  const artista = db.findById('artistas', artistaId);
  if (!artista || !artista.ativo) {
    return res.status(400).json({
      success: false,
      message: 'Artista não encontrado ou inativo'
    });
  }

  // Verificar se cachê está dentro do range
  if (cache < artista.cacheMinimo) {
    return res.status(400).json({
      success: false,
      message: `Cachê mínimo do artista é R$ ${artista.cacheMinimo}`
    });
  }

  const proposta = db.create('propostas', {
    artistaId,
    estabelecimentoId: req.user.id,
    data,
    horarioInicio,
    horarioFim: horarioFim || '',
    cache: parseFloat(cache),
    mensagem: mensagem || '',
    status: 'pendente', // pendente, aceita, recusada, expirada
    visualizada: false
  });

  // Criar notificação para o artista
  db.create('notificacoes', {
    usuarioId: artistaId,
    tipo: 'proposta',
    titulo: 'Nova proposta recebida!',
    mensagem: `${db.findById('estabelecimentos', req.user.id)?.nomeFantasia} quer contratar você`,
    link: `/artista/propostas.html?id=${proposta.id}`,
    lida: false
  });

  logger.info(`Proposta criada`, {
    artista: artista.nomeArtistico,
    cache,
    data
  });

  res.status(201).json({
    success: true,
    message: 'Proposta enviada! O artista será notificado.',
    proposta
  });
}));

/**
 * PUT /api/propostas/:id/aceitar
 * Aceitar proposta (artista)
 */
router.put('/:id/aceitar', authenticate, hasRole('artista'), asyncHandler(async (req, res) => {
  const proposta = db.findById('propostas', req.params.id);

  if (!proposta) {
    return res.status(404).json({
      success: false,
      message: 'Proposta não encontrada'
    });
  }

  if (proposta.artistaId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Esta proposta não é para você'
    });
  }

  if (proposta.status !== 'pendente') {
    return res.status(400).json({
      success: false,
      message: 'Esta proposta já foi respondida'
    });
  }

  // Atualizar proposta
  db.update('propostas', req.params.id, { 
    status: 'aceita',
    respondidaEm: new Date().toISOString()
  });

  // Criar evento automaticamente
  const artista = db.findById('artistas', req.user.id);
  const estabelecimento = db.findById('estabelecimentos', proposta.estabelecimentoId);

  db.create('eventos', {
    titulo: `${artista.nomeArtistico} ao vivo`,
    descricao: proposta.mensagem,
    data: proposta.data,
    horarioInicio: proposta.horarioInicio,
    horarioFim: proposta.horarioFim,
    artistaId: req.user.id,
    artistaNome: artista.nomeArtistico,
    artistaAvatar: artista.avatar,
    estabelecimentoId: proposta.estabelecimentoId,
    estabelecimentoNome: estabelecimento.nomeFantasia,
    estabelecimentoAvatar: estabelecimento.avatar,
    endereco: estabelecimento.endereco,
    bairro: estabelecimento.bairro,
    cache: proposta.cache,
    generos: artista.generos,
    imagem: artista.avatar,
    status: 'confirmado'
  });

  // Notificar estabelecimento
  db.create('notificacoes', {
    usuarioId: proposta.estabelecimentoId,
    tipo: 'proposta_aceita',
    titulo: 'Proposta aceita!',
    mensagem: `${artista.nomeArtistico} aceitou sua proposta`,
    link: `/estabelecimento/eventos.html`,
    lida: false
  });

  logger.info(`Proposta aceita`, {
    artista: artista.nomeArtistico,
    estabelecimento: estabelecimento.nomeFantasia
  });

  res.json({
    success: true,
    message: 'Proposta aceita! Evento criado automaticamente.'
  });
}));

/**
 * PUT /api/propostas/:id/recusar
 * Recusar proposta (artista)
 */
router.put('/:id/recusar', authenticate, hasRole('artista'), asyncHandler(async (req, res) => {
  const proposta = db.findById('propostas', req.params.id);

  if (!proposta) {
    return res.status(404).json({
      success: false,
      message: 'Proposta não encontrada'
    });
  }

  if (proposta.artistaId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Esta proposta não é para você'
    });
  }

  if (proposta.status !== 'pendente') {
    return res.status(400).json({
      success: false,
      message: 'Esta proposta já foi respondida'
    });
  }

  const { motivo } = req.body;

  db.update('propostas', req.params.id, { 
    status: 'recusada',
    motivoRecusa: motivo || '',
    respondidaEm: new Date().toISOString()
  });

  // Notificar estabelecimento
  const artista = db.findById('artistas', req.user.id);
  db.create('notificacoes', {
    usuarioId: proposta.estabelecimentoId,
    tipo: 'proposta_recusada',
    titulo: 'Proposta recusada',
    mensagem: `${artista.nomeArtistico} recusou sua proposta`,
    link: `/estabelecimento/contratar.html`,
    lida: false
  });

  res.json({
    success: true,
    message: 'Proposta recusada'
  });
}));

/**
 * PUT /api/propostas/:id/contraproposta
 * Enviar contraproposta (artista)
 */
router.put('/:id/contraproposta', authenticate, hasRole('artista'), [
  body('novoCache').isNumeric().withMessage('Novo cachê inválido')
], asyncHandler(async (req, res) => {
  const proposta = db.findById('propostas', req.params.id);

  if (!proposta || proposta.artistaId !== req.user.id) {
    return res.status(404).json({
      success: false,
      message: 'Proposta não encontrada'
    });
  }

  if (proposta.status !== 'pendente') {
    return res.status(400).json({
      success: false,
      message: 'Esta proposta já foi respondida'
    });
  }

  const { novoCache, mensagem } = req.body;

  db.update('propostas', req.params.id, { 
    status: 'contraproposta',
    contrapropostaCache: parseFloat(novoCache),
    contrapropostaMensagem: mensagem || '',
    contrapropostaEm: new Date().toISOString()
  });

  // Notificar estabelecimento
  const artista = db.findById('artistas', req.user.id);
  db.create('notificacoes', {
    usuarioId: proposta.estabelecimentoId,
    tipo: 'contraproposta',
    titulo: 'Contraproposta recebida',
    mensagem: `${artista.nomeArtistico} enviou uma contraproposta de R$ ${novoCache}`,
    link: `/estabelecimento/propostas.html?id=${proposta.id}`,
    lida: false
  });

  res.json({
    success: true,
    message: 'Contraproposta enviada!'
  });
}));

module.exports = router;
