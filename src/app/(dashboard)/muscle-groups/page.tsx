"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Eye,
  Search,
  Plus,
  X,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { MuscleGroupModal } from "@/components/modals/muscle-group-modal";
import {
  useDeleteMuscleGroup,
  useMuscleGroups,
} from "@/hooks/use-muscle-groups";
import { useDebounce } from "@/hooks/use-debounce";
import { AdminOnly } from "@/components/auth/permission-guard";
import { toast } from "sonner";

// Componentes de Skeleton
const SkeletonMuscleGroupCard = () => (
  <div className="bg-card rounded-lg border border-input p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4 flex-1">
        <div className="w-16 h-16 bg-muted rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
        </div>
      </div>
      <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
    </div>
  </div>
);

export default function MuscleGroupsPage() {
  const router = useRouter();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<{
    id: string;
    name: string;
    description: string;
    image?: string;
  } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { data: muscleGroups = [], isLoading } =
    useMuscleGroups(debouncedSearchTerm);
  const deleteMuscleGroupMutation = useDeleteMuscleGroup();

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  // Os dados já vêm filtrados da API, então usamos diretamente
  const filteredGroups = muscleGroups;

  const handleViewExercises = (groupId: string) => {
    const group = muscleGroups.find((g) => g.id === groupId);
    if (group) {
      // Navegar para a página de exercícios com o ID do grupo muscular como parâmetro
      router.push(`/exercises?muscleGroupId=${groupId}`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const handleEditGroup = (groupId: string) => {
    const group = muscleGroups.find((g) => g.id === groupId);
    if (group) {
      setEditingGroup({
        id: group.id,
        name: group.name,
        description: group.description,
        image: group.image,
      });
      setIsModalOpen(true);
    }
    setOpenMenuId(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = muscleGroups.find((g) => g.id === groupId);
    if (group) {
      setGroupToDelete({ id: groupId, name: group.name });
      setDeleteDialogOpen(true);
    }
    setOpenMenuId(null);
  };

  const toggleMenu = (groupId: string) => {
    setOpenMenuId(openMenuId === groupId ? null : groupId);
  };

  const confirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      await deleteMuscleGroupMutation.mutateAsync(groupToDelete.id);
      toast.success("Grupo muscular excluído com sucesso!");
      setDeleteDialogOpen(false);
      setGroupToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir grupo:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao excluir grupo muscular"
      );
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

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

  if (isLoading) {
    return (
      <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Grupos Musculares
          </h1>
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
              <SkeletonMuscleGroupCard key={id} />
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
          <h1 className="text-3xl font-bold tracking-tight">
            Grupos Musculares
          </h1>
        </div>
        <AdminOnly>
          <Button onClick={openModal} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Grupo Muscular
          </Button>
        </AdminOnly>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar grupos musculares..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 pr-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Results Count and Clear Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredGroups.length} grupo
                {filteredGroups.length !== 1 ? "s" : ""} encontrado
                {filteredGroups.length !== 1 ? "s" : ""}
                {searchTerm && (
                  <span className="ml-2">para "{searchTerm}"</span>
                )}
              </div>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Muscle Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum grupo muscular encontrado
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar o termo de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredGroups.map((group) => {
            const groupExercises = group.exercises || [];
            const isExpanded = expandedGroups.has(group.id);

            return (
              <Card key={group.id} className="h-fit">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Group Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Group Image */}
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {group.image ? (
                            <Image
                              src={group.image}
                              alt={group.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Dumbbell className="h-6 w-6 text-primary" />
                          )}
                        </div>

                        {/* Group Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate overflow-hidden text-ellipsis whitespace-nowrap">
                            {group.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {groupExercises.length} exercício
                            {groupExercises.length !== 1 ? "s" : ""}
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
                              onClick={() => toggleMenu(group.id)}
                              className="cursor-pointer p-2"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {/* Dropdown Menu */}
                            {openMenuId === group.id && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg z-50">
                                <div className="py-1">
                                  <button
                                    type="button"
                                    onClick={() => handleEditGroup(group.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                                  >
                                    <Edit className="h-4 w-4 mr-3" />
                                    Editar Grupo
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGroup(group.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                                  >
                                    <Trash2 className="h-4 w-4 mr-3" />
                                    Excluir Grupo
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
                          onClick={() => toggleGroup(group.id)}
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
                        {/* Group Description */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Descrição
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {group.description}
                          </p>
                        </div>

                        {/* Exercises List */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-sm">
                              Exercícios ({groupExercises.length})
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewExercises(group.id)}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Ver Exercícios
                            </Button>
                          </div>

                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {groupExercises.length > 0 ? (
                              groupExercises.map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg"
                                >
                                  {/* Exercise Image */}
                                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {exercise.image ? (
                                      <Image
                                        src={exercise.image}
                                        alt={exercise.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Dumbbell className="h-5 w-5 text-muted-foreground" />
                                    )}
                                  </div>

                                  {/* Exercise Info */}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-sm truncate">
                                      {exercise.name}
                                    </h5>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {exercise.description}
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-2">
                                <Dumbbell className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Nenhum exercício cadastrado
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Adicione exercícios para este grupo muscular
                                </p>
                              </div>
                            )}
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

      {/* Modal de Cadastro */}
      <MuscleGroupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editData={editingGroup}
        onSuccess={() => {
          // Opcional: adicionar lógica adicional após sucesso
          console.log(
            editingGroup
              ? "Grupo muscular atualizado com sucesso!"
              : "Grupo muscular criado com sucesso!"
          );
        }}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setDeleteDialogOpen(false);
          setGroupToDelete(null);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o grupo muscular{" "}
              <strong>"{groupToDelete?.name}"</strong>?
              <br />
              <br />
              Esta ação não pode ser desfeita e todos os exercícios associados a
              este grupo também serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMuscleGroupMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {deleteMuscleGroupMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
