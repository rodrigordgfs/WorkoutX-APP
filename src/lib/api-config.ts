// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  endpoints: {
    muscleGroups: '/muscle-group',
  },
}

// Helper para construir URLs completas
export const getApiUrl = (endpoint: string) => {
  return `${apiConfig.baseUrl}${endpoint}`
}
