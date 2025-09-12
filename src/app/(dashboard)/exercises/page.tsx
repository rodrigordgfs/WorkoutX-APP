import React from 'react'
import { Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExercisesPage() {
  return (
    <div className="h-full w-full p-10 space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Exercícios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Funcionalidade de exercícios em desenvolvimento...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
