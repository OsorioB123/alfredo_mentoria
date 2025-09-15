# Formulário de Inscrição - Mentoria Alfredo

## Visão Geral

Implementação pixel-perfect do formulário de inscrição para a mentoria "Do Zero ao Primeiro Contêiner" do Alfredo, baseado no HTML original.

## Funcionalidades Implementadas

### ✅ Interface Pixel Perfect
- Design idêntico ao HTML original
- Background com imagem de fundo
- Gradiente overlay
- Tipografia e cores fiéis ao design
- Layout responsivo mobile-first

### ✅ Formulário Multi-step (5 Passos)
1. **Passo 1 - Dados Pessoais**
   - Nome completo
   - E-mail
   - Perfil social (Instagram/LinkedIn)

2. **Passo 2 - Perfil do Negócio**
   - Status do CNPJ
   - Setor de atuação
   - Experiência com importação
   - Motivação para aprender

3. **Passo 3 - Nível de Comprometimento**
   - Perfil de aprendizado
   - Disponibilidade para mentoria ao vivo

4. **Passo 4 - Seleção e Confirmação**
   - Por que deve ser selecionado
   - Interesse em garantir vaga

5. **Passo Final - Investimento**
   - Preparação para investir R$ 5.000
   - Termos e condições

### ✅ Validação Avançada
- React Hook Form + Zod
- Validação em tempo real
- Validação por etapa
- Mensagens de erro personalizadas
- Prevenção de navegação inválida

### ✅ UX/UI Otimizada
- Indicador de progresso visual
- Navegação entre etapas
- Loading states
- Estados de erro
- Feedback visual para interações

### ✅ Integração com Google Sheets
- Estrutura preparada para envio automático
- Formatação de dados otimizada
- Configuração via variáveis de ambiente
- Fallback para desenvolvimento
- Documentação completa de setup

## Arquivos Principais

```
src/
├── app/
│   └── inscricao/
│       ├── page.tsx              # Página principal do formulário
│       └── obrigado/
│           └── page.tsx          # Página de agradecimento
├── lib/
│   ├── types/
│   │   └── form.ts              # Tipos TypeScript
│   ├── validations/
│   │   └── form.ts              # Schemas Zod
│   └── services/
│       └── google-sheets.ts     # Integração Google Sheets
└── components/ui/
    ├── textarea.tsx             # Componente Textarea
    ├── radio-group.tsx          # Componente RadioGroup
    └── checkbox.tsx             # Componente Checkbox
```

## Como Usar

### 1. Desenvolvimento
```bash
cd alfredo-landing
npm install
npm run dev
```

### 2. Acessar o Formulário
- URL: `http://localhost:3000/inscricao`
- Página de agradecimento: `http://localhost:3000/inscricao/obrigado`

### 3. Configurar Google Sheets (Opcional)
Consulte `GOOGLE_SHEETS_SETUP.md` para instruções detalhadas.

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Styling
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **shadcn/ui** - Componentes base
- **Radix UI** - Componentes primitivos
- **Lucide React** - Ícones

## Validações Implementadas

### Campos Obrigatórios
Todos os campos marcados com * são obrigatórios e validados.

### Validações Específicas
- **Nome**: 2-100 caracteres
- **E-mail**: Formato válido
- **Perfil Social**: 1-200 caracteres
- **Setor**: 2-100 caracteres
- **Respostas longas**: 10-1000 caracteres
- **Radio buttons**: Seleção obrigatória
- **Termos**: Aceitação obrigatória

### Validação por Etapa
- Impede navegação para próxima etapa com erros
- Validação em tempo real
- Feedback visual imediato

## Responsividade

- **Mobile First**: Design otimizado para celulares
- **Breakpoints**: sm, md, lg, xl
- **Touch Targets**: Botões e inputs adequados para touch
- **Legibilidade**: Texto e contrastes otimizados

## Performance

- **Bundle Size**: Otimizado com code splitting
- **Loading States**: Feedback visual durante envio
- **Validação Eficiente**: Validação apenas quando necessário
- **Imagens**: Background otimizado para web

## Acessibilidade

- **ARIA Labels**: Campos e controles descritos
- **Keyboard Navigation**: Navegação completa via teclado
- **Screen Readers**: Estrutura semântica adequada
- **Focus Management**: Foco visível e lógico
- **Color Contrast**: Atende WCAG AA

## Integração Futura

### Google Sheets
- Configuração via variáveis de ambiente
- Formatação automática dos dados
- Tratamento de erros
- Fallback para falhas

### Outras Integrações Possíveis
- **Email Marketing**: Mailchimp, ConvertKit
- **CRM**: HubSpot, Pipedrive
- **Webhooks**: Zapier, Make (Integromat)
- **Database**: Supabase, Firebase

## Estrutura de Dados

### FormData Interface
```typescript
interface FormData {
  fullName: string
  email: string
  social: string
  cnpj: "sim" | "nao"
  sector: string
  importExperience: "sim" | "nao"
  whyImport: string
  phrase: "pronto" | "orientacao" | "executo"
  participation: "sim" | "depende" | "restricoes"
  whySelected: string
  secure: "sim" | "interesse" | "incerto"
  investment: "sim" | "avaliar" | "nao"
  terms: boolean
}
```

## Próximos Passos

1. **Configurar Google Sheets** com credenciais reais
2. **Implementar Analytics** para acompanhar conversões
3. **Adicionar Testes** unitários e de integração
4. **Configurar Monitoramento** de erros
5. **Otimizar SEO** da página de inscrição
6. **Implementar A/B Tests** para otimizar conversão

## Manutenção

### Adicionando Novos Campos
1. Atualizar interface em `types/form.ts`
2. Adicionar validação em `validations/form.ts`
3. Incluir campo no componente apropriado
4. Atualizar formatação para Google Sheets

### Modificando Validações
- Editar schemas em `validations/form.ts`
- Usar regex para validações complexas
- Considerar UX ao adicionar restrições

### Atualizando Design
- Modificar classes Tailwind
- Manter consistência com design original
- Testar em diferentes dispositivos

## Suporte

Para dúvidas sobre implementação, consulte:
- Documentação do Next.js
- Documentação do React Hook Form
- Documentação do Zod
- Guia de setup do Google Sheets (GOOGLE_SHEETS_SETUP.md)