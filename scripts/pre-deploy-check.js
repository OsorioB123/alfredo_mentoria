#!/usr/bin/env node

/**
 * Script de validação pré-deploy para Landing Page Alfredo ABN8
 * Verifica configurações críticas antes do deploy no Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Iniciando verificação pré-deploy...\n');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Status do check
let checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
  checks.passed++;
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
  checks.failed++;
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
  checks.warnings++;
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

// 1. Verificar arquivos essenciais
function checkEssentialFiles() {
  logInfo('Verificando arquivos essenciais...');

  const essentialFiles = [
    'package.json',
    'next.config.ts',
    'vercel.json',
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/inscricao/page.tsx',
    'src/lib/constants.ts',
    'src/lib/services/google-sheets.ts'
  ];

  essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logSuccess(`Arquivo ${file} encontrado`);
    } else {
      logError(`Arquivo ${file} não encontrado`);
    }
  });
}

// 2. Verificar package.json
function checkPackageJson() {
  logInfo('Verificando package.json...');

  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    // Verificar scripts essenciais
    const requiredScripts = ['dev', 'build', 'start'];
    requiredScripts.forEach(script => {
      if (pkg.scripts && pkg.scripts[script]) {
        logSuccess(`Script "${script}" configurado`);
      } else {
        logError(`Script "${script}" não encontrado`);
      }
    });

    // Verificar dependências críticas
    const criticalDeps = ['next', 'react', 'react-dom'];
    criticalDeps.forEach(dep => {
      if (pkg.dependencies && pkg.dependencies[dep]) {
        logSuccess(`Dependência "${dep}" encontrada`);
      } else {
        logError(`Dependência crítica "${dep}" não encontrada`);
      }
    });

    // Verificar versão do Next.js
    if (pkg.dependencies?.next) {
      const nextVersion = pkg.dependencies.next.replace(/[^0-9.]/g, '');
      if (nextVersion.startsWith('15')) {
        logSuccess(`Next.js versão ${nextVersion} (compatível)`);
      } else {
        logWarning(`Next.js versão ${nextVersion} (recomendado 15+)`);
      }
    }

  } catch (error) {
    logError(`Erro ao ler package.json: ${error.message}`);
  }
}

// 3. Verificar configuração do Next.js
function checkNextConfig() {
  logInfo('Verificando next.config.ts...');

  try {
    const configContent = fs.readFileSync('next.config.ts', 'utf8');

    // Verificar otimizações
    const optimizations = [
      'experimental',
      'images',
      'headers',
      'compress: true'
    ];

    optimizations.forEach(opt => {
      if (configContent.includes(opt)) {
        logSuccess(`Otimização "${opt}" configurada`);
      } else {
        logWarning(`Otimização "${opt}" não encontrada`);
      }
    });

    // Verificar domínios de imagem
    if (configContent.includes('i.ibb.co')) {
      logSuccess('Domínios de imagem configurados');
    } else {
      logWarning('Domínios de imagem podem não estar configurados');
    }

  } catch (error) {
    logError(`Erro ao ler next.config.ts: ${error.message}`);
  }
}

// 4. Verificar configuração do Vercel
function checkVercelConfig() {
  logInfo('Verificando vercel.json...');

  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

    // Verificar configurações críticas
    if (vercelConfig.framework === 'nextjs') {
      logSuccess('Framework Next.js configurado');
    } else {
      logError('Framework Next.js não configurado');
    }

    if (vercelConfig.regions && vercelConfig.regions.includes('gru1')) {
      logSuccess('Região Brasil (gru1) configurada');
    } else {
      logWarning('Região Brasil não configurada (recomendado para audiência BR)');
    }

    if (vercelConfig.headers && vercelConfig.headers.length > 0) {
      logSuccess('Headers de performance configurados');
    } else {
      logWarning('Headers de performance não configurados');
    }

  } catch (error) {
    logError(`Erro ao ler vercel.json: ${error.message}`);
  }
}

// 5. Verificar variáveis de ambiente
function checkEnvironmentVars() {
  logInfo('Verificando variáveis de ambiente...');

  // Verificar arquivo .env.example
  if (fs.existsSync('.env.example')) {
    logSuccess('Arquivo .env.example encontrado');

    const envExample = fs.readFileSync('.env.example', 'utf8');
    const requiredVars = [
      'GOOGLE_SHEETS_WEB_APP_URL',
      'GOOGLE_SHEETS_ENABLED',
      'NEXT_PUBLIC_DEV_MODE'
    ];

    requiredVars.forEach(envVar => {
      if (envExample.includes(envVar)) {
        logSuccess(`Variável ${envVar} documentada`);
      } else {
        logWarning(`Variável ${envVar} não documentada`);
      }
    });
  } else {
    logWarning('Arquivo .env.example não encontrado');
  }

  // Verificar se há .env local (não deve estar no repo)
  if (fs.existsSync('.env') || fs.existsSync('.env.local')) {
    logWarning('Arquivo .env local encontrado - verifique se não está no Git');
  }
}

// 6. Verificar estrutura de páginas
function checkPageStructure() {
  logInfo('Verificando estrutura de páginas...');

  const pages = [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/inscricao/page.tsx',
    'src/app/inscricao/obrigado/page.tsx'
  ];

  pages.forEach(page => {
    if (fs.existsSync(page)) {
      logSuccess(`Página ${page} encontrada`);
    } else {
      logError(`Página ${page} não encontrada`);
    }
  });
}

// 7. Verificar imports críticos
function checkCriticalImports() {
  logInfo('Verificando imports críticos...');

  try {
    const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');

    if (layoutContent.includes('import { Inter }')) {
      logSuccess('Font Inter importada');
    } else {
      logWarning('Font Inter pode não estar importada');
    }

    if (layoutContent.includes('SITE_CONFIG')) {
      logSuccess('Configurações do site importadas');
    } else {
      logError('Configurações do site não importadas');
    }

  } catch (error) {
    logWarning(`Não foi possível verificar layout.tsx: ${error.message}`);
  }
}

// 8. Verificar tamanho dos arquivos
function checkFilesSizes() {
  logInfo('Verificando tamanho dos arquivos...');

  try {
    const getFileSize = (filePath) => {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return (stats.size / 1024).toFixed(2); // KB
      }
      return null;
    };

    const packageSize = getFileSize('package.json');
    if (packageSize && packageSize < 5) {
      logSuccess(`package.json: ${packageSize}KB (otimizado)`);
    } else if (packageSize) {
      logWarning(`package.json: ${packageSize}KB (pode estar grande)`);
    }

    // Verificar se há node_modules (não deve estar no repo)
    if (fs.existsSync('node_modules')) {
      logWarning('Pasta node_modules encontrada - verifique .gitignore');
    } else {
      logSuccess('Pasta node_modules não commitada');
    }

  } catch (error) {
    logWarning(`Erro ao verificar tamanhos: ${error.message}`);
  }
}

// 9. Verificar build local
function checkBuildRequirements() {
  logInfo('Verificando requisitos de build...');

  // Verificar TypeScript config
  if (fs.existsSync('tsconfig.json')) {
    logSuccess('TypeScript configurado');
  } else {
    logError('tsconfig.json não encontrado');
  }

  // Verificar TailwindCSS
  if (fs.existsSync('postcss.config.mjs')) {
    logSuccess('PostCSS configurado');
  } else {
    logWarning('PostCSS config não encontrado');
  }

  // Verificar pasta .next (build anterior)
  if (fs.existsSync('.next')) {
    logInfo('Build anterior encontrado (.next) - será recriado no deploy');
  }
}

// 10. Executar todas as verificações
function runAllChecks() {
  console.log('🚀 Landing Page Alfredo ABN8 - Verificação Pré-Deploy\n');

  checkEssentialFiles();
  console.log('');

  checkPackageJson();
  console.log('');

  checkNextConfig();
  console.log('');

  checkVercelConfig();
  console.log('');

  checkEnvironmentVars();
  console.log('');

  checkPageStructure();
  console.log('');

  checkCriticalImports();
  console.log('');

  checkFilesSizes();
  console.log('');

  checkBuildRequirements();
  console.log('');

  // Resumo final
  console.log('📊 RESUMO DA VERIFICAÇÃO');
  console.log('═'.repeat(50));
  console.log(`${colors.green}✅ Aprovado: ${checks.passed}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Avisos: ${checks.warnings}${colors.reset}`);
  console.log(`${colors.red}❌ Falhas: ${checks.failed}${colors.reset}`);
  console.log('');

  if (checks.failed > 0) {
    console.log(`${colors.red}🚨 ATENÇÃO: ${checks.failed} problema(s) crítico(s) encontrado(s)!${colors.reset}`);
    console.log(`${colors.red}   Corrija os erros antes do deploy.${colors.reset}`);
    process.exit(1);
  } else if (checks.warnings > 0) {
    console.log(`${colors.yellow}⚠️  ${checks.warnings} aviso(s) encontrado(s).${colors.reset}`);
    console.log(`${colors.yellow}   Recomendamos revisar antes do deploy.${colors.reset}`);
    console.log(`${colors.green}✅ PRONTO PARA DEPLOY (com avisos)${colors.reset}`);
  } else {
    console.log(`${colors.green}🎉 PERFEITO! Projeto 100% pronto para deploy!${colors.reset}`);
  }

  console.log('');
  console.log('📋 PRÓXIMOS PASSOS:');
  console.log('1. Configure as variáveis de ambiente no Vercel Dashboard');
  console.log('2. Faça push para o repositório GitHub');
  console.log('3. Conecte o repositório no Vercel');
  console.log('4. Configure domínio personalizado (opcional)');
  console.log('5. Monitore performance pós-deploy');
  console.log('');
  console.log('🔗 Vercel: https://vercel.com/dashboard');
  console.log('📖 Guia completo: VERCEL_DEPLOY_GUIDE.md');
}

// Executar verificação
runAllChecks();