# AHEAD Drive & Safety

Landing page institucional desenvolvida para apresentar os serviços, programas de mentoria e canais de contato da **AHEAD Consultoria e Negócios**, com foco na frente **AHEAD Drive & Safety**.

O projeto foi construído com **React + TypeScript + Vite**, usando **Tailwind CSS**, componentes de UI inspirados em **shadcn/ui**, animações com **Framer Motion** e navegação com **React Router**.

## Visão geral

A aplicação entrega uma experiência de navegação em página única, com seções voltadas à apresentação da marca, proposta de valor, programas de mentoria e captação de leads.

### Principais seções

- **Hero section** com chamada principal e CTA para conversão
- **Sobre a AHEAD** com posicionamento institucional
- **Serviços** divididos entre atuação para empresas e para pessoas físicas
- **Pilares / legislação** para reforço de autoridade
- **Programas de mentoria** com planos e preços
- **Formulário de pré-diagnóstico** para captura de interesse
- **Botão flutuante de WhatsApp** para contato rápido
- **Rodapé** com links de referência legal

## Stack utilizada

- **React 18**
- **TypeScript**
- **Vite 5**
- **Tailwind CSS**
- **Framer Motion**
- **React Router DOM**
- **TanStack Query**
- **Radix UI**
- **Sonner**
- **Vitest**
- **ESLint**

## Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+ recomendado
- **npm**

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento está configurado para subir na porta **8080**.

### Build de produção

```bash
npm run build
```

### Pré-visualização da build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Testes

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

## Estrutura do projeto

```text
src/
├── assets/             # Imagens e recursos visuais
├── components/         # Seções da landing page e componentes reutilizáveis
│   └── ui/             # Componentes base de interface
├── hooks/              # Hooks customizados
├── lib/                # Utilitários compartilhados
├── pages/              # Páginas roteadas
├── App.tsx             # Configuração global da aplicação
├── index.css           # Tokens visuais e estilos globais
└── main.tsx            # Ponto de entrada da aplicação
```

## Rotas disponíveis

Atualmente a aplicação possui as seguintes rotas:

- `/` — página principal
- `*` — página de não encontrado

## Detalhes importantes

### Formulário de contato

O formulário da seção de contato **não está integrado a um backend** no estado atual do projeto.

Hoje, ao enviar:

- o envio é simulado no frontend;
- um estado de carregamento é exibido temporariamente;
- uma notificação de sucesso é mostrada via toast;
- o formulário é resetado após o envio.

Se a ideia for usar isso em produção, o próximo passo natural é conectar o formulário a uma API, serviço de automação ou CRM.

### Botão de WhatsApp

O botão flutuante de WhatsApp usa atualmente um **número placeholder** no componente `src/components/WhatsAppButton.tsx`:

- `5511999999999`

Antes de publicar, troque esse valor pelo número real de atendimento.

### Conteúdo comercial

Os textos, preços e planos de mentoria estão definidos diretamente nos componentes da interface, especialmente em `src/components/ProgramsSection.tsx`.

Se houver alterações de oferta, esses dados devem ser atualizados no código.

## Personalização rápida

### Alterar textos e CTAs

Edite os componentes em `src/components/`:

- `HeroSection.tsx`
- `AboutSection.tsx`
- `ServicesSection.tsx`
- `ProgramsSection.tsx`
- `ContactSection.tsx`
- `Footer.tsx`

### Alterar identidade visual

Os tokens de cor, tipografia e estilos globais estão em:

- `src/index.css`

### Alterar navegação

Os links do menu principal estão em:

- `src/components/Navbar.tsx`

## Publicação

Depois de gerar a build com `npm run build`, os arquivos finais ficam na pasta `dist/`.

Esse diretório pode ser publicado em provedores de front-end estático, como:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Melhorias sugeridas

Algumas evoluções que podem agregar bastante valor ao projeto:

- integrar o formulário com WhatsApp, e-mail ou CRM;
- mover planos/preços para um arquivo de configuração ou CMS;
- adicionar testes de interface para os fluxos principais;
- configurar analytics para medir conversões;
- trocar o número placeholder do WhatsApp por dado real;
- adicionar SEO técnico mais robusto com metatags e Open Graph.

## Licença

Este projeto não possui uma licença declarada no repositório até o momento.

Se ele for distribuído publicamente, vale a pena definir uma licença apropriada.
