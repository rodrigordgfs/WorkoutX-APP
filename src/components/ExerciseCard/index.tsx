import { Exercise } from "@/data/workouts"
import { Repeat, Timer, Weight } from "lucide-react"

interface ExerciseCardProps {
    exercise: Exercise
    isActive: boolean
    onSelect: () => void
}

const ExerciseCard = ({ exercise, isActive, onSelect }: ExerciseCardProps) => {
    return <div className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`} onClick={onSelect}>
        <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
        <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
                <Repeat size={16} />
                <span>{exercise.series} x {exercise.repetitions}</span>
            </div>
            {exercise.weight && (
                <div className="flex items-center gap-1">
                    <Weight size={16} />
                    <span>{exercise.weight} kg</span>
                </div>
            )}
            <div className="flex items-center gap-1">
                <Timer size={16} />
                <span>{exercise.restTime}</span>
            </div>
        </div>
    </div>
}

export default ExerciseCard