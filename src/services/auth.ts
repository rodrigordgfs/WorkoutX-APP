import Services from "@/libs/axios";

class AuthService extends Services {
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    super({
      url: "/auth",
      config: {
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  }
}

const authService = new AuthService();
export default authService;
