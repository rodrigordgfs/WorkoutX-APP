import ExerciseCard from "@/components/ExerciseCard";
import WorkoutDetails from "@/components/WorkoutDetails";
import { workoutDays } from "@/data/workouts";
import { useState } from "react";

function WorkoutPage() {
    const [selectedWorkout, setSelectedWorkout] = useState(workoutDays[0]);
    const [selectedExercise, setSelectedExercise] = useState(workoutDays[0].exercises[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-4 shadow mb-4">
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedWorkout.id}
                        onChange={(e) => {
                            const workout = workoutDays.find(w => w.id === e.target.value)
                            if (workout) {
                                setSelectedWorkout(workout)
                                setSelectedExercise(workout.exercises[0])
                            }
                        }}
                    >
                        {workoutDays.map((workout) => (
                            <option key={workout.id} value={workout.id}>{workout.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    {selectedWorkout.exercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            isActive={exercise.id === selectedExercise.id}
                            onSelect={() => setSelectedExercise(exercise)}
                        />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2">
                <WorkoutDetails exercise={selectedExercise} />
            </div>
        </div>
    )
}

export default WorkoutPage
