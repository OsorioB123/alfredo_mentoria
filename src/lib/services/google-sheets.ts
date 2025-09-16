import type { FormData } from "@/lib/validations/form"

// Interface para configuração da integração com Google Sheets
interface GoogleSheetsConfig {
  spreadsheetId: string
  apiKey: string
  sheetName?: string
}

// Função para formatear dados do formulário para o Apps Script
export function formatFormDataForSheets(data: FormData): Record<string, unknown> {
  const formattedData = {
    // Dados que correspondem exatamente ao Apps Script configurado
    nomeCompleto: data.fullName,
    email: data.email,
    perfilSocial: data.social,
    possuiCnpj: data.cnpj,
    setor: data.sector,
    experienciaImportacao: data.importExperience,
    porqueImportar: data.whyImport,
    perfilAprendizado: data.phrase,
    disponibilidade: data.participation,
    porqueSerSelecionado: data.whySelected,
    interesseVaga: data.secure,
    preparacaoInvestimento: data.investment,
    timestamp: new Date().toISOString()
  }

  // Log dos dados formatados para debug
  console.log('🔍 Dados formatados para Google Sheets:', formattedData)

  return formattedData
}

// Função para converter dados para query string (fallback GET)
function formatDataForGET(data: Record<string, unknown>): string {
  const params = new URLSearchParams()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, String(value))
    }
  })

  return params.toString()
}

// Função para enviar dados via POST (método principal)
async function submitViaPOST(url: string, formattedData: Record<string, unknown>) {
  console.log('📤 Tentando envio via POST...')

  const body = JSON.stringify(formattedData)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': body.length.toString(),
    },
    body: body,
    mode: 'cors',
    redirect: 'follow',
  })

  console.log('📡 Status da resposta POST:', response.status)
  console.log('📡 Headers da resposta POST:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Erro HTTP POST:', response.status, errorText)
    throw new Error(`POST falhou: ${response.status} - ${errorText}`)
  }

  const responseText = await response.text()
  console.log('📥 Resposta bruta POST:', responseText)

  try {
    const result = JSON.parse(responseText)
    console.log('✅ Resposta POST parseada:', result)
    return result
  } catch (parseError) {
    console.error('❌ Erro ao parsear resposta POST:', parseError)
    console.log('📄 Conteúdo da resposta POST que falhou:', responseText)
    throw new Error(`Resposta POST inválida: ${responseText}`)
  }
}

// Função para enviar dados via GET (fallback)
async function submitViaGET(url: string, formattedData: Record<string, unknown>) {
  console.log('📤 Tentando envio via GET (fallback)...')

  const queryString = formatDataForGET(formattedData)
  const fullUrl = `${url}?${queryString}`

  console.log('🔗 URL GET completa:', fullUrl)

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  })

  console.log('📡 Status da resposta GET:', response.status)
  console.log('📡 Headers da resposta GET:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Erro HTTP GET:', response.status, errorText)
    throw new Error(`GET falhou: ${response.status} - ${errorText}`)
  }

  const responseText = await response.text()
  console.log('📥 Resposta bruta GET:', responseText)

  try {
    const result = JSON.parse(responseText)
    console.log('✅ Resposta GET parseada:', result)
    return result
  } catch (parseError) {
    console.error('❌ Erro ao parsear resposta GET:', parseError)
    console.log('📄 Conteúdo da resposta GET que falhou:', responseText)
    throw new Error(`Resposta GET inválida: ${responseText}`)
  }
}

// Função principal para enviar dados via Google Sheets Web App
export async function submitToGoogleSheets(
  formData: FormData,
  webAppUrl?: string
): Promise<{ success: boolean; error?: string; data?: any; method?: string }> {
  console.log('📤 Iniciando envio para Google Sheets...')
  console.log('📝 Dados originais do formulário:', formData)

  try {
    // Usar a variável NEXT_PUBLIC para funcionar no client-side
    const url = webAppUrl || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL

    if (!url) {
      const error = "URL do Google Sheets Web App não configurada"
      console.error('❌', error)
      console.error('🔍 Variáveis disponíveis:')
      console.error('- NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL:', process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL)
      console.error('- webAppUrl parameter:', webAppUrl)
      throw new Error(error)
    }

    console.log('🔗 URL do Google Apps Script:', url)

    const formattedData = formatFormDataForSheets(formData)
    console.log('📋 Payload sendo enviado:', JSON.stringify(formattedData, null, 2))

    let result
    let method = 'unknown'

    // Primeira tentativa: POST
    try {
      result = await submitViaPOST(url, formattedData)
      method = 'POST'
      console.log('✅ Sucesso via POST!')
    } catch (postError) {
      console.warn('⚠️ POST falhou, tentando GET como fallback...')
      console.warn('📍 Erro POST:', postError)

      // Segunda tentativa: GET (fallback)
      try {
        result = await submitViaGET(url, formattedData)
        method = 'GET'
        console.log('✅ Sucesso via GET (fallback)!')
      } catch (getError) {
        console.error('❌ Ambos POST e GET falharam')
        console.error('📍 Erro POST:', postError)
        console.error('📍 Erro GET:', getError)
        throw new Error(`Falha em ambos os métodos. POST: ${postError instanceof Error ? postError.message : 'Erro desconhecido'}. GET: ${getError instanceof Error ? getError.message : 'Erro desconhecido'}`)
      }
    }

    if (result && result.success) {
      console.log(`🎉 Dados enviados com sucesso via ${method}!`)

      // Track conversion success
      if (typeof window !== 'undefined' && (window as any).trackFormSubmission) {
        (window as any).trackFormSubmission()
      }

      return {
        success: true,
        data: result.data,
        method: method
      }
    } else {
      const errorMsg = result?.message || result?.error || 'Erro desconhecido do servidor'
      console.error('❌ Erro retornado pelo servidor:', errorMsg)
      throw new Error(errorMsg)
    }
  } catch (error) {
    console.error("💥 Erro ao enviar para Google Sheets:", error)

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error('📍 Stack trace:', error.stack)
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro na comunicação com o servidor"
    }
  }
}

