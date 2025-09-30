class FetchClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async getAuthToken(): Promise<string | null> {
    // Get token from your storage (localStorage, cookies, etc.)
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  }

  private async getHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
    const token = await this.getAuthToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    return {
      ...this.defaultHeaders,
      ...authHeader,
      ...customHeaders,
    };
  }

  async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getHeaders(options.headers);

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // Handle unauthorized responses
      if (response.status === 401) {
        // Redirect to login or refresh token
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Convenience methods
  async get(endpoint: string, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  async post(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }

  async patch(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create instance with base URL
export const fetchClient = new FetchClient(
  process.env.NEXT_PUBLIC_API_BASE_URL
);

// Default instance without base URL
export const apiClient = new FetchClient();
