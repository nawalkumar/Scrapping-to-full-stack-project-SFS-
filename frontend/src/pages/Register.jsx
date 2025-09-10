// src/pages/Register.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Register user
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
            });

            // Auto-login after registration
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            login(res.data.user, res.data.token);

            alert("Registered and logged in successfully!");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
