import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "./../components/CartContext";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    urlImagen?: string;
}

const API_URL = "http://localhost:5000/api/churrascos";

const Venta: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { carrito, agregarProducto, eliminarProducto, cambiarCantidad, limpiarCarrito } = useCart();

    const queryParams = new URLSearchParams(location.search);
    const productoId = queryParams.get("productoId");

    const [productoActual, setProductoActual] = useState<Producto | null>(null);
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mensaje, setMensaje] = useState<string | null>(null);

    useEffect(() => {
        if (productoId) {
            fetchProducto(parseInt(productoId));
        }
    }, [productoId]);

    const fetchProducto = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Producto>(`${API_URL}/${id}`);
            setProductoActual(res.data);
        } catch {
            setError("No se pudo cargar el producto");
        }
        setLoading(false);
    };

    const handleAgregarAlCarrito = () => {
        if (!productoActual) return;
        if (cantidad <= 0) {
            setMensaje("La cantidad debe ser al menos 1");
            return;
        }

        agregarProducto(productoActual, cantidad);

        setMensaje(`Agregaste ${cantidad} de "${productoActual.nombre}" al carrito`);
        setCantidad(1);
        setProductoActual(null);
        navigate("/venta", { replace: true });
    };

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const handleConfirmarCompra = () => {
        if (carrito.length === 0) {
            setMensaje("Agrega al menos un producto al carrito");
            return;
        }
        setMensaje(`Compra confirmada! Total: Q${total.toFixed(2)}`);
        limpiarCarrito();
    };

    // Mostrar loading o error antes del contenido principal
    if (loading) {
        return <p className="text-center text-gray-600 mt-12">Cargando producto...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 mt-12">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-12">
            <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">Carrito de Compras</h1>

            {productoActual && (
                <div className="mb-6 border rounded p-4 shadow-sm">
                    <h2 className="font-semibold mb-2">Agregar producto: {productoActual.nombre}</h2>
                    {productoActual.urlImagen && (
                        <img
                            src={productoActual.urlImagen}
                            alt={productoActual.nombre}
                            className="w-40 h-24 object-cover mb-2 rounded"
                        />
                    )}
                    <label className="block mb-2">
                        Cantidad:
                        <input
                            type="number"
                            min={1}
                            value={cantidad}
                            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                            className="ml-2 border rounded px-2 py-1 w-20"
                        />
                    </label>
                    <button
                        onClick={handleAgregarAlCarrito}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
                    >
                        Agregar al carrito
                    </button>
                </div>
            )}

            <button
                onClick={() => navigate("/churrascos")}
                className="mb-6 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
                ← Volver a productos
            </button>

            {carrito.length === 0 ? (
                <p className="text-center text-gray-600">El carrito está vacío.</p>
            ) : (
                <table className="w-full border border-gray-300 rounded shadow-sm">
                    <thead className="bg-pink-50">
                    <tr>
                        <th className="p-3 text-left font-semibold text-pink-700">Producto</th>
                        <th className="p-3 text-center font-semibold text-pink-700">Precio Unitario</th>
                        <th className="p-3 text-center font-semibold text-pink-700">Cantidad</th>
                        <th className="p-3 text-center font-semibold text-pink-700">Subtotal</th>
                        <th className="p-3 text-center font-semibold text-pink-700">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carrito.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200 hover:bg-pink-50">
                            <td className="p-3">{item.nombre}</td>
                            <td className="p-3 text-center">Q{item.precio.toFixed(2)}</td>
                            <td className="p-3 text-center">
                                <input
                                    type="number"
                                    min={1}
                                    value={item.cantidad}
                                    onChange={(e) => cambiarCantidad(item.id, parseInt(e.target.value) || 1)}
                                    className="w-16 text-center border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="p-3 text-center">Q{(item.precio * item.cantidad).toFixed(2)}</td>
                            <td className="p-3 text-center">
                                <button
                                    onClick={() => eliminarProducto(item.id)}
                                    className="text-red-600 hover:underline font-semibold"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-pink-100">
                        <td className="p-3 text-right" colSpan={3}>
                            Total:
                        </td>
                        <td className="p-3 text-center">Q{total.toFixed(2)}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )}

            <button
                onClick={handleConfirmarCompra}
                disabled={carrito.length === 0}
                className={`w-full py-2 rounded text-white font-semibold ${
                    carrito.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                }`}
            >
                Confirmar Compra
            </button>

            {mensaje && <p className="mt-4 text-green-600 font-semibold text-center">{mensaje}</p>}
        </div>
    );
};

export default Venta;
