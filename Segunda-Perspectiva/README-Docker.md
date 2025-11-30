# 🚀 Containerização da Segunda Perspectiva

Este documento explica como executar a **Segunda Perspectiva** (Web App Eventos FSA) em um container Docker.

## 📋 Pré-requisitos

- Docker instalado e rodando
- Docker Compose (opcional, mas recomendado)

## 🏗️ Build da Imagem

```bash
# Na pasta Segunda-Perspectiva
docker build -t eventos-fsa-segunda-perspectiva .
```

## 🚀 Executar com Docker

```bash
# Executar o container
docker run -p 8080:80 eventos-fsa-segunda-perspectiva

# Acessar: http://localhost:8080
```

## 🚀 Executar com Docker Compose

```bash
# Subir o serviço
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Parar
docker-compose down
```

## 🔍 Verificação

Após executar, verifique:

1. **Homepage**: http://localhost:8080 ✅
2. **Páginas funcionais**: /artistas ✅, /eventos ✅, /estabelecimentos ✅
3. **Rotas dinâmicas**: /artistas/1 ✅, /eventos/1 ✅
4. **PWA**: Verificar se service worker está registrado ✅

## 📊 Status dos Testes

- ✅ **Build Docker**: Sucesso (3.4s)
- ✅ **Execução Container**: Porta 8080 mapeada
- ✅ **Respostas HTTP**: 200 OK em todas as rotas testadas
- ✅ **SPA Fallback**: Funcionando para rotas Next.js
- ✅ **Gzip Compression**: Habilitado
- ✅ **Cache Headers**: Configurados para assets
- ✅ **Docker Compose**: Funcionando sem erros

## ⚡ Otimizações

- **Gzip**: Compressão automática
- **Cache**: Headers apropriados para assets
- **SPA Fallback**: Suporte a rotas do Next.js
- **Healthcheck**: Verificação de saúde do container

## 🐛 Troubleshooting

- **Porta ocupada**: Mude para outra porta: `-p 3000:80`
- **Build lento**: Verifique .dockerignore
- **Erro 404**: Verifique se out/ foi copiado corretamente

---

**Status**: ✅ Pronto para produção