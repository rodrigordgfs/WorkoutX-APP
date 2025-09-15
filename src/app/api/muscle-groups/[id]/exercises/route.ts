import { NextRequest, NextResponse } from 'next/server'
import { clerkConfig, isInvalidKey } from '@/lib/clerk-config'

export interface Exercise {
  id: string
  name: string
  image: string
  description: string
}

export interface MuscleGroup {
  id: string
  name: string
  description: string
  image: string
  exercises: Exercise[]
  createdAt: string
  updatedAt: string
}

export interface CreateExerciseData {
  name: string
  image: string
  description: string
}

// Simulação de banco de dados em memória (mesmo array da API principal)
// Em uma aplicação real, isso seria compartilhado via banco de dados
let muscleGroups: MuscleGroup[] = []

// POST - Adicionar exercício a um grupo muscular
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Se o Clerk estiver configurado, verificar autenticação
    if (!isInvalidKey(clerkConfig.publishableKey) && !isInvalidKey(clerkConfig.secretKey)) {
      try {
        const { auth } = await import('@clerk/nextjs/server')
        const { userId } = await auth()
        
        if (!userId) {
          return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
        }
      } catch (authError) {
        console.warn('Erro na autenticação Clerk:', authError)
        // Continuar sem autenticação se houver erro
      }
    }

    const muscleGroupId = params.id
    const body: CreateExerciseData = await request.json()
    
    // Validação básica
    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'Nome, descrição e imagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Encontrar o grupo muscular
    const muscleGroup = muscleGroups.find(g => g.id === muscleGroupId)
    if (!muscleGroup) {
      return NextResponse.json(
        { error: 'Grupo muscular não encontrado' },
        { status: 404 }
      )
    }

    // Criar novo exercício
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: body.name,
      image: body.image,
      description: body.description,
    }

    // Adicionar exercício ao grupo muscular
    muscleGroup.exercises.push(newExercise)
    muscleGroup.updatedAt = new Date().toISOString()

    return NextResponse.json(newExercise, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar exercício:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
