// Mock data for the WorkoutX application
import { v4 as uuidv4 } from 'uuid'

// IDs dos treinos para referência no histórico
const WORKOUT_1_ID = uuidv4()
const WORKOUT_2_ID = uuidv4()
const WORKOUT_3_ID = uuidv4()
const WORKOUT_4_ID = uuidv4()

export const mockUser = {
  id: uuidv4(),
  name: 'João Silva',
  email: 'joao.silva@email.com',
  avatar: 'https://github.com/rodrigordgfs.png',
  plan: 'premium' as const,
  joinDate: '2024-01-15',
  stats: {
    totalWorkouts: 45,
    currentStreak: 3,
    averageDuration: 48,
    completionRate: 85
  }
}

export const mockWorkouts = [
  {
    id: WORKOUT_1_ID,
    title: 'Treino Peito e Tríceps',
    exerciseCount: 8,
    duration: 45,
    difficulty: 'intermediate' as const,
    muscleGroups: ['peito', 'tríceps'],
    createdAt: '2024-01-20',
    lastPerformed: '2024-01-25',
    privacy: 'public' as const,
    author: {
      id: uuidv4(),
      name: 'João Silva',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 24,
    saves: 12,
    exercises: [
      {
        id: uuidv4(),
        name: 'Supino Reto',
        sets: 4,
        reps: '8-12',
        weight: '80kg',
        rest: '2min',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Supino Inclinado',
        sets: 3,
        reps: '10-12',
        weight: '70kg',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Crucifixo',
        sets: 3,
        reps: '12-15',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Paralelas',
        sets: 3,
        reps: '8-12',
        weight: 'Corporal',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Testa',
        sets: 3,
        reps: '10-12',
        weight: '30kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Corda',
        sets: 3,
        reps: '12-15',
        weight: '40kg',
        rest: '45s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Francês',
        sets: 3,
        reps: '10-12',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Flexão Diamante',
        sets: 2,
        reps: '10-15',
        weight: 'Corporal',
        rest: '45s',
        muscleGroup: 'tríceps'
      }
    ]
  },
  {
    id: WORKOUT_2_ID,
    title: 'Treino Costas e Bíceps',
    exerciseCount: 7,
    duration: 50,
    difficulty: 'intermediate' as const,
    muscleGroups: ['costas', 'bíceps'],
    createdAt: '2024-01-18',
    lastPerformed: '2024-01-23',
    exercises: [
      {
        id: uuidv4(),
        name: 'Puxada Frontal',
        sets: 4,
        reps: '8-12',
        weight: '70kg',
        rest: '2min',
        muscleGroup: 'costas'
      },
      {
        id: uuidv4(),
        name: 'Remada Curvada',
        sets: 4,
        reps: '8-10',
        weight: '60kg',
        rest: '2min',
        muscleGroup: 'costas'
      },
      {
        id: uuidv4(),
        name: 'Remada Unilateral',
        sets: 3,
        reps: '10-12',
        weight: '30kg',
        rest: '90s',
        muscleGroup: 'costas'
      },
      {
        id: uuidv4(),
        name: 'Pullover',
        sets: 3,
        reps: '12-15',
        weight: '20kg',
        rest: '60s',
        muscleGroup: 'costas'
      },
      {
        id: uuidv4(),
        name: 'Rosca Direta',
        sets: 4,
        reps: '10-12',
        weight: '15kg',
        rest: '60s',
        muscleGroup: 'bíceps'
      },
      {
        id: uuidv4(),
        name: 'Rosca Martelo',
        sets: 3,
        reps: '12-15',
        weight: '12kg',
        rest: '45s',
        muscleGroup: 'bíceps'
      },
      {
        id: uuidv4(),
        name: 'Rosca Concentrada',
        sets: 3,
        reps: '10-12',
        weight: '10kg',
        rest: '45s',
        muscleGroup: 'bíceps'
      }
    ]
  },
  {
    id: WORKOUT_3_ID,
    title: 'Treino Pernas',
    exerciseCount: 6,
    duration: 60,
    difficulty: 'advanced' as const,
    muscleGroups: ['pernas', 'glúteos'],
    createdAt: '2024-01-16',
    lastPerformed: '2024-01-21',
    exercises: [
      {
        id: uuidv4(),
        name: 'Agachamento',
        sets: 4,
        reps: '8-12',
        weight: '100kg',
        rest: '3min',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Leg Press',
        sets: 4,
        reps: '12-15',
        weight: '200kg',
        rest: '2min',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Extensora',
        sets: 3,
        reps: '12-15',
        weight: '60kg',
        rest: '60s',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Flexora',
        sets: 3,
        reps: '12-15',
        weight: '50kg',
        rest: '60s',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Panturrilha em Pé',
        sets: 4,
        reps: '15-20',
        weight: '80kg',
        rest: '45s',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Panturrilha Sentado',
        sets: 3,
        reps: '15-20',
        weight: '40kg',
        rest: '45s',
        muscleGroup: 'pernas'
      }
    ]
  },
  {
    id: WORKOUT_4_ID,
    title: 'Treino Ombros e Abdômen',
    exerciseCount: 8,
    duration: 35,
    difficulty: 'beginner' as const,
    muscleGroups: ['ombros', 'abdômen'],
    createdAt: '2024-01-14',
    lastPerformed: '2024-01-19',
    exercises: [
      {
        id: uuidv4(),
        name: 'Desenvolvimento',
        sets: 4,
        reps: '8-12',
        weight: '50kg',
        rest: '2min',
        muscleGroup: 'ombros'
      },
      {
        id: uuidv4(),
        name: 'Elevação Lateral',
        sets: 4,
        reps: '12-15',
        weight: '8kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: uuidv4(),
        name: 'Elevação Frontal',
        sets: 3,
        reps: '12-15',
        weight: '8kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: uuidv4(),
        name: 'Crucifixo Inverso',
        sets: 3,
        reps: '12-15',
        weight: '6kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: uuidv4(),
        name: 'Encolhimento',
        sets: 3,
        reps: '12-15',
        weight: '20kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: uuidv4(),
        name: 'Abdominal Supra',
        sets: 3,
        reps: '15-20',
        weight: 'Corporal',
        rest: '45s',
        muscleGroup: 'abdômen'
      },
      {
        id: uuidv4(),
        name: 'Prancha',
        sets: 3,
        reps: '30-60s',
        weight: 'Corporal',
        rest: '60s',
        muscleGroup: 'abdômen'
      },
      {
        id: uuidv4(),
        name: 'Oblíquo',
        sets: 3,
        reps: '15-20',
        weight: 'Corporal',
        rest: '45s',
        muscleGroup: 'abdômen'
      }
    ]
  }
]

export const mockWorkoutHistory = [
  {
    id: uuidv4(),
    workoutId: WORKOUT_1_ID,
    title: 'Treino Peito e Tríceps',
    date: '2024-01-25',
    duration: 45,
    status: 'completed' as const,
    exercises: 8,
    notes: 'Treino excelente, consegui aumentar o peso no supino!'
  },
  {
    id: uuidv4(),
    workoutId: WORKOUT_3_ID,
    title: 'Treino Pernas',
    date: '2024-01-23',
    duration: 60,
    status: 'completed' as const,
    exercises: 6,
    notes: 'Pernas bem cansadas, mas treino completo.'
  },
  {
    id: uuidv4(),
    workoutId: WORKOUT_2_ID,
    title: 'Treino Costas e Bíceps',
    date: '2024-01-21',
    duration: 50,
    status: 'completed' as const,
    exercises: 7,
    notes: 'Foco na execução, sem pressa.'
  },
  {
    id: uuidv4(),
    workoutId: WORKOUT_4_ID,
    title: 'Treino Ombros e Abdômen',
    date: '2024-01-19',
    duration: 35,
    status: 'completed' as const,
    exercises: 8,
    notes: 'Treino mais leve, boa recuperação.'
  },
  {
    id: uuidv4(),
    workoutId: WORKOUT_1_ID,
    title: 'Treino Peito e Tríceps',
    date: '2024-01-18',
    duration: 42,
    status: 'completed' as const,
    exercises: 8,
    notes: 'Bom treino, mantive a intensidade.'
  }
]

export const mockMuscleGroups = [
  {
    id: uuidv4(),
    name: 'Peito',
    description: 'Músculos do tórax',
    exercises: 12,
    color: '#ef4444'
  },
  {
    id: uuidv4(),
    name: 'Costas',
    description: 'Músculos dorsais',
    exercises: 15,
    color: '#3b82f6'
  },
  {
    id: uuidv4(),
    name: 'Pernas',
    description: 'Músculos das pernas',
    exercises: 18,
    color: '#10b981'
  },
  {
    id: uuidv4(),
    name: 'Ombros',
    description: 'Músculos deltoides',
    exercises: 10,
    color: '#f59e0b'
  },
  {
    id: uuidv4(),
    name: 'Bíceps',
    description: 'Músculos do braço anterior',
    exercises: 8,
    color: '#8b5cf6'
  },
  {
    id: uuidv4(),
    name: 'Tríceps',
    description: 'Músculos do braço posterior',
    exercises: 9,
    color: '#ec4899'
  },
  {
    id: uuidv4(),
    name: 'Abdômen',
    description: 'Músculos abdominais',
    exercises: 14,
    color: '#06b6d4'
  },
  {
    id: uuidv4(),
    name: 'Glúteos',
    description: 'Músculos glúteos',
    exercises: 6,
    color: '#84cc16'
  }
]

export const mockExercises = [
  // PEITO
  {
    id: uuidv4(),
    name: 'Supino Reto',
    muscleGroup: 'peito',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Exercício fundamental para desenvolvimento do peitoral',
    instructions: [
      'Deite-se no banco com os pés apoiados no chão',
      'Segure a barra com pegada ligeiramente mais larga que os ombros',
      'Desça a barra até o peito de forma controlada',
      'Empurre a barra para cima até a extensão completa dos braços'
    ],
    tips: [
      'Mantenha os ombros estabilizados',
      'Não arqueie excessivamente as costas',
      'Respire na descida e expire na subida'
    ]
  },
  {
    id: uuidv4(),
    name: 'Supino Inclinado',
    muscleGroup: 'peito',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Desenvolve a parte superior do peitoral',
    instructions: [
      'Ajuste o banco em 30-45 graus de inclinação',
      'Deite-se com os pés firmes no chão',
      'Segure a barra com pegada ligeiramente mais larga que os ombros',
      'Desça controladamente até o peito superior',
      'Empurre para cima até a extensão completa'
    ],
    tips: [
      'Mantenha os ombros retraídos',
      'Controle a descida da barra',
      'Foque na parte superior do peitoral'
    ]
  },
  {
    id: uuidv4(),
    name: 'Supino Declinado',
    muscleGroup: 'peito',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Foca na parte inferior do peitoral',
    instructions: [
      'Ajuste o banco em declive de 15-30 graus',
      'Prenda os pés nas alças de segurança',
      'Segure a barra com pegada ligeiramente mais larga que os ombros',
      'Desça a barra até a parte inferior do peito',
      'Empurre para cima com força'
    ],
    tips: [
      'Mantenha os pés bem presos',
      'Controle o movimento na descida',
      'Foque na parte inferior do peitoral'
    ]
  },
  {
    id: uuidv4(),
    name: 'Crucifixo',
    muscleGroup: 'peito',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Exercício de isolamento para o peitoral',
    instructions: [
      'Deite-se no banco com halteres nas mãos',
      'Braços ligeiramente flexionados',
      'Abra os braços em arco até sentir alongamento',
      'Feche os braços como um abraço',
      'Controle o movimento em ambas as direções'
    ],
    tips: [
      'Mantenha os braços ligeiramente flexionados',
      'Foque no alongamento e contração',
      'Movimento controlado e lento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Flexão de Braço',
    muscleGroup: 'peito',
    equipment: 'peso corporal',
    difficulty: 'beginner' as const,
    description: 'Exercício básico para desenvolvimento do peitoral',
    instructions: [
      'Posicione-se em prancha com as mãos na largura dos ombros',
      'Mantenha o corpo alinhado do pescoço aos pés',
      'Desça o peito até quase tocar o chão',
      'Empurre para cima até a posição inicial',
      'Mantenha o core contraído'
    ],
    tips: [
      'Mantenha o corpo reto',
      'Controle o movimento',
      'Respire na descida e expire na subida'
    ]
  },
  {
    id: uuidv4(),
    name: 'Supino com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    difficulty: 'intermediate' as const,
    description: 'Versão com halteres do supino tradicional',
    instructions: [
      'Deite-se no banco segurando halteres',
      'Posicione os halteres na altura do peito',
      'Empurre os halteres para cima até se encontrarem',
      'Desça controladamente até o alongamento',
      'Repita o movimento'
    ],
    tips: [
      'Maior amplitude de movimento que a barra',
      'Permite movimento mais natural',
      'Desenvolve estabilidade'
    ]
  },

  // COSTAS
  {
    id: uuidv4(),
    name: 'Puxada Frontal',
    muscleGroup: 'costas',
    equipment: 'barra fixa',
    difficulty: 'intermediate' as const,
    description: 'Exercício fundamental para desenvolvimento das costas',
    instructions: [
      'Segure a barra com pegada mais larga que os ombros',
      'Pendure-se com os braços estendidos',
      'Puxe o corpo para cima até o peito tocar a barra',
      'Desça controladamente até a posição inicial',
      'Mantenha o core contraído'
    ],
    tips: [
      'Mantenha os ombros para trás',
      'Controle o movimento na descida',
      'Foque em puxar com as costas, não com os braços'
    ]
  },
  {
    id: uuidv4(),
    name: 'Remada Curvada',
    muscleGroup: 'costas',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Desenvolve a espessura das costas',
    instructions: [
      'Segure a barra com pegada ligeiramente mais larga que os ombros',
      'Incline o tronco para frente mantendo as costas retas',
      'Puxe a barra até a parte inferior do peito',
      'Mantenha os cotovelos próximos ao corpo',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha as costas retas',
      'Puxe com as costas, não com os braços',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Puxada Alta',
    muscleGroup: 'costas',
    equipment: 'cabo',
    difficulty: 'beginner' as const,
    description: 'Exercício de isolamento para as costas',
    instructions: [
      'Sente-se no aparelho com os joelhos presos',
      'Segure a barra com pegada mais larga que os ombros',
      'Puxe a barra para baixo até o peito',
      'Mantenha os ombros para trás',
      'Retorne controladamente à posição inicial'
    ],
    tips: [
      'Mantenha o peito erguido',
      'Foque em puxar com as costas',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Remada com Halteres',
    muscleGroup: 'costas',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Versão unilateral da remada',
    instructions: [
      'Apoie um joelho e uma mão no banco',
      'Segure o haltere com a mão livre',
      'Puxe o haltere até o quadril',
      'Mantenha o cotovelo próximo ao corpo',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha as costas retas',
      'Foque no movimento das costas',
      'Controle o peso'
    ]
  },
  {
    id: uuidv4(),
    name: 'Puxada com Pegada Invertida',
    muscleGroup: 'costas',
    equipment: 'barra fixa',
    difficulty: 'intermediate' as const,
    description: 'Foca na parte inferior das costas',
    instructions: [
      'Segure a barra com pegada supinada (palmas para você)',
      'Pendure-se com os braços estendidos',
      'Puxe o corpo para cima até o peito tocar a barra',
      'Desça controladamente',
      'Mantenha o core contraído'
    ],
    tips: [
      'Pegada mais estreita que os ombros',
      'Foque na parte inferior das costas',
      'Movimento controlado'
    ]
  },

  // PERNAS
  {
    id: uuidv4(),
    name: 'Agachamento',
    muscleGroup: 'pernas',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Exercício fundamental para desenvolvimento das pernas',
    instructions: [
      'Posicione a barra na parte superior das costas',
      'Pés afastados na largura dos ombros',
      'Desça flexionando joelhos e quadris',
      'Suba até a posição inicial'
    ],
    tips: [
      'Mantenha o peito erguido',
      'Joelhos alinhados com os pés',
      'Peso nos calcanhares'
    ]
  },
  {
    id: uuidv4(),
    name: 'Leg Press',
    muscleGroup: 'pernas',
    equipment: 'leg press',
    difficulty: 'beginner' as const,
    description: 'Exercício seguro para desenvolvimento das pernas',
    instructions: [
      'Sente-se no aparelho com as costas apoiadas',
      'Posicione os pés na plataforma na largura dos ombros',
      'Desça controladamente até 90 graus',
      'Empurre para cima até a extensão completa',
      'Mantenha os joelhos alinhados'
    ],
    tips: [
      'Não trave os joelhos no final',
      'Mantenha os pés paralelos',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Afundo',
    muscleGroup: 'pernas',
    equipment: 'peso corporal',
    difficulty: 'beginner' as const,
    description: 'Exercício unilateral para as pernas',
    instructions: [
      'Dê um passo à frente com uma perna',
      'Desça até o joelho de trás quase tocar o chão',
      'Empurre com a perna da frente para voltar',
      'Mantenha o tronco ereto',
      'Alterne as pernas'
    ],
    tips: [
      'Mantenha o joelho da frente sobre o tornozelo',
      'Tronco ereto durante todo o movimento',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Extensora',
    muscleGroup: 'pernas',
    equipment: 'extensora',
    difficulty: 'beginner' as const,
    description: 'Isolamento para o quadríceps',
    instructions: [
      'Sente-se no aparelho com as costas apoiadas',
      'Posicione as pernas sob o apoio',
      'Estenda as pernas até a posição reta',
      'Desça controladamente',
      'Mantenha o movimento controlado'
    ],
    tips: [
      'Não trave os joelhos no final',
      'Movimento lento e controlado',
      'Foque na contração do quadríceps'
    ]
  },
  {
    id: uuidv4(),
    name: 'Flexora',
    muscleGroup: 'pernas',
    equipment: 'flexora',
    difficulty: 'beginner' as const,
    description: 'Isolamento para o posterior da coxa',
    instructions: [
      'Deite-se no aparelho com as pernas sob o apoio',
      'Flexione os joelhos puxando o calcanhar para o glúteo',
      'Contraia o posterior da coxa',
      'Desça controladamente',
      'Mantenha o movimento controlado'
    ],
    tips: [
      'Foque na contração do posterior',
      'Movimento lento e controlado',
      'Não use impulso'
    ]
  },
  {
    id: uuidv4(),
    name: 'Panturrilha em Pé',
    muscleGroup: 'pernas',
    equipment: 'máquina',
    difficulty: 'beginner' as const,
    description: 'Desenvolvimento da panturrilha',
    instructions: [
      'Posicione os ombros sob o apoio',
      'Fique na ponta dos pés',
      'Desça controladamente até o alongamento',
      'Suba até a contração máxima',
      'Mantenha o movimento controlado'
    ],
    tips: [
      'Amplitude completa de movimento',
      'Foque na contração da panturrilha',
      'Movimento lento e controlado'
    ]
  },

  // OMBROS
  {
    id: uuidv4(),
    name: 'Desenvolvimento',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'intermediate' as const,
    description: 'Exercício fundamental para os ombros',
    instructions: [
      'Sente-se no banco com halteres nas mãos',
      'Posicione os halteres na altura dos ombros',
      'Empurre para cima até a extensão completa',
      'Desça controladamente',
      'Mantenha o core contraído'
    ],
    tips: [
      'Mantenha as costas retas',
      'Não arqueie as costas',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Elevação Lateral',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Isolamento para o deltoide médio',
    instructions: [
      'Segure halteres com os braços ao lado do corpo',
      'Eleve os braços lateralmente até a altura dos ombros',
      'Mantenha os braços ligeiramente flexionados',
      'Desça controladamente',
      'Foque no deltoide médio'
    ],
    tips: [
      'Não eleve acima da altura dos ombros',
      'Mantenha os braços ligeiramente flexionados',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Elevação Frontal',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Isolamento para o deltoide anterior',
    instructions: [
      'Segure halteres com os braços ao lado do corpo',
      'Eleve um braço à frente até a altura dos ombros',
      'Desça controladamente',
      'Alterne os braços',
      'Mantenha o movimento controlado'
    ],
    tips: [
      'Não balance o peso',
      'Foque no deltoide anterior',
      'Movimento lento e controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Remada Alta',
    muscleGroup: 'ombros',
    equipment: 'barra',
    difficulty: 'intermediate' as const,
    description: 'Desenvolve os deltoides posteriores',
    instructions: [
      'Segure a barra com pegada mais estreita que os ombros',
      'Eleve os cotovelos lateralmente',
      'Puxe a barra até a altura do peito',
      'Mantenha os cotovelos acima dos punhos',
      'Desça controladamente'
    ],
    tips: [
      'Foque em elevar os cotovelos',
      'Mantenha os ombros para trás',
      'Controle o movimento'
    ]
  },
  {
    id: uuidv4(),
    name: 'Crucifixo Invertido',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Isolamento para o deltoide posterior',
    instructions: [
      'Incline o tronco para frente',
      'Segure halteres com os braços estendidos',
      'Abra os braços lateralmente até a altura dos ombros',
      'Mantenha os braços ligeiramente flexionados',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha as costas retas',
      'Foque no deltoide posterior',
      'Movimento controlado'
    ]
  },

  // BÍCEPS
  {
    id: uuidv4(),
    name: 'Rosca Bíceps',
    muscleGroup: 'bíceps',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Exercício fundamental para os bíceps',
    instructions: [
      'Segure halteres com os braços ao lado do corpo',
      'Mantenha os cotovelos próximos ao corpo',
      'Flexione os braços elevando os halteres',
      'Contraia os bíceps no topo',
      'Desça controladamente'
    ],
    tips: [
      'Não balance o peso',
      'Mantenha os cotovelos fixos',
      'Foque na contração dos bíceps'
    ]
  },
  {
    id: uuidv4(),
    name: 'Rosca Martelo',
    muscleGroup: 'bíceps',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Desenvolve bíceps e antebraços',
    instructions: [
      'Segure halteres com pegada neutra',
      'Mantenha os cotovelos próximos ao corpo',
      'Flexione os braços mantendo a pegada neutra',
      'Contraia os bíceps no topo',
      'Desça controladamente'
    ],
    tips: [
      'Pegada neutra durante todo o movimento',
      'Foque nos bíceps e antebraços',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Rosca Scott',
    muscleGroup: 'bíceps',
    equipment: 'banco scott',
    difficulty: 'intermediate' as const,
    description: 'Isolamento completo dos bíceps',
    instructions: [
      'Apoie o tríceps no banco Scott',
      'Segure a barra com pegada supinada',
      'Flexione os braços até a contração máxima',
      'Mantenha os cotovelos apoiados',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha os cotovelos apoiados',
      'Foque no isolamento dos bíceps',
      'Movimento lento e controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Rosca Concentrada',
    muscleGroup: 'bíceps',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Isolamento unilateral dos bíceps',
    instructions: [
      'Sente-se no banco com o cotovelo apoiado na coxa',
      'Segure o haltere com uma mão',
      'Flexione o braço até a contração máxima',
      'Mantenha o cotovelo apoiado',
      'Desça controladamente'
    ],
    tips: [
      'Foque no isolamento de um braço',
      'Mantenha o cotovelo apoiado',
      'Movimento controlado'
    ]
  },

  // TRÍCEPS
  {
    id: uuidv4(),
    name: 'Tríceps Pulley',
    muscleGroup: 'tríceps',
    equipment: 'cabo',
    difficulty: 'beginner' as const,
    description: 'Isolamento para os tríceps',
    instructions: [
      'Segure a barra com pegada supinada',
      'Mantenha os cotovelos próximos ao corpo',
      'Estenda os braços até a contração máxima',
      'Mantenha os ombros estáveis',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha os cotovelos fixos',
      'Foque na extensão dos tríceps',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Tríceps Testa',
    muscleGroup: 'tríceps',
    equipment: 'halteres',
    difficulty: 'intermediate' as const,
    description: 'Isolamento completo dos tríceps',
    instructions: [
      'Deite-se no banco segurando halteres',
      'Posicione os braços perpendiculares ao chão',
      'Desça os halteres até a testa',
      'Estenda os braços até a posição inicial',
      'Mantenha os cotovelos fixos'
    ],
    tips: [
      'Mantenha os cotovelos fixos',
      'Foque na extensão dos tríceps',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Mergulho',
    muscleGroup: 'tríceps',
    equipment: 'peso corporal',
    difficulty: 'intermediate' as const,
    description: 'Exercício composto para tríceps',
    instructions: [
      'Posicione-se nas barras paralelas',
      'Desça o corpo flexionando os braços',
      'Mantenha o tronco ereto',
      'Empurre para cima até a extensão completa',
      'Controle o movimento'
    ],
    tips: [
      'Mantenha o tronco ereto',
      'Foque na extensão dos tríceps',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Tríceps Coice',
    muscleGroup: 'tríceps',
    equipment: 'halteres',
    difficulty: 'beginner' as const,
    description: 'Isolamento unilateral dos tríceps',
    instructions: [
      'Incline o tronco para frente',
      'Apoie uma mão no banco',
      'Segure o haltere com a mão livre',
      'Estenda o braço para trás',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha o cotovelo fixo',
      'Foque na extensão do tríceps',
      'Movimento controlado'
    ]
  },

  // ABDÔMEN
  {
    id: uuidv4(),
    name: 'Prancha',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'beginner' as const,
    description: 'Exercício isométrico para o core',
    instructions: [
      'Posicione-se em prancha com antebraços no chão',
      'Mantenha o corpo alinhado do pescoço aos pés',
      'Contraia o abdômen e glúteos',
      'Mantenha a posição pelo tempo determinado',
      'Respire normalmente'
    ],
    tips: [
      'Mantenha o corpo reto',
      'Contraia o core constantemente',
      'Não deixe o quadril subir ou descer'
    ]
  },
  {
    id: uuidv4(),
    name: 'Abdominal Crunch',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'beginner' as const,
    description: 'Exercício básico para o abdômen',
    instructions: [
      'Deite-se de costas com os joelhos flexionados',
      'Coloque as mãos atrás da cabeça',
      'Contraia o abdômen elevando o tronco',
      'Mantenha o pescoço relaxado',
      'Desça controladamente'
    ],
    tips: [
      'Não puxe o pescoço com as mãos',
      'Foque na contração do abdômen',
      'Movimento controlado'
    ]
  },
  {
    id: uuidv4(),
    name: 'Mountain Climber',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'intermediate' as const,
    description: 'Exercício dinâmico para o core',
    instructions: [
      'Posicione-se em prancha',
      'Mantenha o core contraído',
      'Alterne rapidamente as pernas',
      'Mantenha o tronco estável',
      'Continue o movimento pelo tempo determinado'
    ],
    tips: [
      'Mantenha o core contraído',
      'Movimento rápido e controlado',
      'Não balance o quadril'
    ]
  },
  {
    id: uuidv4(),
    name: 'Prancha Lateral',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'intermediate' as const,
    description: 'Isolamento dos oblíquos',
    instructions: [
      'Deite-se de lado apoiando o antebraço',
      'Mantenha o corpo alinhado',
      'Contraia o core lateral',
      'Mantenha a posição pelo tempo determinado',
      'Alterne os lados'
    ],
    tips: [
      'Mantenha o corpo reto',
      'Foque nos oblíquos',
      'Não deixe o quadril descer'
    ]
  },
  {
    id: uuidv4(),
    name: 'Abdominal Bicicleta',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'beginner' as const,
    description: 'Exercício para oblíquos e reto abdominal',
    instructions: [
      'Deite-se de costas com as mãos atrás da cabeça',
      'Eleve os ombros do chão',
      'Alterne os joelhos em movimento de bicicleta',
      'Toque o cotovelo no joelho oposto',
      'Mantenha o movimento controlado'
    ],
    tips: [
      'Foque nos oblíquos',
      'Movimento controlado',
      'Não puxe o pescoço'
    ]
  },
  {
    id: uuidv4(),
    name: 'Prancha com Elevação de Perna',
    muscleGroup: 'abdômen',
    equipment: 'peso corporal',
    difficulty: 'intermediate' as const,
    description: 'Exercício avançado para o core',
    instructions: [
      'Posicione-se em prancha',
      'Mantenha o core contraído',
      'Eleve uma perna mantendo o quadril estável',
      'Mantenha a posição por alguns segundos',
      'Desça e alterne as pernas'
    ],
    tips: [
      'Mantenha o quadril estável',
      'Foque na estabilidade do core',
      'Movimento controlado'
    ]
  }
]

export const mockDashboardStats = {
  monthlyWorkouts: 12,
  currentStreak: 3,
  averageDuration: 48,
  completionRate: 85,
  totalExercises: 156,
  favoriteMuscleGroup: 'Peito',
  weeklyVolume: [
    { week: 'Sem 1', volume: 180 },
    { week: 'Sem 2', volume: 220 },
    { week: 'Sem 3', volume: 195 },
    { week: 'Sem 4', volume: 250 }
  ],
  topExercises: [
    { name: 'Supino Reto', count: 24 },
    { name: 'Agachamento', count: 20 },
    { name: 'Puxada Frontal', count: 18 },
    { name: 'Desenvolvimento', count: 16 },
    { name: 'Remada Curvada', count: 14 }
  ]
}

export const mockRecentActivities = [
  {
    id: uuidv4(),
    title: 'Treino Peito e Tríceps',
    exercises: 8,
    duration: 45,
    status: 'completed' as const,
    date: 'Hoje, 14:30'
  },
  {
    id: uuidv4(),
    title: 'Treino Pernas',
    exercises: 6,
    duration: 60,
    status: 'completed' as const,
    date: 'Ontem, 09:15'
  },
  {
    id: uuidv4(),
    title: 'Treino Costas e Bíceps',
    exercises: 7,
    duration: 50,
    status: 'in-progress' as const,
    date: 'Sexta, 18:00'
  },
  {
    id: uuidv4(),
    title: 'Treino Ombros',
    exercises: 5,
    duration: 35,
    status: 'pending' as const,
    date: 'Quinta, 16:00'
  }
]

export const mockCommunityPosts = [
  {
    id: uuidv4(),
    author: 'Maria Santos',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    title: 'Dica para melhorar o supino',
    content: 'Consegui aumentar meu supino em 10kg seguindo essas dicas...',
    likes: 24,
    comments: 8,
    createdAt: '2024-01-25T10:30:00Z'
  },
  {
    id: uuidv4(),
    author: 'Carlos Oliveira',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    title: 'Rotina de treino ABC',
    content: 'Compartilhando minha rotina que me ajudou muito...',
    likes: 18,
    comments: 12,
    createdAt: '2024-01-24T15:45:00Z'
  }
]

export const mockNotifications = [
  {
    id: uuidv4(),
    type: 'workout_reminder' as const,
    title: 'Lembrete de Treino',
    message: 'Hora do seu treino de pernas!',
    read: false,
    createdAt: '2024-01-25T14:00:00Z'
  },
  {
    id: uuidv4(),
    type: 'achievement' as const,
    title: 'Nova Conquista',
    message: 'Você completou 30 treinos este mês!',
    read: true,
    createdAt: '2024-01-24T20:30:00Z'
  },
  {
    id: uuidv4(),
    type: 'social' as const,
    title: 'Novo Seguidor',
    message: 'João Silva começou a te seguir!',
    read: false,
    createdAt: '2024-01-24T18:15:00Z'
  },
  {
    id: uuidv4(),
    type: 'system' as const,
    title: 'Atualização do App',
    message: 'Nova versão disponível com melhorias de performance!',
    read: true,
    createdAt: '2024-01-23T10:00:00Z'
  }
]

// Dados da comunidade - treinos públicos
export const mockCommunityWorkouts = [
  {
    id: uuidv4(),
    title: 'Treino Peito e Tríceps',
    exerciseCount: 8,
    duration: 45,
    difficulty: 'intermediate' as const,
    muscleGroups: ['peito', 'tríceps'],
    createdAt: '2024-01-20',
    author: {
      id: uuidv4(),
      name: 'João Silva',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 24,
    saves: 12,
    description: 'Treino focado em peito e tríceps para desenvolvimento muscular',
    tags: ['musculação', 'peito', 'tríceps', 'intermediário'],
    exercises: [
      {
        id: uuidv4(),
        name: 'Supino Reto',
        sets: 4,
        reps: '8-12',
        weight: '80kg',
        rest: '2min',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Supino Inclinado',
        sets: 3,
        reps: '10-12',
        weight: '70kg',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Crucifixo',
        sets: 3,
        reps: '12-15',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Testa',
        sets: 3,
        reps: '10-12',
        weight: '30kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Corda',
        sets: 3,
        reps: '12-15',
        weight: '40kg',
        rest: '45s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Tríceps Francês',
        sets: 3,
        reps: '10-12',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: uuidv4(),
        name: 'Paralelas',
        sets: 3,
        reps: '8-12',
        weight: 'Corporal',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: uuidv4(),
        name: 'Flexão Diamante',
        sets: 2,
        reps: '10-15',
        weight: 'Corporal',
        rest: '45s',
        muscleGroup: 'tríceps'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Treino Pernas Intenso',
    exerciseCount: 6,
    duration: 60,
    difficulty: 'advanced' as const,
    muscleGroups: ['pernas'],
    createdAt: '2024-01-18',
    author: {
      id: uuidv4(),
      name: 'Maria Santos',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 18,
    saves: 8,
    description: 'Treino pesado para pernas com foco em força e hipertrofia',
    tags: ['pernas', 'força', 'avançado', 'hipertrofia'],
    exercises: [
      {
        id: uuidv4(),
        name: 'Agachamento Livre',
        sets: 4,
        reps: '6-8',
        weight: '120kg',
        rest: '3min',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Leg Press',
        sets: 4,
        reps: '12-15',
        weight: '200kg',
        rest: '2min',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Stiff',
        sets: 3,
        reps: '8-10',
        weight: '100kg',
        rest: '2min',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Cadeira Extensora',
        sets: 3,
        reps: '15-20',
        weight: '60kg',
        rest: '90s',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Cadeira Flexora',
        sets: 3,
        reps: '15-20',
        weight: '50kg',
        rest: '90s',
        muscleGroup: 'pernas'
      },
      {
        id: uuidv4(),
        name: 'Panturrilha em Pé',
        sets: 4,
        reps: '20-25',
        weight: '80kg',
        rest: '60s',
        muscleGroup: 'pernas'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Treino Costas e Bíceps',
    exerciseCount: 7,
    duration: 50,
    difficulty: 'intermediate' as const,
    muscleGroups: ['costas', 'bíceps'],
    createdAt: '2024-01-15',
    author: {
      id: uuidv4(),
      name: 'Carlos Oliveira',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 32,
    saves: 15,
    description: 'Treino completo para costas e bíceps com exercícios variados',
    tags: ['costas', 'bíceps', 'intermediário', 'completo'],
    exercises: [
      { id: uuidv4(), name: 'Puxada Frontal', sets: 4, reps: '8-12', weight: '70kg', rest: '2min', muscleGroup: 'costas' },
      { id: uuidv4(), name: 'Remada Curvada', sets: 4, reps: '8-12', weight: '60kg', rest: '2min', muscleGroup: 'costas' },
      { id: uuidv4(), name: 'Puxada Triângulo', sets: 3, reps: '10-12', weight: '50kg', rest: '90s', muscleGroup: 'costas' },
      { id: uuidv4(), name: 'Rosca Direta', sets: 3, reps: '10-12', weight: '20kg', rest: '60s', muscleGroup: 'bíceps' },
      { id: uuidv4(), name: 'Rosca Martelo', sets: 3, reps: '12-15', weight: '15kg', rest: '60s', muscleGroup: 'bíceps' },
      { id: uuidv4(), name: 'Rosca Concentrada', sets: 3, reps: '12-15', weight: '12kg', rest: '60s', muscleGroup: 'bíceps' },
      { id: uuidv4(), name: 'Puxada Alta', sets: 3, reps: '10-12', weight: '40kg', rest: '90s', muscleGroup: 'costas' }
    ]
  },
  {
    id: uuidv4(),
    title: 'Treino Ombros',
    exerciseCount: 5,
    duration: 35,
    difficulty: 'beginner' as const,
    muscleGroups: ['ombros'],
    createdAt: '2024-01-12',
    author: {
      id: uuidv4(),
      name: 'Ana Costa',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 15,
    saves: 6,
    description: 'Treino básico para ombros, ideal para iniciantes',
    tags: ['ombros', 'iniciante', 'básico', 'desenvolvimento'],
    exercises: [
      { id: uuidv4(), name: 'Desenvolvimento', sets: 3, reps: '10-12', weight: '20kg', rest: '90s', muscleGroup: 'ombros' },
      { id: uuidv4(), name: 'Elevação Lateral', sets: 3, reps: '12-15', weight: '8kg', rest: '60s', muscleGroup: 'ombros' },
      { id: uuidv4(), name: 'Elevação Frontal', sets: 3, reps: '12-15', weight: '8kg', rest: '60s', muscleGroup: 'ombros' },
      { id: uuidv4(), name: 'Elevação Posterior', sets: 3, reps: '12-15', weight: '6kg', rest: '60s', muscleGroup: 'ombros' },
      { id: uuidv4(), name: 'Encolhimento', sets: 3, reps: '15-20', weight: '15kg', rest: '60s', muscleGroup: 'ombros' }
    ]
  },
  {
    id: uuidv4(),
    title: 'Treino Abdômen',
    exerciseCount: 8,
    duration: 25,
    difficulty: 'intermediate' as const,
    muscleGroups: ['abdômen'],
    createdAt: '2024-01-10',
    author: {
      id: uuidv4(),
      name: 'Pedro Lima',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 28,
    saves: 11,
    description: 'Treino focado em abdômen com exercícios variados',
    tags: ['abdômen', 'core', 'intermediário', 'definição'],
    exercises: [
      { id: uuidv4(), name: 'Prancha', sets: 3, reps: '45s', weight: 'Corporal', rest: '60s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Abdominal Crunch', sets: 3, reps: '20-25', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Abdominal Bicicleta', sets: 3, reps: '20-25', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Mountain Climber', sets: 3, reps: '30s', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Russian Twist', sets: 3, reps: '20-25', weight: '5kg', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Leg Raise', sets: 3, reps: '15-20', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Dead Bug', sets: 3, reps: '12-15', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Side Plank', sets: 2, reps: '30s', weight: 'Corporal', rest: '60s', muscleGroup: 'abdômen' }
    ]
  },
  {
    id: uuidv4(),
    title: 'Treino Full Body',
    exerciseCount: 10,
    duration: 70,
    difficulty: 'advanced' as const,
    muscleGroups: ['peito', 'costas', 'pernas', 'ombros'],
    createdAt: '2024-01-08',
    author: {
      id: uuidv4(),
      name: 'Lucas Ferreira',
      avatar: 'https://github.com/rodrigordgfs.png'
    },
    likes: 45,
    saves: 22,
    description: 'Treino completo para todo o corpo, ideal para quem tem pouco tempo',
    tags: ['full body', 'completo', 'avançado', 'eficiência'],
    exercises: [
      { id: uuidv4(), name: 'Burpees', sets: 3, reps: '10-12', weight: 'Corporal', rest: '90s', muscleGroup: 'peito' },
      { id: uuidv4(), name: 'Agachamento', sets: 3, reps: '15-20', weight: 'Corporal', rest: '60s', muscleGroup: 'pernas' },
      { id: uuidv4(), name: 'Flexão', sets: 3, reps: '12-15', weight: 'Corporal', rest: '60s', muscleGroup: 'peito' },
      { id: uuidv4(), name: 'Prancha', sets: 3, reps: '45s', weight: 'Corporal', rest: '60s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Mountain Climber', sets: 3, reps: '30s', weight: 'Corporal', rest: '45s', muscleGroup: 'abdômen' },
      { id: uuidv4(), name: 'Jumping Jacks', sets: 3, reps: '30s', weight: 'Corporal', rest: '45s', muscleGroup: 'pernas' },
      { id: uuidv4(), name: 'Lunges', sets: 3, reps: '12-15', weight: 'Corporal', rest: '60s', muscleGroup: 'pernas' },
      { id: uuidv4(), name: 'Tríceps Dips', sets: 3, reps: '10-12', weight: 'Corporal', rest: '60s', muscleGroup: 'tríceps' },
      { id: uuidv4(), name: 'Pike Push-ups', sets: 3, reps: '8-10', weight: 'Corporal', rest: '60s', muscleGroup: 'ombros' },
      { id: uuidv4(), name: 'Superman', sets: 3, reps: '15-20', weight: 'Corporal', rest: '45s', muscleGroup: 'costas' }
    ]
  }
]
