'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Users, 
  Search, 
  Heart, 
  Bookmark, 
  Clock, 
  Dumbbell, 
  Star,
  X,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockCommunityWorkouts, mockMuscleGroups } from '@/data/mock-data'

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string
  rest: string
  muscleGroup: string
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [isLoading, setIsLoading] = useState(true)
  const [workouts] = useState(mockCommunityWorkouts)
  const [selectedWorkout, setSelectedWorkout] = useState<typeof mockCommunityWorkouts[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDifficulty = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || 
                              workout.muscleGroups.some(group => group.toLowerCase() === selectedMuscleGroup.toLowerCase())
    
    return matchesSearch && matchesDifficulty && matchesMuscleGroup
  })

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'popular':
        return b.likes - a.likes
      case 'saved':
        return b.saves - a.saves
      case 'duration':
        return a.duration - b.duration
      default:
        return 0
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Iniciante'
      case 'intermediate':
        return 'Intermediário'
      case 'advanced':
        return 'Avançado'
      default:
        return difficulty
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  const handleViewDetails = (workout: typeof mockCommunityWorkouts[0]) => {
    setSelectedWorkout(workout)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedWorkout(null)
  }

  if (isLoading) {
    return (
      <div className="h-full w-full p-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Comunidade</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'].map((id) => (
              <div key={id} className="bg-card rounded-lg border p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Comunidade</h1>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar treinos, descrições ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Difficulty Filter */}
              <div>
                <label htmlFor="difficulty-filter" className="block text-sm font-medium mb-2">
                  Dificuldade
                </label>
                <select
                  id="difficulty-filter"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">Todas as dificuldades</option>
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="advanced">Avançado</option>
                </select>
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
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">Todos os grupos</option>
                  {mockMuscleGroups.map((group) => (
                    <option key={group.id} value={group.name.toLowerCase()}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label htmlFor="sort-filter" className="block text-sm font-medium mb-2">
                  Ordenar por
                </label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="popular">Mais curtidos</option>
                  <option value="saved">Mais salvos</option>
                  <option value="duration">Menor duração</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredWorkouts.length} treino{filteredWorkouts.length !== 1 ? 's' : ''} encontrado{filteredWorkouts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {sortedWorkouts.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum treino encontrado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar os filtros de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          sortedWorkouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewDetails(workout)}>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{workout.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {workout.description}
                      </p>
                    </div>
                    <Badge className={`${getDifficultyColor(workout.difficulty)} border-0`}>
                      {getDifficultyLabel(workout.difficulty)}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={workout.author.avatar}
                        alt={workout.author.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{workout.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(workout.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm font-medium">{workout.duration}min</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm font-medium">{workout.exerciseCount}</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm font-medium">{workout.likes}</span>
                    </div>
                  </div>

                  {/* Muscle Groups */}
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                      <Badge key={group} variant="secondary" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-red-500 p-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle like
                        }}
                      >
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">{workout.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-blue-500 p-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle save
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">{workout.saves}</span>
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(workout)
                      }}
                      className="text-xs md:text-sm"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de Detalhes do Treino */}
      {isModalOpen && selectedWorkout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              {/* Header do Modal */}
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex-1 pr-2">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedWorkout.title}</h2>
                  <p className="text-sm md:text-base text-muted-foreground">{selectedWorkout.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center space-x-3 mb-4 md:mb-6 p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                  <Image
                    src={selectedWorkout.author.avatar}
                    alt={selectedWorkout.author.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base truncate">{selectedWorkout.author.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Criado em {formatDate(selectedWorkout.createdAt)}
                  </p>
                </div>
                <Badge className={`${getDifficultyColor(selectedWorkout.difficulty)} border-0 text-xs flex-shrink-0`}>
                  {getDifficultyLabel(selectedWorkout.difficulty)}
                </Badge>
              </div>

              {/* Estatísticas do Treino */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-1 md:mb-2" />
                  <p className="text-lg md:text-2xl font-bold">{selectedWorkout.duration}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">minutos</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-1 md:mb-2" />
                  <p className="text-lg md:text-2xl font-bold">{selectedWorkout.exerciseCount}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">exercícios</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 mx-auto mb-1 md:mb-2" />
                  <p className="text-lg md:text-2xl font-bold">{selectedWorkout.likes}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">curtidas</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Bookmark className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mx-auto mb-1 md:mb-2" />
                  <p className="text-lg md:text-2xl font-bold">{selectedWorkout.saves}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">salvos</p>
                </div>
              </div>

              {/* Grupos Musculares */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Grupos Musculares Trabalhados
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkout.muscleGroups.map((group: string) => (
                    <Badge key={group} variant="secondary" className="text-sm">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Exercícios */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  Exercícios ({selectedWorkout.exercises?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedWorkout.exercises?.map((exercise: Exercise, index: number) => (
                    <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">{exercise.muscleGroup}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="text-center">
                          <p className="font-medium">{exercise.sets}</p>
                          <p className="text-xs">séries</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{exercise.reps}</p>
                          <p className="text-xs">reps</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{exercise.weight}</p>
                          <p className="text-xs">peso</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{exercise.rest}</p>
                          <p className="text-xs">descanso</p>
                        </div>
                      </div>
                    </div>
                  )) || (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum exercício disponível
                    </p>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Curtir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
                <Button onClick={handleCloseModal}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
