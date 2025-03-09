import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../components/Input";
import Button from "../components/Button";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!formData.name.trim()) {
            newErrors.name = "Nama harus diisi.";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username harus diisi.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email harus diisi.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password harus lebih dari 6 karakter.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Password tidak cocok.";
        }

        setErrors(newErrors);

        // Jika ada error, hentikan submit
        if (Object.values(newErrors).some(error => error !== "")) {
            return;
        }

        console.log("Registering with:", formData);

        // Tambahkan request ke backend di sini
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <div className="text-center">
                    <h4>Create an Account</h4>
                    <p>Join us and start your journey</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                    <Button type="submit" text="Sign Up" />
                </form>
                <div className="text-center mt-3">
                    <small>Already have an account? <a href="/">Sign In</a></small>
                </div>
            </div>
        </div>
    );
};

export default Register;
