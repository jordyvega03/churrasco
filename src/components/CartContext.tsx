import { createContext, useContext, useState, type ReactNode } from "react";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    urlImagen?: string;
}

interface ItemCarrito extends Producto {
    cantidad: number;
}

interface CartContextType {
    carrito: ItemCarrito[];
    agregarProducto: (producto: Producto, cantidad: number) => void;
    eliminarProducto: (id: number) => void;
    cambiarCantidad: (id: number, cantidad: number) => void;
    limpiarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    const agregarProducto = (producto: Producto, cantidad: number) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            }
            return [...prev, { ...producto, cantidad }];
        });
    };

    const eliminarProducto = (id: number) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    };

    const cambiarCantidad = (id: number, cantidad: number) => {
        if (cantidad < 1) return;
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad } : item
            )
        );
    };

    const limpiarCarrito = () => setCarrito([]);

    return (
        <CartContext.Provider
            value={{ carrito, agregarProducto, eliminarProducto, cambiarCantidad, limpiarCarrito }}
        >
            {children}
        </CartContext.Provider>
    );
};
