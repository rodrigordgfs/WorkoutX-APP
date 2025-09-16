'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Edit, 
  Camera, 
  Settings, 
  Bell, 
  Shield, 
  Download,
  LogOut,
  Trophy,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUser } from '@/data/mock-data'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    setIsLoading(true)
    
    // Simular salvamento
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      if (selectedImage) {
        alert('Foto de perfil atualizada com sucesso!')
        // Aqui você salvaria a nova imagem no backend
        console.log('Nova imagem selecionada:', selectedImage)
      } else {
        alert('Perfil atualizado com sucesso!')
      }
    }, 1000)
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'pro':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'premium':
        return <Crown className="h-4 w-4" />
      case 'pro':
        return <Trophy className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        </div>
        <Button onClick={handleEditProfile} disabled={isLoading}>
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Edit className="h-4 w-4 mr-2" />
          )}
          {isEditing ? 'Salvando...' : 'Editar Perfil'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={imagePreview || mockUser.avatar}
                      alt="Avatar do usuário"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    variant="secondary"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="avatar-upload"
                    aria-label="Selecionar nova foto de perfil"
                  />
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  
                  {/* Plan Badge */}
                  <Badge className={`${getPlanColor(mockUser.plan)} text-white border-0`}>
                    {getPlanIcon(mockUser.plan)}
                    <span className="ml-1 capitalize">{mockUser.plan}</span>
                  </Badge>
                </div>

                {/* Join Date */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {formatJoinDate(mockUser.joinDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Estatísticas Rápidas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm">Treinos Totais</span>
                  </div>
                  <span className="font-semibold">{mockUser.stats.totalWorkouts}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Sequência Atual</span>
                  </div>
                  <span className="font-semibold">{mockUser.stats.currentStreak} dias</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Duração Média</span>
                  </div>
                  <span className="font-semibold">{mockUser.stats.averageDuration} min</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Taxa de Conclusão</span>
                  </div>
                  <span className="font-semibold">{mockUser.stats.completionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Configurações da Conta</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Alterar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Senha</p>
                      <p className="text-sm text-muted-foreground">••••••••</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Alterar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Notificações</p>
                      <p className="text-sm text-muted-foreground">Configurar alertas</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Configurações do App</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Preferências</p>
                      <p className="text-sm text-muted-foreground">Tema, idioma e unidades</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Exportar Dados</p>
                      <p className="text-sm text-muted-foreground">Baixar seus dados</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-red-600 dark:text-red-400">Zona de Perigo</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <div className="flex items-center space-x-3">
                    <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-300">Sair da Conta</p>
                      <p className="text-sm text-red-600 dark:text-red-400">Fazer logout da sua conta</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
