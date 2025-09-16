# 🔧 Troubleshooting - Integração Google Sheets

## ✅ Problemas Identificados e Correções Implementadas

### 1. **Problema: Variável de Ambiente não Acessível no Client-Side**
**Sintoma:** `process.env.GOOGLE_SHEETS_WEB_APP_URL` retornava `undefined`

**Causa:** No Next.js, apenas variáveis que começam com `NEXT_PUBLIC_` são acessíveis no client-side.

**Correção:**
```env
# ❌ Antes (não funcionava no client)
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/...

# ✅ Depois (funciona no client)
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbxmsN640sUGpZ8lj_UEj_SYThnZcn06L1Rn_iu1PPNqorqmbBu1J8h5aRDX_qsoyThrqQ/exec
```

### 2. **Problema: Parâmetros Incorretos na Função `submitToGoogleSheets`**
**Sintoma:** Função era chamada com objeto `config` em vez da URL

**Correção no arquivo `src/app/inscricao/page.tsx`:
```javascript
// ❌ Antes
const result = await submitToGoogleSheets(data, config)

// ✅ Depois
const result = await submitToGoogleSheets(data)
```

### 3. **Problema: Falta de Logs de Debug**
**Sintoma:** Difícil identificar onde estava falhando

**Correção:** Adicionados logs detalhados em `src/lib/services/google-sheets.ts`:
- Logs de dados formatados
- Logs de request/response HTTP
- Logs de parsing JSON
- Logs de erro com stack trace

### 4. **Problema: Campo "terms" Não Mapeado**
**Sintoma:** Campo `terms` era enviado para o Google Apps Script que não esperava esse campo

**Correção:** Removido o campo `terms` do payload enviado para o Google Sheets, pois é apenas para validação local.

## 🧪 Como Testar a Integração

### 1. **Página de Teste Dedicada**
Acesse: `/teste-google-sheets`

Esta página permite:
- Verificar se as variáveis de ambiente estão configuradas
- Testar o envio de dados com logs detalhados
- Ver a resposta do Google Apps Script

### 2. **Verificação Manual no Console**
1. Abra o Developer Tools (F12)
2. Vá na aba Console
3. Preencha e envie o formulário de inscrição
4. Acompanhe os logs que mostram:
   - Dados coletados do formulário
   - Dados formatados para envio
   - Resposta do servidor
   - Status de sucesso/erro

## 📋 Checklist de Verificação

### ✅ Configuração do Ambiente
- [ ] Arquivo `.env.local` existe na raiz do projeto
- [ ] Contém `NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=...`
- [ ] URL está correta e acessível
- [ ] Servidor de desenvolvimento foi reiniciado após mudanças no .env

### ✅ Google Apps Script
- [ ] Script está implantado como Web App
- [ ] Permissões estão configuradas para "Anyone"
- [ ] URL do Web App está atualizada
- [ ] Função `doPost` está implementada corretamente

### ✅ Formulário Frontend
- [ ] Todos os campos obrigatórios são preenchidos
- [ ] Validação do formulário passa
- [ ] Console não mostra erros de JavaScript
- [ ] Network tab mostra request POST sendo feito

## 🔍 Como Debugar Problemas

### 1. **Verificar Logs no Console do Navegador**
```javascript
// Busque por estes emojis nos logs:
🚀 Iniciando submissão do formulário...
🔍 Verificação das variáveis de ambiente:
📤 Enviando dados para Google Sheets...
📋 Payload sendo enviado:
📡 Status da resposta HTTP:
📥 Resposta bruta do servidor:
✅ Resposta parseada:
🎉 Dados enviados com sucesso para Google Sheets!
```

### 2. **Verificar Network Tab**
1. Abra Developer Tools → Network
2. Envie o formulário
3. Procure por request para `script.google.com`
4. Verifique:
   - Status Code (deve ser 200)
   - Response body
   - Request payload

### 3. **Verificar Google Apps Script Logs**
1. Acesse [script.google.com](https://script.google.com)
2. Abra seu projeto
3. Vá em "Executions" no menu lateral
4. Verifique se há execuções recentes e erros

## ⚠️ Problemas Comuns e Soluções

### **Erro: "URL do Google Sheets Web App não configurada"**
**Solução:**
1. Verifique se `.env.local` existe
2. Confirme que a variável começa com `NEXT_PUBLIC_`
3. Reinicie o servidor de desenvolvimento

### **Erro HTTP 404**
**Solução:**
1. Verifique se a URL do Google Apps Script está correta
2. Confirme se o script foi implantado como Web App
3. Teste a URL diretamente no navegador

### **Erro HTTP 302 (Redirect)**
**Solução:**
1. Script não foi implantado corretamente
2. Reimplante como Web App com permissões "Anyone"

### **Dados não aparecem na planilha**
**Solução:**
1. Verifique se a função `processarInscricao` está funcionando
2. Confirme se os nomes dos campos estão corretos
3. Execute `configurarCabecalhos()` no Google Apps Script

### **Erro de Parsing JSON**
**Solução:**
1. Verifique se o Google Apps Script está retornando JSON válido
2. Confirme se a função `criarResposta` está sendo usada
3. Teste a função `testarIntegracao()` no Apps Script

## 📝 Estrutura dos Dados Enviados

```json
{
  "nomeCompleto": "João da Silva",
  "email": "joao@exemplo.com",
  "perfilSocial": "@joaosilva",
  "possuiCnpj": "sim",
  "setor": "Moda",
  "experienciaImportacao": "nao",
  "porqueImportar": "Quero expandir meu negócio",
  "perfilAprendizado": "executo",
  "disponibilidade": "sim",
  "porqueSerSelecionado": "Estou comprometido",
  "interesseVaga": "sim",
  "preparacaoInvestimento": "sim",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🚀 Próximos Passos

1. **Teste a integração** usando `/teste-google-sheets`
2. **Preencha um formulário real** em `/inscricao`
3. **Verifique os logs** no console do navegador
4. **Confirme os dados** na planilha do Google Sheets
5. **Monitore execuções** no Google Apps Script

Se ainda houver problemas, verifique:
- Conexão com internet
- Firewall/proxy corporativo
- Configurações de cookies/JavaScript no navegador