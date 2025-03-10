import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../components/Input";
import Button from "../components/Button";
import { isAuthenticated, login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated()) {
            navigate("/home", { replace: true }); // Redirect dengan replace agar tidak bisa kembali ke login
        }
    }, [navigate]);

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        if (!email.trim()) newErrors.email = "Email atau username harus diisi.";
        if (!password.trim()) newErrors.password = "Password harus diisi.";
        else if (password.length < 6) newErrors.password = "Password harus lebih dari 6 karakter.";
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await login(email, password);
            // redirect pengguna
            navigate("/home");
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message || "Terjadi kesalahan saat login.");
            } else {
                setErrorMessage("Terjadi kesalahan saat login.");
            }
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <div className="text-center">
                    <h4>Welcome to Kerjain 📝</h4>
                    <p>🚀 Kelola tugasmu dengan mudah,<br />💡 Tetap produktif setiap hari!</p>
                    <p></p>
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div>
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div>
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <Button type="submit" text="Sign In" />
                </form>
                <div className="text-center mt-3">
                    <small>New on our platform? <a href="/signup">Create an account</a></small>
                </div>
            </div>
        </div >
    );
};

export default Login;
