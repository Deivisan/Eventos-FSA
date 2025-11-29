/**
 * Rotas de Administração
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate } = require('../utils/helpers');
const logger = require('../utils/logger');

// Todas as rotas requerem autenticação admin
router.use(authenticate, isAdmin);

/**
 * GET /api/admin/dashboard
 * Dados do dashboard administrativo
 */
router.get('/dashboard', asyncHandler(async (req, res) => {
  const artistas = db.findAll('artistas');
  const estabelecimentos = db.findAll('estabelecimentos');
  const eventos = db.findAll('eventos');
  const gorjetas = db.findAll('gorjetas');
  const propostas = db.findAll('propostas');

  // Estatísticas gerais
  const stats = {
    artistas: {
      total: artistas.length,
      ativos: artistas.filter(a => a.ativo).length,
      premium: artistas.filter(a => a.premium).length,
      pendentesAprovacao: artistas.filter(a => !a.ativo && !a.verificado).length
    },
    estabelecimentos: {
      total: estabelecimentos.length,
      ativos: estabelecimentos.filter(e => e.ativo).length,
      premium: estabelecimentos.filter(e => e.premium).length,
      pendentesAprovacao: estabelecimentos.filter(e => !e.ativo && !e.verificado).length,
      porTipo: {
        bar: estabelecimentos.filter(e => e.tipoCategoria === 'bar').length,
        restaurante: estabelecimentos.filter(e => e.tipoCategoria === 'restaurante').length,
        casaShow: estabelecimentos.filter(e => e.tipoCategoria === 'casa-show').length,
        pub: estabelecimentos.filter(e => e.tipoCategoria === 'pub').length,
        outros: estabelecimentos.filter(e => !['bar', 'restaurante', 'casa-show', 'pub'].includes(e.tipoCategoria)).length
      }
    },
    eventos: {
      total: eventos.length,
      confirmados: eventos.filter(e => e.status === 'confirmado').length,
      realizados: eventos.filter(e => e.status === 'realizado').length,
      cancelados: eventos.filter(e => e.status === 'cancelado').length
    },
    financeiro: {
      totalGorjetas: gorjetas.reduce((sum, g) => sum + g.valor, 0),
      comissaoGorjetas: gorjetas.reduce((sum, g) => sum + g.taxaPlataforma, 0),
      totalCaches: propostas.filter(p => p.status === 'aceita').reduce((sum, p) => sum + p.cache, 0),
      comissaoCaches: propostas.filter(p => p.status === 'aceita').reduce((sum, p) => sum + (p.cache * 0.10), 0)
    },
    propostas: {
      total: propostas.length,
      pendentes: propostas.filter(p => p.status === 'pendente').length,
      aceitas: propostas.filter(p => p.status === 'aceita').length,
      recusadas: propostas.filter(p => p.status === 'recusada').length
    }
  };

  // Últimas atividades
  const atividades = [
    ...artistas.slice(-5).map(a => ({
      tipo: 'novo_artista',
      mensagem: `Novo artista: ${a.nomeArtistico}`,
      data: a.criadoEm
    })),
    ...estabelecimentos.slice(-5).map(e => ({
      tipo: 'novo_estabelecimento',
      mensagem: `Novo estabelecimento: ${e.nomeFantasia}`,
      data: e.criadoEm
    })),
    ...gorjetas.slice(-5).map(g => ({
      tipo: 'gorjeta',
      mensagem: `Gorjeta de R$ ${g.valor}`,
      data: g.criadoEm
    }))
  ].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 10);

  res.json({
    success: true,
    stats,
    atividades
  });
}));

/**
 * GET /api/admin/aprovacoes
 * Lista pendências de aprovação
 */
router.get('/aprovacoes', asyncHandler(async (req, res) => {
  const artistasPendentes = db.findAll('artistas')
    .filter(a => !a.ativo)
    .map(({ senha, ...a }) => ({ ...a, tipo: 'artista' }));

  const estabelecimentosPendentes = db.findAll('estabelecimentos')
    .filter(e => !e.ativo)
    .map(({ senha, ...e }) => ({ ...e, tipo: 'estabelecimento' }));

  const pendentes = [...artistasPendentes, ...estabelecimentosPendentes]
    .sort((a, b) => new Date(a.criadoEm) - new Date(b.criadoEm));

  res.json({
    success: true,
    total: pendentes.length,
    pendentes
  });
}));

/**
 * PUT /api/admin/aprovar/:tipo/:id
 * Aprovar artista ou estabelecimento
 */
router.put('/aprovar/:tipo/:id', asyncHandler(async (req, res) => {
  const { tipo, id } = req.params;
  const collection = tipo === 'artista' ? 'artistas' : 'estabelecimentos';

  const item = db.findById(collection, id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item não encontrado'
    });
  }

  db.update(collection, id, {
    ativo: true,
    verificado: true,
    aprovadoPor: req.user.id,
    aprovadoEm: new Date().toISOString()
  });

  // Notificar
  db.create('notificacoes', {
    usuarioId: id,
    tipo: 'aprovacao',
    titulo: 'Cadastro aprovado! 🎉',
    mensagem: 'Seu cadastro foi aprovado. Bem-vindo ao EventosFSA!',
    link: tipo === 'artista' ? '/artista/dashboard.html' : '/estabelecimento/dashboard.html',
    lida: false
  });

  logger.info(`Cadastro aprovado`, { tipo, id, admin: req.user.email });

  res.json({
    success: true,
    message: 'Cadastro aprovado com sucesso!'
  });
}));

