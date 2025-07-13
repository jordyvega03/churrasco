import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Dulce {
    id: number;
    nombre: string;
    tipoDulce: string;
    empaque: string;
    cantidadEnCaja: number;
    precio: number;
    tipo: string;
    urlImagen?: string; // minúscula inicial, como viene en tu API
}

const API_URL = "http://localhost:5000/api/dulces";

const Dulces: React.FC = () => {
    const navigate = useNavigate();

    const [dulces, setDulces] = useState<Dulce[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDulce, setSelectedDulce] = useState<Dulce | null>(null);

    useEffect(() => {
        fetchDulces();
    }, []);

    const fetchDulces = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Dulce[]>(API_URL);
            setDulces(res.data);
        } catch {
            setError("Error cargando dulces");
        }
        setLoading(false);
    };

    const openModal = (dulce: Dulce) => {
        setSelectedDulce(dulce);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDulce(null);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-md">
            <button
                onClick={() => navigate("/")}
                className="mb-6 px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
                ← Volver al Home
            </button>

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Dulces</h1>

            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dulces.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500">No hay dulces disponibles.</p>
                    )}

                    {dulces.map((d) => (
                        <div
                            key={d.id}
                            className="cursor-pointer rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center"
                            onClick={() => openModal(d)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openModal(d);
                            }}
                        >
                            {d.urlImagen && (
                                <img
                                    src={d.urlImagen}
                                    alt={d.nombre}
                                    className="w-40 h-28 object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold text-pink-700 mb-2 text-center">{d.nombre}</h2>
                            <p className="text-gray-700 mb-1">
                                <strong>Tipo Dulce:</strong> {d.tipoDulce}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Empaque:</strong> {d.empaque}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Cantidad en Caja:</strong> {d.cantidadEnCaja}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-2">${d.precio.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal detallado */}
            {modalOpen && selectedDulce && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        {selectedDulce.urlImagen && (
                            <img
                                src={selectedDulce.urlImagen}
                                alt={selectedDulce.nombre}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}

                        <h2
                            id="modalTitle"
                            className="text-2xl font-bold text-pink-700 mb-6 text-center"
                        >
                            {selectedDulce.nombre}
                        </h2>

                        <div className="space-y-4 text-gray-800">
                            <p>
                                <strong>Tipo de Dulce:</strong> {selectedDulce.tipoDulce}
                            </p>
                            <p>
                                <strong>Empaque:</strong> {selectedDulce.empaque}
                            </p>
                            <p>
                                <strong>Cantidad en Caja:</strong> {selectedDulce.cantidadEnCaja}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-4">
                                Precio: ${selectedDulce.precio.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dulces;
