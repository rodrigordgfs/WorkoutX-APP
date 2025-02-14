import { Exercise } from "@/context/WorkoutContext";

interface WordkoutDetailsProps {
    exercise: Exercise | null
}

const WorkoutDetails = ({ exercise }: WordkoutDetailsProps) => {
    const getEmbedUrl = (url: string | "") => {
        const videoIdMatch = url?.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    };

    return <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{exercise?.name}</h2>

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

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Séries</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.series}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Repetições</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.repetitions}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Descanso</h4>
                    <p className="text-2xl font-bold text-blue-600">{exercise?.restTime}s</p>
                </div>
            </div>
        </div>
    </div>
}

export default WorkoutDetails