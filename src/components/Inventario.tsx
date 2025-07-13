import React, { useEffect, useState } from "react";
import axios from "axios";

interface InventarioItem {
    id?: string;
    nombreIngrediente: string;
    tipoIngrediente: string;
    cantidad: number;
    unidad: string;
}

const API_URL = "http://localhost:5000/api/inventario";

interface AlertProps {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = "success", onClose }) => {
    return (
        <div
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white font-semibold transition-opacity duration-300
          ${type === "success" ? "bg-pink-600" : "bg-red-600"}`}
            role="alert"
            onClick={onClose}
            style={{ cursor: "pointer" }}
        >
            {message}
        </div>
    );
};

interface ConfirmDialogProps {
    message: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         message,
                                                         isOpen,
                                                         onConfirm,
                                                         onCancel,
                                                     }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
                <p className="mb-6 text-gray-800">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 transition"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-pink-600 text-pink-600 hover:bg-pink-100 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

const Inventario: React.FC = () => {
    const [items, setItems] = useState<InventarioItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<InventarioItem | null>(null);
    const [formData, setFormData] = useState<InventarioItem>({
        nombreIngrediente: "",
        tipoIngrediente: "",
        cantidad: 0,
        unidad: "",
    });

    // Alert state
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Confirm dialog state
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<InventarioItem[]>(API_URL);
            setItems(res.data);
        } catch {
            setError("Error cargando inventario");
        }
        setLoading(false);
    };

    const openModal = (item?: InventarioItem) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({
                nombreIngrediente: "",
                tipoIngrediente: "",
                cantidad: 0,
                unidad: "",
            });
        }
        setModalOpen(true);
        setError(null);
    };

    const closeModal = () => setModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "cantidad" ? Number(value) : value,
        }));
    };

    const showAlert = (message: string, type: "success" | "error" = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 4000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (editingItem?.id) {
                await axios.put(`${API_URL}/${editingItem.id}`, formData);
                showAlert("Ingrediente actualizado correctamente", "success");
            } else {
                await axios.post(API_URL, formData);
                showAlert("Ingrediente agregado correctamente", "success");
            }
            await fetchItems();
            closeModal();
        } catch {
            setError("Error guardando inventario");
            showAlert("Error guardando inventario", "error");
        }
        setLoading(false);
    };

    const askDelete = (id?: string) => {
        if (!id) {
            showAlert("ID inválido para eliminar.", "error");
            return;
        }
        setItemToDelete(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setLoading(true);
        setError(null);
        setConfirmOpen(false);

        try {
            await axios.delete(`${API_URL}/${itemToDelete}`);
            await fetchItems();
            showAlert("Ingrediente eliminado correctamente", "success");
        } catch {
            setError("Error eliminando item");
            showAlert("Error eliminando item", "error");
        }
        setLoading(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setConfirmOpen(false);
        setItemToDelete(null);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-md relative">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Inventario</h1>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => openModal()}
                    className="px-5 py-2 rounded-lg border border-pink-300 bg-pink-50 text-pink-700 font-semibold hover:bg-pink-100 transition"
                >
                    Agregar Ingrediente
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-center text-red-600 mb-4">{error}</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-pink-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Tipo</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-pink-700">Cantidad</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Unidad</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-pink-700">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-500 font-medium">
                                    No hay ingredientes registrados.
                                </td>
                            </tr>
                        )}
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-pink-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.nombreIngrediente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.tipoIngrediente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-800">{item.cantidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.unidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center space-x-3">
                                    <button
                                        onClick={() => openModal(item)}
                                        className="px-3 py-1.5 rounded-md text-sm font-medium text-pink-600 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => askDelete(item.id)}
                                        className="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <h2
                            id="modalTitle"
                            className="text-2xl font-bold text-pink-700 mb-6 text-center"
                        >
                            {editingItem ? "Editar Ingrediente" : "Agregar Ingrediente"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Nombre Ingrediente</span>
                                <input
                                    type="text"
                                    name="nombreIngrediente"
                                    value={formData.nombreIngrediente}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Tipo Ingrediente</span>
                                <input
                                    type="text"
                                    name="tipoIngrediente"
                                    value={formData.tipoIngrediente}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Cantidad</span>
                                <input
                                    type="number"
                                    name="cantidad"
                                    min={0}
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Unidad</span>
                                <input
                                    type="text"
                                    name="unidad"
                                    value={formData.unidad}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                                />
                            </label>

                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmación personalizada */}
            <ConfirmDialog
                isOpen={confirmOpen}
                message="¿Seguro que deseas eliminar este item?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />

            {/* Alertas */}
            {alertMessage && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setAlertMessage(null)}
                />
            )}
        </div>
    );
};

export default Inventario;
