/**
 * Middleware de Autenticação JWT
 */

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Verifica token JWT
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token não fornecido. Faça login para continuar.'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Token inválido ou expirado', { error: error.message });
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado. Faça login novamente.'
    });
  }
}

/**
 * Verifica se é artista
 */
function isArtista(req, res, next) {
  if (!req.user || req.user.tipo !== 'artista') {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito a artistas.'
    });
  }
  next();
}

/**
 * Verifica se é estabelecimento
 */
function isEstabelecimento(req, res, next) {
  if (!req.user || req.user.tipo !== 'estabelecimento') {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito a estabelecimentos.'
    });
  }
  next();
}

/**
 * Verifica se é admin
 */
function isAdmin(req, res, next) {
  if (!req.user || req.user.tipo !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito a administradores.'
    });
  }
  next();
}

/**
 * Verifica múltiplos tipos
 */
function hasRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.tipo)) {
      return res.status(403).json({
        success: false,
        message: `Acesso restrito a: ${roles.join(', ')}`
      });
    }
    next();
  };
}

module.exports = {
  authenticate,
  isArtista,
  isEstabelecimento,
  isAdmin,
  hasRole
};
