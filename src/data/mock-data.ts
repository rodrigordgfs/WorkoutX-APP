// Mock data for the WorkoutX application

export const mockUser = {
  id: '1',
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
    id: '1',
    title: 'Treino Peito e Tríceps',
    exerciseCount: 8,
    duration: 45,
    difficulty: 'intermediate' as const,
    muscleGroups: ['peito', 'tríceps'],
    createdAt: '2024-01-20',
    lastPerformed: '2024-01-25',
    exercises: [
      {
        id: '1',
        name: 'Supino Reto',
        sets: 4,
        reps: '8-12',
        weight: '80kg',
        rest: '2min',
        muscleGroup: 'peito'
      },
      {
        id: '2',
        name: 'Supino Inclinado',
        sets: 3,
        reps: '10-12',
        weight: '70kg',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: '3',
        name: 'Crucifixo',
        sets: 3,
        reps: '12-15',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'peito'
      },
      {
        id: '4',
        name: 'Paralelas',
        sets: 3,
        reps: '8-12',
        weight: 'Corporal',
        rest: '90s',
        muscleGroup: 'peito'
      },
      {
        id: '5',
        name: 'Tríceps Testa',
        sets: 3,
        reps: '10-12',
        weight: '30kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: '6',
        name: 'Tríceps Corda',
        sets: 3,
        reps: '12-15',
        weight: '40kg',
        rest: '45s',
        muscleGroup: 'tríceps'
      },
      {
        id: '7',
        name: 'Tríceps Francês',
        sets: 3,
        reps: '10-12',
        weight: '25kg',
        rest: '60s',
        muscleGroup: 'tríceps'
      },
      {
        id: '8',
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
    id: '2',
    title: 'Treino Costas e Bíceps',
    exerciseCount: 7,
    duration: 50,
    difficulty: 'intermediate' as const,
    muscleGroups: ['costas', 'bíceps'],
    createdAt: '2024-01-18',
    lastPerformed: '2024-01-23',
    exercises: [
      {
        id: '9',
        name: 'Puxada Frontal',
        sets: 4,
        reps: '8-12',
        weight: '70kg',
        rest: '2min',
        muscleGroup: 'costas'
      },
      {
        id: '10',
        name: 'Remada Curvada',
        sets: 4,
        reps: '8-10',
        weight: '60kg',
        rest: '2min',
        muscleGroup: 'costas'
      },
      {
        id: '11',
        name: 'Remada Unilateral',
        sets: 3,
        reps: '10-12',
        weight: '30kg',
        rest: '90s',
        muscleGroup: 'costas'
      },
      {
        id: '12',
        name: 'Pullover',
        sets: 3,
        reps: '12-15',
        weight: '20kg',
        rest: '60s',
        muscleGroup: 'costas'
      },
      {
        id: '13',
        name: 'Rosca Direta',
        sets: 4,
        reps: '10-12',
        weight: '15kg',
        rest: '60s',
        muscleGroup: 'bíceps'
      },
      {
        id: '14',
        name: 'Rosca Martelo',
        sets: 3,
        reps: '12-15',
        weight: '12kg',
        rest: '45s',
        muscleGroup: 'bíceps'
      },
      {
        id: '15',
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
    id: '3',
    title: 'Treino Pernas',
    exerciseCount: 6,
    duration: 60,
    difficulty: 'advanced' as const,
    muscleGroups: ['pernas', 'glúteos'],
    createdAt: '2024-01-16',
    lastPerformed: '2024-01-21',
    exercises: [
      {
        id: '16',
        name: 'Agachamento',
        sets: 4,
        reps: '8-12',
        weight: '100kg',
        rest: '3min',
        muscleGroup: 'pernas'
      },
      {
        id: '17',
        name: 'Leg Press',
        sets: 4,
        reps: '12-15',
        weight: '200kg',
        rest: '2min',
        muscleGroup: 'pernas'
      },
      {
        id: '18',
        name: 'Extensora',
        sets: 3,
        reps: '12-15',
        weight: '60kg',
        rest: '60s',
        muscleGroup: 'pernas'
      },
      {
        id: '19',
        name: 'Flexora',
        sets: 3,
        reps: '12-15',
        weight: '50kg',
        rest: '60s',
        muscleGroup: 'pernas'
      },
      {
        id: '20',
        name: 'Panturrilha em Pé',
        sets: 4,
        reps: '15-20',
        weight: '80kg',
        rest: '45s',
        muscleGroup: 'pernas'
      },
      {
        id: '21',
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
    id: '4',
    title: 'Treino Ombros e Abdômen',
    exerciseCount: 8,
    duration: 35,
    difficulty: 'beginner' as const,
    muscleGroups: ['ombros', 'abdômen'],
    createdAt: '2024-01-14',
    lastPerformed: '2024-01-19',
    exercises: [
      {
        id: '22',
        name: 'Desenvolvimento',
        sets: 4,
        reps: '8-12',
        weight: '50kg',
        rest: '2min',
        muscleGroup: 'ombros'
      },
      {
        id: '23',
        name: 'Elevação Lateral',
        sets: 4,
        reps: '12-15',
        weight: '8kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: '24',
        name: 'Elevação Frontal',
        sets: 3,
        reps: '12-15',
        weight: '8kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: '25',
        name: 'Crucifixo Inverso',
        sets: 3,
        reps: '12-15',
        weight: '6kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: '26',
        name: 'Encolhimento',
        sets: 3,
        reps: '12-15',
        weight: '20kg',
        rest: '60s',
        muscleGroup: 'ombros'
      },
      {
        id: '27',
        name: 'Abdominal Supra',
        sets: 3,
        reps: '15-20',
        weight: 'Corporal',
        rest: '45s',
        muscleGroup: 'abdômen'
      },
      {
        id: '28',
        name: 'Prancha',
        sets: 3,
        reps: '30-60s',
        weight: 'Corporal',
        rest: '60s',
        muscleGroup: 'abdômen'
      },
      {
        id: '29',
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
    id: '1',
    workoutId: '1',
    title: 'Treino Peito e Tríceps',
    date: '2024-01-25',
    duration: 45,
    status: 'completed' as const,
    exercises: 8,
    notes: 'Treino excelente, consegui aumentar o peso no supino!'
  },
  {
    id: '2',
    workoutId: '3',
    title: 'Treino Pernas',
    date: '2024-01-23',
    duration: 60,
    status: 'completed' as const,
    exercises: 6,
    notes: 'Pernas bem cansadas, mas treino completo.'
  },
  {
    id: '3',
    workoutId: '2',
    title: 'Treino Costas e Bíceps',
    date: '2024-01-21',
    duration: 50,
    status: 'completed' as const,
    exercises: 7,
    notes: 'Foco na execução, sem pressa.'
  },
  {
    id: '4',
    workoutId: '4',
    title: 'Treino Ombros e Abdômen',
    date: '2024-01-19',
    duration: 35,
    status: 'completed' as const,
    exercises: 8,
    notes: 'Treino mais leve, boa recuperação.'
  },
  {
    id: '5',
    workoutId: '1',
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
    id: '1',
    name: 'Peito',
    description: 'Músculos do tórax',
    exercises: 12,
    color: '#ef4444'
  },
  {
    id: '2',
    name: 'Costas',
    description: 'Músculos dorsais',
    exercises: 15,
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'Pernas',
    description: 'Músculos das pernas',
    exercises: 18,
    color: '#10b981'
  },
  {
    id: '4',
    name: 'Ombros',
    description: 'Músculos deltoides',
    exercises: 10,
    color: '#f59e0b'
  },
  {
    id: '5',
    name: 'Bíceps',
    description: 'Músculos do braço anterior',
    exercises: 8,
    color: '#8b5cf6'
  },
  {
    id: '6',
    name: 'Tríceps',
    description: 'Músculos do braço posterior',
    exercises: 9,
    color: '#ec4899'
  },
  {
    id: '7',
    name: 'Abdômen',
    description: 'Músculos abdominais',
    exercises: 14,
    color: '#06b6d4'
  },
  {
    id: '8',
    name: 'Glúteos',
    description: 'Músculos glúteos',
    exercises: 6,
    color: '#84cc16'
  }
]

export const mockExercises = [
  {
    id: '1',
    name: 'Supino Reto',
    muscleGroup: 'peito',
    equipment: 'barra',
    difficulty: 'intermediate',
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
    id: '2',
    name: 'Agachamento',
    muscleGroup: 'pernas',
    equipment: 'barra',
    difficulty: 'intermediate',
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
    id: '1',
    title: 'Treino Peito e Tríceps',
    exercises: 8,
    duration: 45,
    status: 'completed' as const,
    date: 'Hoje, 14:30'
  },
  {
    id: '2',
    title: 'Treino Pernas',
    exercises: 6,
    duration: 60,
    status: 'completed' as const,
    date: 'Ontem, 09:15'
  },
  {
    id: '3',
    title: 'Treino Costas e Bíceps',
    exercises: 7,
    duration: 50,
    status: 'in-progress' as const,
    date: 'Sexta, 18:00'
  },
  {
    id: '4',
    title: 'Treino Ombros',
    exercises: 5,
    duration: 35,
    status: 'pending' as const,
    date: 'Quinta, 16:00'
  }
]

export const mockCommunityPosts = [
  {
    id: '1',
    author: 'Maria Santos',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    title: 'Dica para melhorar o supino',
    content: 'Consegui aumentar meu supino em 10kg seguindo essas dicas...',
    likes: 24,
    comments: 8,
    createdAt: '2024-01-25T10:30:00Z'
  },
  {
    id: '2',
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
    id: '1',
    type: 'workout_reminder',
    title: 'Lembrete de Treino',
    message: 'Hora do seu treino de pernas!',
    read: false,
    createdAt: '2024-01-25T14:00:00Z'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Nova Conquista',
    message: 'Você completou 30 treinos este mês!',
    read: true,
    createdAt: '2024-01-24T20:30:00Z'
  }
]
