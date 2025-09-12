'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, Dumbbell, Eye } from 'lucide-react'

interface Exercise {
  name: string
  sets: number
  reps: string
  weight: string
  rest: string
}

interface WorkoutCardProps {
  id: string
  title: string
  exerciseCount: number
  exercises: Exercise[]
  icon?: React.ReactNode
}

export function WorkoutCard({ 
  id,
  title, 
  exerciseCount, 
  exercises,
  icon = <Dumbbell className="h-5 w-5 text-primary" />
}: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleViewDetails = () => {
    console.log('Navegando para treino ID:', id)
    router.push(`/workouts/${id}`)
  }

  return (
    <Card className="hover:shadow-md bg-card transition-shadow">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg truncate">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {exerciseCount} exercícios
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 flex-shrink-0 ml-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* View Details Button */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleViewDetails}
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Ver Detalhes do Treino</span>
            <span className="sm:hidden">Ver Detalhes</span>
          </Button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Exercícios
            </h4>
            {exercises.map((exercise, index) => (
              <div
                key={`${exercise.name}-${index}`}
                className="p-3 bg-muted/50 rounded-lg space-y-2"
              >
                <h5 className="font-medium">{exercise.name}</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Séries</span>
                    <Badge variant="outline" className="w-fit text-xs">
                      {exercise.sets}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Repetições</span>
                    <Badge variant="outline" className="w-fit text-xs">
                      {exercise.reps}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Peso</span>
                    <Badge variant="outline" className="w-fit text-xs">
                      {exercise.weight}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Descanso</span>
                    <Badge variant="outline" className="w-fit text-xs">
                      {exercise.rest}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}