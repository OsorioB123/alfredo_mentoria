/**
 * Google Apps Script para receber dados do formulário Alfredo
 * Versão final corrigida - sem setHeaders
 */

// Configurações da planilha
const SHEET_NAME = 'Inscrições'; // Nome da aba na planilha
const EMAIL_TO_NOTIFY = 'osorio@trendlycorp.com'; // Email para receber notificações

// Função principal que recebe dados POST do formulário
function doPost(e) {
  try {
    // Verifica se recebeu dados POST
    if (!e || !e.postData) {
      throw new Error('Nenhum dado POST recebido');
    }

    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);

    // Log para debug
    console.log('Dados recebidos:', data);

    // Abre a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Aba "${SHEET_NAME}" não encontrada. Execute setupSheet() primeiro.`);
    }

    // Prepara os dados para inserir na planilha
    const row = [
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      data.nomeCompleto || '',
      data.email || '',
      data.perfilSocial || '',
      data.possuiCnpj || '',
      data.setor || '',
      data.experienciaImportacao || '',
      data.porqueImportar || '',
      data.perfilAprendizado || '',
      data.disponibilidade || '',
      data.porqueSerSelecionado || '',
      data.interesseVaga || '',
      data.preparacaoInvestimento || '',
      data.pageUrl || '',
      data.userAgent || ''
    ];

    // Adiciona a linha na planilha
    sheet.appendRow(row);

    console.log('Dados salvos na planilha:', row);

    // Envia email de notificação se configurado
    if (EMAIL_TO_NOTIFY !== 'seu-email@trendlycorp.com') {
      sendEmailNotification(data);
    }

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Inscrição realizada com sucesso!',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao processar dados:', error);

    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro ao salvar inscrição',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para lidar com requisições GET (teste)
function doGet(e) {
  console.log('Requisição GET recebida');

  try {
    // Verifica se e existe e tem parameter
    const hasTestParam = e && e.parameter && e.parameter.test === 'true';

    // Resposta padrão
    const responseData = hasTestParam ?
      {
        success: true,
        message: 'Google Apps Script funcionando!',
        timestamp: new Date().toISOString(),
        method: 'GET'
      } :
      {
        success: true,
        message: 'Google Apps Script funcionando!',
        instructions: 'Use POST para enviar dados do formulário.',
        timestamp: new Date().toISOString(),
        sheetConfigured: checkSheetConfiguration()
      };

    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Erro no doGet:', error);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Erro no servidor'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para verificar se a planilha está configurada
function checkSheetConfiguration() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    return sheet ? true : false;
  } catch (error) {
    return false;
  }
}

// Função para testar o salvamento (EXECUTE ESTA PARA TESTAR)
function testSaveData() {
  try {
    console.log('Iniciando teste de salvamento...');

    // Dados de teste
    const testData = {
      nomeCompleto: 'Teste Manual ' + new Date().getTime(),
      email: 'teste@exemplo.com',
      perfilSocial: '@teste',
      possuiCnpj: 'não',
      setor: 'Tecnologia',
      experienciaImportacao: 'não',
      porqueImportar: 'Teste de funcionamento',
      perfilAprendizado: 'executo',
      disponibilidade: 'sim',
      porqueSerSelecionado: 'Teste completo do sistema',
      interesseVaga: 'sim',
      preparacaoInvestimento: 'pronto',
      userAgent: 'Manual Test',
      pageUrl: 'https://test.local'
    };

    // Simula o objeto 'e' do doPost
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };

    // Chama doPost com dados de teste
    const result = doPost(mockEvent);

    console.log('Resultado do teste:', result.getContent());

    return 'Teste concluído! Verifique os logs e a planilha.';

  } catch (error) {
    console.error('Erro no teste:', error);
    return 'Erro no teste: ' + error.toString();
  }
}

