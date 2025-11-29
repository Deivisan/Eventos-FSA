/**
 * EventosFSA - Aplicação Principal
 * Sistema de autenticação e controle da aplicação
 */

// ========== ESTADO DA APLICAÇÃO ==========
const AppState = {
  currentUser: null,
  isAuthenticated: false,
  theme: 'light',
  sidebarOpen: false
};

// ========== SISTEMA DE AUTENTICAÇÃO ==========
const Auth = {
  // Credenciais de demonstração
  demoCredentials: {
    admin: { email: 'admin@eventosfsa.com.br', senha: 'admin123', tipo: 'admin' },
    artista: { email: 'artista@eventosfsa.com.br', senha: 'artista123', tipo: 'artista' },
    estabelecimento: { email: 'bar@eventosfsa.com.br', senha: 'bar123', tipo: 'estabelecimento' },
    usuario: { email: 'usuario@eventosfsa.com.br', senha: 'user123', tipo: 'usuario' }
  },

  // Login
  login(email, senha) {
    // Verificar credenciais de admin
    if (email === 'admin@eventosfsa.com.br' && senha === 'admin123') {
      const user = {
        id: 1,
        nome: 'Administrador',
        email: email,
        tipo: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=FF6B35&color=fff'
      };
      this.setSession(user);
      return { success: true, user, redirect: 'src/pages/admin/dashboard.html' };
    }

    // Verificar credenciais de artista demo
    if (email === 'artista@eventosfsa.com.br' && senha === 'artista123') {
      const user = window.EventosFSAData?.USUARIOS?.artistas?.[0] || {
        id: 101,
        nome: 'Weslei Ribeiro',
        email: email,
        tipo: 'artista',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      };
      user.tipo = 'artista';
      this.setSession(user);
      return { success: true, user, redirect: 'src/pages/artista/dashboard.html' };
    }

    // Verificar credenciais de estabelecimento demo
    if (email === 'bar@eventosfsa.com.br' && senha === 'bar123') {
      const user = window.EventosFSAData?.ESTABELECIMENTOS?.[0] || {
        id: 301,
        nome: 'Cidade da Cultura',
        email: email,
        tipo: 'estabelecimento',
        avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150'
      };
      user.tipo = 'estabelecimento';
      this.setSession(user);
      return { success: true, user, redirect: 'src/pages/estabelecimento/dashboard.html' };
    }

    // Verificar em artistas cadastrados
    if (window.EventosFSAData) {
      const artista = window.EventosFSAData.USUARIOS.artistas.find(
        a => a.email === email && a.senha === senha
      );
      if (artista) {
        artista.tipo = 'artista';
        this.setSession(artista);
        return { success: true, user: artista, redirect: 'src/pages/artista/dashboard.html' };
      }

      // Verificar em bandas
      const banda = window.EventosFSAData.USUARIOS.bandas.find(
        b => b.email === email && b.senha === senha
      );
      if (banda) {
        banda.tipo = 'artista';
        this.setSession(banda);
        return { success: true, user: banda, redirect: 'src/pages/artista/dashboard.html' };
      }

      // Verificar em estabelecimentos
      const estabelecimento = window.EventosFSAData.ESTABELECIMENTOS.find(
        e => e.email === email && e.senha === senha
      );
      if (estabelecimento) {
        estabelecimento.tipo = 'estabelecimento';
        this.setSession(estabelecimento);
        return { success: true, user: estabelecimento, redirect: 'src/pages/estabelecimento/dashboard.html' };
      }
    }

    return { success: false, message: 'Email ou senha inválidos' };
  },

  // Logout
  logout() {
    localStorage.removeItem('eventosfsa_user');
    localStorage.removeItem('eventosfsa_token');
    AppState.currentUser = null;
    AppState.isAuthenticated = false;
    window.location.href = this.getBasePath() + 'index.html';
  },

  // Definir sessão
  setSession(user) {
    const token = this.generateToken();
    localStorage.setItem('eventosfsa_user', JSON.stringify(user));
    localStorage.setItem('eventosfsa_token', token);
    AppState.currentUser = user;
    AppState.isAuthenticated = true;
  },

  // Verificar sessão
  checkSession() {
    const userStr = localStorage.getItem('eventosfsa_user');
    const token = localStorage.getItem('eventosfsa_token');
    
    if (userStr && token) {
      try {
        AppState.currentUser = JSON.parse(userStr);
        AppState.isAuthenticated = true;
        return true;
      } catch (e) {
        this.logout();
        return false;
      }
    }
    return false;
  },

  // Obter usuário atual
  getCurrentUser() {
    if (!AppState.currentUser) {
      this.checkSession();
    }
    return AppState.currentUser;
  },

  // Verificar se está autenticado
  isAuthenticated() {
    return this.checkSession();
  },

  // Verificar tipo de usuário
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.tipo === role;
  },

  // Gerar token simples (apenas para demo)
  generateToken() {
    return 'demo_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Obter caminho base
  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/src/pages/')) {
      return '../../';
    } else if (path.includes('/public/')) {
      return '';
    }
    return '';
  }
};

