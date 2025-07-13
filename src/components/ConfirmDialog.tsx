interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel, isOpen }) => {
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
