import { QueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { useAuth } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'X-Site': import.meta.env.VITE_SITE,
  },
})

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      useAuth.getState().logout()
    }

    return Promise.reject(error)
  },
)

export function errorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  return error instanceof Error ? error.message : 'Terjadi kesalahan.'
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: { Accept: 'application/json' },
})
