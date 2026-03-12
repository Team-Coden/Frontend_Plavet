import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Clock,
  Star,
} from "lucide-react"

interface HelpResource {
  id: string
  title: string
  description: string
  type: 'guide' | 'video' | 'document'
  duration?: string
  rating?: number
  downloadUrl?: string
  externalUrl?: string
}

interface HelpResourceCardProps {
  resource: HelpResource
}

export function HelpResourceCard({ resource }: HelpResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'guide':
        return <BookOpen className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      case 'document':
        return <FileText className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeColor = () => {
    switch (resource.type) {
      case 'guide':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
      case 'video':
        return 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
      case 'document':
        return 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400'
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400'
    }
  }

  const getTypeLabel = () => {
    switch (resource.type) {
      case 'guide':
        return 'Guía'
      case 'video':
        return 'Video'
      case 'document':
        return 'Documento'
      default:
        return 'Recurso'
    }
  }

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {getIcon()}
          </div>
          <Badge className={getTypeColor()} variant="secondary">
            {getTypeLabel()}
          </Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{resource.rating}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {resource.downloadUrl && (
            <Button size="sm" variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          )}
          {resource.externalUrl && (
            <Button size="sm" variant="outline" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir
            </Button>
          )}
          <Button size="sm" className="flex-1">
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
