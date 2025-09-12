import React from 'react'
import { PlusCircle, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateMuscleGroupPage() {
  return (
    <div className="h-full w-full p-10 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <PlusCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastrar Grupo Muscular</h1>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Salvar Grupo
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Grupo Muscular</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Funcionalidade de cadastro de grupo muscular em desenvolvimento...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
