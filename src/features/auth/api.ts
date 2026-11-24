import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/stores/auth'
import { authApi, queryClient } from '@/utils'

export type LoginInput = {
  password: string
  username: string
}

type LoginResponse = {
  data: {
    token: string
    user: {
      id: number
      name: string
      roles?: { label: string }[]
    }
  }
}

export async function logout() {
  const token = useAuth.getState().token

  try {
    await authApi.post('/auth/logout', null, { headers: { Authorization: `Bearer ${token}` } })
  } finally {
    useAuth.getState().logout()
    queryClient.clear()
  }
}

export function useLogin() {
  const login = useAuth((state) => state.login)

  return useMutation({
    mutationFn: async (values: LoginInput) => {
      const response = await authApi.post<LoginResponse>('/auth/login', values)

      return response.data.data
    },
    onSuccess: ({ token, user }) => {
      login(token, {
        id: user.id,
        name: user.name,
        role: user.roles?.map((role) => role.label).join(', ') || null,
      })
    },
  })
}
