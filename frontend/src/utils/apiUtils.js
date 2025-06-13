export async function apiUtils({ url, method, body }) {
    const API_URL = "http://localhost:5000";
    const response = await fetch(`${API_URL}/${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return response.json();
}

