import fetch from "isomorphic-unfetch";

export abstract class Base {
  private apiKey: string;
  private baseUrl = "https://api.aideyekit.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  protected async invoke<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
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