// Função para testar a conexão com Google Sheets
export async function testGoogleSheetsConnection(): Promise<{ success: boolean; error?: string; method?: string }> {
  console.log('🔧 Testando conexão com Google Sheets...')

  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL

  if (!url) {
    return {
      success: false,
      error: "URL do Google Sheets Web App não configurada"
    }
  }

  try {
    // Primeiro, teste simples via GET
    console.log('🔍 Testando conexão básica...')
    const testUrl = `${url}?test=true`
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      redirect: 'follow',
    })

    console.log('📡 Status do teste de conexão:', response.status)

    if (!response.ok) {
      throw new Error(`Teste de conexão falhou: ${response.status}`)
    }

    const responseText = await response.text()
    console.log('📥 Resposta do teste:', responseText)

    try {
      const result = JSON.parse(responseText)
      if (result.success) {
        console.log('✅ Conexão com Google Apps Script funcionando!')
        return { success: true, method: 'GET' }
      } else {
        throw new Error(result.message || 'Teste retornou success: false')
      }
    } catch (parseError) {
      console.error('❌ Erro ao parsear resposta do teste:', parseError)
      throw new Error(`Resposta inválida do teste: ${responseText}`)
    }
  } catch (error) {
    console.error('❌ Erro no teste de conexão:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro no teste de conexão"
    }
  }
}

// Função para testar com dados reais
export async function testWithRealData(): Promise<{ success: boolean; error?: string; method?: string }> {
  console.log('🧪 Testando com dados reais...')

  const testData: FormData = {
    fullName: "Teste Conexão Real",
    email: "teste.real@exemplo.com",
    social: "@teste_real",
    cnpj: "nao",
    sector: "Teste Real",
    importExperience: "nao",
    whyImport: "Teste de conexão com dados reais",
    phrase: "executo",
    participation: "sim",
    whySelected: "Teste com dados completos",
    secure: "sim",
    investment: "avaliar",
    terms: true
  }

  try {
    const result = await submitToGoogleSheets(testData)
    console.log('✅ Teste com dados reais concluído:', result)
    return {
      success: result.success,
      error: result.error,
      method: result.method
    }
  } catch (error) {
    console.error('❌ Erro no teste com dados reais:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro no teste com dados reais"
    }
  }
}

// Função para verificar se as variáveis de ambiente estão configuradas
export function checkEnvironmentVariables(): { configured: boolean; url?: string; errors: string[] } {
  const errors: string[] = []
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL

  if (!url) {
    errors.push("NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL não está configurada")
  } else if (!url.includes('script.google.com')) {
    errors.push("URL não parece ser um Google Apps Script válido")
  } else if (!url.includes('/exec')) {
    errors.push("URL deve terminar com '/exec' para funcionar como Web App")
  }

  return {
    configured: errors.length === 0,
    url,
    errors
  }
}

// Função para validar configuração do Google Sheets (legacy)
export function validateGoogleSheetsConfig(config: Partial<GoogleSheetsConfig>): boolean {
  return !!(config.spreadsheetId && config.apiKey)
}

// Hook para configuração de ambiente (legacy)
export function getGoogleSheetsConfig(): GoogleSheetsConfig | null {
  // TODO: Configurar variáveis de ambiente
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
  const sheetName = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_NAME || "Inscrições"

  if (!spreadsheetId || !apiKey) {
    console.warn("Google Sheets não configurado. Defina as variáveis de ambiente.")
    return null
  }

  return {
    spreadsheetId,
    apiKey,
    sheetName
  }
}