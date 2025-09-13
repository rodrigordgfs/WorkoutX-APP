'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dumbbell, Save, Upload, X, Image as ImageIcon, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockMuscleGroups } from '@/data/mock-data'

export default function CreateExercisePage() {
  const [name, setName] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Por favor, preencha o nome do exercício')
      return
    }

    if (!muscleGroup) {
      alert('Por favor, selecione um grupo muscular')
      return
    }

    setIsLoading(true)
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvando exercício:', { 
      name, 
      muscleGroup, 
      description, 
      videoUrl, 
      image: selectedImage 
    })
    
    setIsLoading(false)
    alert('Exercício salvo com sucesso!')
    
    // Limpar formulário
    setName('')
    setMuscleGroup('')
    setDescription('')
    setVideoUrl('')
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Cadastro de Exercícios</h1>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="exercise-name" className="block text-sm font-medium mb-2">
                    Nome do Exercício
                  </label>
                  <input
                    id="exercise-name"
                    type="text"
                    placeholder="Ex: Supino Reto, Agachamento..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                {/* Muscle Group Select */}
                <div>
                  <label htmlFor="muscle-group-select" className="block text-sm font-medium mb-2">
                    Grupo Muscular
                  </label>
                  <select
                    id="muscle-group-select"
                    value={muscleGroup}
                    onChange={(e) => setMuscleGroup(e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Selecione um grupo muscular</option>
                    {mockMuscleGroups.map((group) => (
                      <option key={group.id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Video URL Input */}
                <div>
                  <label htmlFor="video-url" className="block text-sm font-medium mb-2">
                    URL do Vídeo
                  </label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="video-url"
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="pl-10 w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>

                {/* Description Textarea */}
                <div>
                  <label htmlFor="exercise-description" className="block text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    id="exercise-description"
                    placeholder="Descreva como executar o exercício, posicionamento, dicas importantes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image-upload" className="block text-sm font-medium">
                  Imagem do Exercício
                </label>
                
                {/* Image Upload Area */}
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview da imagem selecionada"
                        width={400}
                        height={360}
                        className="w-full h-48 sm:h-56 lg:h-[410px] object-cover rounded-lg border border-input"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-48 sm:h-56 lg:h-[360px] border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center space-y-3 sm:space-y-4 hover:border-muted-foreground/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="image-upload"
                        aria-label="Selecionar imagem do exercício"
                      />
                      <div className="text-center px-4">
                        <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Clique para selecionar uma imagem
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG ou JPEG até 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button (if no image selected) */}
                {!imagePreview && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="w-full text-xs sm:text-sm"
                    >
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="hidden sm:inline">Selecionar Imagem</span>
                      <span className="sm:hidden">Selecionar</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center sm:justify-end pt-4 border-t">
              <Button
                onClick={handleSave}
                disabled={!name.trim() || !muscleGroup || isLoading}
                className="w-full sm:w-auto sm:min-w-[120px] text-xs sm:text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="hidden sm:inline">Salvando...</span>
                    <span className="sm:hidden">Salvando...</span>
                  </div>
                ) : (
                  <>
                    <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="hidden sm:inline">Salvar Exercício</span>
                    <span className="sm:hidden">Salvar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
