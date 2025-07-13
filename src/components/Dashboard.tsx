import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    // Tarjetas resumen
    const stats = [
        { title: "Ventas Diarias", value: "Q1,200", icon: "💰" },
        { title: "Ventas Mensuales", value: "Q35,000", icon: "📅" },
        { title: "Ganancias", value: "Q12,500", icon: "📈" },
        { title: "Desperdicios", value: "120 kg", icon: "🗑️" },
    ];

    // Ventas diarias y mensuales (líneas)
    const ventasDiariasData = {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [
            {
                label: "Ventas Diarias",
                data: [120, 190, 170, 220, 280, 300, 250],
                borderColor: "#ec4899",
                backgroundColor: "rgba(236, 72, 153, 0.3)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Ventas Mensuales (promedio diario)",
                data: [150, 180, 160, 200, 260, 280, 240],
                borderColor: "#f43f5e",
                backgroundColor: "rgba(244, 63, 94, 0.3)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const ventasDiariasOptions: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Ventas Diarias y Mensuales",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
            x: { grid: { color: "#f0f0f0" } },
        },
    };

    // Platos más vendidos (barras)
    const platosMasVendidosData = {
        labels: ["Churrasco Familiar", "Churrasco Especial", "Canillitas", "Caja Dulces"],
        datasets: [
            {
                label: "Ventas",
                data: [120, 90, 140, 80],
                backgroundColor: "#f43f5e",
            },
        ],
    };

    const platosMasVendidosOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Platos Más Vendidos",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
            x: { grid: { color: "#f0f0f0" } },
        },
    };

    // Dulces más populares (barras)
    const dulcesMasPopularesData = {
        labels: ["Canillitas", "Caja Dulces", "Galletas", "Dulces Tradicionales"],
        datasets: [
            {
                label: "Ventas",
                data: [100, 110, 90, 70],
                backgroundColor: "#ec4899",
            },
        ],
    };

    const dulcesMasPopularesOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Dulces Más Populares",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
            x: { grid: { color: "#f0f0f0" } },
        },
    };

    // Combinaciones de guarniciones frecuentes (barras horizontales)
    const guarnicionesData = {
        labels: ["Frijoles + Tortillas", "Chile de Árbol + Cebollín", "Frijoles + Chirmol", "Tortillas + Cebollín"],
        datasets: [
            {
                label: "Frecuencia",
                data: [50, 40, 30, 20],
                backgroundColor: "#f43f5e",
            },
        ],
    };

    const guarnicionesOptions: ChartOptions<"bar"> = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Combinaciones de Guarniciones Frecuentes",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
        scales: {
            x: { beginAtZero: true, grid: { color: "#f0f0f0" } },
            y: { grid: { color: "#f0f0f0" } },
        },
    };

    // Ganancias por categoría (doughnut)
    const gananciasCategoriaData = {
        labels: ["Churrascos", "Dulces", "Combos"],
        datasets: [
            {
                label: "Ganancias",
                data: [5000, 3000, 4500],
                backgroundColor: ["#ec4899", "#f43f5e", "#fbb6ce"],
            },
        ],
    };

    const gananciasCategoriaOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: { position: "right" },
            title: {
                display: true,
                text: "Ganancias por Categoría",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
    };

    // Desperdicios y mermas (barras)
    const desperdiciosData = {
        labels: ["Churrascos", "Dulces", "Combos"],
        datasets: [
            {
                label: "Kg Desperdicio",
                data: [50, 30, 40],
                backgroundColor: "#ec4899",
            },
        ],
    };

    const desperdiciosOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Desperdicios y Mermas (kg)",
                font: { size: 18, weight: "bold" },
                color: "#ec4899",
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
            x: { grid: { color: "#f0f0f0" } },
        },
    };

    return (
        <div className="space-y-8">
            {/* Tarjetas resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(({ title, value, icon }) => (
                    <div
                        key={title}
                        className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
                    >
                        <div className="text-4xl">{icon}</div>
                        <div>
                            <h3 className="text-gray-500">{title}</h3>
                            <p className="text-2xl font-semibold text-pink-600">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Line data={ventasDiariasData} options={ventasDiariasOptions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Bar data={platosMasVendidosData} options={platosMasVendidosOptions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Bar data={dulcesMasPopularesData} options={dulcesMasPopularesOptions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Bar data={guarnicionesData} options={guarnicionesOptions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Doughnut data={gananciasCategoriaData} options={gananciasCategoriaOptions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Bar data={desperdiciosData} options={desperdiciosOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
