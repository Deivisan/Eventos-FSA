/**
 * Rotas de Gorjetas
 * Sistema de gorjetas para artistas via PIX
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate, isArtista } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const { paginate, calculateCommission, formatCurrency } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * GET /api/gorjetas
 * Lista gorjetas do artista logado
 */
router.get('/', authenticate, isArtista, asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, periodo } = req.query;

  let gorjetas = db.findAll('gorjetas', { artistaId: req.user.id });

  // Filtro por período
  if (periodo) {
    const hoje = new Date();
    let dataInicio;

    switch (periodo) {
      case 'hoje':
        dataInicio = new Date(hoje.setHours(0, 0, 0, 0));
        break;
      case 'semana':
        dataInicio = new Date(hoje.setDate(hoje.getDate() - 7));
        break;
      case 'mes':
        dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1));
        break;
      case 'ano':
        dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 1));
        break;
    }

    if (dataInicio) {
      gorjetas = gorjetas.filter(g => new Date(g.criadoEm) >= dataInicio);
    }
  }

  // Ordenar por data (mais recentes primeiro)
  gorjetas.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

  // Calcular totais
  const totalBruto = gorjetas.reduce((sum, g) => sum + g.valor, 0);
  const comissao = totalBruto * 0.05; // 5% de taxa
  const totalLiquido = totalBruto - comissao;

  const result = paginate(gorjetas, parseInt(page), parseInt(limit));

  res.json({
    success: true,
    ...result,
    resumo: {
      totalBruto: formatCurrency(totalBruto),
      taxaPlataforma: formatCurrency(comissao),
      totalLiquido: formatCurrency(totalLiquido),
      quantidade: gorjetas.length
    }
  });
}));

/**
 * GET /api/gorjetas/estatisticas
 * Estatísticas de gorjetas do artista
 */
router.get('/estatisticas', authenticate, isArtista, asyncHandler(async (req, res) => {
  const gorjetas = db.findAll('gorjetas', { artistaId: req.user.id });
  const artista = db.findById('artistas', req.user.id);

  // Por mês (últimos 6 meses)
  const porMes = [];
  for (let i = 5; i >= 0; i--) {
    const data = new Date();
    data.setMonth(data.getMonth() - i);
    const mes = data.toLocaleString('pt-BR', { month: 'short' });
    const ano = data.getFullYear();
    
    const gorjetasMes = gorjetas.filter(g => {
      const dataGorjeta = new Date(g.criadoEm);
      return dataGorjeta.getMonth() === data.getMonth() && 
             dataGorjeta.getFullYear() === ano;
    });
    
    porMes.push({
      periodo: `${mes}/${ano}`,
      total: gorjetasMes.reduce((sum, g) => sum + g.valor, 0),
      quantidade: gorjetasMes.length
    });
  }

  // Top doadores
  const doadoresMap = {};
  gorjetas.forEach(g => {
    if (!doadoresMap[g.doadorNome]) {
      doadoresMap[g.doadorNome] = { nome: g.doadorNome, total: 0, vezes: 0 };
    }
    doadoresMap[g.doadorNome].total += g.valor;
    doadoresMap[g.doadorNome].vezes++;
  });
  
  const topDoadores = Object.values(doadoresMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  res.json({
    success: true,
    estatisticas: {
      totalGeral: artista.gorjetasRecebidas,
      totalGorjetas: gorjetas.length,
      mediaGorjeta: gorjetas.length > 0 
        ? (artista.gorjetasRecebidas / gorjetas.length).toFixed(2) 
        : 0,
      maiorGorjeta: gorjetas.length > 0 
        ? Math.max(...gorjetas.map(g => g.valor)) 
        : 0,
      porMes,
      topDoadores
    }
  });
}));

/**
 * POST /api/gorjetas/:artistaId
 * Enviar gorjeta para artista (público, autenticado opcional)
 */
router.post('/:artistaId', [
  body('valor').isFloat({ min: 5 }).withMessage('Valor mínimo: R$ 5,00'),
  body('mensagem').optional().isLength({ max: 200 }),
  body('doadorNome').optional().trim()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const artista = db.findById('artistas', req.params.artistaId);

  if (!artista || !artista.ativo) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  const { valor, mensagem, doadorNome, doadorEmail } = req.body;
  const valorFloat = parseFloat(valor);

  // Calcular comissão (5%)
  const calculo = calculateCommission(valorFloat, 'gorjeta');

  // Em produção, aqui integraria com API de PIX
  // Por enquanto, simular transação bem-sucedida

  const gorjeta = db.create('gorjetas', {
    artistaId: req.params.artistaId,
    doadorNome: doadorNome || 'Anônimo',
    doadorEmail: doadorEmail || null,
    valor: valorFloat,
    valorLiquido: calculo.net,
    taxaPlataforma: calculo.commission,
    mensagem: mensagem || '',
    status: 'confirmada', // pendente, confirmada, estornada
    metodoPagamento: 'PIX'
  });

  // Atualizar total do artista
  db.update('artistas', req.params.artistaId, {
    gorjetasRecebidas: artista.gorjetasRecebidas + calculo.net
  });

  // Notificar artista
  db.create('notificacoes', {
    usuarioId: req.params.artistaId,
    tipo: 'gorjeta',
    titulo: `💰 Gorjeta de ${formatCurrency(valorFloat)}`,
    mensagem: mensagem 
      ? `${doadorNome || 'Anônimo'}: "${mensagem}"` 
      : `${doadorNome || 'Anônimo'} enviou uma gorjeta!`,
    link: '/artista/gorjetas.html',
    lida: false
  });

  logger.info(`Gorjeta enviada`, {
    artista: artista.nomeArtistico,
    valor: valorFloat,
    doador: doadorNome || 'Anônimo'
  });

  res.status(201).json({
    success: true,
    message: `Gorjeta de ${formatCurrency(valorFloat)} enviada com sucesso!`,
    gorjeta: {
      id: gorjeta.id,
      valor: formatCurrency(valorFloat),
      artista: artista.nomeArtistico,
      mensagem: mensagem || null
    },
    // Em produção, retornaria dados para gerar QR Code PIX
    pix: {
      qrCode: 'DADOS_PIX_QR_CODE_AQUI',
      copiaCola: '00020126580014br.gov.bcb.pix...'
    }
  });
}));

/**
 * GET /api/gorjetas/:artistaId/widget
 * Dados para widget de gorjeta (público)
 */
router.get('/:artistaId/widget', asyncHandler(async (req, res) => {
  const artista = db.findById('artistas', req.params.artistaId);

  if (!artista || !artista.ativo) {
    return res.status(404).json({
      success: false,
      message: 'Artista não encontrado'
    });
  }

  // Últimas gorjetas públicas
  const ultimasGorjetas = db.findAll('gorjetas', { artistaId: req.params.artistaId })
    .filter(g => g.status === 'confirmada')
    .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
    .slice(0, 5)
    .map(g => ({
      doador: g.doadorNome,
      valor: formatCurrency(g.valor),
      mensagem: g.mensagem,
      quando: g.criadoEm
    }));

  res.json({
    success: true,
    artista: {
      id: artista.id,
      nomeArtistico: artista.nomeArtistico,
      avatar: artista.avatar
    },
    valoresSugeridos: [10, 20, 50, 100],
    ultimasGorjetas
  });
}));

module.exports = router;
