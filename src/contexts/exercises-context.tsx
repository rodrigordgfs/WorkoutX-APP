'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useExercises } from '@/hooks/use-exercises-list'
import type { ExerciseWithMuscleGroup } from '@/hooks/use-exercises-list'

interface ExercisesContextType {
  exercises: ExerciseWithMuscleGroup[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedMuscleGroup: string
  setSelectedMuscleGroup: (group: string) => void
  clearSearch: () => void
}

const ExercisesContext = createContext<ExercisesContextType | undefined>(undefined)

interface ExercisesProviderProps {
  children: ReactNode
}

export function ExercisesProvider({ children }: ExercisesProviderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [debouncedMuscleGroup, setDebouncedMuscleGroup] = useState('all')

  // Debounce para searchTerm
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Debounce para selectedMuscleGroup
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMuscleGroup(selectedMuscleGroup)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedMuscleGroup])

  const { data: exercises = [], isLoading, error, refetch } = useExercises(debouncedSearchTerm, debouncedMuscleGroup)

  const clearSearch = () => {
    setSearchTerm('')
    setSelectedMuscleGroup('all')
    setDebouncedSearchTerm('')
    setDebouncedMuscleGroup('all')
  }

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        isLoading,
        error: error as Error | null,
        refetch,
        searchTerm,
        setSearchTerm,
        selectedMuscleGroup,
        setSelectedMuscleGroup,
        clearSearch,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  )
}

export function useExercisesContext() {
  const context = useContext(ExercisesContext)
  if (context === undefined) {
    throw new Error('useExercisesContext must be used within an ExercisesProvider')
  }
  return context
}
