'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Dumbbell, Eye, Search, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useMuscleGroupsContext } from '@/contexts/muscle-groups-context'

// Componentes de Skeleton
const SkeletonMuscleGroupCard = () => (
  <div className="bg-card rounded-lg border p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4 flex-1">
        <div className="w-16 h-16 bg-muted rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
        </div>
      </div>
      <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
    </div>
  </div>
)

export default function MuscleGroupsPage() {
  const router = useRouter()
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const { muscleGroups, isLoading, searchTerm, setSearchTerm, clearSearch } = useMuscleGroupsContext()

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  // Os dados já vêm filtrados da API, então usamos diretamente
  const filteredGroups = muscleGroups

  const handleViewExercises = (groupId: string) => {
    const group = muscleGroups.find(g => g.id === groupId)
    if (group) {
      // Navegar para a página de exercícios com o grupo muscular como parâmetro
      router.push(`/exercises?muscleGroup=${encodeURIComponent(group.name)}`)
    }
  }

  if (isLoading) {
    return (
      <div className="h-full w-full p-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Grupos Musculares</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'].map((id) => (
              <SkeletonMuscleGroupCard key={id} />
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
          <h1 className="text-3xl font-bold tracking-tight">Grupos Musculares</h1>
        </div>
        <Button 
          onClick={() => router.push('/create-muscle-group')}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Grupo Muscular
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
                placeholder="Buscar grupos musculares..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Results Count and Clear Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredGroups.length} grupo{filteredGroups.length !== 1 ? 's' : ''} encontrado{filteredGroups.length !== 1 ? 's' : ''}
                {searchTerm && (
                  <span className="ml-2">
                    para "{searchTerm}"
                  </span>
                )}
              </div>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Muscle Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum grupo muscular encontrado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar o termo de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredGroups.map((group) => {
            const groupExercises = group.exercises || []
            const isExpanded = expandedGroups.has(group.id)
            
            return (
              <Card key={group.id} className="overflow-hidden h-fit">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Group Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Group Image */}
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {group.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={group.image} 
                              alt={group.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Dumbbell className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        
                        {/* Group Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {groupExercises.length} exercício{groupExercises.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroup(group.id)}
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
                        {/* Group Description */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Descrição</h4>
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                        </div>

                        {/* Exercises List */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-sm">Exercícios ({groupExercises.length})</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewExercises(group.id)}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Ver Exercícios
                            </Button>
                          </div>
                          
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {groupExercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                                {/* Exercise Image */}
                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  {exercise.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img 
                                      src={exercise.image} 
                                      alt={exercise.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Dumbbell className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                
                                {/* Exercise Info */}
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-sm truncate">{exercise.name}</h5>
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {exercise.description}
                                  </p>
                                </div>
                              </div>
                            ))}
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