/**
 * PUT /api/admin/rejeitar/:tipo/:id
 * Rejeitar artista ou estabelecimento
 */
router.put('/rejeitar/:tipo/:id', [
  body('motivo').trim().notEmpty().withMessage('Motivo obrigatório')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { tipo, id } = req.params;
  const { motivo } = req.body;
  const collection = tipo === 'artista' ? 'artistas' : 'estabelecimentos';

  const item = db.findById(collection, id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item não encontrado'
    });
  }

  db.update(collection, id, {
    ativo: false,
    rejeitado: true,
    motivoRejeicao: motivo,
    rejeitadoPor: req.user.id,
    rejeitadoEm: new Date().toISOString()
  });

  logger.info(`Cadastro rejeitado`, { tipo, id, motivo, admin: req.user.email });

  res.json({
    success: true,
    message: 'Cadastro rejeitado'
  });
}));

/**
 * GET /api/admin/usuarios
 * Lista todos os usuários
 */
router.get('/usuarios', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, tipo, status, busca } = req.query;

  let usuarios = [];

  // Combinar todas as coleções
  const artistas = db.findAll('artistas').map(({ senha, ...a }) => ({ ...a, _tipo: 'artista' }));
  const estabelecimentos = db.findAll('estabelecimentos').map(({ senha, ...e }) => ({ ...e, _tipo: 'estabelecimento' }));
  const admins = db.findAll('users').map(({ senha, ...u }) => ({ ...u, _tipo: u.tipo }));

  usuarios = [...artistas, ...estabelecimentos, ...admins];

  // Filtros
  if (tipo) {
    usuarios = usuarios.filter(u => u._tipo === tipo);
  }

  if (status === 'ativo') {
    usuarios = usuarios.filter(u => u.ativo);
  } else if (status === 'inativo') {
    usuarios = usuarios.filter(u => !u.ativo);
  }

  if (busca) {
    const search = busca.toLowerCase();
    usuarios = usuarios.filter(u => 
      (u.nome || '').toLowerCase().includes(search) ||
      (u.nomeArtistico || '').toLowerCase().includes(search) ||
      (u.nomeFantasia || '').toLowerCase().includes(search) ||
      (u.email || '').toLowerCase().includes(search)
    );
  }

  // Ordenar por data
  usuarios.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

  const result = paginate(usuarios, parseInt(page), parseInt(limit));

  res.json({
    success: true,
    ...result
  });
}));

/**
 * PUT /api/admin/usuarios/:id/status
 * Ativar/desativar usuário
 */
router.put('/usuarios/:id/status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ativo, collection } = req.body;

  const item = db.findById(collection, id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  db.update(collection, id, { ativo });

  logger.info(`Status de usuário alterado`, { id, ativo, admin: req.user.email });

  res.json({
    success: true,
    message: ativo ? 'Usuário ativado' : 'Usuário desativado'
  });
}));

/**
 * GET /api/admin/relatorios
 * Gerar relatórios
 */
router.get('/relatorios/:tipo', asyncHandler(async (req, res) => {
  const { tipo } = req.params;
  const { inicio, fim } = req.query;

  let dados;

  switch (tipo) {
    case 'financeiro':
      const gorjetas = db.findAll('gorjetas');
      const propostas = db.findAll('propostas').filter(p => p.status === 'aceita');
      
      dados = {
        gorjetas: {
          total: gorjetas.reduce((sum, g) => sum + g.valor, 0),
          comissao: gorjetas.reduce((sum, g) => sum + g.taxaPlataforma, 0),
          quantidade: gorjetas.length
        },
        caches: {
          total: propostas.reduce((sum, p) => sum + p.cache, 0),
          comissao: propostas.reduce((sum, p) => sum + (p.cache * 0.10), 0),
          quantidade: propostas.length
        }
      };
      dados.receitaTotal = dados.gorjetas.comissao + dados.caches.comissao;
      break;

    case 'artistas':
      dados = db.findAll('artistas')
        .map(a => ({
          id: a.id,
          nome: a.nomeArtistico,
          shows: a.showsRealizados,
          gorjetas: a.gorjetasRecebidas,
          avaliacao: a.avaliacao,
          premium: a.premium
        }))
        .sort((a, b) => b.shows - a.shows);
      break;

    case 'estabelecimentos':
      dados = db.findAll('estabelecimentos')
        .map(e => ({
          id: e.id,
          nome: e.nomeFantasia,
          tipo: e.tipoCategoria,
          eventos: e.eventosRealizados,
          avaliacao: e.avaliacao,
          premium: e.premium
        }))
        .sort((a, b) => b.eventos - a.eventos);
      break;

    default:
      return res.status(400).json({
        success: false,
        message: 'Tipo de relatório inválido'
      });
  }

  res.json({
    success: true,
    tipo,
    periodo: { inicio, fim },
    dados
  });
}));

module.exports = router;
