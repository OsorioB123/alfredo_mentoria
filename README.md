# 🚢 Do Zero ao Primeiro Contêiner - Landing Page

Landing page moderna e otimizada para conversão da mentoria "Do Zero ao Primeiro Contêiner" do Alfredo ABN8 Trading, especialista em comércio exterior com mais de 14 anos de experiência e R$ 1 bilhão movimentado em operações internacionais.

## ✨ Características

- 🎨 **Design Pixel Perfect** - Conversão fiel do HTML original para React/Next.js
- 🚀 **Performance Otimizada** - Next.js 15 com Turbopack
- 📱 **Responsivo** - Mobile-first design com Tailwind CSS 4
- 🎭 **Animações Profissionais** - Framer Motion para micro-interações envolventes
- 📊 **Integração Google Sheets** - Apps Script para captura automática de leads
- 🎯 **Otimizado para Conversão** - UX focada em maximizar inscrições
- ♿ **Acessível** - WCAG AA compliance

## 🛠 Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animações**: Framer Motion
- **Formulários**: React Hook Form + Zod
- **Tipagem**: TypeScript
- **Ícones**: Lucide React
- **Deploy**: Vercel (recomendado)
- **Backend**: Google Apps Script + Sheets

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm
- Conta Google (para integração Sheets)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/OsorioB123/alfredo_mentoria.git
cd alfredo_mentoria
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:
```bash
GOOGLE_SHEETS_WEB_APP_URL=sua_url_do_google_apps_script
GOOGLE_SHEETS_ENABLED=true
NEXT_PUBLIC_DEV_MODE=true
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📄 Páginas

- **`/`** - Landing page principal com todas as seções
- **`/inscricao`** - Formulário de inscrição multi-step
- **`/inscricao/obrigado`** - Página de agradecimento pós-inscrição

## 🔧 Configuração Google Sheets

Para configurar a integração completa com Google Sheets, siga o guia detalhado:

👉 **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**

## 📱 Estrutura do Projeto

```
src/
├── app/                     # App Router pages
│   ├── inscricao/          # Formulário de inscrição
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Homepage
├── components/
│   ├── layout/             # Componentes de layout
│   ├── sections/           # Seções da landing page
│   ├── ui/                 # Componentes shadcn/ui
│   └── forms/              # Componentes de formulário
├── lib/
│   ├── constants.ts        # Configurações e dados
│   ├── types/              # Tipos TypeScript
│   ├── validations/        # Schemas Zod
│   └── services/           # Integrações externas
└── hooks/                  # Custom hooks
```

## 🎯 Funcionalidades Principais

### Landing Page
- ✅ Hero section com animação de título
- ✅ Biografia do mentor (Alfredo)
- ✅ Programa e conquistas esperadas
- ✅ Cronograma detalhado das 6 semanas
- ✅ O que está incluído na mentoria
- ✅ Para quem é/não é a mentoria
- ✅ CTA otimizado para conversão

### Formulário de Inscrição
- ✅ 5 etapas com validação em tempo real
- ✅ Dados pessoais e profissionais
- ✅ Avaliação de perfil e comprometimento
- ✅ Confirmação de investimento (R$ 5.000)
- ✅ Integração automática com Google Sheets

### Animações e UX
- ✅ Scroll-triggered animations
- ✅ Hover effects em cards e botões
- ✅ Loading states profissionais
- ✅ Transições suaves entre páginas
- ✅ Feedback visual em formulários

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. **Conecte com Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

2. **Configure variáveis de ambiente**
No dashboard da Vercel, adicione as mesmas variáveis do `.env.local`

3. **Deploy automático**
Commits na branch `main` fazem deploy automaticamente

### Deploy em outros provedores

O projeto é compatível com qualquer provedor que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📊 Analytics e Conversão

### Métricas Implementadas
- Tempo na página
- Scroll depth
- Cliques em CTAs
- Taxa de conversão do formulário
- Origem do tráfego

### Google Sheets Dashboard
A integração inclui:
- Captura automática de leads
- Formatação condicional por status
- Notificações por email
- Relatórios de conversão

## 🔐 Segurança

- ✅ Validação client e server-side
- ✅ Sanitização de dados
- ✅ Rate limiting básico
- ✅ HTTPS obrigatório
- ✅ Headers de segurança

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação em [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. Consulte os logs do projeto
3. Abra uma issue no GitHub

## 📈 Resultados Esperados

- **+30%** na taxa de conversão vs páginas estáticas
- **+25%** no tempo de permanência na página
- **+40%** na qualidade dos leads capturados
- **100%** de dados organizados automaticamente

---

### 💼 Sobre a ABN8 Trading

A ABN8 Trading é uma das maiores importadoras e exportadoras do Brasil, com mais de 14 anos de experiência, R$ 1 bilhão movimentado e mais de 10 mil produtos importados nos setores de moda, construção, alimentos, agronegócio e indústria pesada.

**Fundador**: Alfredo - Especialista em comércio exterior com foco em descomplicar a importação para empresários brasileiros.

---

Desenvolvido com ❤️ para maximizar conversões e crescer negócios através do comércio exterior.
