import Services from "@/libs/axios";

class WorkoutAIService extends Services {
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    super({
      url: "/workout/ai",
      config: {
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  }
}

const workoutAIService = new WorkoutAIService();
export default workoutAIService;