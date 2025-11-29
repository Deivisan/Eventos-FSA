/**
 * Widget de Gorjetas - EventosFSA
 * Componente para enviar gorjetas para artistas durante ou após shows
 */

class TipWidget {
  constructor(options = {}) {
    this.artistId = options.artistId || null;
    this.artistName = options.artistName || 'Artista';
    this.artistPhoto = options.artistPhoto || 'https://via.placeholder.com/100';
    this.eventId = options.eventId || null;
    this.onSuccess = options.onSuccess || (() => {});
    this.onError = options.onError || (() => {});
    
    this.predefinedValues = [10, 20, 50, 100];
    this.selectedValue = 50;
    this.customValue = null;
    
    this.widgetElement = null;
    this.isOpen = false;
  }
  
  /**
   * Inicializa o widget
   */
  init() {
    this.createStyles();
    this.createWidget();
    this.bindEvents();
  }
  
  /**
   * Cria os estilos CSS do widget
   */
  createStyles() {
    if (document.getElementById('tip-widget-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'tip-widget-styles';
    styles.textContent = `
      .tip-widget-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #F5A623 0%, #E8930C 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(245, 166, 35, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
        border: none;
        color: white;
        font-size: 24px;
      }
      
      .tip-widget-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(245, 166, 35, 0.5);
      }
      
      .tip-widget-fab.pulse {
        animation: tip-pulse 2s infinite;
      }
      
      @keyframes tip-pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(245, 166, 35, 0.4); }
        50% { box-shadow: 0 4px 30px rgba(245, 166, 35, 0.7); }
      }
      
      .tip-widget-modal {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .tip-widget-modal.open {
        display: flex;
      }
      
      .tip-widget-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
      }
      
      .tip-widget-content {
        position: relative;
        background: white;
        border-radius: 24px;
        max-width: 400px;
        width: 100%;
        padding: 32px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: tip-slide-up 0.3s ease-out;
      }
      
      @keyframes tip-slide-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .tip-widget-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: #f3f4f6;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #6b7280;
        transition: all 0.2s;
      }
      
      .tip-widget-close:hover {
        background: #e5e7eb;
        color: #374151;
      }
      
      .tip-widget-header {
        text-align: center;
        margin-bottom: 24px;
      }
      
      .tip-widget-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 12px;
        border: 4px solid #F5A623;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(245, 166, 35, 0.3);
      }
      
      .tip-widget-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .tip-widget-title {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 4px 0;
      }
      
      .tip-widget-subtitle {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
      
      .tip-widget-values {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }
      
      .tip-widget-value-btn {
        padding: 14px 8px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        font-weight: 600;
        font-size: 15px;
        color: #374151;
        transition: all 0.2s;
      }
      
      .tip-widget-value-btn:hover {
        border-color: #F5A623;
        color: #F5A623;
      }
      
      .tip-widget-value-btn.selected {
        background: linear-gradient(135deg, #F5A623 0%, #E8930C 100%);
        border-color: #F5A623;
        color: white;
      }
      
      .tip-widget-custom {
        margin-bottom: 16px;
      }
      
      .tip-widget-custom-label {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 8px;
        display: block;
      }
      
      .tip-widget-custom-input-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .tip-widget-custom-prefix {
        padding: 12px 16px;
        background: #f3f4f6;
        border-radius: 10px;
        font-weight: 600;
        color: #374151;
      }
      
      .tip-widget-custom-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 16px;
        transition: border-color 0.2s;
      }
      
      .tip-widget-custom-input:focus {
        outline: none;
        border-color: #F5A623;
      }
      
      .tip-widget-message {
        margin-bottom: 20px;
      }
      
      .tip-widget-message-label {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 8px;
        display: block;
      }
      
      .tip-widget-message-input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        resize: none;
        font-family: inherit;
        transition: border-color 0.2s;
      }
      
      .tip-widget-message-input:focus {
        outline: none;
        border-color: #F5A623;
      }
      
      .tip-widget-info {
        background: #fef3c7;
        border-radius: 10px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #92400e;
      }
      
      .tip-widget-submit {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #F5A623 0%, #E8930C 100%);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .tip-widget-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(245, 166, 35, 0.4);
      }
      
      .tip-widget-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
      
      .tip-widget-success {
        text-align: center;
        padding: 20px 0;
      }
      
      .tip-widget-success-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
        animation: tip-success-pop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @keyframes tip-success-pop {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      .tip-widget-success-title {
        font-size: 20px;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 8px 0;
      }
      
      .tip-widget-success-message {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
    `;
    document.head.appendChild(styles);
  }
  
  /**
   * Cria a estrutura HTML do widget
   */
  createWidget() {
    // Botão flutuante
    const fab = document.createElement('button');
    fab.className = 'tip-widget-fab pulse';
    fab.innerHTML = '💝';
    fab.title = 'Enviar gorjeta';
    fab.id = 'tip-widget-fab';
    document.body.appendChild(fab);
    
    // Modal
    const modal = document.createElement('div');
    modal.className = 'tip-widget-modal';
    modal.id = 'tip-widget-modal';
    modal.innerHTML = `
      <div class="tip-widget-overlay"></div>
      <div class="tip-widget-content">
        <button class="tip-widget-close">&times;</button>
        
        <div class="tip-widget-body" id="tip-widget-body">
          <div class="tip-widget-header">
            <div class="tip-widget-avatar">
              <img src="${this.artistPhoto}" alt="${this.artistName}">
            </div>
            <h3 class="tip-widget-title">${this.artistName}</h3>
            <p class="tip-widget-subtitle">Apoie o trabalho deste artista! 💜</p>
          </div>
          
          <div class="tip-widget-values">
            ${this.predefinedValues.map(value => `
              <button class="tip-widget-value-btn ${value === this.selectedValue ? 'selected' : ''}" data-value="${value}">
                R$ ${value}
              </button>
            `).join('')}
          </div>
          
          <div class="tip-widget-custom">
            <label class="tip-widget-custom-label">Ou digite um valor personalizado:</label>
            <div class="tip-widget-custom-input-wrapper">
              <span class="tip-widget-custom-prefix">R$</span>
              <input type="number" class="tip-widget-custom-input" placeholder="Valor" min="5" id="tip-custom-value">
            </div>
          </div>
          
          <div class="tip-widget-message">
            <label class="tip-widget-message-label">Deixe uma mensagem (opcional):</label>
            <textarea class="tip-widget-message-input" rows="2" placeholder="Parabéns pelo show incrível!" id="tip-message"></textarea>
          </div>
          
          <div class="tip-widget-info">
            <span>ℹ️</span>
            <span>Pagamento via PIX. 100% do valor vai para o artista.</span>
          </div>
          
          <button class="tip-widget-submit" id="tip-submit">
            <span>💝</span>
            Enviar Gorjeta de R$ ${this.selectedValue}
          </button>
        </div>
        
        <div class="tip-widget-success" id="tip-widget-success" style="display: none;">
          <div class="tip-widget-success-icon">✓</div>
          <h3 class="tip-widget-success-title">Gorjeta enviada!</h3>
          <p class="tip-widget-success-message">Obrigado por apoiar a música local. 💜</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    this.widgetElement = modal;
  }
  
  /**
   * Vincula eventos do widget
   */
  bindEvents() {
    const fab = document.getElementById('tip-widget-fab');
    const modal = document.getElementById('tip-widget-modal');
    const overlay = modal.querySelector('.tip-widget-overlay');
    const closeBtn = modal.querySelector('.tip-widget-close');
    const valueBtns = modal.querySelectorAll('.tip-widget-value-btn');
    const customInput = document.getElementById('tip-custom-value');
    const submitBtn = document.getElementById('tip-submit');
    
    // Abrir modal
    fab.addEventListener('click', () => this.open());
    
    // Fechar modal
    overlay.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());
    
    // Selecionar valor predefinido
    valueBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        valueBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedValue = parseInt(btn.dataset.value);
        customInput.value = '';
        this.updateSubmitButton();
      });
    });
    
    // Valor personalizado
    customInput.addEventListener('input', () => {
      if (customInput.value) {
        valueBtns.forEach(b => b.classList.remove('selected'));
        this.customValue = parseInt(customInput.value);
      } else {
        this.customValue = null;
      }
      this.updateSubmitButton();
    });
    
    // Enviar gorjeta
    submitBtn.addEventListener('click', () => this.submit());
    
    // Tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  /**
   * Abre o modal
   */
  open() {
    this.widgetElement.classList.add('open');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  /**
   * Fecha o modal
   */
  close() {
    this.widgetElement.classList.remove('open');
    this.isOpen = false;
    document.body.style.overflow = '';
    
    // Reset após animação
    setTimeout(() => {
      document.getElementById('tip-widget-body').style.display = '';
      document.getElementById('tip-widget-success').style.display = 'none';
    }, 300);
  }
  
  /**
   * Atualiza o botão de envio
   */
  updateSubmitButton() {
    const value = this.customValue || this.selectedValue;
    const submitBtn = document.getElementById('tip-submit');
    submitBtn.innerHTML = `<span>💝</span> Enviar Gorjeta de R$ ${value}`;
  }
  
  /**
   * Obtém o valor atual
   */
  getValue() {
    return this.customValue || this.selectedValue;
  }
  
  /**
   * Envia a gorjeta
   */
  async submit() {
    const value = this.getValue();
    const message = document.getElementById('tip-message').value;
    const submitBtn = document.getElementById('tip-submit');
    
    if (value < 5) {
      alert('O valor mínimo é R$ 5,00');
      return;
    }
    
    // Simular loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Processando...';
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sucesso
      document.getElementById('tip-widget-body').style.display = 'none';
      document.getElementById('tip-widget-success').style.display = 'block';
      
      this.onSuccess({
        artistId: this.artistId,
        eventId: this.eventId,
        value: value,
        message: message
      });
      
      // Fechar após 3 segundos
      setTimeout(() => this.close(), 3000);
      
    } catch (error) {
      this.onError(error);
      submitBtn.disabled = false;
      this.updateSubmitButton();
    }
  }
  
  /**
   * Atualiza informações do artista
   */
  setArtist(id, name, photo) {
    this.artistId = id;
    this.artistName = name;
    this.artistPhoto = photo;
    
    if (this.widgetElement) {
      this.widgetElement.querySelector('.tip-widget-title').textContent = name;
      this.widgetElement.querySelector('.tip-widget-avatar img').src = photo;
    }
  }
  
  /**
   * Remove o widget
   */
  destroy() {
    document.getElementById('tip-widget-fab')?.remove();
    document.getElementById('tip-widget-modal')?.remove();
    document.getElementById('tip-widget-styles')?.remove();
  }
}

// Exportar para uso global
window.TipWidget = TipWidget;

// Inicialização automática se houver data attributes
document.addEventListener('DOMContentLoaded', () => {
  const autoInit = document.querySelector('[data-tip-widget]');
  if (autoInit) {
    const widget = new TipWidget({
      artistId: autoInit.dataset.artistId,
      artistName: autoInit.dataset.artistName,
      artistPhoto: autoInit.dataset.artistPhoto,
      eventId: autoInit.dataset.eventId
    });
    widget.init();
    window.tipWidget = widget;
  }
});
