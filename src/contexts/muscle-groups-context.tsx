'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useMuscleGroups, type MuscleGroup } from '@/hooks/use-muscle-groups'

interface MuscleGroupsContextType {
  muscleGroups: MuscleGroup[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  clearSearch: () => void
}

const MuscleGroupsContext = createContext<MuscleGroupsContextType | undefined>(undefined)

interface MuscleGroupsProviderProps {
  children: ReactNode
}

export function MuscleGroupsProvider({ children }: MuscleGroupsProviderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { data: muscleGroups = [], isLoading, error, refetch } = useMuscleGroups(debouncedSearchTerm)

  // Debounce do termo de busca por 1 segundo
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const clearSearch = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    // Força uma busca imediata sem filtro
    refetch()
  }

  const value: MuscleGroupsContextType = {
    muscleGroups,
    isLoading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    clearSearch
  }

  return (
    <MuscleGroupsContext.Provider value={value}>
      {children}
    </MuscleGroupsContext.Provider>
  )
}

export function useMuscleGroupsContext() {
  const context = useContext(MuscleGroupsContext)
  if (context === undefined) {
    throw new Error('useMuscleGroupsContext must be used within a MuscleGroupsProvider')
  }
  return context
}
