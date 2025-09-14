'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, ChevronDown, ChevronUp, Dumbbell, Play, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockExercises, mockMuscleGroups } from '@/data/mock-data'

// Componentes de Skeleton
const SkeletonExerciseCard = () => (
  <div className="bg-card rounded-lg border p-6">
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-muted rounded-lg animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded animate-pulse w-48"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
          </div>
        </div>
        <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

function ExercisesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all')
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  // Aplicar filtro de grupo muscular da URL
  useEffect(() => {
    const muscleGroupParam = searchParams.get('muscleGroup')
    if (muscleGroupParam) {
      setSelectedMuscleGroup(muscleGroupParam)
    }
  }, [searchParams])

  const toggleExercise = (exerciseId: string) => {
    const newExpanded = new Set(expandedExercises)
    if (newExpanded.has(exerciseId)) {
      newExpanded.delete(exerciseId)
    } else {
      newExpanded.add(exerciseId)
    }
    setExpandedExercises(newExpanded)
  }

  const filteredExercises = mockExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || 
                              exercise.muscleGroup.toLowerCase() === selectedMuscleGroup.toLowerCase()
    return matchesSearch && matchesMuscleGroup
  })

  const getMuscleGroupName = (muscleGroup: string) => {
    const group = mockMuscleGroups.find(g => g.name === muscleGroup)
    return group?.name || muscleGroup
  }

  if (isLoading) {
    return (
      <div className="h-full w-full p-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'].map((id) => (
              <SkeletonExerciseCard key={id} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
        </div>
        <Button 
          onClick={() => router.push('/create-exercise')}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Exercício
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar exercícios por nome ou descrição..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Muscle Group Filter */}
            <div>
              <label htmlFor="muscle-group-filter" className="block text-sm font-medium mb-2">
                Grupo Muscular
              </label>
              <select
                id="muscle-group-filter"
                value={selectedMuscleGroup}
                onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Todos os grupos</option>
                {mockMuscleGroups.map((group) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredExercises.length} exercício{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum exercício encontrado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar os filtros de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredExercises.map((exercise) => {
            const isExpanded = expandedExercises.has(exercise.id)
            
            return (
              <Card key={exercise.id} className="overflow-hidden h-fit">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Exercise Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Exercise Image */}
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-8 w-8 text-primary" />
                        </div>
                        
                        {/* Exercise Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">{exercise.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {getMuscleGroupName(exercise.muscleGroup)}
                          </p>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExercise(exercise.id)}
                        className="cursor-pointer p-2"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4">
                        {/* Exercise Description */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Descrição</h4>
                          <p className="text-sm text-muted-foreground">{exercise.description}</p>
                        </div>

                        {/* Muscle Group */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Grupo Muscular</h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <Dumbbell className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {getMuscleGroupName(exercise.muscleGroup)}
                            </span>
                          </div>
                        </div>

                        {/* Video Demonstrativo */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Demonstração</h4>
                          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <Play className="h-8 w-8 text-primary" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Vídeo demonstrativo
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {exercise.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Exercise Details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Equipamento</p>
                            <p className="text-sm font-medium">{exercise.equipment}</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Dificuldade</p>
                            <p className="text-sm font-medium capitalize">{exercise.difficulty}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

export default function ExercisesPage() {
  return (
    <Suspense fallback={
      <div className="h-full w-full p-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'].map((id) => (
              <SkeletonExerciseCard key={id} />
            ))}
          </div>
        </div>
      </div>
    }>
      <ExercisesContent />
    </Suspense>
  )
}