// ========== UTILITÁRIOS ==========
const Utils = {
  // Formatar moeda
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  // Formatar data
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  },

  // Formatar data curta
  formatDateShort(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  },

  // Formatar horário
  formatTime(timeStr) {
    return timeStr;
  },

  // Gerar estrelas de avaliação
  generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star rating-star filled"></i>';
    }
    if (hasHalf) {
      stars += '<i class="fas fa-star-half-alt rating-star filled"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star rating-star"></i>';
    }
    
    return stars;
  },

  // Obter parâmetros da URL
  getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Capitalizar primeira letra
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Truncar texto
  truncate(str, length) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  }
};

// ========== NOTIFICAÇÕES (TOAST) ==========
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 5000) {
    this.init();

    const icons = {
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-times-circle',
      info: 'fas fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="${icons[type]} toast-icon"></i>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'danger');
  },

  warning(message) {
    this.show(message, 'warning');
  },

  info(message) {
    this.show(message, 'info');
  }
};

// ========== MODAL ==========
const Modal = {
  show(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  hide(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Criar modal dinamicamente
  create(options) {
    const { id, title, content, size = '', footer = '' } = options;
    
    const modalHTML = `
      <div class="modal-backdrop" id="${id}" onclick="if(event.target === this) Modal.hide('${id}')">
        <div class="modal ${size}">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="Modal.hide('${id}')">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    return document.getElementById(id);
  }
};

// ========== SIDEBAR ==========
const Sidebar = {
  toggle() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.toggle('active');
      AppState.sidebarOpen = sidebar.classList.contains('active');
    }
    
    if (overlay) {
      overlay.classList.toggle('active');
    }
  },

  close() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.remove('active');
      AppState.sidebarOpen = false;
    }
    
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação
  Auth.checkSession();

  // Atualizar UI com base na autenticação
  updateAuthUI();

  // Configurar mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', Sidebar.toggle);
  }

  // Configurar overlay do sidebar
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', Sidebar.close);
  }

  // Configurar dropdowns
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      this.classList.toggle('active');
    });
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
    }
  });

  // Configurar tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabGroup = this.closest('.tabs');
      const tabContents = this.closest('section').querySelectorAll('.tab-content');
      const targetId = this.dataset.tab;

      tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      this.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Configurar forms de login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Adicionar animação CSS para toasts
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

// ========== FUNÇÕES DE UI ==========
function updateAuthUI() {
  const user = Auth.getCurrentUser();
  const authButtons = document.querySelector('.header-actions');
  
  if (user && authButtons) {
    // Usuário está logado, mostrar menu do usuário
    const loginBtn = authButtons.querySelector('a[href*="login"]');
    const cadastroBtn = authButtons.querySelector('a[href*="cadastro"]');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (cadastroBtn) cadastroBtn.style.display = 'none';
    
    // Adicionar menu do usuário se não existir
    if (!authButtons.querySelector('.header-user')) {
      const userMenu = document.createElement('div');
      userMenu.className = 'dropdown';
      userMenu.innerHTML = `
        <div class="header-user">
          <div class="header-user-info">
            <div class="header-user-name">${user.nome || user.nomeArtistico}</div>
            <div class="header-user-role">${Utils.capitalize(user.tipo)}</div>
          </div>
          <div class="avatar avatar-md">
            <img src="${user.avatar}" alt="${user.nome}">
          </div>
        </div>
        <div class="dropdown-menu">
          <a href="${getDashboardLink(user.tipo)}" class="dropdown-item">
            <i class="fas fa-tachometer-alt dropdown-item-icon"></i>
            Dashboard
          </a>
          <a href="${getProfileLink(user.tipo)}" class="dropdown-item">
            <i class="fas fa-user dropdown-item-icon"></i>
            Meu Perfil
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" onclick="Auth.logout(); return false;">
            <i class="fas fa-sign-out-alt dropdown-item-icon"></i>
            Sair
          </a>
        </div>
      `;
      authButtons.insertBefore(userMenu, authButtons.querySelector('.mobile-menu-btn'));
    }
  }
}

function getDashboardLink(tipo) {
  const basePath = Auth.getBasePath();
  switch(tipo) {
    case 'admin': return basePath + 'src/pages/admin/dashboard.html';
    case 'artista': return basePath + 'src/pages/artista/dashboard.html';
    case 'estabelecimento': return basePath + 'src/pages/estabelecimento/dashboard.html';
    default: return basePath + 'index.html';
  }
}

function getProfileLink(tipo) {
  const basePath = Auth.getBasePath();
  switch(tipo) {
    case 'admin': return basePath + 'src/pages/admin/perfil.html';
    case 'artista': return basePath + 'src/pages/artista/perfil.html';
    case 'estabelecimento': return basePath + 'src/pages/estabelecimento/perfil.html';
    default: return basePath + 'index.html';
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  const result = Auth.login(email, senha);
  
  if (result.success) {
    Toast.success('Login realizado com sucesso!');
    setTimeout(() => {
      window.location.href = Auth.getBasePath() + result.redirect;
    }, 1000);
  } else {
    Toast.error(result.message);
  }
}

// ========== GORJETAS ==========
const TipSystem = {
  selectedAmount: 0,

  selectAmount(amount, btn) {
    this.selectedAmount = amount;
    document.querySelectorAll('.tip-amount').forEach(b => b.classList.remove('selected'));
    if (btn) btn.classList.add('selected');
    this.updateTotal();
  },

  setCustomAmount(value) {
    this.selectedAmount = parseFloat(value) || 0;
    document.querySelectorAll('.tip-amount').forEach(b => b.classList.remove('selected'));
    this.updateTotal();
  },

  updateTotal() {
    const totalEl = document.querySelector('.tip-widget-total');
    if (totalEl) {
      totalEl.textContent = Utils.formatCurrency(this.selectedAmount);
    }
  },

  sendTip(artistaId) {
    if (this.selectedAmount < 5) {
      Toast.warning('O valor mínimo da gorjeta é R$ 5,00');
      return;
    }

    // Simular envio
    Toast.success(`Gorjeta de ${Utils.formatCurrency(this.selectedAmount)} enviada com sucesso!`);
    
    // Resetar
    this.selectedAmount = 0;
    document.querySelectorAll('.tip-amount').forEach(b => b.classList.remove('selected'));
    const customInput = document.querySelector('.tip-custom-input');
    if (customInput) customInput.value = '';
    this.updateTotal();
  }
};

// ========== SISTEMA DE ESTABELECIMENTOS ==========
const EstabelecimentoService = {
  // Obter todos os estabelecimentos
  getAll() {
    return window.EventosFSAData?.ESTABELECIMENTOS || [];
  },

  // Obter por ID
  getById(id) {
    return this.getAll().find(e => e.id === parseInt(id));
  },

  // Filtrar por tipo/categoria
  filterByType(tipoCategoria) {
    if (!tipoCategoria || tipoCategoria === 'todos') {
      return this.getAll();
    }
    return this.getAll().filter(e => e.tipoCategoria === tipoCategoria);
  },

  // Filtrar apenas bares
  getBares() {
    return this.getAll().filter(e => 
      ['bar', 'boteco', 'pub', 'choperia'].includes(e.tipoCategoria)
    );
  },

  // Filtrar apenas restaurantes
  getRestaurantes() {
    return this.getAll().filter(e => 
      e.tipoCategoria === 'restaurante' || e.cozinha
    );
  },

  // Filtrar casas de show e espaços de eventos
  getCasasShow() {
    return this.getAll().filter(e => 
      ['casa-show', 'espaco-eventos'].includes(e.tipoCategoria)
    );
  },

  // Filtrar por gênero musical
  filterByGenero(genero) {
    return this.getAll().filter(e => 
      e.generosPrincipais?.includes(genero)
    );
  },

  // Filtrar por bairro
  filterByBairro(bairro) {
    return this.getAll().filter(e => e.bairro === bairro);
  },

  // Filtrar por faixa de preço
  filterByFaixaPreco(faixa) {
    return this.getAll().filter(e => e.faixaPreco === faixa);
  },

  // Filtrar por capacidade mínima
  filterByCapacidade(minCapacidade) {
    return this.getAll().filter(e => e.capacidade >= minCapacidade);
  },

  // Filtrar estabelecimentos premium
  getPremium() {
    return this.getAll().filter(e => e.premium);
  },

  // Filtrar estabelecimentos verificados
  getVerificados() {
    return this.getAll().filter(e => e.verificado);
  },

  // Busca textual
  search(termo) {
    const termoLower = termo.toLowerCase();
    return this.getAll().filter(e => 
      e.nome.toLowerCase().includes(termoLower) ||
      e.tipo.toLowerCase().includes(termoLower) ||
      e.descricao?.toLowerCase().includes(termoLower) ||
      e.bairro?.toLowerCase().includes(termoLower) ||
      e.especialidades?.some(esp => esp.toLowerCase().includes(termoLower))
    );
  },

  // Ordenar por avaliação
  sortByRating(estabelecimentos, desc = true) {
    return [...estabelecimentos].sort((a, b) => 
      desc ? b.avaliacao - a.avaliacao : a.avaliacao - b.avaliacao
    );
  },

  // Ordenar por eventos realizados
  sortByEventos(estabelecimentos, desc = true) {
    return [...estabelecimentos].sort((a, b) => 
      desc ? b.eventosRealizados - a.eventosRealizados : a.eventosRealizados - b.eventosRealizados
    );
  },

  // Filtro avançado
  filtroAvancado(filtros = {}) {
    let resultado = this.getAll();

    if (filtros.tipo && filtros.tipo !== 'todos') {
      resultado = resultado.filter(e => e.tipoCategoria === filtros.tipo);
    }

    if (filtros.bairro) {
      resultado = resultado.filter(e => e.bairro === filtros.bairro);
    }

    if (filtros.genero) {
      resultado = resultado.filter(e => 
        e.generosPrincipais?.includes(filtros.genero)
      );
    }

    if (filtros.faixaPreco) {
      resultado = resultado.filter(e => e.faixaPreco === filtros.faixaPreco);
    }

    if (filtros.capacidadeMin) {
      resultado = resultado.filter(e => e.capacidade >= filtros.capacidadeMin);
    }

    if (filtros.apenasVerificados) {
      resultado = resultado.filter(e => e.verificado);
    }

    if (filtros.apenasPremium) {
      resultado = resultado.filter(e => e.premium);
    }

    if (filtros.comReserva) {
      resultado = resultado.filter(e => e.aceitaReserva);
    }

    if (filtros.estrutura) {
      Object.keys(filtros.estrutura).forEach(key => {
        if (filtros.estrutura[key]) {
          resultado = resultado.filter(e => e.estrutura?.[key]);
        }
      });
    }

    if (filtros.cardapio) {
      Object.keys(filtros.cardapio).forEach(key => {
        if (filtros.cardapio[key]) {
          resultado = resultado.filter(e => e.cardapio?.[key]);
        }
      });
    }

    // Ordenação
    if (filtros.ordenarPor === 'avaliacao') {
      resultado = this.sortByRating(resultado);
    } else if (filtros.ordenarPor === 'eventos') {
      resultado = this.sortByEventos(resultado);
    }

    return resultado;
  },

  // Obter tipos de estabelecimento disponíveis
  getTipos() {
    return window.EventosFSAData?.TIPOS_ESTABELECIMENTO || [];
  },

  // Verificar se está aberto agora
  isAberto(estabelecimento) {
    if (!estabelecimento.horarioFuncionamento) return false;
    
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const agora = new Date();
    const diaAtual = diasSemana[agora.getDay()];
    const horaAtual = agora.getHours() * 100 + agora.getMinutes();
    
    const horarioDia = estabelecimento.horarioFuncionamento[diaAtual];
    
    if (!horarioDia || horarioDia === 'Sob demanda') return false;
    
    const [inicio, fim] = horarioDia.split('-').map(h => {
      const [hora, minuto] = h.split(':').map(Number);
      return hora * 100 + minuto;
    });
    
    // Considerando horários que passam da meia-noite
    if (fim < inicio) {
      return horaAtual >= inicio || horaAtual <= fim;
    }
    
    return horaAtual >= inicio && horaAtual <= fim;
  }
};

// ========== SISTEMA DE ARTISTAS ==========
const ArtistaService = {
  // Obter todos os artistas (solo + bandas)
  getAll() {
    const data = window.EventosFSAData?.USUARIOS;
    if (!data) return [];
    return [...(data.artistas || []), ...(data.bandas || [])];
  },

  // Obter artistas solo
  getSolo() {
    return window.EventosFSAData?.USUARIOS?.artistas || [];
  },

  // Obter bandas
  getBandas() {
    return window.EventosFSAData?.USUARIOS?.bandas || [];
  },

  // Obter por ID
  getById(id) {
    return this.getAll().find(a => a.id === parseInt(id));
  },

  // Filtrar por gênero
  filterByGenero(genero) {
    return this.getAll().filter(a => 
      a.generos?.includes(genero)
    );
  },

  // Filtrar por disponibilidade
  filterByDisponibilidade(dia) {
    return this.getAll().filter(a => 
      a.disponibilidade?.includes(dia)
    );
  },

  // Filtrar por cachê máximo
  filterByCacheMax(valor) {
    return this.getAll().filter(a => a.cacheMedio <= valor);
  },

  // Filtrar verificados
  getVerificados() {
    return this.getAll().filter(a => a.verificado);
  },

  // Filtrar premium
  getPremium() {
    return this.getAll().filter(a => a.premium);
  },

  // Busca textual
  search(termo) {
    const termoLower = termo.toLowerCase();
    return this.getAll().filter(a => 
      a.nome?.toLowerCase().includes(termoLower) ||
      a.nomeArtistico?.toLowerCase().includes(termoLower) ||
      a.bio?.toLowerCase().includes(termoLower) ||
      a.generos?.some(g => g.toLowerCase().includes(termoLower))
    );
  },

  // Ordenar por ranking
  sortByRanking(artistas) {
    return [...artistas].sort((a, b) => a.ranking - b.ranking);
  },

  // Ordenar por avaliação
  sortByRating(artistas, desc = true) {
    return [...artistas].sort((a, b) => 
      desc ? b.avaliacao - a.avaliacao : a.avaliacao - b.avaliacao
    );
  },

  // Ordenar por shows realizados
  sortByShows(artistas, desc = true) {
    return [...artistas].sort((a, b) => 
      desc ? b.showsRealizados - a.showsRealizados : a.showsRealizados - b.showsRealizados
    );
  },

  // Top artistas por gorjetas
  getTopByGorjetas(limit = 10) {
    return [...this.getAll()]
      .sort((a, b) => b.gorjetasRecebidas - a.gorjetasRecebidas)
      .slice(0, limit);
  }
};

// ========== SISTEMA DE EVENTOS ==========
const EventoService = {
  // Obter todos os eventos
  getAll() {
    return window.EventosFSAData?.EVENTOS || [];
  },

  // Obter por ID
  getById(id) {
    return this.getAll().find(e => e.id === parseInt(id));
  },

  // Obter eventos futuros
  getUpcoming() {
    const hoje = new Date().toISOString().split('T')[0];
    return this.getAll().filter(e => e.data >= hoje);
  },

  // Obter eventos passados
  getPast() {
    const hoje = new Date().toISOString().split('T')[0];
    return this.getAll().filter(e => e.data < hoje);
  },

  // Obter eventos de hoje
  getToday() {
    const hoje = new Date().toISOString().split('T')[0];
    return this.getAll().filter(e => e.data === hoje);
  },

  // Obter eventos desta semana
  getThisWeek() {
    const hoje = new Date();
    const fimSemana = new Date(hoje);
    fimSemana.setDate(hoje.getDate() + (7 - hoje.getDay()));
    
    return this.getAll().filter(e => {
      const dataEvento = new Date(e.data);
      return dataEvento >= hoje && dataEvento <= fimSemana;
    });
  },

  // Filtrar por gênero
  filterByGenero(genero) {
    return this.getAll().filter(e => e.genero === genero);
  },

  // Filtrar por status
  filterByStatus(status) {
    return this.getAll().filter(e => e.status === status);
  },

  // Filtrar por estabelecimento
  filterByEstabelecimento(estabelecimentoId) {
    return this.getAll().filter(e => 
      e.estabelecimentoId === parseInt(estabelecimentoId)
    );
  },

  // Filtrar por artista
  filterByArtista(artistaId) {
    return this.getAll().filter(e => 
      e.artistaId === parseInt(artistaId)
    );
  },

  // Obter eventos em destaque
  getDestaques() {
    return this.getUpcoming().filter(e => e.destaque);
  },

  // Obter eventos gratuitos
  getGratuitos() {
    return this.getAll().filter(e => !e.valor || e.valor === 0);
  }
};

// ========== EXPORTAÇÃO GLOBAL ==========
window.Auth = Auth;
window.Utils = Utils;
window.Toast = Toast;
window.Modal = Modal;
window.Sidebar = Sidebar;
window.TipSystem = TipSystem;
window.AppState = AppState;
window.EstabelecimentoService = EstabelecimentoService;
window.ArtistaService = ArtistaService;
window.EventoService = EventoService;
