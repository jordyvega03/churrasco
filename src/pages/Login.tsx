import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/login";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: Location })?.from?.pathname || "/dashboard";

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post<{ token: string }>(API_URL, formData);
            localStorage.setItem("token", res.data.token);
            onLogin();  // <-- Aquí notificas a AppRoutes que ya hay token
            navigate(from, { replace: true });
        } catch {
            setError("Email o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">Iniciar Sesión</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                            placeholder="admin@example.com"
                            autoComplete="username"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Contraseña</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </label>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold"
                        >
                            Regresar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-md transition disabled:opacity-50"
                        >
                            {loading ? "Cargando..." : "Ingresar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
