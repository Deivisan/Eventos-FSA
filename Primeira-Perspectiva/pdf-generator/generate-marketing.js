/**
 * 🎨 EventosFSA - Gerador de Assets de Marketing
 * 
 * Gera imagens para redes sociais usando Puppeteer e Templates HTML
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'marketing');

// Cores da marca
const COLORS = {
  primary: '#DC2626', // Red 600
  secondary: '#F59E0B', // Amber 500
  dark: '#1a1a2e',
  light: '#ffffff',
  gray: '#F3F4F6'
};

// Templates HTML
const getTemplate = (type, title, subtitle, cta) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; }
    
    .container {
      width: ${type === 'story' ? '1080px' : type === 'feed' ? '1080px' : '1200px'};
      height: ${type === 'story' ? '1920px' : type === 'feed' ? '1080px' : '628px'};
      background: ${type === 'story' 
        ? `linear-gradient(135deg, ${COLORS.dark} 0%, #0f0f1a 100%)` 
        : `linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)`};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      position: relative;
      overflow: hidden;
    }

    /* Background Elements */
    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
    }
    .c1 { width: 600px; height: 600px; background: ${COLORS.primary}; top: -200px; right: -200px; }
    .c2 { width: 400px; height: 400px; background: ${COLORS.secondary}; bottom: -100px; left: -100px; }

    /* Content */
    .logo {
      font-size: ${type === 'story' ? '60px' : '48px'};
      font-weight: 800;
      color: ${type === 'story' ? COLORS.light : COLORS.primary};
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    h1 {
      font-size: ${type === 'story' ? '80px' : '72px'};
      font-weight: 800;
      color: ${type === 'story' ? COLORS.light : COLORS.dark};
      text-align: center;
      line-height: 1.1;
      margin-bottom: 30px;
      z-index: 1;
    }
    
    h2 {
      font-size: ${type === 'story' ? '40px' : '32px'};
      font-weight: 400;
      color: ${type === 'story' ? '#9CA3AF' : '#4B5563'};
      text-align: center;
      max-width: 800px;
      margin-bottom: 60px;
      z-index: 1;
    }
    
    .cta {
      background: ${type === 'story' ? COLORS.primary : COLORS.dark};
      color: white;
      font-size: 32px;
      font-weight: 600;
      padding: 25px 60px;
      border-radius: 50px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      z-index: 1;
    }

    .badge {
      position: absolute;
      top: 60px;
      left: 60px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 10px 20px;
      border-radius: 20px;
      color: ${type === 'story' ? 'white' : COLORS.dark};
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    
    <div class="badge">🚀 Beta Público</div>
    
    <div class="logo">
      <span>🎵 EventosFSA</span>
    </div>
    
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    
    <div class="cta">${cta}</div>
  </div>
</body>
</html>
`;

const assets = [
  {
    filename: '01-feed-launch.png',
    type: 'feed',
    title: 'A Revolução dos Eventos<br>em Feira de Santana',
    subtitle: 'Conectando Artistas, Estabelecimentos e Público em uma única plataforma.',
    cta: 'Acesse Agora'
  },
  {
    filename: '02-story-artista.png',
    type: 'story',
    title: 'Você é Artista?',
    subtitle: 'Tenha seu portfólio digital, receba gorjetas via PIX e seja encontrado pelos melhores bares.',
    cta: 'Cadastre-se Grátis'
  },
  {
    filename: '03-linkedin-banner.png',
    type: 'banner',
    title: 'EventosFSA: O Ecossistema do Entretenimento',
    subtitle: 'Tecnologia e Inovação para o cenário musical de Feira de Santana.',
    cta: 'Saiba Mais'
  }
];

async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (e) {}
}

async function generateImage(asset) {
  console.log(`\n🎨 Gerando: ${asset.filename}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Definir viewport baseado no tipo
  const viewport = asset.type === 'story' 
    ? { width: 1080, height: 1920 }
    : asset.type === 'feed'
      ? { width: 1080, height: 1080 }
      : { width: 1200, height: 628 };
      
  await page.setViewport(viewport);
  
  const html = getTemplate(asset.type, asset.title, asset.subtitle, asset.cta);
  await page.setContent(html);
  
  await page.screenshot({
    path: path.join(OUTPUT_DIR, asset.filename),
    type: 'png'
  });
  
  await browser.close();
  console.log(`   ✅ Salvo em: marketing/${asset.filename}`);
}

async function main() {
  console.log('🚀 Iniciando Gerador de Assets...');
  await ensureOutputDir();
  
  for (const asset of assets) {
    await generateImage(asset);
  }
  
  console.log('\n✨ Todos os assets foram gerados!');
}

main().catch(console.error);
