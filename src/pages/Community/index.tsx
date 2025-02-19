import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Heart, Share2, Dumbbell, Weight, Timer, Repeat } from 'lucide-react';
import workoutService from '@/services/workout';
import { toast } from 'react-toastify';
import { Workout } from '@/context/WorkoutContext';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';

export function CommunityPage() {
  const clerk = useClerk();

  const [userId] = useState(clerk.user?.id ?? "");
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loadingLikes, setLoadingLikes] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPublicWorkouts();
  }, []);

  const fetchPublicWorkouts = () => {
    workoutService.get({ visibility: 'PUBLIC' })
      .then(({ data }) => {
        setWorkouts(data);
      })
      .catch((error) => {
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> = error.response?.data?.errors;

        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          toast.error(title || "Erro ao cadastrar treino");
        }
      })
      .finally(() => { });
  }

  const toogleLike = async (id: string) => {
    setLoadingLikes((prev) => new Set(prev).add(id));

    try {
      await axios.post(`/workout/${id}/user/${userId}/like`, {}, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
      }).catch((error) => {
        toast.error(error.response?.data?.message || "Erro ao curtir treino");
      });

      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) => {
          if (workout.id === id) {
            const liked = workout.likes.some((like) => like.userId === userId);
            const updatedLikes = liked
              ? workout.likes.filter((like) => like.userId !== userId)
              : [...workout.likes, { userId }];

            return { ...workout, likes: updatedLikes };
          }
          return workout;
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLikes((prev) => {
        const newLoading = new Set(prev);
        newLoading.delete(id);
        return newLoading;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <h2 className="text-2xl font-bold">Comunidade</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid gap-6">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={workout.user.avatar}
                    alt={workout.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
                    <p className="text-sm text-gray-500">por {workout.user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => toogleLike(workout.id)} disabled={loadingLikes.has(workout.id)}>
                    {loadingLikes.has(workout.id) ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className={`flex items-center gap-1 ${workout.likes.some(like => like.userId === userId) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'} transition-colors`}>
                        <Heart size={20} />
                        <span>{workout.likes.length}</span>
                      </div>
                    )}
                  </button>
                  <button className="text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Dumbbell size={16} className="text-blue-500" />
                  <span>{workout.exercises.length} exercícios</span>
                </div>
              </div>
            </div>

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

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link
                to={`/treino/${workout.id}`}
                className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copiar Treino
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}