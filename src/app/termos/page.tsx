"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function TermosPage() {
  const router = useRouter()

  const handleBack = () => {
    // Verifica se há histórico para voltar, senão vai para a inscrição
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/inscricao')
    }
  }

  return (
    <div className="antialiased selection:bg-white selection:text-black text-white bg-black min-h-screen">
      <div className="absolute w-full h-[816px] left-0 top-0 -z-10"></div>

      {/* Header com botão de voltar */}
      <div className="relative z-10">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para inscrição
            </button>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg">
            <article className="prose prose-invert prose-lg max-w-none">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-6">
                Termos e Condições de Uso
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                <strong>Mentoria "Do Zero ao Primeiro Contêiner"</strong>
              </p>

              <p className="text-sm text-gray-400 mb-8">
                <strong>Última atualização:</strong> 16 de setembro de 2025
              </p>

              <div className="text-gray-300 leading-relaxed space-y-6">
                <p>
                  Bem-vindo à mentoria 'Do Zero ao Primeiro Contêiner', idealizada por Alfredo, fundador da ABN8 Trading.
                  Estes Termos e Condições de Uso ('Termos') regem o seu acesso e participação na mentoria, estabelecendo
                  um contrato legal entre você ('Contratante', 'Aluno' ou 'Você') e a ABN8 Trading ('Contratada', 'Nós').
                </p>

                <p>
                  Ao se inscrever e participar da mentoria, você declara que leu, compreendeu e concorda integralmente
                  com estes Termos. Caso não concorde com qualquer disposição aqui presente, você não deverá participar da mentoria.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Objeto do Contrato</h2>

                <p>
                  <strong>1.1.</strong> O presente contrato tem por objeto a prestação de serviços educacionais na modalidade
                  de mentoria online, denominada 'Do Zero ao Primeiro Contêiner', com foco no desenvolvimento de habilidades
                  e conhecimentos práticos em comércio exterior e importação.
                </p>

                <p>
                  <strong>1.2.</strong> A mentoria consiste em um programa de 6 (seis) semanas, com encontros ao vivo,
                  acesso a materiais de apoio e participação em uma comunidade exclusiva, conforme detalhado na página
                  de apresentação do programa.
                </p>

                <p>
                  <strong>1.3. Natureza do Serviço:</strong> Você declara ter ciência de que a mentoria é um curso livre,
                  de caráter informativo e educacional, não conferindo grau acadêmico, certificação profissional ou qualquer
                  tipo de habilitação formal. O programa não possui vínculo ou reconhecimento pelo Ministério da Educação (MEC)
                  ou qualquer outro órgão regulador.
                </p>

                <p>
                  <strong>1.4. Resultados:</strong> A Contratada se compromete a fornecer as ferramentas, o conhecimento
                  e o acompanhamento descritos no programa. No entanto, os resultados individuais, como o sucesso na importação,
                  validação de produtos ou lucratividade, dependem exclusivamente do esforço, dedicação e aplicação prática
                  do Contratante. Nenhuma garantia de resultado financeiro ou de sucesso comercial é oferecida.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Acesso, Pagamento e Inscrição</h2>

                <p>
                  <strong>2.1. Processo de Aplicação:</strong> O acesso à mentoria é limitado e condicionado a um processo
                  de aplicação, conforme descrito na página de inscrição. A aprovação da sua aplicação é um pré-requisito
                  para a efetivação da inscrição.
                </p>

                <p>
                  <strong>2.2. Pagamento:</strong> O valor do investimento e as formas de pagamento são informados no formulário
                  de aplicação. A sua vaga na mentoria somente será garantida após a confirmação do pagamento integral ou da
                  primeira parcela, conforme a modalidade escolhida.
                </p>

                <p>
                  <strong>2.3. Acesso aos Materiais:</strong> O acesso aos encontros ao vivo, gravações, materiais de apoio
                  e comunidade exclusiva será liberado após a confirmação do pagamento e será mantido pelo período de duração
                  da mentoria, acrescido de um período adicional de acesso às gravações, conforme especificado na oferta.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Cancelamento e Reembolso</h2>

                <p>
                  <strong>3.1. Direito de Arrependimento:</strong> Conforme o Art. 49 do Código de Defesa do Consumidor
                  (Lei nº 8.078/90), você poderá exercer o seu direito de arrependimento e solicitar o cancelamento da sua
                  inscrição no prazo de <strong>7 (sete) dias corridos</strong>, a contar da data da confirmação do pagamento.
                  Neste caso, o reembolso do valor pago será integral e incondicional.
                </p>

                <p>
                  <strong>3.2. Solicitação de Cancelamento:</strong> A solicitação de cancelamento e reembolso dentro do prazo
                  de 7 dias deve ser feita por escrito, através do e-mail de suporte informado na plataforma.
                </p>

                <p>
                  <strong>3.3. Cancelamento Após 7 Dias:</strong> Após o prazo de 7 dias, não haverá reembolso de qualquer
                  valor pago, considerando que o acesso a todo o conteúdo e à estrutura da mentoria já terá sido disponibilizado.
                  O não comparecimento aos encontros ao vivo ou a não utilização dos materiais não dará direito a reembolso.
                </p>

                <p>
                  <strong>3.4. Rescisão por Descumprimento:</strong> A Contratada se reserva o direito de rescindir o presente
                  contrato e interromper o acesso do Aluno à mentoria, sem qualquer direito a reembolso, caso seja identificado
                  o descumprimento de qualquer cláusula destes Termos.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Propriedade Intelectual</h2>

                <p>
                  <strong>4.1.</strong> Todos os materiais fornecidos durante a mentoria são de propriedade exclusiva da
                  Contratada e protegidos pela legislação de direitos autorais (Lei nº 9.610/98).
                </p>

                <p>
                  <strong>4.2.</strong> É estritamente proibido o compartilhamento, cópia, reprodução, distribuição, venda
                  ou qualquer outra forma de utilização não autorizada do conteúdo da mentoria. O seu acesso ao material é
                  pessoal, individual e intransferível.
                </p>

                <p>
                  <strong>4.3.</strong> A violação dos direitos de propriedade intelectual sujeitará o infrator às sanções
                  civis e criminais cabíveis.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Obrigações das Partes</h2>

                <p>
                  <strong>5.1. Obrigações da Contratada:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prestar o serviço de mentoria conforme o cronograma e conteúdo programático divulgado.</li>
                  <li>Disponibilizar os materiais de apoio e o acesso à comunidade exclusiva.</li>
                  <li>Conduzir os encontros ao vivo nas datas e horários previamente agendados.</li>
                  <li>Manter a confidencialidade de todas as informações compartilhadas pelos Alunos.</li>
                </ul>

                <p>
                  <strong>5.2. Obrigações do Contratante:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Realizar o pagamento do valor do investimento nas condições acordadas.</li>
                  <li>Possuir equipamentos e conexão necessários para acompanhar a mentoria online.</li>
                  <li>Manter o sigilo dos dados de acesso à plataforma.</li>
                  <li>Respeitar os demais participantes e manter conduta ética.</li>
                  <li>Utilizar os conhecimentos adquiridos de forma lícita e ética.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Proteção de Dados Pessoais (LGPD)</h2>

                <p>
                  <strong>6.1.</strong> Ao se inscrever na mentoria, você concorda com a coleta, armazenamento e tratamento
                  dos seus dados pessoais pela Contratada, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/18).
                </p>

                <p>
                  <strong>6.2.</strong> Os dados coletados serão utilizados exclusivamente para efetivar a sua inscrição,
                  gerenciar o seu acesso à mentoria, enviar comunicações importantes e permitir sua participação na comunidade exclusiva.
                </p>

                <p>
                  <strong>6.3.</strong> A Contratada adota medidas técnicas e organizacionais para proteger os seus dados pessoais
                  contra acesso não autorizado, perda, alteração ou divulgação.
                </p>

                <p>
                  <strong>6.4.</strong> Você tem o direito de solicitar, a qualquer momento, o acesso, correção, anonimização
                  ou eliminação dos seus dados pessoais, bem como revogar o seu consentimento, nos termos da LGPD.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Limitação de Responsabilidade</h2>

                <p>
                  <strong>7.1.</strong> A Contratada não se responsabiliza por interrupções causadas por falhas na sua conexão
                  de internet, problemas no seu equipamento, ou por eventos de caso fortuito ou força maior.
                </p>

                <p>
                  <strong>7.2.</strong> A mentoria oferece conhecimento e orientação, mas a implementação das estratégias é de
                  responsabilidade exclusiva do Contratante. A Contratada não se responsabiliza por perdas ou prejuízos decorrentes
                  das decisões tomadas por você.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Disposições Gerais</h2>

                <p>
                  <strong>8.1. Alterações nos Termos:</strong> Estes Termos poderão ser atualizados a qualquer momento.
                  A versão mais recente estará sempre disponível na plataforma.
                </p>

                <p>
                  <strong>8.2. Comunicação:</strong> Toda a comunicação oficial entre as partes deverá ser realizada por meio
                  dos canais de e-mail informados na plataforma.
                </p>

                <p className="border-t border-white/10 pt-6 mt-8">
                  <strong>
                    Ao confirmar sua inscrição, você declara ter lido, compreendido e concordado com todos os termos
                    e condições aqui estabelecidos.
                  </strong>
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}