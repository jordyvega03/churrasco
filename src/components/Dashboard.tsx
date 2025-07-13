import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
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
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    // Datos para tarjetas
    const stats = [
        { title: "Ventas Diarias", value: "Q1,200", icon: "💰" },
        { title: "Ventas Mensuales", value: "Q35,000", icon: "📅" },
        { title: "Ganancias", value: "Q12,500", icon: "📈" },
        { title: "Desperdicios", value: "120 kg", icon: "🗑️" },
    ];

    // Datos para gráfica de ventas diarias (line chart)
    const lineData = {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [
            {
                label: "Ventas diarias",
                data: [120, 190, 170, 220, 280, 300, 250],
                borderColor: "#ec4899",
                backgroundColor: "rgba(236, 72, 153, 0.3)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Datos para gráfica de top platos/dulces (bar chart)
    const barData = {
        labels: ["Churrasco Familiar", "Churrasco Especial", "Canillitas", "Caja Dulces"],
        datasets: [
            {
                label: "Ventas",
                data: [120, 90, 140, 80],
                backgroundColor: "#f43f5e",
            },
        ],
    };

    // Opciones para la nueva gráfica Ventas del Año
    const ventasAnioData = {
        labels: [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ],
        datasets: [
            {
                label: "Ventas del Año",
                data: [1000, 1200, 900, 1400, 1700, 1600, 1800, 1900, 2100, 2200, 2300, 2500],
                borderColor: "#ec4899",
                backgroundColor: "rgba(236, 72, 153, 0.3)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const ventasAnioOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#ec4899",
                    font: { size: 14, weight: "bold" },
                },
            },
            title: {
                display: true,
                text: "Ventas del Año",
                color: "#ec4899",
                font: { size: 20, weight: "bold" },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "#f0f0f0" },
            },
            x: {
                grid: { color: "#f0f0f0" },
            },
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
                    <Line data={lineData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
                    <Bar data={barData} />
                </div>
            </div>

            {/* Nueva gráfica Ventas del Año (100% ancho) */}
            <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300, width: "100%" }}>
                <Line data={ventasAnioData} options={ventasAnioOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
