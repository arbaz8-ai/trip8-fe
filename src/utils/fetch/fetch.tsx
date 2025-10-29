import { getNewTokenByRefreshToken, isTokenExpired } from "../apiServices";

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
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  private async getHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
    const token = await this.getAuthToken();
    console.log({ getHeadderToken: token });
    const headers: Record<string, string> = {
      ...((this.defaultHeaders as Record<string, string>) || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(customHeaders ? (customHeaders as Record<string, string>) : {}),
    };

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = `${this.baseURL}/${endpoint}`;

    if (!params) {
      return url;
    }

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<{ response: Response; data: T }> {
    const url = this.buildUrl(endpoint, params);

    try {
      const TOKEN_EXPIRED = isTokenExpired();
      console.log({ TOKEN_EXPIRED });
      if (TOKEN_EXPIRED) {
        const { accessToken: newToken } = await getNewTokenByRefreshToken();
        localStorage.setItem("token", newToken);
      }

      const headers = await this.getHeaders(options.headers);

      const config: RequestInit = {
        ...options,
        headers,
      };

      const response = await fetch(url, config);

      if (response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/authentication/login";
        }
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (error: unknown) {
          console.log(error);
        }
        throw new Error(errorMessage);
      }

      const data = (await response.json()) as T;

      return {
        response,
        data,
      };
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get<T = any>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, any> }
  ): Promise<{ response: Response; data: T }> {
    const { params, ...requestOptions } = options || {};
    return this.request<T>(
      endpoint,
      { ...requestOptions, method: "GET" },
      params
    );
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ response: Response; data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ response: Response; data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, any> }
  ): Promise<{ response: Response; data: T }> {
    const { params, ...requestOptions } = options || {};
    return this.request<T>(
      endpoint,
      { ...requestOptions, method: "DELETE" },
      params
    );
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ response: Response; data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async getData<T = any>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, any> }
  ): Promise<T> {
    const { data } = await this.get<T>(endpoint, options);
    return data;
  }

  async postData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    const result = await this.post<T>(endpoint, data, options);
    return result.data;
  }

  async putData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    const result = await this.put<T>(endpoint, data, options);
    return result.data;
  }

  async deleteData<T = any>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, any> }
  ): Promise<T> {
    const { data } = await this.delete<T>(endpoint, options);
    return data;
  }

  async patchData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    const result = await this.patch<T>(endpoint, data, options);
    return result.data;
  }
}

const baseURL = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}`;

export const tripAPI = new FetchClient(baseURL);
