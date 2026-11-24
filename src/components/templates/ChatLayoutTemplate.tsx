import { Button } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'
import { Outlet, useNavigate } from 'react-router'
import { ConversationListOrganism } from '@/components/organisms/ConversationListOrganism'
import { logout } from '@/features/auth/api'
import { useAuth } from '@/stores/auth'

export function ChatLayoutTemplate() {
  const navigate = useNavigate()
  const user = useAuth((state) => state.user)

  return (
    <div className="d-flex h-100">
      <aside className="chat-sidebar d-flex flex-column border-end bg-white">
        <div className="p-3 border-bottom">
          <Button
            className="w-100"
            onClick={() => navigate('/')}
          >
            <PlusLg /> Percakapan baru
          </Button>
        </div>
        <ConversationListOrganism />
        <div className="p-3 border-top d-flex align-items-center justify-content-between gap-2">
          <div className="text-truncate">
            <div className="fw-semibold text-truncate">{user?.name}</div>
            <div className="small text-muted">{user?.role}</div>
          </div>
          <Button
            onClick={logout}
            size="sm"
            variant="outline-secondary"
          >
            Keluar
          </Button>
        </div>
      </aside>
      <main className="chat-main flex-grow-1 d-flex flex-column">
        <Outlet />
      </main>
    </div>
  )
}
