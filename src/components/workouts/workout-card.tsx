'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ChevronUp, Dumbbell, Eye, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { useDeleteWorkout } from '@/hooks/use-workouts'
import { toast } from 'sonner'

interface Exercise {
  name: string
  sets: number
  reps: string
  weight: string
  rest: string
  videoUrl?: string
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()
  const deleteWorkoutMutation = useDeleteWorkout()

  const handleViewDetails = () => {
    console.log('Navegando para treino ID:', id)
    router.push(`/workouts/${id}`)
  }

  const handleEditWorkout = () => {
    router.push(`/create-workout?id=${id}`)
  }

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkoutMutation.mutateAsync(id)
      toast.success('Treino excluído com sucesso!')
      setIsDeleteDialogOpen(false)
    } catch (error: unknown) {
      console.error('Erro ao excluir treino:', error)
      
      // Verificar se é o erro específico de vínculos
      if (error && typeof error === 'object' && 'message' in error && 
          typeof error.message === 'string' && error.message.includes('vínculos')) {
        toast.error('Não é possível deletar: treino possui vínculos')
      } else {
        toast.error('Erro ao excluir treino. Tente novamente.')
      }
    }
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

        {/* Action Buttons */}
        <div className="mb-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Ver Detalhes</span>
            <span className="sm:hidden">Ver</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEditWorkout}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Treino
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
                disabled={deleteWorkoutMutation.isPending}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar Treino
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{exercise.name}</h5>
                  {exercise.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exercise.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      exercise.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {exercise.status === 'COMPLETED' ? 'Exercício finalizado' :
                       exercise.status === 'IN_PROGRESS' ? 'Exercício em andamento' :
                       'Exercício não iniciado'}
                    </span>
                  )}
                </div>
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Treino</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o treino "{title}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteWorkout}
                disabled={deleteWorkoutMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteWorkoutMutation.isPending ? 'Excluindo...' : 'Excluir'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}