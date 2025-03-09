import TaskResponse from "../context/schema";

const API_URL = `${import.meta.env.VITE_API_URL}/task`;

// Fungsi untuk mengambil semua task pengguna
export const getUserTasks = async (): Promise<TaskResponse[]> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(`${API_URL}/get`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal mengambil data task.");
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};

// Fungsi untuk menambahkan task baru
export const addTask = async (task: {
    title: string;
    description: string;
    status: string;
    deadline: string;
}): Promise<TaskResponse> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        task.status = task.status || "belum selesai";
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        console.log(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal menambahkan task.");
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};

// Fungsi untuk mengedit task
export const editTask = async (taskId: string, updatedTask: {
    title: string;
    description: string;
    status: string;
    deadline: string;
}): Promise<TaskResponse> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(`${API_URL}/update/${taskId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal mengedit task.");
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};

// Fungsi untuk menghapus task
export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(`${API_URL}/delete/${taskId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal menghapus task.");
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};