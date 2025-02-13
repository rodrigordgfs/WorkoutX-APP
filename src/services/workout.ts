import Services from "@/libs/axios";

class WorkoutService extends Services {
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    super({
      url: "/workout",
      config: {
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  }
}

const workoutService = new WorkoutService();
export default workoutService;