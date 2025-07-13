import './App.css'
import AppRoutes from "./routes.tsx";
import {CartProvider} from "./components/CartContext.tsx";

function App() {

    return (
        <CartProvider>
            <AppRoutes />
        </CartProvider>
    )
}

export default App
