import { Workout } from "@/context/WorkoutContext"
import { ChevronDown, ChevronRight, ChevronUp, Dumbbell, Repeat, Timer, Weight } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkoutListItemProps {
    workout: Workout;
    isOpen: boolean;
    onToggle: (workoutId: string) => void;
}

const WorkoutListItem = ({ workout, isOpen, onToggle }: WorkoutListItemProps) => {
    return (
        <div key={workout.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Dumbbell size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
                        </div>
                    </div>
                    <button onClick={() => onToggle(workout.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {isOpen ? <ChevronUp size={24} className="text-gray-600" /> : <ChevronDown size={24} className="text-gray-600" />}
                    </button>
                </div>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="border-t border-gray-100">
                    <div className="grid divide-y divide-gray-100">
                        {workout.exercises.map((exercise) => (
                            <div key={exercise.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Repeat size={16} className="text-blue-500" />
                                                <span>{exercise.series} séries x {exercise.repetitions} reps</span>
                                            </div>
                                            {exercise.weight && (
                                                <div className="flex items-center gap-1">
                                                    <Weight size={16} className="text-blue-500" />
                                                    <span>{exercise.weight}kg</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Timer size={16} className="text-blue-500" />
                                                <span>{exercise.restTime}s descanso</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to={`/workout/${workout.id}`} className="block p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-center text-blue-600 font-medium">
                Ver detalhes do treino
                <ChevronRight className="inline-block ml-2" size={16} />
            </Link>
        </div>
    )
}

export default WorkoutListItem