'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PlusCircle, Save, Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CreateMuscleGroupPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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
      alert('Por favor, preencha o nome do grupo muscular')
      return
    }

    setIsLoading(true)
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvando grupo muscular:', { name, description, image: selectedImage })
    
    setIsLoading(false)
    alert('Grupo muscular salvo com sucesso!')
    
    // Limpar formulário
    setName('')
    setDescription('')
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Cadastro de Grupos Musculares</h1>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="muscle-group-name" className="block text-sm font-medium mb-2">
                    Nome do Grupo Muscular
                  </label>
                  <input
                    id="muscle-group-name"
                    type="text"
                    placeholder="Ex: Peito, Costas, Pernas..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <label htmlFor="muscle-group-description" className="block text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    id="muscle-group-description"
                    placeholder="Descreva o grupo muscular, seus músculos principais e características..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image-upload" className="block text-sm font-medium">
                  Imagem do Grupo Muscular
                </label>
                
                {/* Image Upload Area */}
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview da imagem selecionada"
                        width={400}
                        height={256}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg border border-input"
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
                    <div className="w-full h-48 sm:h-56 lg:h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center space-y-3 sm:space-y-4 hover:border-muted-foreground/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="image-upload"
                        aria-label="Selecionar imagem do grupo muscular"
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
                disabled={!name.trim() || isLoading}
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
                    <span className="hidden sm:inline">Salvar Grupo Muscular</span>
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
