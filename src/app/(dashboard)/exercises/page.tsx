"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Play,
  Plus,
  X,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useMuscleGroups } from "@/hooks/use-muscle-groups";
import { useExercises } from "@/hooks/use-exercises-list";
import { useDebounce } from "@/hooks/use-debounce";
import { ExerciseModal } from "@/components/modals/exercise-modal";
import { useDeleteExercise, type Exercise } from "@/hooks/use-exercises";
import { AdminOnly } from "@/components/auth/permission-guard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Componentes de Skeleton
const SkeletonExerciseCard = () => (
  <div className="bg-card rounded-lg border p-6">
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-muted rounded-lg animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded animate-pulse w-48"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
          </div>
        </div>
        <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

function ExercisesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(
    new Set()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data: muscleGroups = [], isLoading: muscleGroupsLoading } =
    useMuscleGroups();
  const { data: exercises = [], isLoading: exercisesLoading } = useExercises(
    debouncedSearchTerm,
    selectedMuscleGroup
  );
  const deleteExerciseMutation = useDeleteExercise();

  // Removido useEffect de loading - agora usa o context

  // Aplicar filtro de grupo muscular da URL
  useEffect(() => {
    const muscleGroupIdParam = searchParams.get("muscleGroupId");
    if (muscleGroupIdParam) {
      setSelectedMuscleGroup(muscleGroupIdParam);
    }
  }, [searchParams]);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleExercise = (exerciseId: string) => {
    const newExpanded = new Set(expandedExercises);
    if (newExpanded.has(exerciseId)) {
      newExpanded.delete(exerciseId);
    } else {
      newExpanded.add(exerciseId);
    }
    setExpandedExercises(newExpanded);
  };

  const toggleMenu = (exerciseId: string) => {
    setOpenMenuId(openMenuId === exerciseId ? null : exerciseId);
  };

  // Filtros agora são feitos na API - usar exercises diretamente
  const filteredExercises = exercises;

  // Função removida - agora usa exercise.muscleGroup.name diretamente

  // Função para converter URL do YouTube para embed
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1`
        : url;
    }
    // YouTube short format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1`
        : url;
    }
    // Vimeo
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return videoId
        ? `https://player.vimeo.com/video/${videoId}?controls=0&title=0&byline=0&portrait=0&autoplay=0`
        : url;
    }
    // Se não for YouTube ou Vimeo, retorna a URL original
    return url;
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedMuscleGroup("all");

    // Remover parâmetro muscleGroupId da URL se existir
    const currentParams = new URLSearchParams(searchParams.toString());
    if (currentParams.has("muscleGroupId")) {
      currentParams.delete("muscleGroupId");
      const newUrl = currentParams.toString()
        ? `?${currentParams.toString()}`
        : "/exercises";
      router.push(newUrl);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExercise(null);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteExercise = (exercise: { id: string; name: string }) => {
    setExerciseToDelete(exercise);
    setDeleteDialogOpen(true);
    setOpenMenuId(null);
  };

  const confirmDeleteExercise = async () => {
    if (!exerciseToDelete) return;

    try {
      await deleteExerciseMutation.mutateAsync(exerciseToDelete.id);
      toast.success("Exercício excluído com sucesso!");
      setDeleteDialogOpen(false);
      setExerciseToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir exercício:", error);
      toast.error("Erro ao excluir exercício. Tente novamente.");
    }
  };

  if (exercisesLoading || muscleGroupsLoading) {
    return (
      <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "skeleton-1",
              "skeleton-2",
              "skeleton-3",
              "skeleton-4",
              "skeleton-5",
              "skeleton-6",
            ].map((id) => (
              <SkeletonExerciseCard key={id} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
        </div>
        <AdminOnly>
          <Button onClick={openModal} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Exercício
          </Button>
        </AdminOnly>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div>
                <label
                  htmlFor="search-exercises"
                  className="block text-sm font-medium mb-2"
                >
                  Nome do Exercício
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-exercises"
                    placeholder="Buscar exercícios por nome"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Muscle Group Filter */}
              <div>
                <label
                  htmlFor="muscle-group-filter"
                  className="block text-sm font-medium mb-2"
                >
                  Grupo Muscular
                </label>
                <Select
                  id="muscle-group-filter"
                  value={selectedMuscleGroup}
                  onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                >
                  <option value="all">Todos os grupos</option>
                  {muscleGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedMuscleGroup !== "all") && (
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="text-sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Limpar Filtros
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredExercises.length} exercício
              {filteredExercises.length !== 1 ? "s" : ""} encontrado
              {filteredExercises.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum exercício encontrado
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar os filtros de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredExercises.map((exercise) => {
            const isExpanded = expandedExercises.has(exercise.id);

            return (
              <Card key={exercise.id} className="h-fit">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Exercise Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Exercise Image */}
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {exercise.image ? (
                            <Image
                              src={exercise.image}
                              alt={exercise.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                              <Dumbbell className="h-8 w-8 text-primary" />
                            </div>
                          )}
                        </div>

                        {/* Exercise Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate overflow-hidden text-ellipsis whitespace-nowrap">
                            {exercise.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {exercise.muscleGroup.name}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {/* Options Menu */}
                        <AdminOnly>
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMenu(exercise.id);
                              }}
                              className="cursor-pointer p-2"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {/* Dropdown Menu */}
                            {openMenuId === exercise.id && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg z-[9999]">
                                <div className="py-1">
                                  <button
                                    type="button"
                                    onClick={() => handleEditExercise(exercise)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                                  >
                                    <Edit className="h-4 w-4 mr-3" />
                                    Editar Exercício
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteExercise({
                                        id: exercise.id,
                                        name: exercise.name,
                                      })
                                    }
                                    className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                                  >
                                    <Trash2 className="h-4 w-4 mr-3" />
                                    Excluir Exercício
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </AdminOnly>

                        {/* Expand Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExercise(exercise.id)}
                          className="cursor-pointer p-2"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4">
                        {/* Exercise Description */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Descrição
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {exercise.description}
                          </p>
                        </div>

                        {/* Muscle Group */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Grupo Muscular
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <Dumbbell className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {exercise.muscleGroup.name}
                            </span>
                          </div>
                        </div>

                        {/* Video Demonstrativo */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Demonstração
                          </h4>
                          {exercise.videoUrl ? (
                            <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                              <iframe
                                src={getEmbedUrl(exercise.videoUrl)}
                                title={`Demonstração do exercício ${exercise.name}`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Play className="h-8 w-8 text-primary" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Nenhum vídeo disponível
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {exercise.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Exercise Details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Criado em
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(exercise.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Atualizado em
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(exercise.updatedAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      <ExerciseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editData={editingExercise}
        onSuccess={() => {
          // Opcional: adicionar lógica adicional após sucesso
          console.log(
            editingExercise
              ? "Exercício atualizado com sucesso!"
              : "Exercício criado com sucesso!"
          );
        }}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setDeleteDialogOpen(false);
          setExerciseToDelete(null);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o exercício{" "}
              <strong>{exerciseToDelete?.name}</strong>? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false);
              setExerciseToDelete(null);
            }}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteExercise}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteExerciseMutation.isPending}
            >
              {deleteExerciseMutation.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ExercisesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Exercícios</h1>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "skeleton-1",
                "skeleton-2",
                "skeleton-3",
                "skeleton-4",
                "skeleton-5",
                "skeleton-6",
              ].map((id) => (
                <SkeletonExerciseCard key={id} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ExercisesContent />
    </Suspense>
  );
}
