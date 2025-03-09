import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../components/Input";
import Button from "../components/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { email: "", password: "" };

        if (!email.trim()) {
            newErrors.email = "Email atau username harus diisi.";
        }

        if (!password.trim()) {
            newErrors.password = "Password harus diisi.";
        } else if (password.length < 6) {
            newErrors.password = "Password harus lebih dari 6 karakter.";
        }

        setErrors(newErrors);

        // Jika ada error, hentikan submit
        if (Object.values(newErrors).some(error => error !== "")) {
            return;
        }

        console.log("Login dengan:", { email, password });

        // Tambahkan request ke backend di sini
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <div className="text-center">
                    <h4>Welcome to Sneat! 👋</h4>
                    <p>Please sign-in to your account and start the adventure</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputField
                            label="Email or Username"
                            type="text"
                            placeholder="Enter your email or username"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div>
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <Button type="submit" text="Sign In" />
                </form>
                <div className="text-center mt-3">
                    <small>New on our platform? <a href="/signup">Create an account</a></small>
                </div>
            </div>
        </div>
    );
};

export default Login;
