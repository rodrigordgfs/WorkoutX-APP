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

export interface CreateMuscleGroupData {
  name: string
  description: string
  image: string
}

// Simulação de banco de dados em memória
let muscleGroups: MuscleGroup[] = []


// GET - Buscar grupos musculares
export async function GET(request: NextRequest) {
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

    // Obter parâmetros de busca da URL
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    let filteredGroups = muscleGroups

    // Filtrar por nome se fornecido
    if (name) {
      filteredGroups = muscleGroups.filter(group =>
        group.name.toLowerCase().includes(name.toLowerCase()) ||
        group.description.toLowerCase().includes(name.toLowerCase())
      )
    }

    return NextResponse.json(filteredGroups)
  } catch (error) {
    console.error('Erro ao buscar grupos musculares:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar grupo muscular
export async function POST(request: NextRequest) {
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

    const body: CreateMuscleGroupData = await request.json()
    
    // Validação básica
    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'Nome, descrição e imagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar novo grupo muscular
    const newMuscleGroup: MuscleGroup = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      image: body.image,
      exercises: [], // Array vazio de exercícios por enquanto
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    muscleGroups.push(newMuscleGroup)

    return NextResponse.json(newMuscleGroup, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar grupo muscular:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
