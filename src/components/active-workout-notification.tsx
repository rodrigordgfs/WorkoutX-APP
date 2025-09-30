'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useActiveWorkout } from '@/hooks/use-active-workout'
import { Toast, ToastClose, ToastDescription, ToastTitle } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { Dumbbell } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ActiveWorkoutNotification() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: activeWorkout, isLoading } = useActiveWorkout()
  const [isVisible, setIsVisible] = useState(false)

  // Verificar se está na página de detalhes do treino
  const isOnWorkoutDetailsPage = pathname.startsWith('/workouts/') && pathname !== '/workouts'

  useEffect(() => {
    if (activeWorkout && !isLoading && !isOnWorkoutDetailsPage) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [activeWorkout, isLoading, isOnWorkoutDetailsPage])

  const handleGoToWorkout = () => {
    if (activeWorkout) {
      router.push(`/workouts/${activeWorkout.id}`)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible || !activeWorkout) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-10 sm:max-w-sm">
      <Toast className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <ToastTitle className="text-blue-900 dark:text-blue-100">
              Treino em Andamento
            </ToastTitle>
            <ToastDescription className="text-blue-700 dark:text-blue-300 mt-1">
              Você tem um treino ativo: <strong>{activeWorkout.name}</strong>
            </ToastDescription>
            <div className="flex items-center space-x-2 mt-3">
              <Button
                size="sm"
                onClick={handleGoToWorkout}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continuar Treino
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
              >
                Dispensar
              </Button>
            </div>
          </div>
          <ToastClose onClick={handleDismiss} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200" />
        </div>
      </Toast>
    </div>
  )
}
