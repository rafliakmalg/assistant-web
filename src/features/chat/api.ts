import { useQuery } from '@tanstack/react-query'
import { api } from '@/utils'
import { toMessages } from './history'
import type { ChatMessage, Conversation, StoredMessage } from './types'

export async function loadConversation(id: string): Promise<ChatMessage[]> {
  const response = await api.get<{ messages: { data: StoredMessage[] } }>(`/conversations/${id}`)

  return toMessages([...response.data.messages.data].reverse())
}

export function useReadConversations() {
  return useQuery({
    queryFn: async () => {
      const response = await api.get<{ data: Conversation[] }>('/conversations')

      return response.data.data
    },
    queryKey: ['conversations'],
  })
}
