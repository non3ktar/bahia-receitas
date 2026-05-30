# A Arte Culinária na Bahia - App Receitas

## 🎯 Project Goal
Um aplicativo *local-first* PWA que documenta as receitas e ingredientes do livro clássico **"A Arte Culinária na Bahia"** (1928) de Manuel Querino. O projeto foi desenvolvido mantendo a estética clássica da época, combinada com *glassmorphism* e toques modernos, utilizando ilustrações simuladas a lápis.

## 🛠 Tech Stack
- **Frontend Framework**: React 18 com Vite.
- **Styling**: TailwindCSS v3 (Aesthetics premium: dark mode, glassmorphism, vintage classic style).
- **Icons**: Lucide React.
- **Animations**: Framer Motion.
- **PWA**: vite-plugin-pwa para capacidade offline (Local-First).
- **Tipagem**: TypeScript.

## 🚀 Setup/Run Instructions

1. **Instalar as dependências**:
```bash
npm install
```

2. **Rodar em modo de desenvolvimento**:
```bash
npm run dev
```

3. **Gerar a versão de produção (PWA)**:
```bash
npm run build
npm run preview
```

## 🌐 Deployment URL
[Local / A definir] (O app é preparado para ser exportado via Cloudflare Pages ou Vercel).

## 📝 Changelog
- **v1.3.0**:
  - Implementação de tipografia clássica (Crimson Text e Playfair Display) para um autêntico estilo de livro.
  - Correção da diagramação das receitas: parágrafos organizados, texto justificado e adição de letra capitular elegante no início de cada preparo.
- **v1.2.0**:
  - Nova "Capa" no layout contendo a composição de ilustrações a lápis (Acarajé, Moqueca, Feijoada, Vatapá).
  - Redesign do layout das receitas, retirando blocos individuais de imagem e focando na tipografia clássica serifada.
- **v1.1.0**:
  - Extração e inclusão de todas as 55 receitas originais do livro (sem redução).
  - Adição de um botão de 'Índice' com modal organizado por categorias (Africana, Baiana, Sobremesa).
  - PWA totalmente configurado e testado.
- **v1.0.0**: Lançamento inicial.
  - Implementação da interface responsiva *glassmorphism*.
  - Configuração PWA para uso offline.
  - Integração de receitas originais de Manuel Querino ("Acaçá", "Acarajé", "Moqueca", etc.).
  - Geração de ilustrações a lápis via AI.
