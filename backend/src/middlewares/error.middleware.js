/**
 * Middleware de Tratamento de Erros
 */

const logger = require('../utils/logger');

/**
 * 404 - Rota não encontrada
 */
function notFound(req, res, next) {
  const error = new Error(`Rota não encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

/**
 * Error Handler Global
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  
  // Log do erro
  logger.error(message, {
    status: statusCode,
    path: req.path,
    method: req.method,
    stack: err.stack
  });
  
  // Resposta
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 
      ? 'Erro interno do servidor. Tente novamente.' 
      : message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
}

/**
 * Wrapper para async handlers
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  notFound,
  errorHandler,
  asyncHandler
};
