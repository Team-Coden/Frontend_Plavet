import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import {
  ThumbsUp,
  ThumbsDown,
  Send,
  Clock,
  Users,
  Trash2,
} from "lucide-react"

interface Feedback {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: Date
  status: string
  votes: number
  replies: Array<{
    id: string
    author: string
    message: string
    date: Date
  }>
  userVote?: 'up' | 'down'
  upvotes?: number
  downvotes?: number
}

interface FeedbackCardProps {
  feedback: Feedback
  categories: Array<{ value: string; label: string }>
  onVote: (id: string, voteType: 'up' | 'down') => void
  onReply: (id: string) => void
  onDelete?: (id: string) => void
}

export function FeedbackCard({ feedback, categories, onVote, onReply, onDelete }: FeedbackCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implementado':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'resuelto':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'en-revisión':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'implementado':
        return 'Implementado'
      case 'resuelto':
        return 'Resuelto'
      case 'en-revisión':
        return 'En Revisión'
      default:
        return 'Pendiente'
    }
  }

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {categories.find(c => c.value === feedback.category)?.label}
              </Badge>
              <Badge className={getStatusColor(feedback.status)} variant="secondary">
                {getStatusLabel(feedback.status)}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-2">{feedback.title}</CardTitle>
            <CardDescription>{feedback.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{feedback.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{feedback.date.toLocaleDateString('es-ES')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>{feedback.replies.length} respuestas</span>
            <span>•</span>
            <span>{feedback.votes} votos</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={feedback.userVote === 'up' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(feedback.id, 'up')}
            className="flex items-center gap-1"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{feedback.upvotes !== undefined ? feedback.upvotes : feedback.votes}</span>
          </Button>
          <Button
            variant={feedback.userVote === 'down' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(feedback.id, 'down')}
            className="flex items-center gap-1"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{feedback.downvotes || 0}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => onReply(feedback.id)}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            <span>Responder</span>
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(feedback.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50/50 flex items-center gap-1 px-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {feedback.replies.length > 0 && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Respuestas</p>
            {feedback.replies.map((reply) => (
              <div key={reply.id} className="bg-muted/40 rounded-md p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.date.toLocaleDateString('es-ES')}</span>
                </div>
                <p className="text-muted-foreground text-sm">{reply.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
