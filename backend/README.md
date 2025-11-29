# EventosFSA - Backend API

🎵 API REST para a plataforma de eventos de Feira de Santana

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Criar arquivo .env (copiar do exemplo)
cp .env.example .env

# Rodar em desenvolvimento
npm run dev

# Rodar em produção
npm start
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── server.js           # Entry point
│   ├── database/
│   │   └── index.js        # Database em memória (dev)
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── artista.routes.js
│   │   ├── estabelecimento.routes.js
│   │   ├── evento.routes.js
│   │   ├── proposta.routes.js
│   │   ├── gorjeta.routes.js
│   │   ├── avaliacao.routes.js
│   │   └── admin.routes.js
│   └── utils/
│       ├── helpers.js
│       └── logger.js
├── uploads/                 # Arquivos uploadados
├── .env.example
└── package.json
```

## 🔗 Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Cadastro |
| GET | `/api/auth/me` | Perfil do usuário logado |
| PUT | `/api/auth/password` | Alterar senha |

### Artistas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/artistas` | Lista artistas |
| GET | `/api/artistas/ranking` | Top artistas |
| GET | `/api/artistas/:id` | Detalhes do artista |
| PUT | `/api/artistas/perfil` | Atualizar perfil |
| GET | `/api/artistas/:id/agenda` | Agenda do artista |

### Estabelecimentos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/estabelecimentos` | Lista estabelecimentos |
| GET | `/api/estabelecimentos/tipos` | Tipos disponíveis |
| GET | `/api/estabelecimentos/bairros` | Bairros com estabelecimentos |
| GET | `/api/estabelecimentos/:id` | Detalhes |
| PUT | `/api/estabelecimentos/perfil` | Atualizar perfil |

### Eventos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/eventos` | Lista eventos |
| GET | `/api/eventos/:id` | Detalhes do evento |
| POST | `/api/eventos` | Criar evento |
| PUT | `/api/eventos/:id` | Atualizar evento |
| DELETE | `/api/eventos/:id` | Cancelar evento |

### Propostas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/propostas` | Minhas propostas |
| POST | `/api/propostas` | Enviar proposta |
| PUT | `/api/propostas/:id/aceitar` | Aceitar proposta |
| PUT | `/api/propostas/:id/recusar` | Recusar proposta |
| PUT | `/api/propostas/:id/contraproposta` | Contraproposta |

### Gorjetas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/gorjetas` | Minhas gorjetas |
| GET | `/api/gorjetas/estatisticas` | Estatísticas |
| POST | `/api/gorjetas/:artistaId` | Enviar gorjeta |
| GET | `/api/gorjetas/:artistaId/widget` | Widget público |

### Avaliações
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/avaliacoes/artista/:id` | Avaliações do artista |
| GET | `/api/avaliacoes/estabelecimento/:id` | Avaliações do local |
| POST | `/api/avaliacoes/artista/:id` | Avaliar artista |
| POST | `/api/avaliacoes/estabelecimento/:id` | Avaliar local |

### Admin
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/admin/dashboard` | Dashboard |
| GET | `/api/admin/aprovacoes` | Pendências |
| PUT | `/api/admin/aprovar/:tipo/:id` | Aprovar cadastro |
| GET | `/api/admin/usuarios` | Lista usuários |
| GET | `/api/admin/relatorios/:tipo` | Relatórios |

## 🔐 Autenticação

Usar JWT no header:
```
Authorization: Bearer <token>
```

## 👥 Tipos de Usuário

- **usuario** - Usuário comum (pode avaliar e dar gorjetas)
- **artista** - Músicos/Bandas (recebe propostas e gorjetas)
- **estabelecimento** - Bar/Restaurante/Casa de Show (contrata artistas)
- **admin** - Administrador (aprova cadastros, relatórios)

## 🏪 Tipos de Estabelecimento

- `bar` - Bares e botequins
- `restaurante` - Restaurantes com música
- `casa-show` - Casas de show
- `pub` - Pubs e bistrôs
- `choperia` - Choperias e cervejarias
- `espaco-eventos` - Espaços para eventos

## 💰 Modelo de Negócio

- **10%** de comissão sobre cachês de artistas
- **5%** de comissão sobre gorjetas

## 🧪 Credenciais de Demo

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@eventosfsa.com.br | admin123 |
| Artista | weslei@email.com | 123456 |
| Estabelecimento | avendinha@email.com | 123456 |

## 📝 License

MIT
