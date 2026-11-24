import { Spinner } from 'react-bootstrap'
import { useReadConversations } from '@/features/chat/api'
import { ConversationItemMolecule } from '@/components/molecules/ConversationItemMolecule'

export function ConversationListOrganism() {
  const { data, isLoading } = useReadConversations()

  if (isLoading) {
    return (
      <div className="p-3 text-center">
        <Spinner animation="border" size="sm" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <div className="p-3 text-muted small">Belum ada percakapan.</div>
  }

  return (
    <div className="chat-scroll flex-grow-1">
      {data.map((conversation) => (
        <ConversationItemMolecule key={conversation.id} conversation={conversation} />
      ))}
    </div>
  )
}
