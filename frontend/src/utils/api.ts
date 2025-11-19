
// Auto-generated API utility for React Frontend

const BASE_URL = "https://love-unsent-app-final-backend.onrender.com";

export const apiRequest = async (endpoint: string, method = "GET", body?: any, token?: string) => {
    const headers: any = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "API request failed");
    }

    return data;
};

export default apiRequest;
