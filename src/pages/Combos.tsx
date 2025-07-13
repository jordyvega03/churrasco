import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Combo {
    id: number;
    nombre: string;
    tipo: string;
    tipoCombo: string;
    precio: number;
    observaciones?: string;
    churrascos: string[];
    dulces: string[];
    urlImagen?: string;
}

const API_URL = "http://localhost:5000/api/combos"; // Cambia según tu API

const Combos: React.FC = () => {
    const navigate = useNavigate();

    const [combos, setCombos] = useState<Combo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);

    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Combo[]>(API_URL);
            setCombos(res.data);
        } catch {
            setError("Error cargando combos");
        }
        setLoading(false);
    };

    const openModal = (combo: Combo) => {
        setSelectedCombo(combo);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCombo(null);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-md">
            <button
                onClick={() => navigate("/")}
                className="mb-6 px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
                ← Volver al Home
            </button>

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Combos</h1>

            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {combos.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500">No hay combos disponibles.</p>
                    )}

                    {combos.map((c) => (
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
                            <p className="text-gray-700 mb-1 text-center">
                                <strong>Tipo:</strong> {c.tipoCombo}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-auto">${c.precio.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal detallado */}
            {modalOpen && selectedCombo && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg overflow-auto max-h-[80vh]">
                        {selectedCombo.urlImagen && (
                            <img
                                src={selectedCombo.urlImagen}
                                alt={selectedCombo.nombre}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}

                        <h2
                            id="modalTitle"
                            className="text-2xl font-bold text-pink-700 mb-4 text-center"
                        >
                            {selectedCombo.nombre}
                        </h2>

                        <div className="space-y-3 text-gray-800">
                            <p>
                                <strong>Tipo de Combo:</strong> {selectedCombo.tipoCombo}
                            </p>
                            {selectedCombo.observaciones && (
                                <p>
                                    <strong>Observaciones:</strong> {selectedCombo.observaciones}
                                </p>
                            )}

                            <div>
                                <strong>Churrascos:</strong>
                                {selectedCombo.churrascos.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {selectedCombo.churrascos.map((ch, i) => (
                                            <li key={i}>{ch}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Sin churrascos asignados</p>
                                )}
                            </div>

                            <div>
                                <strong>Dulces:</strong>
                                {selectedCombo.dulces.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {selectedCombo.dulces.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Sin dulces asignados</p>
                                )}
                            </div>

                            <p className="text-pink-600 font-bold text-lg mt-4">
                                Precio: ${selectedCombo.precio.toFixed(2)}
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

export default Combos;
