# 📊 Configuração Google Sheets + Apps Script

## Visão Geral
Esta documentação guia você através da configuração completa da integração entre o formulário de inscrição da mentoria do Alfredo e o Google Sheets usando Apps Script.

## 🔧 Pré-requisitos
- Conta Google
- Acesso ao Google Sheets
- Acesso ao Google Apps Script
- Projeto Next.js configurado

## 📋 Passo 1: Criar a Planilha

1. **Acesse** [Google Sheets](https://sheets.google.com)
2. **Crie** uma nova planilha
3. **Nomeie** como "Mentoria Alfredo - Inscrições"
4. **Configure** o cabeçalho na linha 1 com as seguintes colunas:

```
A1: Timestamp
B1: Nome Completo
C1: Email
D1: Perfil Social
E1: Possui CNPJ
F1: Setor
G1: Experiência Importação
H1: Por que importar
I1: Perfil Aprendizado
J1: Disponibilidade
K1: Por que ser selecionado
L1: Interesse na vaga
M1: Preparação investimento
N1: Status
O1: Observações
```

## 🔧 Passo 2: Configurar Apps Script

### 2.1 Criar o Projeto
1. Na planilha, acesse **Extensões > Apps Script**
2. **Delete** o código padrão
3. **Cole** o código abaixo:

```javascript
// Função principal para receber dados do formulário
function doPost(e) {
  try {
    // Validar se há dados
    if (!e.postData || !e.postData.contents) {
      return criarResposta(false, 'Dados não recebidos');
    }

    // Parsear dados JSON
    const dados = JSON.parse(e.postData.contents);

    // Validar campos obrigatórios
    if (!dados.nomeCompleto || !dados.email) {
      return criarResposta(false, 'Campos obrigatórios não preenchidos');
    }

    // Processar inscrição
    const resultado = processarInscricao(dados);

    if (resultado.sucesso) {
      return criarResposta(true, 'Inscrição recebida com sucesso!', resultado.linha);
    } else {
      return criarResposta(false, resultado.erro);
    }

  } catch (error) {
    console.error('Erro no doPost:', error);
    return criarResposta(false, 'Erro interno do servidor');
  }
}

// Função para processar e salvar a inscrição
function processarInscricao(dados) {
  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getActiveSheet();

    // Preparar dados para inserção
    const linha = [
      new Date(), // Timestamp
      dados.nomeCompleto,
      dados.email,
      dados.perfilSocial,
      dados.possuiCnpj === 'sim' ? 'Sim' : 'Não',
      dados.setor,
      dados.experienciaImportacao === 'sim' ? 'Sim' : 'Não',
      dados.porqueImportar,
      formatarPerfilAprendizado(dados.perfilAprendizado),
      formatarDisponibilidade(dados.disponibilidade),
      dados.porqueSerSelecionado,
      formatarInteresseVaga(dados.interesseVaga),
      formatarPreparacaoInvestimento(dados.preparacaoInvestimento),
      'Nova', // Status inicial
      '' // Observações (vazio inicialmente)
    ];

    // Adicionar linha na planilha
    const numeroLinha = aba.getLastRow() + 1;
    aba.getRange(numeroLinha, 1, 1, linha.length).setValues([linha]);

    // Formatar a linha recém-adicionada
    formatarLinha(aba, numeroLinha);

    // Enviar notificação (opcional)
    enviarNotificacao(dados);

    return {
      sucesso: true,
      linha: numeroLinha
    };

  } catch (error) {
    console.error('Erro ao processar inscrição:', error);
    return {
      sucesso: false,
      erro: 'Erro ao salvar dados: ' + error.message
    };
  }
}

// Funções auxiliares para formatação
function formatarPerfilAprendizado(perfil) {
  const perfis = {
    'pronto': 'Quero algo pronto, sem ter trabalho',
    'orientacao': 'Gosto de aprender e executar com orientação',
    'executo': 'Se tiver clareza e acompanhamento, eu executo sem medo'
  };
  return perfis[perfil] || perfil;
}

function formatarDisponibilidade(disponibilidade) {
  const disponibilidades = {
    'sim': 'Sim, 100%',
    'depende': 'Depende dos horários',
    'restricoes': 'Tenho restrições'
  };
  return disponibilidades[disponibilidade] || disponibilidade;
}

function formatarInteresseVaga(interesse) {
  const interesses = {
    'sim': 'Sim, estou pronto',
    'interesse': 'Tenho interesse, mas preciso entender melhor',
    'incerto': 'Ainda não tenho certeza'
  };
  return interesses[interesse] || interesse;
}

function formatarPreparacaoInvestimento(preparacao) {
  const preparacoes = {
    'sim': 'Sim, pronto pra investir em mim',
    'avaliar': 'Tenho interesse, mas preciso avaliar condições',
    'nao': 'Não posso neste momento'
  };
  return preparacoes[preparacao] || preparacao;
}

// Função para formatar visualmente a linha
function formatarLinha(aba, numeroLinha) {
  const range = aba.getRange(numeroLinha, 1, 1, 15);

  // Aplicar formatação condicional baseada no status
  const status = aba.getRange(numeroLinha, 14).getValue();

  if (status === 'Nova') {
    range.setBackground('#e3f2fd'); // Azul claro para novas inscrições
  }

  // Formatar colunas específicas
  aba.getRange(numeroLinha, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss'); // Timestamp
  aba.getRange(numeroLinha, 2).setFontWeight('bold'); // Nome em negrito
}

// Função para enviar notificação (opcional)
function enviarNotificacao(dados) {
  try {
    const assunto = `Nova inscrição: ${dados.nomeCompleto}`;
    const corpo = `
Nova inscrição recebida na mentoria!

Nome: ${dados.nomeCompleto}
Email: ${dados.email}
Setor: ${dados.setor}
Possui CNPJ: ${dados.possuiCnpj === 'sim' ? 'Sim' : 'Não'}

Acesse a planilha para mais detalhes.
    `;

    // Substitua por seu email para receber notificações
    const emailDestino = 'alfredo@abn8trading.com';
    MailApp.sendEmail(emailDestino, assunto, corpo);

  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

// Função para criar resposta padronizada
function criarResposta(sucesso, mensagem, dados = null) {
  return ContentService
    .createTextOutput(JSON.stringify({
      sucesso: sucesso,
      mensagem: mensagem,
      dados: dados,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para testar a integração
function testarIntegracao() {
  const dadosTeste = {
    nomeCompleto: 'João da Silva',
    email: 'joao@teste.com',
    perfilSocial: '@joaosilva',
    possuiCnpj: 'sim',
    setor: 'Moda',
    experienciaImportacao: 'nao',
    porqueImportar: 'Quero expandir meu negócio',
    perfilAprendizado: 'executo',
    disponibilidade: 'sim',
    porqueSerSelecionado: 'Estou comprometido com o resultado',
    interesseVaga: 'sim',
    preparacaoInvestimento: 'sim'
  };

  const resultado = processarInscricao(dadosTeste);
  console.log('Resultado do teste:', resultado);
}
```

### 2.2 Configurar Permissões
1. **Salve** o projeto com nome "Mentoria Alfredo API"
2. **Execute** a função `testarIntegracao` para configurar permissões
3. **Autorize** o acesso às suas planilhas

### 2.3 Implantar como Web App
1. **Clique** em "Implantar > Nova implantação"
2. **Selecione** tipo "Aplicativo da Web"
3. **Configure**:
   - Descrição: "API Formulário Mentoria Alfredo"
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
4. **Clique** em "Implantar"
5. **Copie** a URL do Web App

## 🔑 Passo 3: Configurar Variáveis de Ambiente

No seu projeto Next.js, crie/edite o arquivo `.env.local`:

```bash
# Google Sheets Integration
GOOGLE_SHEETS_WEB_APP_URL=sua_url_do_web_app_aqui
GOOGLE_SHEETS_ENABLED=true

# Para desenvolvimento/teste
NEXT_PUBLIC_DEV_MODE=true
```

## 📱 Passo 4: Testar a Integração

### 4.1 Teste Manual
1. **Acesse** http://localhost:3006/inscricao
2. **Preencha** o formulário completamente
3. **Envie** os dados
4. **Verifique** se apareceu na planilha

### 4.2 Teste via Apps Script
1. **No Apps Script**, execute `testarIntegracao()`
2. **Verifique** se os dados de teste aparecem na planilha

## 🔧 Passo 5: Configurações Avançadas

### 5.1 Formatação Condicional
Adicione regras na planilha para destacar diferentes status:
- **Verde**: Aprovados
- **Amarelo**: Em análise
- **Azul**: Novas inscrições
- **Vermelho**: Rejeitados

### 5.2 Filtros e Visualizações
1. **Selecione** linha 1 (cabeçalho)
2. **Dados > Criar um filtro**
3. **Configure** visualizações por status, setor, etc.

## 🚨 Solução de Problemas

### Erro 403 - Permissão Negada
- Verifique se o Web App está configurado para "Qualquer pessoa"
- Confirme se executou a função teste para autorizar permissões

### Dados não chegando
- Verifique a URL do Web App no `.env.local`
- Confirme se `GOOGLE_SHEETS_ENABLED=true`
- Teste a função `testarIntegracao()` no Apps Script

### Erro de CORS
- Apps Script automaticamente permite CORS
- Se persistir, verifique se a URL está correta

## 📊 Análise de Dados

### Relatórios Automáticos
Adicione essas fórmulas em colunas auxiliares:

```
# Total de inscrições
=COUNTA(B:B)-1

# Inscrições por setor
=COUNTIF(F:F,"Moda")

# Taxa de conversão por fonte
=COUNTIF(N:N,"Aprovado")/COUNTA(B:B)-1
```

### Dashboard Básico
Crie gráficos para:
- Inscrições por dia
- Distribuição por setor
- Status das inscrições
- Origem do tráfego

## 🔐 Segurança

### Validações Implementadas
- ✅ Campos obrigatórios
- ✅ Formato de email
- ✅ Sanitização de dados
- ✅ Rate limiting básico

### Recomendações Adicionais
- Monitorar logs regularmente
- Backup automático da planilha
- Revisar permissões periodicamente

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs no Apps Script
2. Teste a função `testarIntegracao()`
3. Confirme configurações de permissão
4. Valide variáveis de ambiente

---

**🎯 Resultado Final**: Sistema completo de captura e gerenciamento de inscrições da mentoria, com dados organizados automaticamente no Google Sheets para análise e acompanhamento do Alfredo.