import { AuthService } from "./authService";
import { router } from "expo-router";

type ApiClient = {
  get: <T>(url: string, options?: RequestInit) => Promise<T>;
  post: <T>(url: string, body: any, options?: RequestInit) => Promise<T>;
};

class NetworkService {
  private baseURL = "https://api.intra.42.fr/v2";
  public apiClient: ApiClient;

  constructor() {
    this.apiClient = {
      get: this.get.bind(this),
      post: this.post.bind(this),
    };
  }

  private async fetchWithInterceptor(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = await AuthService.getToken();
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.append("Authorization", `Bearer ${token.access_token}`);
    }

    options.headers = headers;

    let response: Response;
    try {
      response = await fetch(`${this.baseURL}${url}`, options);
    } catch (error) {
      console.error("Network request failed", error);
      router.push("/networkError");
      throw new Error("Network request failed");
    }

    // if (response.status === 401) {
    //   await AuthService.clearToken();
    //   router.replace("/login");
    //   throw new Error("Unauthorized");
    // }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("HTTP error:", errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.fetchWithInterceptor(url, {
      ...options,
      method: "GET",
    });
    return response.json() as Promise<T>;
  }

  private async post<T>(
    url: string,
    body: any,
    options?: RequestInit
  ): Promise<T> {
    const response = await this.fetchWithInterceptor(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
    return response.json() as Promise<T>;
  }
}

export const networkService = new NetworkService();
