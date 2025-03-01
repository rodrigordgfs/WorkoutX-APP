import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import { useWorkout, IWorkout } from "@/context/WorkoutContext";
import axios from "axios";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Modal } from "@/components/Shared/Modal";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { FilterWorkout } from "@/components/ComunityPage/FilterWorkout";
import { Loading } from "@/components/ComunityPage/Loading";
import { ComunityCard } from "@/components/ComunityPage/ComunityCard";
import CommunityEmpty from "@/components/ComunityPage/CommunityEmpty";

export function CommunityPage() {
  const clerk = useClerk();
  const { getToken } = useAuth();
  const { appendWorkout } = useWorkout();
  const navigate = useNavigate();

  const [userId] = useState(clerk.user?.id ?? "");
  const [searchTerm, setSearchTerm] = useState("");
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loadingLikes, setLoadingLikes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [workoutSelectedID, setWorkoutSelectedID] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchPublicWorkouts();
  }, []);

  const handleCopyExercise = async () => {
    setIsCopying(true);
    axios
      .post(
        `/workout/${workoutSelectedID}/copy`,
        {
          userId,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
        }
      )
      .then(({ data }) => {
        appendWorkout(data);
        setIsCopying(false);
        setIsModalOpen(false);
        navigate(`/workout/${data.id}`);
      })
      .catch((error) => {
        console.error(error);
        setIsCopying(false);
      });
  };

  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setWorkoutSelectedID(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWorkoutSelectedID(null);
  };

  const fetchPublicWorkouts = () => {
    setLoading(true);
    axios
      .get("/workout", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        params: {
          visibility: "PUBLIC",
        },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(({ data }) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> =
          error.response?.data?.errors;

        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          toast.error(title || "Erro ao cadastrar treino");
        }
      });
  };

  const isLiked = (workout: IWorkout) => {
    return workout.likes.some((like) => like.userId === userId);
  };

  const toogleLike = async (id: string) => {
    setLoadingLikes((prev) => new Set(prev).add(id));

    try {
      await axios
        .post(
          `/workout/${id}/user/${userId}/like`,
          {},
          {
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        )
        .catch((error) => {
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
      <SectionTitle title="Comunidade" icon={Users} />

      {workouts.length > 0 && (
        <FilterWorkout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <div className="grid gap-6">
        {loading ? (
          <Loading />
        ) : workouts.length === 0 ? (
          <CommunityEmpty />
        ) : (
          workouts.map((workout) => (
            <ComunityCard
              key={workout.id}
              workout={workout}
              loadingLikes={loadingLikes}
              toogleLike={toogleLike}
              isLiked={isLiked}
              handleOpenModal={handleOpenModal}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCopyExercise}
        loading={isCopying}
        title="Copiar Exercício"
        content="Tem certeza que deseja copiar esse exercício?"
      />
    </div>
  );
}
