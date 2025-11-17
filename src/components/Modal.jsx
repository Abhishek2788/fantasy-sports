import { CrossIcon } from "./icons/CrossIcon";

export default function Modal({ open, title, message, onClose, onConfirm, confirmText = "OK", cancelText = "Cancel" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-4 z-50">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="hover:cursor-pointer">
            <CrossIcon className="fill-black! w-5 h-auto" />{" "}
          </button>
        </div>
        <div className="mt-3 text-sm text-slate-700">{message}</div>
        <div className="mt-4 flex justify-end gap-2">
          {onConfirm ? (
            <>
              <button onClick={onClose} className="hover:cursor-pointer">
                <CrossIcon className="fill-black! w-5 h-auto" />{" "}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:cursor-pointer"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-m hover:cursor-pointer bg-pink-600 text-white"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}