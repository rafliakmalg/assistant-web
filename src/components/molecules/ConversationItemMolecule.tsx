import { NavLink } from 'react-router'
import type { Conversation } from '@/features/chat/types'

type Props = {
  conversation: Conversation
}

export function ConversationItemMolecule({ conversation }: Props) {
  return (
    <NavLink
      className={({ isActive }) => `d-block text-truncate px-3 py-2 text-decoration-none ${isActive ? 'bg-primary-subtle text-body fw-semibold' : 'text-body'}`}
      title={conversation.title}
      to={`/c/${conversation.id}`}
    >
      {conversation.title}
    </NavLink>
  )
}
