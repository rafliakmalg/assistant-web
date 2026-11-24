import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ChatInputMolecule } from '@/components/molecules/ChatInputMolecule'
import { MessageListOrganism } from '@/components/organisms/MessageListOrganism'
import { useChatStream } from './useChatStream'

export function ChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const chat = useChatStream({ onCreated: (created) => navigate(`/c/${created}`, { replace: true }) })
  const { decide, load, reset } = chat

  useEffect(() => {
    if (id) {
      load(id)
    } else {
      reset()
    }
  }, [id, load, reset])

  return (
    <>
      <div className="chat-scroll flex-grow-1 p-3">
        <MessageListOrganism
          busy={chat.busy}
          error={chat.error}
          messages={chat.messages}
          onApprove={() => decide(true)}
          onReject={() => decide(false)}
        />
      </div>
      <div className="border-top bg-white p-3">
        <ChatInputMolecule
          disabled={chat.busy}
          onSend={chat.send}
        />
      </div>
    </>
  )
}
