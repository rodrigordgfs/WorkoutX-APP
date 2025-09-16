'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { PlusCircle, Save, Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateMuscleGroup, useUpdateMuscleGroup } from '@/hooks/use-muscle-groups'
import Image from 'next/image'

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

interface MuscleGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  editData?: {
    id: string
    name: string
    description: string
    image: string
  } | null
}

export function MuscleGroupModal({ isOpen, onClose, onSuccess, editData }: MuscleGroupModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const createMuscleGroupMutation = useCreateMuscleGroup()
  const updateMuscleGroupMutation = useUpdateMuscleGroup()
  
  const isEditing = !!editData

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm<MuscleGroupFormData>({
    resolver: zodResolver(muscleGroupSchema)
  })

  // Configurar preview da imagem e resetar formulário quando estiver editando
  useEffect(() => {
    if (editData) {
      // Resetar formulário com os dados de edição
      reset({
        name: editData.name,
        description: editData.description,
        image: editData.image
      })
      
      // Configurar preview da imagem
      if (editData.image) {
        setImagePreview(editData.image)
      } else {
        setImagePreview(null)
      }
    } else {
      // Limpar formulário quando não estiver editando
      reset({
        name: '',
        description: '',
        image: ''
      })
      setImagePreview(null)
    }
  }, [editData, reset])

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

  const handleClose = () => {
    reset()
    setImagePreview(null)
    onClose()
  }

  const onSubmit = async (data: MuscleGroupFormData) => {
    if (isEditing && editData) {
      // Atualizar grupo muscular
      updateMuscleGroupMutation.mutate(
        { id: editData.id, ...data },
        {
          onSuccess: (response) => {
            toast.success('Grupo muscular atualizado com sucesso!', {
              description: `O grupo "${response.name}" foi atualizado com sucesso.`,
              duration: 4000,
            })
            
            // Fechar modal e limpar formulário
            handleClose()
            
            // Chamar callback de sucesso se fornecido
            onSuccess?.()
          },
          onError: (error) => {
            console.error('Erro ao atualizar grupo muscular:', error)
            toast.error('Erro ao atualizar grupo muscular', {
              description: error.message || 'Ocorreu um erro inesperado. Tente novamente.',
              duration: 5000,
            })
          }
        }
      )
    } else {
      // Criar novo grupo muscular
      createMuscleGroupMutation.mutate(data, {
        onSuccess: (response) => {
          toast.success('Grupo muscular salvo com sucesso!', {
            description: `O grupo "${response.name}" foi cadastrado com sucesso.`,
            duration: 4000,
          })
          
          // Fechar modal e limpar formulário
          handleClose()
          
          // Chamar callback de sucesso se fornecido
          onSuccess?.()
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
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-lg border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header do Modal */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {isEditing ? (
                  <ImageIcon className="h-5 w-5 text-primary" />
                ) : (
                  <PlusCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <h2 className="text-xl font-bold">
                {isEditing ? 'Editar Grupo Muscular' : 'Cadastrar Grupo Muscular'}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda - Campos do Formulário */}
              <div className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="modal-muscle-group-name" className="block text-sm font-medium mb-2">
                    Nome do Grupo Muscular *
                  </label>
                  <input
                    id="modal-muscle-group-name"
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

                {/* Descrição */}
                <div>
                  <label htmlFor="modal-muscle-group-description" className="block text-sm font-medium mb-2">
                    Descrição *
                  </label>
                  <textarea
                    id="modal-muscle-group-description"
                    placeholder="Descreva o grupo muscular, seus músculos principais e características..."
                    {...register('description')}
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 resize-none ${
                      errors.description ? 'border-red-500' : 'border-input bg-background'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Coluna Direita - Upload de Imagem */}
              <div className="space-y-2">
                <label htmlFor="modal-image-upload" className="block text-sm font-medium">
                  Imagem do Grupo Muscular *
                </label>
                
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview da imagem selecionada"
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg border border-input"
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
                    <div className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-3 hover:border-muted-foreground/50 transition-colors cursor-pointer ${
                      errors.image ? 'border-red-500' : 'border-muted-foreground/25'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="modal-image-upload"
                        aria-label="Selecionar imagem do grupo muscular"
                      />
                      <div className="text-center px-4">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para selecionar uma imagem
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG ou JPEG até 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
                )}

                {!imagePreview && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('modal-image-upload')?.click()}
                      className="w-full text-sm"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Imagem
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Botões do Modal */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="text-sm"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createMuscleGroupMutation.isPending || updateMuscleGroupMutation.isPending || isSubmitting}
                className="text-sm min-w-[120px]"
              >
                {createMuscleGroupMutation.isPending || updateMuscleGroupMutation.isPending || isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditing ? 'Atualizando...' : 'Salvando...'}
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Atualizar Grupo' : 'Salvar Grupo'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
