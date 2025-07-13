import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Churrascos from './pages/Churrascos';
import Dulces from './pages/Dulces';
import Combos from './pages/Combos';
import Dashboard from "./components/Dashboard.tsx";
import Administracion from "./pages/Administracion.tsx";
import AdminProductos from "./components/AdminProductos.tsx";
import Inventario from './components/Inventario.tsx';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute ';

export default function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        setCheckingAuth(false);
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (checkingAuth) {
        return <div>Cargando...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Login público */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/administracion" replace />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />

                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/churrascos" element={<Churrascos />} />
                <Route path="/dulces" element={<Dulces />} />
                <Route path="/combos" element={<Combos />} />

                {/* Rutas protegidas con layout anidado */}
                <Route
                    path="/administracion"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Administracion onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        index
                        element={<Navigate to="productos" replace />}
                    />
                    <Route
                        path="productos"
                        element={<AdminProductos />}
                    />

                    <Route
                        path="inventario"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Inventario />
                            </ProtectedRoute>
                        }
                    />

                    {/* Puedes agregar otras rutas hijas aquí */}
                </Route>

                {/* Ruta catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
