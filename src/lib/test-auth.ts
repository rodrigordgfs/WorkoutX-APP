// Arquivo de teste para verificar se a autenticação está funcionando
import { authenticatedRequest } from './api-config'

export async function testAuth() {
  try {
    console.log('🧪 Testando autenticação...')
    
    // Teste com token
    const result = await authenticatedRequest('/test', {
      method: 'GET',
      token: 'test-token-123'
    })
    
    console.log('✅ Teste de autenticação concluído')
    return result
  } catch (error) {
    console.error('❌ Erro no teste de autenticação:', error)
    throw error
  }
}
