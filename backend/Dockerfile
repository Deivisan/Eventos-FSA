# Dockerfile para EventosFSA Backend
# API Node.js Express

FROM node:18-alpine

# Criar diretório da app
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY src/ ./src/
COPY uploads/ ./uploads/

# Criar diretório para uploads se não existir
RUN mkdir -p uploads/images

# Porta da aplicação
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Comando para iniciar
CMD ["npm", "start"]