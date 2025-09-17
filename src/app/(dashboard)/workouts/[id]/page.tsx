"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Play,
  Trash2,
  Clock,
  Weight,
  Repeat,
  Timer,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useWorkout, useStartWorkout, useStopWorkout, useCompleteWorkout, useCompleteExercise } from "@/hooks/use-workouts";
import { toast } from "sonner";

interface WorkoutExercise {
  id: string;
  name: string;
  image: string;
  videoUrl?: string;
  description: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  muscleGroup: {
    id: string;
    name: string;
  };
}

// Componentes de Skeleton
const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
      </div>
      <div className="space-y-2">
        <div className="h-10 bg-muted rounded animate-pulse"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

const SkeletonExerciseList = () => {
  const skeletonItems = [
    "skeleton-exercise-1",
    "skeleton-exercise-2",
    "skeleton-exercise-3",
    "skeleton-exercise-4",
    "skeleton-exercise-5",
    "skeleton-exercise-6",
  ];

  return (
    <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
      <CardHeader>
        <div className="h-6 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {skeletonItems.map((id) => (
            <div key={id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
                <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonExerciseDetails = () => {
  const skeletonTiles = [
    "skeleton-tile-1",
    "skeleton-tile-2",
    "skeleton-tile-3",
    "skeleton-tile-4",
  ];

  return (
    <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
      <CardHeader>
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse w-2/3"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-muted rounded animate-pulse w-20"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-32"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-20"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="aspect-video bg-muted rounded-lg animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {skeletonTiles.map((id) => (
            <div key={id} className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="h-6 w-6 mx-auto mb-2 bg-muted rounded animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function WorkoutDetailPage() {
  const params = useParams();
  const workoutId = params.id as string;

  const { data: workout, isLoading, error } = useWorkout(workoutId);
  const startWorkoutMutation = useStartWorkout();
  const stopWorkoutMutation = useStopWorkout();
  const completeWorkoutMutation = useCompleteWorkout();
  const completeExerciseMutation = useCompleteExercise();
  const [selectedExercise, setSelectedExercise] =
    useState<WorkoutExercise | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    sets: "",
    reps: "",
    weight: "",
    rest: "",
  });



  // Funções auxiliares para trabalhar com a nova estrutura
  const getSessionStatus = useCallback(() => {
    if (!workout?.session?.id) return 'NOT_STARTED';
    return workout.session.status || 'NOT_STARTED';
  }, [workout?.session]);

  const getExerciseStatus = useCallback((exerciseId: string) => {
    if (!workout?.session?.exercises) return 'NOT_STARTED';
    const sessionExercise = workout.session.exercises.find(
      se => se.id === exerciseId
    );
    return sessionExercise?.status || 'NOT_STARTED';
  }, [workout?.session?.exercises]);

  const getExercisesWithStatus = useCallback((): WorkoutExercise[] => {
    if (!workout) return [];
    
    // Se há uma sessão em andamento, usar os dados da sessão
    if (workout.session?.id && workout.session.status === 'IN_PROGRESS') {
      return workout.session.exercises?.map(sessionExercise => ({
        id: sessionExercise.id,
        name: sessionExercise.name,
        image: sessionExercise.image,
        videoUrl: sessionExercise.videoUrl,
        description: sessionExercise.description,
        series: sessionExercise.series,
        repetitions: sessionExercise.repetitions,
        weight: sessionExercise.weight,
        restTime: sessionExercise.restTime,
        status: sessionExercise.status,
        muscleGroup: {
          id: 'temp-id', // Como não temos muscleGroup na nova estrutura, usar um ID temporário
          name: 'Grupo Muscular' // Nome temporário
        }
      })) || [];
    }
    
    // Caso contrário, usar os dados do treino com status da sessão
    return workout.exercises.map(exercise => ({
      ...exercise,
      status: getExerciseStatus(exercise.id)
    }));
  }, [workout, getExerciseStatus]);

  useEffect(() => {
    if (workout && workout.exercises.length > 0) {
      const exercisesWithStatus = getExercisesWithStatus();
      setSelectedExercise(exercisesWithStatus[0]);
    }
  }, [workout, getExercisesWithStatus]);


  const handleStartWorkout = async () => {
    if (!workout) return;
    
    try {
      await startWorkoutMutation.mutateAsync(workoutId);
      toast.success('Treino iniciado com sucesso!');
      setCurrentExerciseIndex(0);
      // Selecionar o primeiro exercício quando iniciar o treino
      const exercisesWithStatus = getExercisesWithStatus();
      if (exercisesWithStatus.length > 0) {
        setSelectedExercise(exercisesWithStatus[0]);
      }
    } catch (error) {
      console.error('Erro ao iniciar treino:', error);
      toast.error('Erro ao iniciar treino. Tente novamente.');
    }
  };

  const handleStopWorkout = async () => {
    if (!workout) return;
    
    try {
      await stopWorkoutMutation.mutateAsync(workoutId);
      toast.success('Treino parado com sucesso!');
      setCurrentExerciseIndex(0);
      // Voltar para o primeiro exercício do treino atual
      const exercisesWithStatus = getExercisesWithStatus();
      if (exercisesWithStatus.length > 0) {
        setSelectedExercise(exercisesWithStatus[0]);
      }
    } catch (error) {
      console.error('Erro ao parar treino:', error);
      toast.error('Erro ao parar treino. Tente novamente.');
    }
  };

  const handleFinishWorkout = () => {
    setIsFinishDialogOpen(true);
  };

  const handleConfirmFinishWorkout = async () => {
    if (!workout) return;
    
    try {
      await completeWorkoutMutation.mutateAsync(workoutId);
      toast.success('Treino finalizado com sucesso!');
      setCurrentExerciseIndex(0);
      setIsFinishDialogOpen(false);
      setWorkoutNotes("");
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      toast.error('Erro ao finalizar treino. Tente novamente.');
    }
  };

  const handleCancelFinishWorkout = () => {
    setIsFinishDialogOpen(false);
    setWorkoutNotes("");
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      // Log do ID do exercício da sessão
      if (workout?.session?.id && workout.session.status === 'IN_PROGRESS') {
        const sessionExercise = workout.session.exercises?.find(
          se => se.id === selectedExercise.id
        );
        if (sessionExercise) {
          console.log('ID do exercício da sessão que será concluído:', sessionExercise.id);
        }
      }
      
      // Preencher os dados do exercício no modal
      setExerciseData({
        sets: selectedExercise.series,
        reps: selectedExercise.repetitions,
        weight: selectedExercise.weight,
        rest: selectedExercise.restTime,
      });
      setIsModalOpen(true);
    }
  };

  const handleConfirmExercise = async () => {
    if (selectedExercise && workout) {
      // Buscar o ID do exercício da sessão
      let sessionExerciseId: string | null = null;
      
      if (workout.session?.id && workout.session.status === 'IN_PROGRESS') {
        const sessionExercise = workout.session.exercises?.find(
          se => se.id === selectedExercise.id
        );
        if (sessionExercise) {
          sessionExerciseId = sessionExercise.id;
        }
      }

      if (sessionExerciseId) {
        try {
          const updatedWorkout = await completeExerciseMutation.mutateAsync({
            workoutId,
            sessionExerciseId,
            exerciseData: {
              series: exerciseData.sets,
              repetitions: exerciseData.reps,
              weight: exerciseData.weight,
              restTime: exerciseData.rest
            }
          });
          
          toast.success('Exercício concluído com sucesso!');
          setIsModalOpen(false);

          // Atualizar o exercício atual com os novos dados da sessão
          if (updatedWorkout.session?.exercises) {
            const updatedSessionExercise = updatedWorkout.session.exercises.find(
              se => se.id === selectedExercise.id
            );
            
            if (updatedSessionExercise) {
              // Criar um novo objeto selectedExercise com os dados atualizados
              const updatedSelectedExercise: WorkoutExercise = {
                id: updatedSessionExercise.id,
                name: updatedSessionExercise.name,
                image: updatedSessionExercise.image,
                videoUrl: updatedSessionExercise.videoUrl,
                description: updatedSessionExercise.description,
                series: updatedSessionExercise.series,
                repetitions: updatedSessionExercise.repetitions,
                weight: updatedSessionExercise.weight,
                restTime: updatedSessionExercise.restTime,
                status: updatedSessionExercise.status,
                muscleGroup: {
                  id: 'temp-id', // Como não temos muscleGroup na nova estrutura, usar um ID temporário
                  name: 'Grupo Muscular' // Nome temporário
                }
              };
              
              setSelectedExercise(updatedSelectedExercise);
            }
          }
          
          // Exercício concluído com sucesso - usuário permanece no exercício atual
        } catch (error) {
          console.error('Erro ao concluir exercício:', error);
          toast.error('Erro ao concluir exercício. Tente novamente.');
        }
      } else {
        console.error('ID do exercício da sessão não encontrado');
        toast.error('Erro: ID do exercício da sessão não encontrado.');
      }
    }
  };

  const handleCancelExercise = () => {
    setIsModalOpen(false);
  };

  const handlePreviousExercise = () => {
    if (workout) {
      const prevIndex = currentExerciseIndex - 1;
      if (prevIndex >= 0) {
        setCurrentExerciseIndex(prevIndex);
        const exercisesWithStatus = getExercisesWithStatus();
        setSelectedExercise(exercisesWithStatus[prevIndex]);
      }
    }
  };

  const handleNextExercise = () => {
    if (workout) {
      const exercisesWithStatus = getExercisesWithStatus();
      const nextIndex = currentExerciseIndex + 1;
      if (nextIndex < exercisesWithStatus.length) {
        setCurrentExerciseIndex(nextIndex);
        setSelectedExercise(exercisesWithStatus[nextIndex]);
      }
    }
  };

  const isLastExercise = () => {
    if (!workout) return false;
    
    // Se há uma sessão em andamento, usar o tamanho dos exercícios da sessão
    if (workout.session?.id && workout.session.status === 'IN_PROGRESS') {
      const sessionExercisesCount = workout.session.exercises?.length || 0;
      return currentExerciseIndex === sessionExercisesCount - 1;
    }
    
    // Caso contrário, usar o tamanho dos exercícios do treino
    return currentExerciseIndex === workout.exercises.length - 1;
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return getExerciseStatus(exerciseId) === "COMPLETED";
  };

  const isFirstExercise = () => {
    return currentExerciseIndex === 0;
  };

  const isAllExercisesCompleted = () => {
    if (!workout) return false;
    
    // Se há uma sessão em andamento, verificar os exercícios da sessão
    if (workout.session?.id && workout.session.status === 'IN_PROGRESS') {
      return workout.session.exercises?.every(
        (sessionExercise) => sessionExercise.status === "COMPLETED"
      ) || false;
    }
    
    // Caso contrário, verificar usando a função getExerciseStatus
    return workout.exercises.every(
      (exercise) => getExerciseStatus(exercise.id) === "COMPLETED"
    );
  };




  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {/* Coluna Esquerda - Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            <SkeletonCard />
            <SkeletonExerciseList />
          </div>

          {/* Coluna Direita - Skeleton */}
          <div className="lg:col-span-2">
            <SkeletonExerciseDetails />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Erro ao carregar treino
          </h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Treino não encontrado
          </h2>
          <p className="text-muted-foreground">
            O treino solicitado não foi encontrado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
        {/* Coluna Esquerda - 1/3 da tela */}
        <div className="space-y-4 sm:space-y-6">
          {/* Card de Seleção do Treino */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                {workout.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Informações do Treino */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Criado em:</span>
                  <span className="font-medium">
                    {new Date(workout.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Atualizado em:</span>
                  <span className="font-medium">
                    {new Date(workout.updatedAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Visibilidade:</span>
                  <span className="font-medium capitalize">
                    {workout.visibility.toLowerCase() === 'public' ? 'Público' : 'Privado'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exercícios:</span>
                  <span className="font-medium">
                    {workout.exercises.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {getSessionStatus() === "NOT_STARTED"
                      ? "Treino não iniciado"
                      : getSessionStatus() === "IN_PROGRESS"
                      ? "Treino em andamento"
                      : getSessionStatus() === "COMPLETED"
                      ? "Treino finalizado"
                      : "Treino não iniciado"}
                  </span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={
                    getSessionStatus() === 'IN_PROGRESS' || getSessionStatus() === 'COMPLETED'
                      ? isAllExercisesCompleted()
                        ? handleFinishWorkout
                        : handleStopWorkout
                      : handleStartWorkout
                  }
                  className="w-full"
                  variant={
                    getSessionStatus() === 'IN_PROGRESS' || getSessionStatus() === 'COMPLETED'
                      ? isAllExercisesCompleted()
                        ? "default"
                        : "destructive"
                      : "default"
                  }
                  disabled={startWorkoutMutation.isPending || stopWorkoutMutation.isPending || completeWorkoutMutation.isPending}
                >
                  {getSessionStatus() === 'IN_PROGRESS' || getSessionStatus() === 'COMPLETED' ? (
                    isAllExercisesCompleted() ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        {completeWorkoutMutation.isPending ? 'Finalizando...' : 'Finalizar Treino'}
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {stopWorkoutMutation.isPending ? 'Parando...' : 'Parar Treino'}
                      </>
                    )
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {startWorkoutMutation.isPending ? 'Iniciando...' : 'Iniciar Treino'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card de Exercícios */}
          <Card className="min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Exercícios</CardTitle>
              <CardDescription className="text-sm">
                Clique em um exercício para ver os detalhes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto overflow-x-visible max-h-[400px] sm:max-h-[500px] lg:max-h-none">
                {getExercisesWithStatus().map((exercise, index) => (
                  <div key={exercise.id}>
                    <button
                      type="button"
                      className={`w-full p-3 sm:p-4 text-left hover:bg-accent transition-colors cursor-pointer ${
                        selectedExercise?.id === exercise.id
                          ? "bg-primary/10 border-l-4 border-primary"
                          : ""
                      } ${
                        exercise.status === "COMPLETED"
                          ? "border-l-4 border-green-500"
                          : exercise.status === "IN_PROGRESS"
                          ? "border-l-4 border-yellow-500"
                          : ""
                      }`}
                      onClick={() => setSelectedExercise(exercise)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedExercise(exercise);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                              {index + 1}.
                            </span>
                            <h4 className="font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap">{exercise.name}</h4>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Layers className="h-3 w-3" />
                              {exercise.series}s
                            </span>
                            <span className="flex items-center gap-1">
                              <Repeat className="h-3 w-3" />
                              {exercise.repetitions}rep
                            </span>
                            <span className="flex items-center gap-1">
                              <Weight className="h-3 w-3" />
                              {exercise.weight}kg
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {exercise.restTime}s
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                    {index < workout.exercises.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - 2/3 da tela */}
        <div className="lg:col-span-2">
          {selectedExercise ? (
            <Card className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl truncate overflow-hidden text-ellipsis whitespace-nowrap">
                      {selectedExercise.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Grupo muscular: {selectedExercise.muscleGroup.name}
                    </CardDescription>
                  </div>
                  {(getSessionStatus() === 'IN_PROGRESS' || getSessionStatus() === 'COMPLETED') && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        {!isFirstExercise() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousExercise}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            ← Anterior
                          </Button>
                        )}
                        {!isLastExercise() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextExercise}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            Próximo →
                          </Button>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={handleCompleteExercise}
                        variant={
                          isExerciseCompleted(selectedExercise.id)
                            ? "success"
                            : "default"
                        }
                        className="w-full text-xs sm:text-sm"
                      >
                        {isExerciseCompleted(selectedExercise.id) ? (
                          <>Exercício Finalizado</>
                        ) : (
                          <>Concluir Exercício</>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                {/* Video do Exercício */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {selectedExercise.videoUrl ? (
                    <iframe
                      src={selectedExercise.videoUrl.replace('watch?v=', 'embed/')}
                      title={`Vídeo do exercício ${selectedExercise.name}`}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Vídeo não disponível</p>
                        <p className="text-sm text-muted-foreground">
                          Este exercício não possui vídeo associado
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Instruções */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">Instruções</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line">
                      {selectedExercise.description ||
                        `Execute o exercício ${selectedExercise.name} com ${selectedExercise.series} séries de ${selectedExercise.repetitions} repetições. 
                        Use ${selectedExercise.weight} de peso e descanse ${selectedExercise.restTime} entre as séries. 
                        Mantenha a postura correta e execute o movimento de forma controlada.`}
                    </p>
                  </div>
                </div>

                {/* Tiles de Informações */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <Layers className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl sm:text-2xl font-bold">
                      {selectedExercise.series}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Séries</div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <Repeat className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl sm:text-2xl font-bold">
                      {selectedExercise.repetitions}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Repetições
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <Weight className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl sm:text-2xl font-bold">
                      {selectedExercise.weight}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Peso</div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl sm:text-2xl font-bold">
                      {selectedExercise.restTime}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Descanso
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Selecione um exercício
                  </h3>
                  <p className="text-muted-foreground">
                    Clique em um exercício na lista ao lado para ver os detalhes
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Confirmar Exercício</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Confirme os dados do exercício{" "}
              <strong className="truncate overflow-hidden text-ellipsis whitespace-nowrap">{selectedExercise?.name}</strong>:
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="sets-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Séries
                  </label>
                  <input
                    id="sets-input"
                    type="number"
                    value={exerciseData.sets}
                    onChange={(e) =>
                      setExerciseData((prev) => ({
                        ...prev,
                        sets: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reps-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Repetições
                  </label>
                  <input
                    id="reps-input"
                    type="text"
                    value={exerciseData.reps}
                    onChange={(e) =>
                      setExerciseData((prev) => ({
                        ...prev,
                        reps: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="weight-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Peso
                  </label>
                  <input
                    id="weight-input"
                    type="text"
                    value={exerciseData.weight}
                    onChange={(e) =>
                      setExerciseData((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rest-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Descanso
                  </label>
                  <input
                    id="rest-input"
                    type="text"
                    value={exerciseData.rest}
                    onChange={(e) =>
                      setExerciseData((prev) => ({
                        ...prev,
                        rest: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Button
                onClick={handleConfirmExercise}
                className="w-full"
                disabled={completeExerciseMutation.isPending}
              >
                {completeExerciseMutation.isPending ? 'Concluindo...' : 'Confirmar'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelExercise}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog de Finalização do Treino */}
      <AlertDialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Treino</AlertDialogTitle>
            <AlertDialogDescription>
              Adicione uma observação sobre o seu treino (opcional) e confirme a finalização.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="workout-notes" className="text-sm font-medium">
                Observações do Treino
              </label>
              <Textarea
                id="workout-notes"
                placeholder="Como foi o treino? Alguma observação importante?"
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>

          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
            <AlertDialogCancel onClick={handleCancelFinishWorkout} className="w-full sm:w-auto">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmFinishWorkout}
              disabled={completeWorkoutMutation.isPending}
              className="w-full sm:w-auto"
            >
              {completeWorkoutMutation.isPending ? 'Finalizando...' : 'Finalizar Treino'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
