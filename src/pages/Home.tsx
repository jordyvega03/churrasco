import type { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-6">
            <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-3xl w-full flex flex-col items-center">
                <img
                    src="src/assets/churrasco.png"
                    alt="Logo tienda churrascos y dulces"
                    className="w-28 h-28 mb-8 object-contain drop-shadow-md"
                />
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center leading-snug">
                    Bienvenido al Sistema de Gestión <br />{" "}
                    <span className="text-pink-600">Churrascos &amp; Dulces Típicos</span>
                </h1>
                <p className="text-gray-600 mb-10 text-center max-w-lg">
                    Administra tus productos, combos, ventas y recibe recomendaciones inteligentes para hacer crecer tu negocio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {[
                        { to: "/churrascos", title: "Churrascos", emoji: "🥩", description: "Gestión de platos y configuraciones." },
                        { to: "/dulces", title: "Dulces", emoji: "🍬", description: "Gestión de dulces y cajas." },
                        { to: "/combos", title: "Combos", emoji: "🧺", description: "Armado y edición de combos." },
                        { to: "/llm", title: "IA/Asistente", emoji: "🤖", description: "Recomendaciones inteligentes y consultas." },
                        { to: "/administracion", title: "Administración", emoji: "⚙️", description: "Dashboard e Inventario", colSpan: 2 },
                    ].map(({ to, title, emoji, description, colSpan }) => (
                        <ModuleLink
                            key={to}
                            to={to}
                            title={title}
                            emoji={emoji}
                            description={description}
                            colSpan={colSpan}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

interface ModuleLinkProps {
    to: string;
    title: string;
    emoji: string;
    description: string;
    colSpan?: number;
}

const ModuleLink: FC<ModuleLinkProps> = ({ to, title, emoji, description, colSpan }) => (
    <Link
        to={to}
        className={`flex flex-col items-center gap-3 p-6 bg-gradient-to-tr from-white to-pink-50 border border-pink-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-pink-300 ${
            colSpan === 2 ? "sm:col-span-2" : ""
        }`}
    >
        <span className="text-5xl">{emoji}</span>
        <span className="font-semibold text-lg text-gray-800">{title}</span>
        <span className="text-sm text-gray-500 text-center">{description}</span>
    </Link>
);

export default Home;
