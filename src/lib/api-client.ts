'use client'

import { getApiUrl } from './api-config'

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  token?: string | null
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    token
  } = options

  const url = getApiUrl(endpoint)
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  }

  // Adicionar token de autorização se disponível
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  }

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body)
  }

  console.log(`🌐 API Request: ${method} ${url}`)
  if (token) {
    console.log(`🔑 Token: ${token.substring(0, 20)}...`)
  }

  const response = await fetch(url, requestOptions)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(error.message || `Erro ${response.status}: ${response.statusText}`)
  }

  return response.json()
}
