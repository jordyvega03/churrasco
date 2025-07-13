import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiPencil, HiTrash, HiPlus, HiCube, HiCake, HiShoppingBag } from "react-icons/hi";

type ProductoType = "churrascos" | "dulces" | "combos";

interface BaseProducto {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
    urlImagen?: string;
}

interface Churrasco extends BaseProducto {
    tipoCarne: string;
    termino: string;
    tamaño: string;
    porciones: number;
    churrascoGuarniciones: { guarnicionId: number; cantidad: number }[];
}

interface Dulce extends BaseProducto {
    tipoDulce?: string;
    empaque?: string;
    cantidadEnCaja?: number;
}

interface Combo extends BaseProducto {
    tipoCombo?: string;
    observaciones?: string;
    churrascos?: string[];
    dulces?: string[];
}

type Producto = Churrasco | Dulce | Combo;

const API_BASE = "http://localhost:5000/api"; // Cambia si necesitas

const AdminProductos: React.FC = () => {
    const [tipoProducto, setTipoProducto] = useState<ProductoType>("churrascos");
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({}); // tipado más flexible

    // Cargar productos cuando cambia tipo
    useEffect(() => {
        fetchProductos();
    }, [tipoProducto]);

    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Producto[]>(`${API_BASE}/${tipoProducto}`);
            setProductos(res.data);
        } catch {
            setError("Error cargando productos");
        }
        setLoading(false);
    };

    const openModal = (producto?: Producto) => {
        if (producto) {
            setEditingProducto(producto);
            setFormData(producto);
        } else {
            setEditingProducto(null);
            setFormData({});
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProducto(null);
        setFormData({});
        setError(null);
    };

    // Manejo de cambios en inputs, incluyendo archivos
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            const target = e.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: target.files?.[0] || null }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Enviar formulario para crear o actualizar producto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            for (const key in formData) {
                const value = formData[key];
                if (value instanceof File) {
                    data.append(key, value);
                } else if (typeof value === "object" && value !== null) {
                    data.append(key, JSON.stringify(value));
                } else if (value !== undefined && value !== null) {
                    data.append(key, String(value));
                }
            }

            if (editingProducto) {
                await axios.put(`${API_BASE}/${tipoProducto}/${editingProducto.id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(`${API_BASE}/${tipoProducto}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            await fetchProductos();
            closeModal();
        } catch {
            setError("Error guardando producto");
        }
        setLoading(false);
    };

    // Eliminar producto
    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE}/${tipoProducto}/${id}`);
            await fetchProductos();
        } catch {
            setError("Error eliminando producto");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <label htmlFor="tipoProducto" className="font-semibold text-lg">
                    Administración:
                </label>
                <select
                    id="tipoProducto"
                    className="border border-gray-300 rounded px-3 py-2"
                    value={tipoProducto}
                    onChange={(e) => setTipoProducto(e.target.value as ProductoType)}
                >
                    <option value="churrascos">Churrascos</option>
                    <option value="dulces">Dulces</option>
                    <option value="combos">Combos</option>
                </select>

                <button
                    onClick={() => openModal()}
                    className="ml-auto flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                    <HiPlus /> Nuevo
                </button>
            </div>

            {!loading && !error && (
                <table className="min-w-full bg-white rounded shadow overflow-hidden">
                    <thead className="bg-pink-50">
                    <tr>
                        <th className="p-3 border-b border-gray-200 text-left">Nombre</th>
                        <th className="p-3 border-b border-gray-200 text-left">Precio</th>
                        <th className="p-3 border-b border-gray-200 text-left">Tipo</th>
                        {tipoProducto === "churrascos" && (
                            <>
                                <th className="p-3 border-b border-gray-200 text-left">Tipo Carne</th>
                                <th className="p-3 border-b border-gray-200 text-left">Término</th>
                                <th className="p-3 border-b border-gray-200 text-left">Tamaño</th>
                                <th className="p-3 border-b border-gray-200 text-left">Porciones</th>
                            </>
                        )}
                        <th className="p-3 border-b border-gray-200 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.map((p) => (
                        <tr key={p.id} className="hover:bg-pink-50">
                            <td className="p-3 border-b border-gray-200 flex items-center gap-2">
                                {tipoProducto === "churrascos" && <HiCube />}
                                {tipoProducto === "dulces" && <HiCake />}
                                {tipoProducto === "combos" && <HiShoppingBag />}
                                {p.nombre}
                            </td>
                            <td className="p-3 border-b border-gray-200">${p.precio.toFixed(2)}</td>
                            <td className="p-3 border-b border-gray-200">{p.tipo}</td>
                            {tipoProducto === "churrascos" && (
                                <>
                                    <td className="p-3 border-b border-gray-200">{(p as Churrasco).tipoCarne}</td>
                                    <td className="p-3 border-b border-gray-200">{(p as Churrasco).termino}</td>
                                    <td className="p-3 border-b border-gray-200">{(p as Churrasco).tamaño}</td>
                                    <td className="p-3 border-b border-gray-200">{(p as Churrasco).porciones}</td>
                                </>
                            )}
                            <td className="p-3 border-b border-gray-200 space-x-2">
                                <button
                                    onClick={() => openModal(p)}
                                    className="text-pink-600 hover:underline flex items-center gap-1"
                                    title="Editar"
                                >
                                    <HiPencil /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-red-600 hover:underline flex items-center gap-1"
                                    title="Eliminar"
                                >
                                    <HiTrash /> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Modal para agregar/editar */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto space-y-4"
                    >
                        <h2 id="modalTitle" className="text-2xl font-bold text-pink-600 mb-6">
                            {editingProducto ? "Editar Producto" : "Nuevo Producto"}
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex flex-col">
                                <span className="font-semibold">Nombre*:</span>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre || ""}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="font-semibold">Precio*:</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="precio"
                                    value={formData.precio || ""}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="font-semibold">Tipo*:</span>
                                <input
                                    type="text"
                                    name="tipo"
                                    value={formData.tipo || ""}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </label>

                            {/* Campos extra para churrascos */}
                            {tipoProducto === "churrascos" && (
                                <>
                                    <label className="flex flex-col">
                                        <span className="font-semibold">Tipo Carne*:</span>
                                        <input
                                            type="text"
                                            name="tipoCarne"
                                            value={formData.tipoCarne || ""}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </label>

                                    <label className="flex flex-col">
                                        <span className="font-semibold">Término*:</span>
                                        <input
                                            type="text"
                                            name="termino"
                                            value={formData.termino || ""}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </label>

                                    <label className="flex flex-col">
                                        <span className="font-semibold">Tamaño*:</span>
                                        <input
                                            type="text"
                                            name="tamaño"
                                            value={formData.tamaño || ""}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </label>

                                    <label className="flex flex-col">
                                        <span className="font-semibold">Porciones*:</span>
                                        <input
                                            type="number"
                                            name="porciones"
                                            value={formData.porciones || ""}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </label>
                                </>
                            )}

                            <label className="flex flex-col col-span-2">
                                <span className="font-semibold">Imagen:</span>
                                <input
                                    type="file"
                                    name="urlImagen"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="border border-gray-300 rounded p-2"
                                />
                            </label>
                        </div>

                        {error && <p className="text-red-600 mt-2">{error}</p>}

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
                            >
                                {loading ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminProductos;
