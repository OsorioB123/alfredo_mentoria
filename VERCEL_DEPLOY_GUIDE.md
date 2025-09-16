# Guia de Deploy Otimizado - Vercel
## Landing Page Mentoria Alfredo ABN8 Trading

### 📋 Visão Geral do Deploy

Este guia contém todas as configurações necessárias para deploy otimizado da landing page da mentoria do Alfredo ABN8 Trading no Vercel, focando em **performance máxima** e **conversão otimizada**.

**Objetivos do Deploy:**
- ⚡ Performance Score 90+ no Lighthouse
- 🚀 Tempo de carregamento < 2s
- 📊 Core Web Vitals verdes
- 🎯 Tracking de conversão otimizado
- 🔒 Segurança e SEO aprimorados

---

### 🚀 Configuração no Vercel Dashboard

#### 1. Importar Projeto
```bash
# No Vercel Dashboard:
1. New Project
2. Import Git Repository
3. Selecionar: https://github.com/OsorioB123/alfredo_mentoria
4. Framework Preset: Next.js
5. Root Directory: ./
```

#### 2. Configurar Variáveis de Ambiente

**Variáveis Obrigatórias:**
```env
# Google Sheets Integration
GOOGLE_SHEETS_WEB_APP_URL=your_google_sheets_web_app_url_here
GOOGLE_SHEETS_ENABLED=true

# Production Settings
NEXT_PUBLIC_DEV_MODE=false
NODE_ENV=production

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Variáveis Opcionais (Analytics & SEO):**
```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345

# Google Search Console
GOOGLE_SITE_VERIFICATION=your_google_verification_code

# Performance Monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

#### 3. Build & Output Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

---

### ⚙️ Configurações de Performance

#### 1. Region Settings
```json
{
  "regions": ["gru1"]
}
```
**Motivo:** Server em São Paulo para audiência brasileira (latência mínima).

#### 2. Function Configuration
```json
{
  "functions": {
    "src/app/**/*.{js,ts,jsx,tsx}": {
      "maxDuration": 10
    }
  }
}
```

#### 3. Cache Headers Otimizados
- **Static Assets:** 1 year cache (31536000s)
- **Pages:** 1 hour cache (3600s)
- **API Routes:** No cache (real-time data)

---

### 📊 Otimizações Implementadas

#### Performance Optimizations
- ✅ **Turbopack** para builds mais rápidos
- ✅ **Image Optimization** com WebP/AVIF
- ✅ **Code Splitting** automático
- ✅ **Bundle Analysis** integrado
- ✅ **CSS Optimization** com critical CSS inline
- ✅ **Font Display Swap** para carregamento otimizado

#### SEO Optimizations
- ✅ **Meta Tags** completas (OG, Twitter, etc.)
- ✅ **Structured Data** preparado
- ✅ **Sitemap** automático
- ✅ **Robots.txt** otimizado
- ✅ **Canonical URLs** configuradas

#### Security Headers
- ✅ **CSP** (Content Security Policy)
- ✅ **X-Frame-Options**
- ✅ **X-Content-Type-Options**
- ✅ **Referrer Policy**
- ✅ **XSS Protection**

---

### 🎯 Tracking de Conversão

#### Eventos Configurados
1. **PageView** - Visualização de página
2. **FormStart** - Início do preenchimento
3. **FormSubmit** - Submissão do formulário
4. **Lead** - Conversão completa

#### Plataformas Integradas
- **Google Analytics 4** - Análise completa
- **Facebook Pixel** - Remarketing e LAL
- **Vercel Analytics** - Performance real-time

---

### 🔧 Comandos de Deploy

#### Deploy Manual
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Deploy Automático
```bash
# Configurado via GitHub Integration
# Push para main = Deploy automático
git push origin main
```

---

### 📈 Monitoramento Pós-Deploy

#### Métricas Críticas
```javascript
Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

Performance Metrics:
- Time to First Byte: < 200ms
- First Contentful Paint: < 1.2s
- Speed Index: < 2.0s
```

#### Ferramentas de Monitoramento
- **Vercel Analytics** - Real-time performance
- **Google PageSpeed Insights** - Core Web Vitals
- **GTmetrix** - Performance detalhado
- **Google Search Console** - SEO e indexação

---

### 🚨 Checklist Pré-Deploy

#### Configuração
- [ ] Variáveis de ambiente configuradas
- [ ] URL do Google Sheets Web App testada
- [ ] Build local sem erros
- [ ] TypeScript compilation OK

#### Performance
- [ ] Bundle size < 500KB
- [ ] Imagens otimizadas
- [ ] Lighthouse Score > 90
- [ ] Mobile-first responsive

#### SEO & Analytics
- [ ] Meta tags configuradas
- [ ] Google Analytics ID válido
- [ ] Facebook Pixel ID válido
- [ ] OG images configuradas

#### Funcionalidade
- [ ] Formulário funcionando
- [ ] Integração Google Sheets OK
- [ ] Tracking de conversão ativo
- [ ] Mobile UX testado

---

### 🔗 Domínio Personalizado

#### Configuração de Domínio
```bash
# No Vercel Dashboard:
1. Settings > Domains
2. Add Domain: alfredo-mentoria.com
3. Configure DNS:
   - A record: 76.76.19.61
   - CNAME www: cname.vercel-dns.com

# SSL Certificate: Automático
```

#### DNS Recomendado
```
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com
```

---

### 🚀 Otimizações Avançadas

#### Edge Functions (Se necessário)
```javascript
// Para funcionalidades específicas de região
export const config = {
  runtime: 'edge',
  regions: ['gru1'], // São Paulo
}
```

#### ISR (Incremental Static Regeneration)
```javascript
// Para conteúdo que muda pouco
export const revalidate = 3600; // 1 hour
```

#### Preloading Critical Resources
```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://i.ibb.co">
<link rel="preconnect" href="https://script.google.com">
```

---

### 📞 Suporte e Troubleshooting

#### Logs de Deploy
```bash
# Ver logs em tempo real
vercel logs [deployment-url]

# Ver logs de função específica
vercel logs [deployment-url] --since=1h
```

#### Issues Comuns
1. **Build Error:** Verificar TypeScript e dependências
2. **Environment Variables:** Confirmar no Vercel Dashboard
3. **Google Sheets Error:** Testar URL do Web App
4. **Performance Issues:** Analisar bundle size

#### Contacts
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

### 📊 Resultados Esperados

#### Performance Targets
```
Lighthouse Score: 95+
PageSpeed Score: 90+
GTmetrix Grade: A
Core Web Vitals: Green
Time to Interactive: < 3s
```

#### Business Metrics
```
Conversion Rate: Target 15%+
Form Completion: Target 80%+
Bounce Rate: Target < 40%
Session Duration: Target 3min+
```

---

## ✅ Deploy Finalizado

Após completar todos os passos:

1. **Teste** todas as funcionalidades
2. **Monitore** métricas por 24h
3. **Otimize** baseado nos dados
4. **Documente** qualquer issue

**🎯 Objetivo:** Landing page otimizada para máxima conversão de visitantes em leads qualificados para a mentoria do Alfredo ABN8.

---

*Última atualização: Setembro 2024*
*Versão Next.js: 15.5.3*
*Node.js: 18+*