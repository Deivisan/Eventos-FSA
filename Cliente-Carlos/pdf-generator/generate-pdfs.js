/**
 * 📄 EventosFSA - Gerador de PDFs Profissionais
 * 
 * Converte os books Markdown em PDFs bonitos usando Puppeteer
 */

import puppeteer from 'puppeteer';
import { marked } from 'marked';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = path.join(__dirname, '..', 'books');
const OUTPUT_DIR = path.join(__dirname, '..', 'pdfs');

// Template HTML base com design profissional
const getHtmlTemplate = (content, title) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #1a1a2e;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm 25mm;
      page-break-after: always;
    }
    
    .page:last-child {
      page-break-after: avoid;
    }
    
    /* Typography */
    h1 {
      font-size: 28pt;
      font-weight: 800;
      color: #DC2626;
      margin-bottom: 20px;
      line-height: 1.2;
      border-bottom: 4px solid #DC2626;
      padding-bottom: 15px;
    }
    
    h2 {
      font-size: 18pt;
      font-weight: 700;
      color: #1a1a2e;
      margin-top: 35px;
      margin-bottom: 15px;
      line-height: 1.3;
    }
    
    h3 {
      font-size: 14pt;
      font-weight: 600;
      color: #374151;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    
    p {
      margin-bottom: 12px;
      text-align: justify;
    }
    
    /* Cover Page Styles */
    .cover {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: calc(297mm - 40mm);
      text-align: center;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      position: relative;
      overflow: hidden;
    }
    
    .cover::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%);
    }
    
    .cover::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -30%;
      width: 80%;
      height: 80%;
      background: radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 60%);
    }
    
    .cover h1 {
      font-size: 42pt;
      border: none;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      z-index: 1;
    }
    
    .cover h2 {
      font-size: 24pt;
      color: #374151;
      margin-top: 0;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }
    
    .cover h3 {
      font-size: 14pt;
      color: #6B7280;
      font-weight: 400;
      max-width: 500px;
      position: relative;
      z-index: 1;
    }
    
    .cover .version {
      margin-top: 60px;
      font-size: 11pt;
      color: #9CA3AF;
      position: relative;
      z-index: 1;
    }
    
    .cover .logo-icon {
      font-size: 72pt;
      margin-bottom: 30px;
      position: relative;
      z-index: 1;
    }
    
    /* Callout Boxes */
    .highlight {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      padding: 18px 22px;
      border-radius: 12px;
      border-left: 5px solid #F59E0B;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
    }
    
    .success {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      padding: 18px 22px;
      border-radius: 12px;
      border-left: 5px solid #10B981;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
    }
    
    .info {
      background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
      padding: 18px 22px;
      border-radius: 12px;
      border-left: 5px solid #3B82F6;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    }
    
    .warning {
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      padding: 18px 22px;
      border-radius: 12px;
      border-left: 5px solid #DC2626;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
    }
    
    .tip-box, .money {
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: white;
      padding: 25px 28px;
      border-radius: 16px;
      margin: 25px 0;
      box-shadow: 0 8px 24px rgba(220, 38, 38, 0.25);
    }
    
    .tip-box h2, .money h2, .tip-box h3, .money h3 {
      color: white;
      margin-top: 0;
    }
    
    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 20px 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    th {
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: white;
      font-weight: 600;
      padding: 14px 18px;
      text-align: left;
    }
    
    td {
      padding: 12px 18px;
      border-bottom: 1px solid #E5E7EB;
      background: white;
    }
    
    tr:nth-child(even) td {
      background: #F9FAFB;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    /* Steps */
    .step {
      background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
      padding: 18px 22px;
      border-radius: 12px;
      margin: 15px 0;
      display: flex;
      align-items: flex-start;
      gap: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: white;
      min-width: 32px;
      height: 32px;
      border-radius: 50%;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }
    
    /* Lists */
    ul, ol {
      margin: 15px 0;
      padding-left: 25px;
    }
    
    li {
      margin: 8px 0;
    }
    
    li::marker {
      color: #DC2626;
    }
    
    /* Code/Tech boxes */
    .tech {
      background: #1a1a2e;
      color: #E5E7EB;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      font-family: 'Fira Code', 'Monaco', monospace;
      font-size: 10pt;
      line-height: 1.6;
      white-space: pre-wrap;
      overflow-x: auto;
    }
    
    code {
      background: #F3F4F6;
      padding: 2px 8px;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 10pt;
      color: #DC2626;
    }
    
    /* Diagrams */
    .diagram {
      background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
      padding: 30px;
      border-radius: 16px;
      margin: 25px 0;
      text-align: center;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    .flow-box {
      display: inline-block;
      background: white;
      padding: 15px 22px;
      border-radius: 10px;
      margin: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      font-weight: 500;
    }
    
    .arrow {
      font-size: 28px;
      color: #DC2626;
      vertical-align: middle;
      margin: 0 5px;
    }
    
    /* Big numbers */
    .big-number {
      font-size: 48pt;
      font-weight: 800;
      background: linear-gradient(135deg, #DC2626 0%, #F59E0B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      margin: 25px 0;
    }
    
    /* Projection boxes */
    .projection {
      background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
      padding: 25px;
      border-radius: 16px;
      margin: 20px 0;
      border: 2px solid #E2E8F0;
    }
    
    /* Footer CTA */
    .cta-footer {
      text-align: center;
      margin-top: 40px;
      padding: 35px;
      background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
      color: white;
      border-radius: 20px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }
    
    .cta-footer h2 {
      color: white;
      margin-top: 0;
    }
    
    .cta-footer p {
      color: #9CA3AF;
    }
    
    /* Page numbers */
    .page-number {
      position: fixed;
      bottom: 10mm;
      right: 15mm;
      font-size: 10pt;
      color: #9CA3AF;
    }
    
    /* HR styling */
    hr {
      border: none;
      height: 2px;
      background: linear-gradient(90deg, transparent, #DC2626, transparent);
      margin: 35px 0;
    }
    
    /* Emoji sizing */
    .emoji {
      font-size: 1.3em;
    }
    
    /* Strong/bold */
    strong {
      font-weight: 600;
      color: #111827;
    }
    
    /* Blockquote */
    blockquote {
      border-left: 4px solid #DC2626;
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
      color: #4B5563;
    }
    
    /* Links */
    a {
      color: #DC2626;
      text-decoration: none;
      font-weight: 500;
    }
    
    /* Print adjustments */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="content">
    ${content}
  </div>
</body>
</html>
`;

// Configuração dos books
const books = [
  {
    id: '01-visao-geral',
    title: 'EventosFSA - Visão Geral',
    emoji: '🎵'
  },
  {
    id: '02-guia-estabelecimentos',
    title: 'EventosFSA - Guia para Estabelecimentos',
    emoji: '🍺'
  },
  {
    id: '03-guia-artistas',
    title: 'EventosFSA - Guia para Artistas',
    emoji: '🎤'
  },
  {
    id: '04-infraestrutura-qrcode',
    title: 'EventosFSA - Infraestrutura QR Code',
    emoji: '📱'
  },
  {
    id: '05-modelo-negocio',
    title: 'EventosFSA - Modelo de Negócio',
    emoji: '💰'
  }
];

async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (e) {
    // Diretório já existe
  }
}

async function generatePDF(book) {
  console.log(`\n📖 Processando: ${book.title}`);
  
  // Ler o arquivo Markdown
  const mdPath = path.join(BOOKS_DIR, book.id, 'book.md');
  let markdown;
  
  try {
    markdown = await fs.readFile(mdPath, 'utf-8');
  } catch (e) {
    console.error(`   ❌ Erro ao ler ${mdPath}: ${e.message}`);
    return false;
  }
  
  // Remover o bloco <style> do markdown (vamos usar o nosso CSS)
  markdown = markdown.replace(/<style>[\s\S]*?<\/style>/g, '');
  
  // Converter Markdown para HTML
  const htmlContent = marked(markdown);
  
  // Montar o HTML completo
  const fullHtml = getHtmlTemplate(htmlContent, book.title);
  
  // Iniciar Puppeteer e gerar PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Configurar a página
  await page.setContent(fullHtml, {
    waitUntil: 'networkidle0'
  });
  
  // Gerar PDF
  const pdfPath = path.join(OUTPUT_DIR, `${book.id}.pdf`);
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width: 100%; font-size: 9px; font-family: Inter, Arial, sans-serif; color: #9CA3AF; padding: 0 20mm;">
        <span style="float: left;">${book.emoji} ${book.title}</span>
      </div>
    `,
    footerTemplate: `
      <div style="width: 100%; font-size: 9px; font-family: Inter, Arial, sans-serif; color: #9CA3AF; padding: 0 20mm; text-align: center;">
        <span>EventosFSA © 2025</span>
        <span style="float: right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `
  });
  
  await browser.close();
  
  console.log(`   ✅ PDF gerado: ${pdfPath}`);
  return true;
}

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  📄 EventosFSA - Gerador de PDFs Profissionais   ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  
  await ensureOutputDir();
  
  let success = 0;
  let failed = 0;
  
  for (const book of books) {
    const result = await generatePDF(book);
    if (result) success++;
    else failed++;
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  ✅ Sucesso: ${success} PDFs gerados`);
  if (failed > 0) console.log(`  ❌ Falhas: ${failed}`);
  console.log(`  📁 Salvos em: ${OUTPUT_DIR}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');
}

main().catch(console.error);
