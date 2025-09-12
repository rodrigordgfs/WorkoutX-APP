'use client'

import React, { useState } from 'react'
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
  title: string
  exerciseCount: number
  exercises: Exercise[]
  icon?: React.ReactNode
}

export function WorkoutCard({ 
  title, 
  exerciseCount, 
  exercises,
  icon = <Dumbbell className="h-5 w-5 text-primary" />
}: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="hover:shadow-md bg-card transition-shadow">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {exerciseCount} exercícios
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
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
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes do Treino
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Séries</span>
                    <Badge variant="outline" className="w-fit">
                      {exercise.sets}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Repetições</span>
                    <Badge variant="outline" className="w-fit">
                      {exercise.reps}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Peso</span>
                    <Badge variant="outline" className="w-fit">
                      {exercise.weight}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Descanso</span>
                    <Badge variant="outline" className="w-fit">
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