"use client"

import React, { useState } from "react"
import { AnimatedInput, AnimatedTextarea, AnimatedRadioGroup, AnimatedCheckbox } from "./animated-form"

/**
 * DEMONSTRAÇÃO DAS CORREÇÕES IMPLEMENTADAS
 *
 * Este componente demonstra as correções feitas nos problemas críticos de UX:
 *
 * 1. ✅ RADIO BUTTONS CORRIGIDOS:
 *    - Agora são totalmente clicáveis e funcionais
 *    - Melhor integração entre input real e UI visual
 *    - Feedback visual aprimorado com shadow e animações
 *
 * 2. ✅ LABELS FLUTUANTES COM BACKGROUND:
 *    - Background sólido quando flutuam para cima
 *    - Legibilidade mantida em todos os estados
 *    - Transições suaves e naturais
 *
 * 3. ✅ MELHORIAS UX ADICIONAIS:
 *    - Focus states mais visíveis
 *    - Hover effects consistentes
 *    - Melhor acessibilidade com labels adequadas
 *    - Animações mais fluidas e responsivas
 */

export function FormFixesDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnpj: "",
    message: "",
    terms: false
  })

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 bg-gray-900 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Demonstração das Correções UX
        </h2>
        <p className="text-gray-400">
          Teste os componentes corrigidos abaixo
        </p>
      </div>

      {/* Input com label flutuante CORRIGIDA */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          ✅ Labels Flutuantes com Background
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          As labels agora têm background sólido quando flutuam, mantendo a legibilidade.
        </p>

        <AnimatedInput
          id="demo-name"
          label="Digite seu nome e veja a label flutuar"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />

        <AnimatedInput
          id="demo-email"
          label="Seu melhor e-mail"
          type="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      {/* Textarea com label corrigida */}
      <div className="space-y-2">
        <AnimatedTextarea
          id="demo-message"
          label="Deixe uma mensagem (teste a label flutuante)"
          rows={4}
          value={formData.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>

      {/* Radio buttons CORRIGIDOS */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          ✅ Radio Buttons Funcionais
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Os radio buttons agora são totalmente clicáveis com melhor feedback visual.
        </p>

        <AnimatedRadioGroup
          label="Você já possui CNPJ? (Teste clicando nas opções)"
          value={formData.cnpj}
          onValueChange={(value) => setFormData({ ...formData, cnpj: value })}
          options={[
            { value: "sim", label: "Sim, já tenho CNPJ", id: "cnpj-yes" },
            { value: "nao", label: "Não, ainda não tenho", id: "cnpj-no" },
            { value: "processo", label: "Estou no processo", id: "cnpj-process" }
          ]}
          required
        />
      </div>

      {/* Checkbox corrigido */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          ✅ Checkbox Aprimorado
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Feedback visual consistente com os outros componentes.
        </p>

        <AnimatedCheckbox
          id="demo-terms"
          checked={formData.terms}
          onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
          label={
            <span>
              Concordo com os termos e condições
              <span className="text-yellow-500"> (clique para testar)</span>
            </span>
          }
          required
        />
      </div>

      {/* Status atual dos valores */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-white font-semibold mb-2">Estado do Formulário:</h4>
        <pre className="text-sm text-gray-300 overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      {/* Resumo das correções */}
      <div className="mt-8 p-4 bg-green-900/20 border border-green-700 rounded-lg">
        <h4 className="text-green-400 font-semibold mb-3">✅ Problemas Corrigidos:</h4>
        <ul className="space-y-2 text-sm text-green-300">
          <li>• Radio buttons agora são totalmente funcionais e clicáveis</li>
          <li>• Labels flutuantes têm background sólido para melhor legibilidade</li>
          <li>• Melhor feedback visual com shadows e animações</li>
          <li>• Consistência entre todos os componentes de formulário</li>
          <li>• Acessibilidade aprimorada com labels adequadas</li>
          <li>• Estados de hover e focus mais claros</li>
        </ul>
      </div>
    </div>
  )
}

export default FormFixesDemo