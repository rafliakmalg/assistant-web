import { createBrowserRouter } from 'react-router'
import { ChatLayoutTemplate } from '@/components/templates/ChatLayoutTemplate'
import { LoginPage } from '@/features/auth/LoginPage'
import { RequireAuth } from '@/features/auth/RequireAuth'
import { ChatPage } from '@/features/chat/ChatPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <ChatLayoutTemplate />,
        children: [
          { index: true, element: <ChatPage /> },
          { path: 'c/:id', element: <ChatPage /> },
        ],
      },
    ],
  },
])
