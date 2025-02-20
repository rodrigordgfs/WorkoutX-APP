import ExerciseCard from "@/components/ExerciseCard";
import { Modal } from "@/components/Modal";
import WorkoutDetails from "@/components/WorkoutDetails";
import { useWorkout } from "@/context/WorkoutContext";
import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WorkoutDetailsPage() {
    const { id } = useParams();
    const { workouts, setSelectedExercise, selectedExercise, selectedWorkout, setSelectedWorkout, deleteWorkout } = useWorkout();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteWorkout = () => {
        setIsDeleting(true);
        axios.delete(`/workout/${id}`, {
            baseURL: import.meta.env.VITE_API_BASE_URL,
        }).then(() => {
            deleteWorkout(id ?? "");
            setIsDeleting(false);
            setIsModalOpen(false);
            navigate("/");
        }).catch((error) => {
            console.error(error);
            setIsDeleting(false);
        });
    }

    // Atualiza os estados quando os workouts estiverem carregados
    useEffect(() => {
        if (workouts.length > 0) {
            const workout = workouts.find(w => w.id === id) || workouts[0];
            setSelectedWorkout(workout);
            setSelectedExercise(workout.exercises[0]);
        }
    }, [workouts, id, setSelectedExercise, setSelectedWorkout]);

    if (!selectedWorkout) {
        return <div>Carregando...</div>; // Evita erro de acesso a propriedades indefinidas
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <div className="flex flex-row gap-2 bg-white rounded-lg p-4 shadow mb-4">
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedWorkout.id}
                        onChange={(e) => {
                            const workout = workouts.find(w => w.id === e.target.value);
                            if (workout) {
                                setSelectedWorkout(workout);
                                setSelectedExercise(workout.exercises[0]);
                            }
                        }}
                    >
                        {workouts.map((workout) => (
                            <option key={workout.id} value={workout.id}>{workout.name}</option>
                        ))}
                    </select>

                    <button onClick={() => setIsModalOpen(true)} className="text-white bg-red-500 hover:bg-red-600 transition-all p-2 rounded-lg">
                        <Trash size={24} />
                    </button>
                </div>

                <div className="space-y-2">
                    {selectedWorkout.exercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            isActive={exercise.id === selectedExercise?.id}
                            onSelect={() => setSelectedExercise(exercise)}
                        />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2">
                <WorkoutDetails exercise={selectedExercise} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteWorkout}
                loading={isDeleting}
                title="Excluir Treino"
                content="Tem certeza que deseja excluir esse treino? Todos os exercícios relacionados a ele serão excluídos."
            />
        </div>
    );
}

export default WorkoutDetailsPage;
