import { z } from "zod"

export const formSchema = z.object({
  // Passo 1 - Dados Pessoais
  fullName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .email("Digite um e-mail válido")
    .min(1, "E-mail é obrigatório"),

  social: z
    .string()
    .min(1, "Perfil social é obrigatório")
    .max(200, "URL deve ter no máximo 200 caracteres"),

  // Passo 2 - Perfil do Negócio
  cnpj: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),

  sector: z
    .string()
    .min(2, "Setor deve ter pelo menos 2 caracteres")
    .max(100, "Setor deve ter no máximo 100 caracteres"),

  importExperience: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),

  whyImport: z
    .string()
    .min(10, "Resposta deve ter pelo menos 10 caracteres")
    .max(1000, "Resposta deve ter no máximo 1000 caracteres"),

  // Passo 3 - Nível de Comprometimento
  phrase: z.enum(["pronto", "orientacao", "executo"], {
    message: "Selecione uma opção",
  }),

  participation: z.enum(["sim", "depende", "restricoes"], {
    message: "Selecione uma opção",
  }),

  // Passo 4 - Seleção e Confirmação
  whySelected: z
    .string()
    .min(10, "Resposta deve ter pelo menos 10 caracteres")
    .max(1000, "Resposta deve ter no máximo 1000 caracteres"),

  secure: z.enum(["sim", "interesse", "incerto"], {
    message: "Selecione uma opção",
  }),

  // Passo Final - Investimento
  investment: z.enum(["sim", "avaliar", "nao"], {
    message: "Selecione uma opção",
  }),

  // Termos
  terms: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos",
  }),
})

// Schemas para validação por etapa
export const step1Schema = formSchema.pick({
  fullName: true,
  email: true,
  social: true,
})

export const step2Schema = formSchema.pick({
  cnpj: true,
  sector: true,
  importExperience: true,
  whyImport: true,
})

export const step3Schema = formSchema.pick({
  phrase: true,
  participation: true,
})

export const step4Schema = formSchema.pick({
  whySelected: true,
  secure: true,
})

export const step5Schema = formSchema.pick({
  investment: true,
  terms: true,
})

export type FormData = z.infer<typeof formSchema>