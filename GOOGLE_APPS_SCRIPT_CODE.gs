// Código completo para Google Apps Script
// Cole este código inteiro no seu projeto Apps Script

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
      success: sucesso,
      message: mensagem,
      data: dados,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para testar a integração
function testarIntegracao() {
  const dadosTeste = {
    nomeCompleto: 'João da Silva Teste',
    email: 'joao.teste@gmail.com',
    perfilSocial: '@joaosilva',
    possuiCnpj: 'sim',
    setor: 'Moda',
    experienciaImportacao: 'nao',
    porqueImportar: 'Quero expandir meu negócio para importação',
    perfilAprendizado: 'executo',
    disponibilidade: 'sim',
    porqueSerSelecionado: 'Estou comprometido com o resultado e disposto a executar',
    interesseVaga: 'sim',
    preparacaoInvestimento: 'sim'
  };

  const resultado = processarInscricao(dadosTeste);
  console.log('Resultado do teste:', resultado);

  if (resultado.sucesso) {
    console.log('✅ Teste realizado com sucesso! Dados inseridos na linha:', resultado.linha);
  } else {
    console.log('❌ Erro no teste:', resultado.erro);
  }

  return resultado;
}

// Função para configurar cabeçalhos da planilha (execute uma vez)
function configurarCabecalhos() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getActiveSheet();

  const cabecalhos = [
    'Timestamp',
    'Nome Completo',
    'Email',
    'Perfil Social',
    'Possui CNPJ',
    'Setor',
    'Experiência Importação',
    'Por que importar',
    'Perfil Aprendizado',
    'Disponibilidade',
    'Por que ser selecionado',
    'Interesse na vaga',
    'Preparação investimento',
    'Status',
    'Observações'
  ];

  // Adicionar cabeçalhos na primeira linha
  aba.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);

  // Formatar cabeçalhos
  const headerRange = aba.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');

  console.log('✅ Cabeçalhos configurados com sucesso!');
}