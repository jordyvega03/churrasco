import React, { useState } from "react";
import axios from "axios";
import { HiChatAlt } from "react-icons/hi";

interface Message {
    from: "user" | "bot";
    text: string;
}

const ChurrasquinAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { from: "user", text: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            // Convertir el estado de mensajes a formato esperado por OpenAI
            const apiMessages = updatedMessages.map((m) => ({
                role: m.from === "user" ? "user" : "assistant",
                content: m.text,
            }));

            // Agregar mensaje de sistema para contexto (opcional)
            apiMessages.unshift({
                role: "system",
                content: "Eres un asistente amable y útil para una tienda de churrascos y dulces típicos.",
            });

            // Llamada al backend que llama a OpenAI
            const response = await axios.post("http://localhost:4000/api/chat", {
                messages: apiMessages,
            });

            const botMessage: Message = {
                from: "bot",
                text: response.data.content,
            };

            setMessages((prev) => [...prev, botMessage]);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "Lo siento, ocurrió un error al comunicarse con el asistente.",
                },
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={toggleOpen}
                className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 z-50"
                aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
            >
                <HiChatAlt size={24} />
            </button>

            {/* Panel del asistente */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
                    {/* Header */}
                    <div className="bg-pink-600 text-white p-4 font-bold text-lg flex justify-between items-center">
                        Churrasquin - Asistente IA
                        <button
                            onClick={toggleOpen}
                            className="text-white hover:text-pink-300 focus:outline-none"
                            aria-label="Cerrar asistente"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Conversación */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col items-center">
                        <img
                            src="src/assets/churrasquin.png" // Reemplaza con la ruta correcta
                            alt="Churrasquin"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        {messages.length === 0 && (
                            <p className="text-gray-500 text-sm italic text-center">
                                Hola! Pregúntame sobre productos, combos y más.
                            </p>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`rounded px-3 py-2 max-w-[80%] ${
                                    msg.from === "user" ? "bg-pink-100 self-end" : "bg-pink-200 self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Entrada de texto */}
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            placeholder="Escribe tu pregunta..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-pink-600 hover:bg-pink-700 text-white rounded px-4 py-2"
                            aria-label="Enviar mensaje"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChurrasquinAssistant;
