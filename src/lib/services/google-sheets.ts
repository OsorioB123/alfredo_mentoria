import type { FormData } from "@/lib/validations/form"

// Interface para configuração da integração com Google Sheets
interface GoogleSheetsConfig {
  spreadsheetId: string
  apiKey: string
  sheetName?: string
}

// Função para formatear dados do formulário para Google Sheets
export function formatFormDataForSheets(data: FormData): Record<string, unknown> {
  return {
    // Dados pessoais
    "Nome Completo": data.fullName,
    "E-mail": data.email,
    "Perfil Social": data.social,

    // Perfil do negócio
    "Possui CNPJ": data.cnpj === "sim" ? "Sim" : "Não",
    "Setor": data.sector,
    "Experiência com Importação": data.importExperience === "sim" ? "Sim" : "Não",
    "Por que quer importar": data.whyImport,

    // Nível de comprometimento
    "Frase que representa": data.phrase === "pronto"
      ? "Quero algo pronto, sem ter trabalho"
      : data.phrase === "orientacao"
        ? "Gosto de aprender e executar com orientação"
        : "Se tiver clareza e acompanhamento, eu executo sem medo",

    "Disponibilidade para mentoria": data.participation === "sim"
      ? "Sim, 100%"
      : data.participation === "depende"
        ? "Depende dos horários"
        : "Tenho restrições",

    // Seleção e confirmação
    "Por que deve ser selecionado": data.whySelected,
    "Quer garantir vaga": data.secure === "sim"
      ? "Sim, estou pronto"
      : data.secure === "interesse"
        ? "Tenho interesse, mas preciso entender melhor"
        : "Ainda não tenho certeza",

    // Investimento
    "Preparado para investimento": data.investment === "sim"
      ? "Sim, pronto pra investir em mim"
      : data.investment === "avaliar"
        ? "Tenho interesse, mas preciso avaliar condições"
        : "Não posso neste momento",

    // Meta dados
    "Data de Submissão": new Date().toISOString(),
    "Timestamp": Date.now()
  }
}

// Função para enviar dados para Google Sheets (implementação futura)
export async function submitToGoogleSheets(
  formData: FormData,
  config: GoogleSheetsConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    // TODO: Implementar integração real com Google Sheets API
    // Por enquanto, vamos simular o envio
    console.log("Enviando para Google Sheets:", {
      config,
      data: formatFormDataForSheets(formData)
    })

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simular sucesso (90% das vezes)
    if (Math.random() > 0.1) {
      return { success: true }
    } else {
      throw new Error("Falha simulada na API")
    }
  } catch (error) {
    console.error("Erro ao enviar para Google Sheets:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    }
  }
}

// Função para validar configuração do Google Sheets
export function validateGoogleSheetsConfig(config: Partial<GoogleSheetsConfig>): boolean {
  return !!(config.spreadsheetId && config.apiKey)
}

// Hook para configuração de ambiente
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