// Função para enviar email de notificação
function sendEmailNotification(data) {
  try {
    const subject = `🎯 Nova Inscrição - Alfredo ABN8 Trading - ${data.nomeCompleto}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">Nova Inscrição - Do Zero ao Primeiro Contêiner</h2>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Dados do Candidato:</h3>

          <p><strong>Nome:</strong> ${data.nomeCompleto}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Perfil Social:</strong> ${data.perfilSocial}</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

          <h4 style="color: #374151;">Informações Profissionais:</h4>
          <p><strong>Possui CNPJ:</strong> ${data.possuiCnpj || 'Não informado'}</p>
          <p><strong>Setor:</strong> ${data.setor || 'Não informado'}</p>
          <p><strong>Experiência com Importação:</strong> ${data.experienciaImportacao || 'Não informado'}</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

          <h4 style="color: #374151;">Motivação e Disponibilidade:</h4>
          <p><strong>Por que quer importar:</strong> ${data.porqueImportar || 'Não informado'}</p>
          <p><strong>Perfil de aprendizado:</strong> ${data.perfilAprendizado || 'Não informado'}</p>
          <p><strong>Disponibilidade:</strong> ${data.disponibilidade || 'Não informado'}</p>
          <p><strong>Por que deve ser selecionado:</strong> ${data.porqueSerSelecionado || 'Não informado'}</p>
          <p><strong>Interesse na vaga:</strong> ${data.interesseVaga || 'Não informado'}</p>
          <p><strong>Preparação para investimento:</strong> ${data.preparacaoInvestimento || 'Não informado'}</p>
        </div>

        <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 16px;">
            <strong>Nova inscrição para o programa "Do Zero ao Primeiro Contêiner"!</strong>
          </p>
          <p style="margin: 10px 0 0 0;">
            Entre em contato para avaliar o candidato.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

        <p style="color: #6b7280; font-size: 12px;">
          Inscrição recebida em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </p>
      </div>
    `;

    MailApp.sendEmail({
      to: EMAIL_TO_NOTIFY,
      subject: subject,
      htmlBody: htmlBody
    });

    console.log('Email de notificação enviado para:', EMAIL_TO_NOTIFY);

  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
}

// Função para criar a planilha com formatação inicial (EXECUTE PRIMEIRO)
function setupSheet() {
  try {
    console.log('Configurando planilha...');

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Verifica se já existe a aba
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      // Cria a aba se não existir
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      console.log('Aba "' + SHEET_NAME + '" criada.');
    } else {
      console.log('Aba "' + SHEET_NAME + '" já existe.');
    }

    // Define os cabeçalhos
    const headers = [
      'Data/Hora',
      'Nome Completo',
      'Email',
      'Perfil Social',
      'Possui CNPJ',
      'Setor',
      'Experiência Importação',
      'Por que Importar',
      'Perfil Aprendizado',
      'Disponibilidade',
      'Por que Ser Selecionado',
      'Interesse Vaga',
      'Preparação Investimento',
      'URL da Página',
      'User Agent'
    ];

    // Se a primeira linha estiver vazia, adiciona os cabeçalhos
    if (sheet.getRange(1, 1).getValue() === '') {
      sheet.appendRow(headers);
      console.log('Cabeçalhos adicionados.');
    } else {
      console.log('Cabeçalhos já existem.');
    }

    // Formata os cabeçalhos
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setHorizontalAlignment('center');

    // Ajusta a largura das colunas
    const columnWidths = [150, 200, 200, 150, 100, 200, 150, 300, 150, 100, 300, 100, 150, 200, 300];
    columnWidths.forEach((width, index) => {
      sheet.setColumnWidth(index + 1, width);
    });

    // Congela a primeira linha (cabeçalhos)
    sheet.setFrozenRows(1);

    // Formata a coluna de data/hora
    sheet.getRange(2, 1, 1000, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');

    SpreadsheetApp.flush();

    console.log('Planilha configurada com sucesso!');
    return 'Planilha "' + SHEET_NAME + '" configurada com sucesso!';

  } catch (error) {
    console.error('Erro ao configurar planilha:', error);
    return 'Erro: ' + error.toString();
  }
}

// Função para listar todas as abas (debug)
function listSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();

  console.log('Abas na planilha:');
  sheets.forEach((sheet, index) => {
    console.log(`${index + 1}. ${sheet.getName()}`);
  });

  return sheets.map(sheet => sheet.getName());
}

// Função simples para testar sem parâmetros
function testBasicFunction() {
  console.log('Teste básico executado com sucesso!');
  console.log('Data atual:', new Date().toISOString());
  console.log('Planilha configurada:', checkSheetConfiguration());

  return 'Função básica funcionando! Data: ' + new Date().toLocaleString('pt-BR');
}