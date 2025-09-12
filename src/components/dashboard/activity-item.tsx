import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Clock, Target } from 'lucide-react'

interface ActivityItemProps {
  title: string
  exercises: number
  duration: number
  status: 'completed' | 'in-progress' | 'pending'
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
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in-progress':
        return 'Em andamento'
      default:
        return 'Pendente'
    }
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
                  <span>{duration} min</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{date}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant() as any}>
            {getStatusText()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}