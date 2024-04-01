type Config = {
  apiKey: string;
  baseUrl?: string;
};

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: Config) {
    const { apiKey, baseUrl } = config;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl || "https://jsonplaceholder.typicode.com";
  }

  protected invoke<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      "api-key": this.apiKey,
    };

    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
