'use client'

import { useState, useEffect } from 'react'
import { History, Search, ChevronDown, ChevronUp, Dumbbell, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockWorkoutHistory, mockWorkouts } from '@/data/mock-data'

interface WorkoutHistoryItem {
  id: string
  workoutId: string
  title: string
  date: string
  duration: number
  status: 'completed' | 'in-progress' | 'cancelled'
  exercises: number
  notes?: string
  completionPercentage: number
  exercisesList: Array<{
    name: string
    sets: number
    reps: string
    weight: string
    rest: string
  }>
}

export default function WorkoutHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [expandedWorkouts, setExpandedWorkouts] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryItem[]>([])

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      // Combinar dados do histórico com detalhes dos treinos
      const enrichedHistory = mockWorkoutHistory.map(historyItem => {
        const workout = mockWorkouts.find(w => w.id === historyItem.workoutId)
        return {
          ...historyItem,
          completionPercentage: historyItem.status === 'completed' ? 100 : 
                              historyItem.status === 'in-progress' ? 75 : 0,
          exercisesList: workout?.exercises.map(ex => ({
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            rest: ex.rest
          })) || []
        }
      })
      setWorkoutHistory(enrichedHistory)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleWorkout = (workoutId: string) => {
    const newExpanded = new Set(expandedWorkouts)
    if (newExpanded.has(workoutId)) {
      newExpanded.delete(workoutId)
    } else {
      newExpanded.add(workoutId)
    }
    setExpandedWorkouts(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return date.toLocaleDateString('pt-BR', options)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}min`
    }
    return `${mins}min`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in-progress':
        return 'Em Andamento'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Desconhecido'
    }
  }

  const filteredWorkouts = workoutHistory.filter(workout => {
    // Filtro por termo de busca
    const matchesSearch = searchTerm === '' || 
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filtro por status
    const matchesStatus = statusFilter === 'all' || workout.status === statusFilter
    
    // Filtro por data
    const workoutDate = new Date(workout.date)
    const fromDate = dateFrom ? new Date(dateFrom) : null
    const toDate = dateTo ? new Date(dateTo) : null
    
    const matchesDate = (!fromDate || workoutDate >= fromDate) && 
                       (!toDate || workoutDate <= toDate)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const handleSearch = () => {
    // A busca é feita automaticamente através do filteredWorkouts
    // Este botão pode ser usado para futuras funcionalidades como salvar filtros
    console.log('Pesquisando com filtros:', { searchTerm, statusFilter, dateFrom, dateTo })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setDateFrom('')
    setDateTo('')
  }

  if (isLoading) {
    return (
      <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <History className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Treinos</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="space-y-3">
            {['skeleton-1', 'skeleton-2', 'skeleton-3'].map((id) => (
              <div key={id} className="h-32 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <History className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Treinos</h1>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar treinos por nome ou observações..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Todos os status</option>
                  <option value="completed">Concluído</option>
                  <option value="in-progress">Em Andamento</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label htmlFor="date-from" className="block text-sm font-medium mb-2">
                  Data Inicial
                </label>
                <input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Date To */}
              <div>
                <label htmlFor="date-to" className="block text-sm font-medium mb-2">
                  Data Final
                </label>
                <input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
              <div className="text-sm text-muted-foreground">
                {filteredWorkouts.length} treino{filteredWorkouts.length !== 1 ? 's' : ''} encontrado{filteredWorkouts.length !== 1 ? 's' : ''}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1 sm:flex-none"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={handleSearch}
                  className="flex-1 sm:flex-none"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workouts List */}
      <div className="space-y-3">
        {filteredWorkouts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum treino encontrado</p>
              <p className="text-sm text-muted-foreground mt-2">
                {searchTerm ? 'Tente ajustar os filtros de busca' : 'Seus treinos aparecerão aqui'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1 min-w-0">
                    {/* Workout Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="h-8 w-8 text-primary" />
                    </div>
                    
                    {/* Workout Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">{workout.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(workout.date)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workout.status)}`}>
                          {getStatusLabel(workout.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm font-medium">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(workout.duration)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{workout.completionPercentage}%</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWorkout(workout.id)}
                      className="cursor-pointer p-2"
                    >
                      {expandedWorkouts.has(workout.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedWorkouts.has(workout.id) && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-3">
                      <h4 className="font-medium text-base">Exercícios Realizados</h4>
                      <div className="space-y-2">
                        {workout.exercisesList.map((exercise, index) => (
                          <div key={`exercise-${workout.id}-${index}`}>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-sm truncate">{exercise.name}</h5>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                                  <span>{exercise.sets} séries</span>
                                  <span>{exercise.reps} reps</span>
                                  <span>{exercise.weight}</span>
                                  <span>{exercise.rest} descanso</span>
                                </div>
                              </div>
                            </div>
                            {index < workout.exercisesList.length - 1 && (
                              <div className="h-px bg-border mx-3 my-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Summary Stats */}
                      <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">
                              Exercícios concluídos: {workout.exercisesList.length} de {workout.exercisesList.length}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Taxa de conclusão:</span>
                            <span className="text-sm font-bold text-primary">{workout.completionPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {workout.notes && (
                        <div className="mt-3 p-3 bg-muted/20 rounded-lg">
                          <h5 className="font-medium text-sm mb-1">Observações</h5>
                          <p className="text-sm text-muted-foreground">{workout.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
