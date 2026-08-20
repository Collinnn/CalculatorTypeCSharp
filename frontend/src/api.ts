const API_URL = "http://localhost:5013/api/calculator";

export async function calculate(
    a: number,
    b: number,
    operation: string
): Promise<number> {
    console.log("Sending to C#:", {
        a,
        b,
        operation
    });

    const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            a,
            b,
            operation
        })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    const data: { result: number } = await response.json();

    console.log("Received from C#:", data);

    return data.result;
}