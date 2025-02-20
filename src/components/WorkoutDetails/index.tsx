import { Exercise, useWorkout } from "@/context/WorkoutContext";
import { Trash } from "lucide-react";
import { Modal } from "../Modal";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface WordkoutDetailsProps {
    exercise: Exercise | null
}

const WorkoutDetails = ({ exercise }: WordkoutDetailsProps) => {
    const navigate = useNavigate();
    const { deleteExercise, getWorkoutByExerciseId, isLastExerciseInWorkout, deleteWorkout } = useWorkout();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getEmbedUrl = (url: string | "") => {
        const videoIdMatch = url?.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    };

    const handleDeleteExercise = async () => {
        setIsDeleting(true);

        const workout = getWorkoutByExerciseId(exercise?.id ?? "");

        if (isLastExerciseInWorkout(workout, exercise?.id ?? "")) {
            axios.delete(`/workout/${workout?.id}`, {
                baseURL: import.meta.env.VITE_API_BASE_URL,
            }).then(() => {
                deleteWorkout(workout?.id ?? "");
                setIsDeleting(false);
                setIsModalOpen(false);
                navigate("/");
            }).catch((error) => {
                console.error(error);
                setIsDeleting(false);
            });
        } else {
            axios.delete(`/workout/exercise/${exercise?.id}`, {
                baseURL: import.meta.env.VITE_API_BASE_URL,
            }).then(() => {
                deleteExercise(exercise?.id ?? "");
                setIsDeleting(false);
                setIsModalOpen(false);
            }).catch((error) => {
                console.error(error);
                setIsDeleting(false);
            });
        }
    }

    return <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold mb-4 mt-2">{exercise?.name}</h2>
            <button onClick={() => setIsModalOpen(true)} className="text-white bg-red-500 hover:bg-red-600 transition-all rounded-md p-2">
                <Trash size={24} />
            </button>
        </div>

        <div className="aspect-video w-full mb-6">
            <iframe
                className="w-full h-full rounded-lg"
                src={getEmbedUrl(exercise?.videoUrl ?? "")}
                title={exercise?.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>

        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Instruções:</h3>
                <p className="text-gray-600">{exercise?.instructions}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center flex-1">
                    <h4 className="font-semibold">Séries</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.series}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center flex-1">
                    <h4 className="font-semibold">Repetições</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.repetitions}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center flex-1">
                    <h4 className="font-semibold">Descanso</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.restTime}s</p>
                </div>
            </div>
        </div>

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDeleteExercise}
            loading={isDeleting}
            title="Excluir Exercício"
            content="Tem certeza que deseja excluir esse exercício?"
        />
    </div>
}

export default WorkoutDetails