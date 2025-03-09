const API_URL = `${import.meta.env.VITE_API_URL}/task`;

export const getUserTasks = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(`${API_URL}/get`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal mengambil data pengguna.");
        }

        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof Error) {
            throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};