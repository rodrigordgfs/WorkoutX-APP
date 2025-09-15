'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { PlusCircle, Save, Upload, X, Image as ImageIcon } from 'lucide-react'
import { useCreateMuscleGroup } from '@/hooks/use-muscle-groups'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Schema de validação com Zod
const muscleGroupSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  image: z
    .string()
    .min(1, 'Imagem é obrigatória')
    .refine((base64) => {
      if (!base64) return false
      // Verificar se é uma string base64 válida
      const base64Regex = /^data:image\/(jpeg|jpg|png);base64,/
      return base64Regex.test(base64)
    }, { message: 'Formato de imagem deve ser JPG, JPEG ou PNG' })
})

type MuscleGroupFormData = z.infer<typeof muscleGroupSchema>

export default function CreateMuscleGroupPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const createMuscleGroupMutation = useCreateMuscleGroup()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm<MuscleGroupFormData>({
    resolver: zodResolver(muscleGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      image: ''
    }
  })


  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tamanho do arquivo
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Arquivo muito grande', {
          description: 'A imagem deve ter no máximo 5MB.',
          duration: 3000,
        })
        return
      }

      // Validar tipo do arquivo
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        toast.error('Formato inválido', {
          description: 'Apenas arquivos JPG, JPEG ou PNG são permitidos.',
          duration: 3000,
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setValue('image', base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setValue('image', '')
    setImagePreview(null)
  }


  const onSubmit = async (data: MuscleGroupFormData) => {
    createMuscleGroupMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success('Grupo muscular salvo com sucesso!', {
          description: `O grupo "${response.name}" foi cadastrado com sucesso.`,
          duration: 4000,
        })
        
        // Limpar formulário
        reset({
          name: '',
          description: '',
          image: ''
        })
        setImagePreview(null)
      },
      onError: (error) => {
        console.error('Erro ao salvar grupo muscular:', error)
        toast.error('Erro ao salvar grupo muscular', {
          description: error.message || 'Ocorreu um erro inesperado. Tente novamente.',
          duration: 5000,
        })
      }
    })
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="muscle-group-name" className="block text-sm font-medium mb-2">
                    Nome do Grupo Muscular *
                  </label>
                  <input
                    id="muscle-group-name"
                    type="text"
                    placeholder="Ex: Peito, Costas, Pernas..."
                    {...register('name')}
                    className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 ${
                      errors.name ? 'border-red-500' : 'border-input bg-background'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Description Textarea */}
                <div>
                  <label htmlFor="muscle-group-description" className="block text-sm font-medium mb-2">
                    Descrição *
                  </label>
                  <textarea
                    id="muscle-group-description"
                    placeholder="Descreva o grupo muscular, seus músculos principais e características..."
                    {...register('description')}
                    rows={8}
                    className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 resize-none ${
                      errors.description ? 'border-red-500' : 'border-input bg-background'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image-upload" className="block text-sm font-medium">
                  Imagem do Grupo Muscular *
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
                    <div className={`w-full h-48 sm:h-56 lg:h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-3 sm:space-y-4 hover:border-muted-foreground/50 transition-colors cursor-pointer ${
                      errors.image ? 'border-red-500' : 'border-muted-foreground/25'
                    }`}>
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

                {/* Error message for image */}
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
                )}

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
                type="submit"
                disabled={createMuscleGroupMutation.isPending || isSubmitting}
                className="w-full sm:w-auto sm:min-w-[120px] text-xs sm:text-sm"
              >
                {createMuscleGroupMutation.isPending || isSubmitting ? (
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
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
