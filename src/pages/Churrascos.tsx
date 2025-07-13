import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Churrasco {
    id: number;
    nombre: string;
    tipoCarne: string;
    termino: string;
    tamaño: string;
    porciones: number;
    churrascoGuarniciones: string[];
    precio: number;
    tipo: string;
    urlImagen?: string; // Aquí el campo de imagen
}

const API_URL = "http://localhost:5000/api/churrascos";

const Churrascos: React.FC = () => {
    const [churrascos, setChurrascos] = useState<Churrasco[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedChurrasco, setSelectedChurrasco] = useState<Churrasco | null>(null);

    useEffect(() => {
        fetchChurrascos();
    }, []);

    const fetchChurrascos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Churrasco[]>(API_URL);
            setChurrascos(res.data);
        } catch {
            setError("Error cargando churrascos");
        }
        setLoading(false);
    };

    const openModal = (churrasco: Churrasco) => {
        setSelectedChurrasco(churrasco);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedChurrasco(null);
    };

    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-md">

            <button
                onClick={() => navigate("/")}
                className="mb-6 px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
                ← Volver al Home
            </button>

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Churrascos</h1>

            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {churrascos.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500">No hay churrascos disponibles.</p>
                    )}

                    {churrascos.map((c) => (
                        <div
                            key={c.id}
                            className="cursor-pointer rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center"
                            onClick={() => openModal(c)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openModal(c);
                            }}
                        >
                            {c.urlImagen && (
                                <img
                                    src={c.urlImagen}
                                    alt={c.nombre}
                                    className="w-40 h-28 object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold text-pink-700 mb-2 text-center">{c.nombre}</h2>
                            <p className="text-gray-700 mb-1">
                                <strong>Tipo Carne:</strong> {c.tipoCarne}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Término:</strong> {c.termino}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Tamaño:</strong> {c.tamaño}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Porciones:</strong> {c.porciones}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-2">${c.precio.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal detallado */}
            {modalOpen && selectedChurrasco && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        {selectedChurrasco.urlImagen && (
                            <img
                                src={selectedChurrasco.urlImagen}
                                alt={selectedChurrasco.nombre}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}

                        <h2
                            id="modalTitle"
                            className="text-2xl font-bold text-pink-700 mb-6 text-center"
                        >
                            {selectedChurrasco.nombre}
                        </h2>

                        <div className="space-y-4 text-gray-800">
                            <p>
                                <strong>Tipo de Carne:</strong> {selectedChurrasco.tipoCarne}
                            </p>
                            <p>
                                <strong>Término:</strong> {selectedChurrasco.termino}
                            </p>
                            <p>
                                <strong>Tamaño:</strong> {selectedChurrasco.tamaño}
                            </p>
                            <p>
                                <strong>Porciones:</strong> {selectedChurrasco.porciones}
                            </p>
                            <p>
                                <strong>Guarniciones:</strong>{" "}
                                {selectedChurrasco.churrascoGuarniciones.length > 0
                                    ? selectedChurrasco.churrascoGuarniciones.join(", ")
                                    : "Sin guarniciones"}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-4">
                                Precio: ${selectedChurrasco.precio.toFixed(2)}
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

export default Churrascos;
