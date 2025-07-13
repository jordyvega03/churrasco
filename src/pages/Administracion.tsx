import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
    HiMenu,
    HiHome,
    HiChartBar,
    HiCube,
    HiLogout,
    HiClipboardList
} from "react-icons/hi";

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        onLogout();
        navigate("/", { replace: true });
    };

    // Opciones de menú con icono, ruta y etiqueta
// dentro del componente Dashboard, actualiza la lista menuItems así:
    const menuItems = [
        { to: "/administracion/inicio", label: "Inicio", icon: <HiHome size={24} /> },
        { to: "/administracion/dashboard", label: "Dashboard", icon: <HiChartBar size={24} /> },
        { to: "/administracion/productos", label: "Productos", icon: <HiClipboardList  size={24} /> },
        { to: "/administracion/inventario", label: "Inventario", icon: <HiCube size={24} /> },
    ];


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-lg flex flex-col transition-width duration-300 ${
                    collapsed ? "w-16" : "w-64"
                }`}
            >
                {/* Header: Admin Panel + boton hamburguesa */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    {!collapsed && (
                        <h1 className="text-2xl font-bold text-pink-600">Admin Panel</h1>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        aria-label="Toggle menu"
                        className="text-pink-600 focus:outline-none focus:ring focus:ring-pink-300 rounded"
                    >
                        <HiMenu size={28} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 flex flex-col justify-between px-2 py-6">
                    <div className="space-y-2">
                        {menuItems.map(({ to, label, icon }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 font-medium hover:bg-pink-100 hover:text-pink-600 transition ${
                                        isActive ? "bg-pink-100 text-pink-600" : ""
                                    }`}
                                    title={collapsed ? label : undefined}
                                >
                                    {icon}
                                    {!collapsed && <span>{label}</span>}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Logout al fondo */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-red-600 font-semibold hover:bg-red-100 hover:text-red-700 transition"
                        title={collapsed ? "Cerrar sesión" : undefined}
                    >
                        <HiLogout size={24} />
                        {!collapsed && <span>Cerrar sesión</span>}
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
