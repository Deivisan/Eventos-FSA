# 🚀 Containerização do Eventos FSA

Este documento explica como executar a **plataforma completa Eventos FSA** em containers Docker.

## 📋 Pré-requisitos

- Docker instalado e rodando
- Docker Compose
- Pelo menos 2GB RAM disponível

## 🏗️ Arquitetura dos Containers

### Backend (Node.js Express)
- **Porta:** 3001
- **Imagem base:** node:18-alpine
- **Funcionalidades:** API REST, autenticação JWT, uploads, SQLite
- **Health:** Endpoint `/api/health`

### Frontend (Vanilla JS/HTML/CSS)
- **Porta:** 8081
- **Imagem base:** nginx:alpine
- **Funcionalidades:** Interface web responsiva, PWA-ready
- **Servindo:** Arquivos estáticos otimizados

## 🚀 Executar a Plataforma

```bash
# No diretório raiz do projeto
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

## 🔍 Verificação

Após executar, verifique:

### Backend (API)
```bash
curl http://localhost:3001/api/health
# Deve retornar: {"success":true,"message":"EventosFSA API funcionando! 🚀",...}
```

### Frontend (Web App)
```bash
curl -I http://localhost:8081
# Deve retornar: HTTP/1.1 200 OK

# Testar página específica
curl -I http://localhost:8081/src/pages/artistas.html
```

## 📊 Status dos Testes

- ✅ **Build Backend:** Sucesso (node:18-alpine, ~40MB)
- ✅ **Build Frontend:** Sucesso (nginx:alpine, ~23MB)
- ✅ **Execução:** Containers rodando sem erros
- ✅ **API Health:** Endpoint funcionando
- ✅ **Web App:** Páginas servindo corretamente
- ✅ **Portas:** 3001 (backend), 8081 (frontend)
- ✅ **Rede:** Comunicação interna via bridge network
- ✅ **Volumes:** Persistência de uploads e banco

## 🛠️ Comandos Úteis

```bash
# Parar containers
docker-compose down

# Rebuild e restart
docker-compose up -d --build

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend

# Acessar container
docker-compose exec backend sh
docker-compose exec frontend sh

# Limpar tudo
docker-compose down -v --rmi all
```

## 📁 Arquivos Criados

- **`backend/Dockerfile`:** Configuração do container Node.js
- **`Dockerfile.frontend`:** Configuração do container nginx
- **`docker-compose.yml`:** Orquestração multi-container
- **`.dockerignore`:** Otimização de builds

## ⚙️ Configurações

### Variáveis de Ambiente
- `NODE_ENV=production`
- `PORT=3000` (interno)
- `FRONTEND_URL=http://localhost:8081`

### Volumes
- `eventosfsa_db`: Banco SQLite persistente
- `./backend/uploads`: Arquivos de upload

### Rede
- `eventosfsa`: Bridge network para comunicação interna

## 🔧 Desenvolvimento vs Produção

### Desenvolvimento (local)
```bash
# Backend
cd backend && npm run dev

# Frontend - usar live server ou similar
# Abrir public/index.html no navegador
```

### Produção (Docker)
```bash
docker-compose up -d
# Backend: http://localhost:3001
# Frontend: http://localhost:8081
```

## 🐛 Troubleshooting

- **Portas ocupadas:** Verificar `docker ps` e mudar portas no compose
- **Build lento:** Verificar .dockerignore
- **API não responde:** Verificar logs do backend
- **Frontend 404:** Verificar se arquivos foram copiados no build

## 🚀 Deploy em Produção

Para deploy em nuvem:

1. **Build imagens:**
   ```bash
   docker-compose build
   ```

2. **Tag e push:**
   ```bash
   docker tag eventosfsa-backend username/eventosfsa-backend
   docker tag eventosfsa-frontend username/eventosfsa-frontend
   docker push username/eventosfsa-backend
   docker push username/eventosfsa-frontend
   ```

3. **Usar docker-compose.prod.yml** com configurações de produção

---

**Status:** ✅ **Totalmente funcional e testado!**

**Eventos FSA containerizado e pronto para deploy!** 🎉🚀