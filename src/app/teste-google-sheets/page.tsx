"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2, Play, Eye, EyeOff } from "lucide-react"
import {
  checkEnvironmentVariables,
  testGoogleSheetsConnection,
  testWithRealData,
  submitToGoogleSheets
} from "@/lib/services/google-sheets"

interface TestResult {
  success: boolean
  error?: string
  method?: string
  data?: any
}

export default function TesteGoogleSheetsPage() {
  const [envCheck, setEnvCheck] = useState<ReturnType<typeof checkEnvironmentVariables> | null>(null)
  const [connectionTest, setConnectionTest] = useState<TestResult | null>(null)
  const [realDataTest, setRealDataTest] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [showUrl, setShowUrl] = useState(false)

  const runEnvironmentCheck = () => {
    console.log('🔍 Verificando variáveis de ambiente...')
    const result = checkEnvironmentVariables()
    setEnvCheck(result)
    console.log('📋 Resultado da verificação:', result)
  }

  const runConnectionTest = async () => {
    setLoading(prev => ({ ...prev, connection: true }))
    console.log('🧪 Iniciando teste de conexão...')

    try {
      const result = await testGoogleSheetsConnection()
      setConnectionTest(result)
      console.log('📋 Resultado do teste de conexão:', result)
    } catch (error) {
      console.error('❌ Erro no teste de conexão:', error)
      setConnectionTest({
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(prev => ({ ...prev, connection: false }))
    }
  }

  const runRealDataTest = async () => {
    setLoading(prev => ({ ...prev, realData: true }))
    console.log('🧪 Iniciando teste com dados reais...')

    try {
      const result = await testWithRealData()
      setRealDataTest(result)
      console.log('📋 Resultado do teste com dados reais:', result)
    } catch (error) {
      console.error('❌ Erro no teste com dados reais:', error)
      setRealDataTest({
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(prev => ({ ...prev, realData: false }))
    }
  }

  const runAllTests = async () => {
    console.log('🚀 Iniciando todos os testes...')
    runEnvironmentCheck()
    await runConnectionTest()
    await runRealDataTest()
  }

  const StatusIcon: React.FC<{ success?: boolean; loading?: boolean }> = ({ success, loading }) => {
    if (loading) return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
    if (success === true) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (success === false) return <XCircle className="w-5 h-5 text-red-500" />
    return <AlertCircle className="w-5 h-5 text-yellow-500" />
  }

  const getStatusColor = (success?: boolean) => {
    if (success === true) return "bg-green-100 text-green-800 border-green-300"
    if (success === false) return "bg-red-100 text-red-800 border-red-300"
    return "bg-yellow-100 text-yellow-800 border-yellow-300"
  }

  React.useEffect(() => {
    runEnvironmentCheck()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Teste Google Sheets Integration
          </h1>
          <p className="text-gray-600">
            Ferramenta para testar e debuggar a integração com Google Apps Script
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-8">
          <Button
            onClick={runAllTests}
            disabled={Object.values(loading).some(Boolean)}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Executar Todos os Testes
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('/inscricao', '_blank')}
          >
            Abrir Formulário Real
          </Button>
        </div>

        <div className="space-y-6">
          {/* Environment Variables Check */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <StatusIcon success={envCheck?.configured} />
                  Verificação de Variáveis de Ambiente
                </CardTitle>
                <CardDescription>
                  Verifica se as variáveis necessárias estão configuradas
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={runEnvironmentCheck}
              >
                Verificar
              </Button>
            </CardHeader>
            <CardContent>
              {envCheck && (
                <div className="space-y-3">
                  <Badge className={getStatusColor(envCheck.configured)}>
                    {envCheck.configured ? 'Configurado' : 'Não Configurado'}
                  </Badge>

                  {envCheck.url && (
                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">URL configurada:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowUrl(!showUrl)}
                        >
                          {showUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <code className="text-xs bg-white p-2 rounded mt-2 block break-all">
                        {showUrl ? envCheck.url : '***' + envCheck.url.slice(-20)}
                      </code>
                    </div>
                  )}

                  {envCheck.errors.length > 0 && (
                    <div className="bg-red-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-red-800 mb-2">Erros encontrados:</h4>
                      <ul className="list-disc list-inside text-sm text-red-700">
                        {envCheck.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Connection Test */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <StatusIcon
                    success={connectionTest?.success}
                    loading={loading.connection}
                  />
                  Teste de Conexão Básica
                </CardTitle>
                <CardDescription>
                  Testa se o Google Apps Script responde corretamente
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={runConnectionTest}
                disabled={loading.connection || !envCheck?.configured}
              >
                {loading.connection ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Testar'}
              </Button>
            </CardHeader>
            <CardContent>
              {connectionTest && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(connectionTest.success)}>
                      {connectionTest.success ? 'Sucesso' : 'Falhou'}
                    </Badge>
                    {connectionTest.method && (
                      <Badge variant="outline">
                        Método: {connectionTest.method}
                      </Badge>
                    )}
                  </div>

                  {connectionTest.error && (
                    <div className="bg-red-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-red-800 mb-1">Erro:</h4>
                      <p className="text-sm text-red-700">{connectionTest.error}</p>
                    </div>
                  )}

                  {connectionTest.success && (
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-700">
                        ✅ Google Apps Script está respondendo corretamente!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Real Data Test */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <StatusIcon
                    success={realDataTest?.success}
                    loading={loading.realData}
                  />
                  Teste com Dados Reais
                </CardTitle>
                <CardDescription>
                  Envia dados de teste para a planilha do Google Sheets
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={runRealDataTest}
                disabled={loading.realData || !envCheck?.configured}
              >
                {loading.realData ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Testar'}
              </Button>
            </CardHeader>
            <CardContent>
              {realDataTest && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(realDataTest.success)}>
                      {realDataTest.success ? 'Sucesso' : 'Falhou'}
                    </Badge>
                    {realDataTest.method && (
                      <Badge variant="outline">
                        Método: {realDataTest.method}
                      </Badge>
                    )}
                  </div>

                  {realDataTest.error && (
                    <div className="bg-red-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-red-800 mb-1">Erro:</h4>
                      <p className="text-sm text-red-700">{realDataTest.error}</p>
                    </div>
                  )}

                  {realDataTest.success && (
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-700">
                        ✅ Dados enviados com sucesso! Verifique sua planilha no Google Sheets.
                      </p>
                      {realDataTest.data && (
                        <details className="mt-2">
                          <summary className="text-xs text-green-600 cursor-pointer">
                            Ver detalhes da resposta
                          </summary>
                          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                            {JSON.stringify(realDataTest.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instruções de Configuração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2">Se os testes estão falhando:</h4>
                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                  <li>Verifique se criou o Google Apps Script conforme o guia</li>
                  <li>Certifique-se que publicou como Web App com acesso "Qualquer pessoa"</li>
                  <li>Configure a variável NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL no arquivo .env.local</li>
                  <li>Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="font-medium text-yellow-900 mb-2">Exemplo de .env.local:</h4>
                <pre className="text-xs bg-white p-2 rounded">
                  NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Links Úteis:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>
                    <a
                      href="https://script.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Apps Script
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sheets.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Sheets
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => window.open('/google-apps-script/CONFIGURACAO_PASSO_A_PASSO.md')}
                      className="text-blue-600 hover:underline"
                    >
                      Guia de Configuração Detalhado
                    </button>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Console Log Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Avançado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700 mb-2">
                  Para debug detalhado, abra o Console do Navegador (F12) e execute os testes.
                  Todos os logs detalhados aparecem no console.
                </p>
                <p className="text-xs text-gray-600">
                  Você também pode verificar o console do Google Apps Script para ver logs do servidor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}