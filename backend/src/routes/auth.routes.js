/**
 * Rotas de Autenticação
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const db = require('../database');
const { authenticate } = require('../middlewares/auth.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');
const logger = require('../utils/logger');

/**
 * POST /api/auth/login
 * Login de usuário
 */
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha obrigatória')
], asyncHandler(async (req, res) => {
  // Validar inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }

  const { email, senha } = req.body;

  // Buscar usuário
  const user = db.findUserByCredentials(email);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }

  // Verificar senha
  const isMatch = await bcrypt.compare(senha, user.senha);
  
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }

  // Verificar se está ativo
  if (!user.ativo) {
    return res.status(403).json({
      success: false,
      message: 'Conta inativa. Entre em contato com o suporte.'
    });
  }

  // Determinar tipo de usuário
  let tipo = user.tipo || 'usuario';
  if (user._collection === 'artistas') tipo = 'artista';
  if (user._collection === 'estabelecimentos') tipo = 'estabelecimento';

  // Gerar token
  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      tipo: tipo,
      nome: user.nomeArtistico || user.nomeFantasia || user.nome
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // Remover senha da resposta
  const { senha: _, ...userData } = user;

  logger.info(`Login realizado: ${email}`, { tipo });

  res.json({
    success: true,
    message: 'Login realizado com sucesso!',
    token,
    user: {
      ...userData,
      tipo
    }
  });
}));

/**
 * POST /api/auth/register
 * Cadastro de novo usuário
 */
router.post('/register', [
  body('nome').trim().notEmpty().withMessage('Nome obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('tipo').isIn(['usuario', 'artista', 'estabelecimento']).withMessage('Tipo inválido'),
  body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }

  const { nome, email, senha, tipo, telefone, bairro, ...extraData } = req.body;

  // Verificar se email já existe
  const existingUser = db.findUserByCredentials(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Este email já está cadastrado'
    });
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Dados base
  const baseData = {
    nome,
    email,
    senha: hashedPassword,
    telefone,
    bairro,
    ativo: tipo === 'usuario', // Usuários já ativos, artistas/estabelecimentos precisam aprovação
    verificado: false,
    premium: false
  };

  let newUser;
  let collection;

  // Criar conforme tipo
  switch (tipo) {
    case 'artista':
      collection = 'artistas';
      newUser = db.create('artistas', {
        ...baseData,
        nomeArtistico: extraData.nomeArtistico || nome,
        tipo: 'solo',
        generos: extraData.generos || [],
        descricao: '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=DC2626&color=fff`,
        cacheMinimo: extraData.cacheMinimo || 300,
        cacheMaximo: extraData.cacheMaximo || 500,
        equipamentoProprio: false,
        disponibilidade: [],
        avaliacao: 0,
        totalAvaliacoes: 0,
        showsRealizados: 0,
        gorjetasRecebidas: 0,
        ranking: 999,
        ativo: false // Precisa aprovação
      });
      break;

    case 'estabelecimento':
      collection = 'estabelecimentos';
      newUser = db.create('estabelecimentos', {
        ...baseData,
        nomeFantasia: extraData.nomeFantasia || nome,
        cnpj: extraData.cnpj || '',
        tipoCategoria: extraData.tipoEstabelecimento?.toLowerCase() || 'bar',
        tipo: extraData.tipoEstabelecimento || 'Bar',
        descricao: '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=1E293B&color=fff`,
        endereco: extraData.endereco || '',
        cidade: 'Feira de Santana',
        generosPrincipais: [],
        capacidade: extraData.capacidade || 50,
        horarioFuncionamento: {},
        estrutura: {
          palco: false,
          som: false,
          iluminacao: false,
          estacionamento: false,
          acessibilidade: false
        },
        avaliacao: 0,
        totalAvaliacoes: 0,
        eventosRealizados: 0,
        ativo: false // Precisa aprovação
      });
      break;

    default:
      collection = 'users';
      newUser = db.create('users', {
        ...baseData,
        tipo: 'usuario',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=6366F1&color=fff`
      });
  }

  // Remover senha da resposta
  const { senha: _, ...userData } = newUser;

  logger.info(`Novo cadastro: ${email}`, { tipo, collection });

  res.status(201).json({
    success: true,
    message: tipo === 'usuario' 
      ? 'Cadastro realizado com sucesso!' 
      : 'Cadastro recebido! Aguarde aprovação em até 24h.',
    user: userData,
    needsApproval: tipo !== 'usuario'
  });
}));

/**
 * GET /api/auth/me
 * Dados do usuário logado
 */
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  let user;
  
  switch (req.user.tipo) {
    case 'artista':
      user = db.findById('artistas', req.user.id);
      break;
    case 'estabelecimento':
      user = db.findById('estabelecimentos', req.user.id);
      break;
    default:
      user = db.findById('users', req.user.id);
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  const { senha: _, ...userData } = user;

  res.json({
    success: true,
    user: {
      ...userData,
      tipo: req.user.tipo
    }
  });
}));

/**
 * PUT /api/auth/password
 * Alterar senha
 */
router.put('/password', authenticate, [
  body('senhaAtual').notEmpty().withMessage('Senha atual obrigatória'),
  body('novaSenha').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { senhaAtual, novaSenha } = req.body;
  
  // Buscar usuário
  const collection = req.user.tipo === 'artista' ? 'artistas' 
    : req.user.tipo === 'estabelecimento' ? 'estabelecimentos' 
    : 'users';
    
  const user = db.findById(collection, req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  // Verificar senha atual
  const isMatch = await bcrypt.compare(senhaAtual, user.senha);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Senha atual incorreta'
    });
  }

  // Atualizar senha
  const hashedPassword = await bcrypt.hash(novaSenha, 10);
  db.update(collection, req.user.id, { senha: hashedPassword });

  logger.info(`Senha alterada: ${user.email}`);

  res.json({
    success: true,
    message: 'Senha alterada com sucesso!'
  });
}));

/**
 * POST /api/auth/forgot-password
 * Solicitar recuperação de senha
 */
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Email inválido')
], asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  const user = db.findUserByCredentials(email);
  
  // Sempre retornar sucesso por segurança
  logger.info(`Recuperação de senha solicitada: ${email}`, { found: !!user });

  res.json({
    success: true,
    message: 'Se o email existir, você receberá instruções de recuperação.'
  });
}));

module.exports = router;
