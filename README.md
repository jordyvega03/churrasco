# Churrasquin Admin Frontend

Frontend web desarrollado en **ReactJS** con **Vite** y **TypeScript** para administrar productos, inventario y sucursales de una tienda de churrascos y dulces típicos. Incluye dashboard con gráficos y estadísticas interactivas, consumiendo APIs REST basadas en Minimal APIs con .NET.

---

## Características

- **Dashboard** con gráficos de ventas, productos más vendidos, ganancias y desperdicios usando **React-Chartjs-2** y **Chart.js**.
- **Gestión de Productos**: CRUD para churrascos, dulces y combos con imágenes y detalles.
- **Inventario**: CRUD para ingredientes con cantidades y unidades.
- Navegación lateral con menú responsive.
- Uso de componentes React funcionales con hooks (`useState`, `useEffect`).
- Formularios con validaciones básicas.
- Interfaz limpia y moderna con Tailwind CSS para estilos.
- Consumo de APIs REST implementadas en **Minimal APIs** de **.NET 9** para backend.

---

# Screenshots
## PUBLIC SECCION
### INICIO
![Inicio](https://github.com/user-attachments/assets/849bbb67-a671-4d13-b43d-51b7e76364da)
### DETALLE PRODUCTO
![Producto](https://github.com/user-attachments/assets/3e6c4a84-27ed-49d8-9745-839116ce5204)
### FLUJO CARRITO
![Carrito](https://github.com/user-attachments/assets/03710fc4-8c4a-43f7-bead-6885cdf49ac3)
### FINALIZAR COMPRA
![Finalizar Compra](https://github.com/user-attachments/assets/b6f84ac4-33e2-4f29-9614-ff6a66a3c0d0)

## ADMIN SECCION
### LOGIN
![Login](https://github.com/user-attachments/assets/2b250f38-5026-45a6-9f7e-5f50a19f5097) 
### DASHBOARD
![Dashboard](https://github.com/user-attachments/assets/9e90aab7-5e3b-46ff-91ff-6ee2b29d779f)
### PRODUCTOS
![Sucursales](https://github.com/user-attachments/assets/3fd51d96-5112-4c2f-84bd-1b2c74b164e9)  
### INVENTARIOS
![Inventario](https://github.com/user-attachments/assets/081561f6-f850-40ce-a34a-aaf78cbf262b)  

## Tecnologías y librerías

- ReactJS (v18+)
- Vite como bundler y entorno de desarrollo rápido
- TypeScript para tipado estático y mejor mantenimiento
- React-Chartjs-2 & Chart.js para gráficos interactivos
- Tailwind CSS para diseño y estilos
- Axios para consumo de API REST (.NET Minimal APIs)
- React hooks para manejo de estado y ciclo de vida

---

## Estructura

- `Dashboard.tsx`: pantalla principal con resumen y gráficos de ventas, ganancias y desperdicios.
- `Productos.tsx`: CRUD para productos con selección de tipo (churrascos, dulces, combos).
- `Inventario.tsx`: CRUD para ingredientes con cantidades y unidades.
- Componentes reutilizables para tarjetas resumen, tablas y formularios.
- Manejo de estado con hooks y actualización dinámica de listas.

---

## Cómo ejecutar

Ejecuta el proyecto en modo desarrollo con:

```bash
npm run dev
# o
yarn dev
Abre en tu navegador http://localhost:3000.
```
## Autor

Jordy Vega - jordyvega15@gmail.com  
[GitHub](https://github.com/jordyvega03)

---

## Licencia

Este proyecto está bajo la licencia MIT - ver archivo LICENSE para más detalles.
