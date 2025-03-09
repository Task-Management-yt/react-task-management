const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed Periksa kembali email dan password Anda.");
        }

        // Simpan token ke localStorage atau sessionStorage
        localStorage.setItem("token", data.access_token);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

// Fungsi untuk Register
export const register = async (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registrasi gagal. Coba lagi.");
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui");
        }
    }
};

// Fungsi untuk Logout
export const logout = () => {
    localStorage.removeItem("token");
};

// Fungsi untuk mengecek apakah pengguna sudah login
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Fungsi untuk mengambil data pengguna yang sedang login
export const getUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(`${API_URL}/me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Gagal mengambil data pengguna.");
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
