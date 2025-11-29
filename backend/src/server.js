/**
 * EventosFSA - Servidor Principal
 * API REST para a plataforma de eventos de Feira de Santana
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Rotas
const authRoutes = require('./routes/auth.routes');
const artistaRoutes = require('./routes/artista.routes');
const estabelecimentoRoutes = require('./routes/estabelecimento.routes');
const eventoRoutes = require('./routes/evento.routes');
const propostaRoutes = require('./routes/proposta.routes');
const gorjetaRoutes = require('./routes/gorjeta.routes');
const avaliacaoRoutes = require('./routes/avaliacao.routes');
const adminRoutes = require('./routes/admin.routes');

// Middlewares
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');

const app = express();

// ============================================
// CONFIGURAÇÕES DE SEGURANÇA
// ============================================

// Helmet - Headers de segurança
app.use(helmet());

// CORS - Origens permitidas
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5500',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting - Proteção contra abuso
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Muitas requisições. Tente novamente em 15 minutos.'
  }
});
app.use('/api/', limiter);

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================

// Parse JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Log de requisições
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// ============================================
// ROTAS DA API
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EventosFSA API funcionando! 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/artistas', artistaRoutes);
app.use('/api/estabelecimentos', estabelecimentoRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/propostas', propostaRoutes);
app.use('/api/gorjetas', gorjetaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/admin', adminRoutes);

// Rota raiz - Documentação
app.get('/', (req, res) => {
  res.json({
    name: 'EventosFSA API',
    description: 'Plataforma de conexão entre artistas, estabelecimentos e público de Feira de Santana',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        profile: 'GET /api/auth/me'
      },
      artistas: 'GET /api/artistas',
      estabelecimentos: 'GET /api/estabelecimentos',
      eventos: 'GET /api/eventos',
      propostas: '/api/propostas',
      gorjetas: '/api/gorjetas',
      admin: '/api/admin (requer autenticação admin)'
    },
    docs: 'Em breve: /api/docs'
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 - Rota não encontrada
app.use(notFound);

// Error Handler global
app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🎵 EventosFSA API iniciada!             ║
║                                           ║
║   📍 http://localhost:${PORT}               ║
║   🌍 Ambiente: ${process.env.NODE_ENV || 'development'}            ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

module.exports = app;
