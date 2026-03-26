import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import {
  Send,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

interface FeedbackFormProps {
  onSubmit: (feedback: {
    type: string
    title: string
    description: string
    name: string
    email: string
  }) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    title: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultMessage, setResultMessage] = useState("")

  const feedbackTypes = [
    { value: 'mejora', label: 'Mejora', icon: TrendingUp },
    { value: 'error', label: 'Error', icon: AlertCircle },
    { value: 'sugerencia', label: 'Sugerencia', icon: Lightbulb },
    { value: 'otro', label: 'Otro', icon: MessageSquare },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.type || !formData.title || !formData.description) return

    setIsSubmitting(true)
    setResultMessage("Enviando...")

    const formPayload = new FormData()
    formPayload.append("access_key", "0f13fe42-1d70-48a0-8db3-920f77d5026f")
    formPayload.append("name", formData.name)
    formPayload.append("email", formData.email)
    formPayload.append("type", formData.type)
    formPayload.append("title", formData.title)
    formPayload.append("message", formData.description) // Map description to message field

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      })

      const data = await response.json()
      if (data.success) {
        setResultMessage("¡Feedback enviado exitosamente!")
        onSubmit(formData)
        setFormData({ name: '', email: '', type: '', title: '', description: '' })
      } else {
        setResultMessage("Error al enviar el feedback. Intenta nuevamente.")
      }
    } catch {
      setResultMessage("Error de conexión. Verifica tu internet.")
    }

    setIsSubmitting(false)
    setTimeout(() => {
      setResultMessage("")
    }, 4000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Enviar Feedback
        </CardTitle>
        <CardDescription>
          Tu opinión es importante para nosotros. Todos los comentarios son revisados por nuestro equipo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo de Feedback
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Selecciona un tipo</option>
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Resumen de tu feedback"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Describe tu feedback en detalle..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.type || !formData.title || !formData.description}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Enviando..." : "Enviar Feedback"}
          </Button>

          {resultMessage && (
            <p className={`text-center text-sm font-medium mt-2 ${resultMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {resultMessage}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
