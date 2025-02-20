import ExerciseCard from "@/components/ExerciseCard";
import WorkoutDetails from "@/components/WorkoutDetails";
import { useWorkout } from "@/context/WorkoutContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function WorkoutDetailsPage() {
    const { id } = useParams();
    const { workouts, setSelectedExercise, selectedExercise, selectedWorkout, setSelectedWorkout } = useWorkout();

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
                <div className="bg-white rounded-lg p-4 shadow mb-4">
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
        </div>
    );
}

export default WorkoutDetailsPage;
