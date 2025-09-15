export interface FormData {
  // Passo 1 - Dados Pessoais
  fullName: string
  email: string
  social: string

  // Passo 2 - Perfil do Negócio
  cnpj: "sim" | "nao"
  sector: string
  importExperience: "sim" | "nao"
  whyImport: string

  // Passo 3 - Nível de Comprometimento
  phrase: "pronto" | "orientacao" | "executo"
  participation: "sim" | "depende" | "restricoes"

  // Passo 4 - Seleção e Confirmação
  whySelected: string
  secure: "sim" | "interesse" | "incerto"

  // Passo Final - Investimento
  investment: "sim" | "avaliar" | "nao"

  // Termos
  terms: boolean
}

export type FormStep = 1 | 2 | 3 | 4 | 5

export interface FormState {
  currentStep: FormStep
  data: Partial<FormData>
  isSubmitting: boolean
  errors: Record<string, string>
}