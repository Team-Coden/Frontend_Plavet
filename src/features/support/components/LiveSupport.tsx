import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { Badge } from "../../../shared/components/ui/badge"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Send,
  Paperclip,
  Smile,
} from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  type: 'user' | 'support'
  content: string
  timestamp: Date
  sender?: string
}

interface LiveSupportProps {
  isOpen?: boolean
  onClose?: () => void
}

export function LiveSupport({ isOpen = true, onClose }: LiveSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'support',
      content: '¡Hola! Soy un asistente de CHECKiNT. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      sender: 'Asistente CHECKiNT'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'support',
        content: 'Gracias por tu mensaje. Estoy revisando tu consulta y te responderé en breve.',
        timestamp: new Date(),
        sender: 'Asistente CHECKiNT'
      }
      setMessages(prev => [...prev, supportMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[90vw]">
      <Card className="h-[600px] flex flex-col shadow-xl">
        {/* Header */}
        <CardHeader className="pb-3 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-lg">Soporte en Vivo</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500 text-white">
                En línea
              </Badge>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ×
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'support' && message.sender && (
                  <p className="text-xs font-semibold mb-1 opacity-70">
                    {message.sender}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Tiempo de respuesta: ~2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <Phone className="h-3 w-3 mr-1" />
                Llamar
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
