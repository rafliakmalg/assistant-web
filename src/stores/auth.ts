import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  id: number
  name: string
  role: string | null
}

type AuthState = {
  login: (token: string, user: AuthUser) => void
  logout: () => void
  token: string | null
  user: AuthUser | null
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({
        token: null,
        user: null,
      }),
    }),
    { name: 'auth' },
  ),
)
