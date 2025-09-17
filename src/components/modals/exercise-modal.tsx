'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { X, Save, Upload, Image as ImageIcon, Video, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useMuscleGroupsContext } from '@/contexts/muscle-groups-context'
import { useCreateExercise, useUpdateExercise, type Exercise } from '@/hooks/use-exercises'

// Schema de validação
const exerciseSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  muscleGroupId: z.string().min(1, 'Grupo muscular é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória').min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  videoUrl: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: 'URL do vídeo deve ser válida'
  }),
  image: z.string().optional()
}).refine((data) => {
  console.log('Validação do schema - muscleGroupId:', data.muscleGroupId)
  return data.muscleGroupId && data.muscleGroupId.length > 0
}, {
  message: 'Grupo muscular é obrigatório',
  path: ['muscleGroupId']
})

type ExerciseFormData = z.infer<typeof exerciseSchema>

interface ExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  editData?: Exercise | null
}

export function ExerciseModal({ isOpen, onClose, onSuccess, editData }: ExerciseModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { muscleGroups, isLoading: muscleGroupsLoading } = useMuscleGroupsContext()
  const createExerciseMutation = useCreateExercise()
  const updateExerciseMutation = useUpdateExercise()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: editData?.name || '',
      muscleGroupId: editData?.muscleGroupId || '',
      description: editData?.description || '',
      videoUrl: editData?.videoUrl || '',
      image: editData?.image || ''
    }
  })

  const watchedImage = watch('image')

  // Atualizar o formulário quando editData mudar
  useEffect(() => {
    if (editData) {
      setValue('name', editData.name)
      setValue('muscleGroupId', editData.muscleGroupId)
      setValue('description', editData.description)
      setValue('videoUrl', editData.videoUrl || '')
      setValue('image', editData.image)
      setImagePreview(editData.image)
    } else {
      reset()
      setImagePreview(null)
    }
  }, [editData, setValue, reset])

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tamanho do arquivo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem deve ter no máximo 5MB')
        return
      }

      // Validar tipo do arquivo
      if (!file.type.startsWith('image/')) {
        toast.error('Arquivo deve ser uma imagem')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setValue('image', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setValue('image', '')
  }

  const onSubmit = async (data: ExerciseFormData) => {
    try {
      console.log('Dados do formulário:', data)
      console.log('Grupos musculares disponíveis:', muscleGroups)
      
      const selectedMuscleGroup = muscleGroups.find(group => group.id === data.muscleGroupId)
      if (!selectedMuscleGroup) {
        console.error('Grupo muscular não encontrado:', data.muscleGroupId)
        toast.error('Grupo muscular não encontrado')
        return
      }

      console.log('Grupo muscular selecionado:', selectedMuscleGroup)

      if (editData) {
        // Modo de edição
        await updateExerciseMutation.mutateAsync({
          id: editData.id,
          muscleGroupId: data.muscleGroupId,
          name: data.name,
          description: data.description,
          image: data.image,
          videoUrl: data.videoUrl
        })
        toast.success('Exercício atualizado com sucesso!')
      } else {
        // Modo de criação
        await createExerciseMutation.mutateAsync({
          muscleGroupId: data.muscleGroupId,
          name: data.name,
          description: data.description,
          image: data.image,
          videoUrl: data.videoUrl
        })
        toast.success('Exercício criado com sucesso!')
      }

      reset()
      setImagePreview(null)
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar exercício:', error)
      toast.error('Erro ao salvar exercício. Tente novamente.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 w-full h-full"
        onClick={onClose}
        aria-label="Fechar modal"
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-lg border w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">
              {editData ? 'Editar Exercício' : 'Cadastrar Exercício'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Campos do Formulário */}
            <div className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="modal-exercise-name" className="block text-sm font-medium mb-2">
                  Nome do Exercício *
                </label>
                <Input
                  id="modal-exercise-name"
                  type="text"
                  placeholder="Ex: Supino Reto, Agachamento..."
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Grupo Muscular */}
              <div>
                <label htmlFor="modal-muscle-group-select" className="block text-sm font-medium mb-2">
                  Grupo Muscular *
                </label>
                <Select
                  id="modal-muscle-group-select"
                  {...register('muscleGroupId')}
                  className={errors.muscleGroupId ? 'border-red-500' : ''}
                  disabled={muscleGroupsLoading}
                >
                  <option value="">Selecione um grupo muscular</option>
                  {muscleGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
                {errors.muscleGroupId && (
                  <p className="text-red-500 text-xs mt-1">{errors.muscleGroupId.message}</p>
                )}
              </div>

              {/* URL do Vídeo */}
              <div>
                <label htmlFor="modal-video-url" className="block text-sm font-medium mb-2">
                  URL do Vídeo (opcional)
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="modal-video-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=... (opcional)"
                    {...register('videoUrl')}
                    className={`pl-10 ${errors.videoUrl ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.videoUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.videoUrl.message}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="modal-exercise-description" className="block text-sm font-medium mb-2">
                  Descrição *
                </label>
                <Textarea
                  id="modal-exercise-description"
                  placeholder="Descreva como executar o exercício, posicionamento, dicas importantes..."
                  {...register('description')}
                  rows={6}
                  className={`resize-none ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Coluna Direita - Upload de Imagem */}
            <div className="space-y-2">
              <label htmlFor="modal-image-upload" className="block text-sm font-medium">
                Imagem do Exercício (opcional)
              </label>
              
              {/* Image Upload Area */}
              <div className="relative">
                {imagePreview || watchedImage ? (
                  <div className="relative">
                    <Image
                      src={imagePreview || watchedImage}
                      alt="Preview da imagem selecionada"
                      width={400}
                      height={360}
                      className={`w-full h-48 sm:h-56 lg:h-[360px] object-cover rounded-lg border ${
                        errors.image ? 'border-red-500' : 'border-input'
                      }`}
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
                  <div className={`w-full h-48 sm:h-56 lg:h-[360px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-3 sm:space-y-4 hover:border-muted-foreground/50 transition-colors ${
                    errors.image 
                      ? 'border-red-500' 
                      : 'border-muted-foreground/25 bg-muted/30 dark:bg-muted/50'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="modal-image-upload"
                      aria-label="Selecionar imagem do exercício"
                    />
                    <div className="text-center px-4">
                      <ImageIcon className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-2 ${
                        errors.image ? 'text-red-500' : 'text-muted-foreground'
                      }`} />
                      <p className={`text-xs sm:text-sm ${
                        errors.image ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        Clique para selecionar uma imagem (opcional)
                      </p>
                      <p className={`text-xs mt-1 ${
                        errors.image ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        PNG, JPG ou JPEG até 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Button (if no image selected) */}
              {!imagePreview && !watchedImage && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('modal-image-upload')?.click()}
                    className="w-full text-xs sm:text-sm"
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="hidden sm:inline">Selecionar Imagem (opcional)</span>
                    <span className="sm:hidden">Selecionar</span>
                  </Button>
                </div>
              )}

              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting || createExerciseMutation.isPending || updateExerciseMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createExerciseMutation.isPending || updateExerciseMutation.isPending || muscleGroupsLoading}
            >
              {isSubmitting || createExerciseMutation.isPending || updateExerciseMutation.isPending ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editData ? 'Atualizar Exercício' : 'Salvar Exercício'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
