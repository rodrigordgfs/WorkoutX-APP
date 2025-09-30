import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Clock, Target } from 'lucide-react'
import { formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ActivityItemProps {
  title: string
  exercises: number
  duration: number
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  date: string
}

export function ActivityItem({
  title,
  exercises,
  duration,
  status,
  date
}: ActivityItemProps) {
  const getStatusVariant = () => {
    switch (status) {
      case 'COMPLETED':
        return 'success'
      case 'IN_PROGRESS':
        return 'warning'
      case 'NOT_STARTED':
        return 'secondary'
      case 'UNCOMPLETED':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'COMPLETED':
        return 'Concluído'
      case 'IN_PROGRESS':
        return 'Em andamento'
      case 'NOT_STARTED':
        return 'Não iniciado'
      case 'UNCOMPLETED':
        return 'Incompleto'
      default:
        return 'Desconhecido'
    }
  }

  const formatDurationText = (minutes: number) => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })
    
    return formatDuration(duration, {
      locale: ptBR,
      format: ['hours', 'minutes'],
      delimiter: ' '
    }).replace('horas', 'h').replace('minutos', 'min').replace('hora', 'h').replace('minuto', 'min')
  }

  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{title}</h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{exercises} exercícios</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDurationText(duration)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{date}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant() as "default" | "secondary" | "destructive" | "outline" | "success" | "warning"}>
            {getStatusText()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}