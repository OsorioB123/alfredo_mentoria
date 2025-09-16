# 📋 Google Apps Script - Formulário Alfredo

Este diretório contém o código e instruções para configurar a integração do formulário de inscrição com Google Sheets.

## 🚀 Início Rápido

### 1. Configurar Google Sheets
1. Acesse [sheets.google.com](https://sheets.google.com)
2. Crie uma nova planilha
3. Anote o ID da planilha (da URL)

### 2. Configurar Google Apps Script
1. Acesse [script.google.com](https://script.google.com)
2. Crie um novo projeto
3. Cole o código do arquivo `Code.gs`
4. Substitua `SEU_ID_DA_PLANILHA_AQUI` pelo ID da sua planilha
5. Execute a função `setupSheet()` para configurar

### 3. Publicar como Web App
1. Clique em "Implantar" > "Nova implantação"
2. Selecione "Aplicativo da Web"
3. Configure:
   - **Executar como:** Eu (seu-email@gmail.com)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em "Implantar"
5. Copie a URL gerada

### 4. Configurar Frontend
1. Copie `.env.local.example` para `.env.local`
2. Substitua `YOUR_SCRIPT_ID` pela URL do seu Web App
3. Reinicie o servidor: `npm run dev`

### 5. Testar
- Acesse: `http://localhost:3000/teste-google-sheets`
- Execute todos os testes
- Verifique se os dados aparecem na planilha

## 📁 Arquivos

- `Code.gs` - Código principal do Google Apps Script
- `CONFIGURACAO_PASSO_A_PASSO.md` - Guia detalhado completo
- `README.md` - Este arquivo (início rápido)

## ✅ Funcionamento

O sistema funciona com duplo fallback:

1. **POST** - Tentativa principal (recomendado)
2. **GET** - Fallback automático se POST falhar
3. **Logs detalhados** - Para debugging completo

## 🔧 Troubleshooting

### Problema: "Failed to fetch"
- Verifique se o Web App foi publicado com acesso "Qualquer pessoa"
- Teste a URL diretamente no navegador

### Problema: "Script function not found"
- Certifique-se que salvou o código no Apps Script
- Verifique se executou `setupSheet()` com sucesso

### Problema: Dados não aparecem na planilha
- Verifique o ID da planilha no código
- Execute `testConfiguration()` no Apps Script
- Verifique permissões da planilha

## 📞 Suporte

Use a página de teste para diagnóstico: `/teste-google-sheets`

Logs detalhados no console do navegador (F12) e no console do Apps Script.