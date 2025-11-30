/**
 * 🚀 EventosFSA - Gerador Massivo de Marketing (Genkit Pro)
 * 
 * Gera +45 assets de marketing para Instagram, LinkedIn e WhatsApp
 * Baseado na Metodologia de Marketing do projeto.
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'marketing', 'social-media');

// Cores da marca
const COLORS = {
  primary: '#DC2626', // Red 600
  secondary: '#F59E0B', // Amber 500
  dark: '#1a1a2e',
  darker: '#0f0f1a',
  light: '#ffffff',
  gray: '#F3F4F6',
  text: '#1F2937',
  textLight: '#9CA3AF'
};

// Templates HTML Dinâmicos
const getTemplate = (type, data) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; }
    
    .container {
      width: ${type === 'story' ? '1080px' : type === 'feed' ? '1080px' : '1200px'};
      height: ${type === 'story' ? '1920px' : type === 'feed' ? '1080px' : '628px'};
      background: ${data.bg === 'dark' 
        ? `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.darker} 100%)` 
        : `linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)`};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      position: relative;
      overflow: hidden;
    }

    /* Elementos Decorativos */
    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: ${data.bg === 'dark' ? '0.1' : '0.05'};
    }
    .c1 { width: 800px; height: 800px; background: ${COLORS.primary}; top: -300px; right: -300px; }
    .c2 { width: 600px; height: 600px; background: ${COLORS.secondary}; bottom: -200px; left: -200px; }
    
    .grid-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: radial-gradient(${data.bg === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Conteúdo */
    .logo {
      font-size: ${type === 'story' ? '50px' : '40px'};
      font-weight: 800;
      color: ${data.bg === 'dark' ? COLORS.light : COLORS.primary};
      margin-bottom: ${type === 'story' ? '60px' : '40px'};
      display: flex;
      align-items: center;
      gap: 15px;
      z-index: 2;
    }
    
    .category {
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: ${COLORS.secondary};
      margin-bottom: 20px;
      font-weight: 600;
      z-index: 2;
    }
    
    h1 {
      font-size: ${type === 'story' ? '72px' : type === 'feed' ? '64px' : '56px'};
      font-weight: 800;
      color: ${data.bg === 'dark' ? COLORS.light : COLORS.text};
      text-align: center;
      line-height: 1.1;
      margin-bottom: 30px;
      max-width: ${type === 'story' ? '900px' : '900px'};
      z-index: 2;
    }
    
    h2 {
      font-size: ${type === 'story' ? '36px' : '32px'};
      font-weight: 400;
      color: ${data.bg === 'dark' ? COLORS.textLight : '#4B5563'};
      text-align: center;
      max-width: 800px;
      margin-bottom: 60px;
      line-height: 1.5;
      z-index: 2;
    }
    
    .highlight {
      color: ${COLORS.primary};
    }
    
    .cta {
      background: ${COLORS.primary};
      color: white;
      font-size: ${type === 'story' ? '36px' : '28px'};
      font-weight: 600;
      padding: 25px 60px;
      border-radius: 50px;
      box-shadow: 0 20px 40px rgba(220, 38, 38, 0.3);
      z-index: 2;
      display: ${data.cta ? 'block' : 'none'};
    }

    .footer {
      position: absolute;
      bottom: 50px;
      font-size: 20px;
      color: ${data.bg === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
      z-index: 2;
    }
    
    /* Card Style for Feed */
    ${type === 'feed' && data.style === 'card' ? `
      .card {
        background: ${data.bg === 'dark' ? 'rgba(255,255,255,0.05)' : 'white'};
        padding: 60px;
        border-radius: 30px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        backdrop-filter: blur(10px);
        border: 1px solid ${data.bg === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
        z-index: 2;
      }
    ` : ''}
  </style>
</head>
<body>
  <div class="container">
    <div class="grid-bg"></div>
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    
    <div class="logo">🎵 EventosFSA</div>
    
    ${data.category ? `<div class="category">${data.category}</div>` : ''}
    
    ${type === 'feed' && data.style === 'card' ? '<div class="card">' : ''}
      <h1>${data.title}</h1>
      <h2>${data.subtitle}</h2>
      ${data.cta ? `<div class="cta">${data.cta}</div>` : ''}
    ${type === 'feed' && data.style === 'card' ? '</div>' : ''}
    
    <div class="footer">www.eventosfsa.com.br</div>
  </div>
</body>
</html>
`;

// Dados dos Posts
const POSTS = {
  feed: [
    { id: '01', title: 'A Revolução Chegou', subtitle: 'Conectando artistas, bares e público em uma única plataforma.', cta: 'Saiba Mais', bg: 'light', category: 'Lançamento' },
    { id: '02', title: 'Receba 100% das <span class="highlight">Gorjetas</span>', subtitle: 'No EventosFSA, a gorjeta via PIX vai direto para o bolso do artista.', cta: 'Cadastre-se', bg: 'dark', category: 'Para Artistas' },
    { id: '03', title: 'Adeus, Agenda de Papel', subtitle: 'Gerencie todos os seus eventos e contratações em um painel digital.', cta: 'Para Bares', bg: 'light', category: 'Gestão' },
    { id: '04', title: 'Onde tem música hoje?', subtitle: 'Descubra os melhores shows de Feira de Santana em tempo real.', cta: 'Ver Agenda', bg: 'dark', category: 'Para o Público' },
    { id: '05', title: 'Você sabia?', subtitle: 'Feira de Santana tem mais de 2.000 músicos ativos. Vamos valorizar nossa arte!', cta: null, bg: 'light', category: 'Curiosidade', style: 'card' },
    { id: '06', title: 'QR Code Inteligente', subtitle: 'O cliente escaneia, vê o cardápio musical e manda gorjeta na hora.', cta: 'Inovação', bg: 'dark', category: 'Tecnologia' },
    { id: '07', title: 'Ranking de Artistas', subtitle: 'Os músicos mais bem avaliados ganham destaque na homepage.', cta: 'Ver Ranking', bg: 'light', category: 'Gamificação' },
    { id: '08', title: '"A música conecta pessoas"', subtitle: 'Nossa missão é fortalecer a cena cultural da cidade.', cta: null, bg: 'dark', category: 'Manifesto', style: 'card' },
    { id: '09', title: 'Estamos em Beta!', subtitle: 'Seja um dos primeiros a testar e moldar o futuro dos eventos.', cta: 'Seja Beta', bg: 'light', category: 'Novidade' },
    { id: '10', title: 'Agenda do Fim de Semana', subtitle: 'Confira os destaques de Sexta, Sábado e Domingo.', cta: 'Ver Tudo', bg: 'dark', category: 'Agenda' },
    { id: '11', title: 'Destaque: Weslei Ribeiro', subtitle: 'O rei da MPB em Feira. Confira a agenda completa no app.', cta: 'Ver Perfil', bg: 'light', category: 'Artista da Semana', style: 'card' },
    { id: '12', title: 'Destaque: Cúpula do Som', subtitle: 'O templo do rock underground. Agenda aberta!', cta: 'Ver Local', bg: 'dark', category: 'Lugar da Semana', style: 'card' },
    { id: '13', title: 'Perfis Verificados', subtitle: 'Segurança para quem contrata e credibilidade para quem toca.', cta: 'Saiba Mais', bg: 'light', category: 'Segurança' },
    { id: '14', title: 'App Mobile em Breve', subtitle: 'Estamos desenvolvendo versões nativas para Android e iOS.', cta: 'Aguarde', bg: 'dark', category: 'Roadmap' },
    { id: '15', title: 'Feito em Feira', subtitle: 'Tecnologia desenvolvida 100% em Feira de Santana.', cta: 'Orgulho', bg: 'light', category: 'Local' }
  ],
  story: [
    { id: '01', title: 'Onde você vai hoje?', subtitle: 'Descubra os melhores rolês da cidade.', cta: 'Arrasta pra Cima', bg: 'dark' },
    { id: '02', title: 'Você é Artista?', subtitle: 'Pare de perder dinheiro. Receba gorjetas no PIX.', cta: 'Cadastre-se', bg: 'light' },
    { id: '03', title: 'Dono de Bar?', subtitle: 'Encha sua casa com os melhores músicos.', cta: 'Fale Conosco', bg: 'dark' },
    { id: '04', title: 'Apoie a Cena Local', subtitle: 'Valorize os artistas de Feira de Santana.', cta: 'Saiba Como', bg: 'light' },
    { id: '05', title: 'Escaneou, Pagou!', subtitle: 'Gorjeta fácil via QR Code na mesa.', cta: 'Ver Demo', bg: 'dark' },
    { id: '06', title: 'Agenda Aberta', subtitle: 'Confira os shows deste fim de semana.', cta: 'Ver Agenda', bg: 'light' },
    { id: '07', title: 'Rock ou Sertanejo?', subtitle: 'Qual seu estilo preferido? Vote!', cta: 'Votar', bg: 'dark' },
    { id: '08', title: 'Link na Bio', subtitle: 'Acesse a plataforma agora mesmo.', cta: 'Acessar', bg: 'light' },
    { id: '09', title: 'Bastidores', subtitle: 'Veja como estamos construindo o app.', cta: 'Ver Mais', bg: 'dark' },
    { id: '10', title: 'Novidade Chegando', subtitle: 'Uma nova forma de curtir a noite.', cta: 'Aguarde', bg: 'light' },
    { id: '11', title: 'Top 5 da Semana', subtitle: 'Os artistas mais bombados do momento.', cta: 'Ver Lista', bg: 'dark' },
    { id: '12', title: 'Feedback', subtitle: 'O que você quer ver no app?', cta: 'Responder', bg: 'light' },
    { id: '13', title: 'Equipe EventosFSA', subtitle: 'Quem faz acontecer.', cta: 'Conheça', bg: 'dark' },
    { id: '14', title: 'Contagem Regressiva', subtitle: 'Faltam poucos dias para o lançamento oficial.', cta: 'Ativar Lembrete', bg: 'light' },
    { id: '15', title: 'Sextou!', subtitle: 'Já sabe onde vai curtir hoje?', cta: 'Ver Opções', bg: 'dark' }
  ],
  linkedin: [
    { id: '01', title: 'Inovação no Entretenimento', subtitle: 'Como o EventosFSA está transformando o mercado local.', cta: 'Ler Artigo', bg: 'light', category: 'Business' },
    { id: '02', title: 'Modelo de Negócio', subtitle: 'Receita recorrente e escalável com baixo custo operacional.', cta: 'Ver Pitch', bg: 'dark', category: 'Investimento' },
    { id: '03', title: 'Tech Stack', subtitle: 'Construído com Next.js 14, Tailwind e Serverless.', cta: 'GitHub', bg: 'light', category: 'Tecnologia' },
    { id: '04', title: 'Resolvendo Dores Reais', subtitle: 'Conectando pontas soltas de um mercado de R$ 10mi/ano.', cta: 'Case Study', bg: 'dark', category: 'Solução' },
    { id: '05', title: 'Mercado de Feira', subtitle: 'Uma cidade de 600k habitantes sedenta por cultura.', cta: 'Dados', bg: 'light', category: 'Market Size' },
    { id: '06', title: 'Transformação Digital', subtitle: 'Levando bares e restaurantes para a era dos dados.', cta: 'Saiba Mais', bg: 'dark', category: 'B2B' },
    { id: '07', title: 'Parcerias Estratégicas', subtitle: 'Buscamos parceiros para expandir nossa rede.', cta: 'Contato', bg: 'light', category: 'Networking' },
    { id: '08', title: 'Pitch para Investidores', subtitle: 'Nossa visão para os próximos 3 anos.', cta: 'Baixar PDF', bg: 'dark', category: 'Deck' },
    { id: '09', title: 'Gig Economy Musical', subtitle: 'Empoderando músicos como microempreendedores.', cta: 'Impacto Social', bg: 'light', category: 'Tendência' },
    { id: '10', title: 'Smart Cities', subtitle: 'Cultura e tecnologia caminhando juntas.', cta: 'Visão', bg: 'dark', category: 'Futuro' },
    { id: '11', title: 'Roadmap 2025', subtitle: 'Expansão para mobile e pagamentos integrados.', cta: 'Ver Roadmap', bg: 'light', category: 'Planejamento' },
    { id: '12', title: 'Conheça o Time', subtitle: 'Carlos (Negócios) e Deivison (Tech).', cta: 'Sobre Nós', bg: 'dark', category: 'Team' },
    { id: '13', title: 'Métricas de Crescimento', subtitle: '+50 estabelecimentos na fase beta.', cta: 'Relatório', bg: 'light', category: 'Growth' },
    { id: '14', title: 'Cultura Data-Driven', subtitle: 'Tomando decisões baseadas em dados reais de consumo.', cta: 'Analytics', bg: 'dark', category: 'Dados' },
    { id: '15', title: 'Estamos Contratando', subtitle: 'Em breve, vagas para vendas e marketing.', cta: 'Carreiras', bg: 'light', category: 'Vagas' }
  ]
};

async function ensureOutputDir() {
  try {
    await fs.mkdir(path.join(OUTPUT_DIR, 'feed'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'story'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'linkedin'), { recursive: true });
  } catch (e) {}
}

async function generateImage(type, post) {
  console.log(`🎨 Gerando [${type}]: ${post.id}-${post.title}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Definir viewport
  const viewport = type === 'story' 
    ? { width: 1080, height: 1920 }
    : type === 'feed'
      ? { width: 1080, height: 1080 }
      : { width: 1200, height: 628 };
      
  await page.setViewport(viewport);
  
  const html = getTemplate(type, post);
  await page.setContent(html);
  
  // Salvar
  const filename = `${post.id}-${post.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
  await page.screenshot({
    path: path.join(OUTPUT_DIR, type, filename),
    type: 'png'
  });
  
  await browser.close();
}

async function main() {
  console.log('🚀 Iniciando Genkit Pro - Geração Massiva...');
  await ensureOutputDir();
  
  // Gerar Feeds
  for (const post of POSTS.feed) await generateImage('feed', post);
  
  // Gerar Stories
  for (const post of POSTS.story) await generateImage('story', post);
  
  // Gerar LinkedIn
  for (const post of POSTS.linkedin) await generateImage('linkedin', post);
  
  console.log('\n✨ Sucesso! 45+ assets gerados em marketing/social-media/');
}

main().catch(console.error);
