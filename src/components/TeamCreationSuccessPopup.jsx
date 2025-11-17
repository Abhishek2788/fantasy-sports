import { TickIcon } from "./icons/TickIcon";
import { CrossIcon } from "./icons/CrossIcon";
import { useEffect } from "react";

export const TeamCreationSuccessPopup = ({ savedMessage, onClose }) => {
      useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-[90vw] max-w-md bg-[#0b0b0b]/95 border border-white/5 rounded-2xl shadow-2xl p-6 text-center text-white"
        style={{ animation: "popIn .28s cubic-bezier(.2,.9,.2,1)" }}
        role="dialog"
        aria-labelledby="toast-title"
        aria-describedby="toast-desc"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/6 transition hover:cursor-pointer"
        >
          <CrossIcon className="w-5 h-auto fill-white" />
        </button>

        <div
          className="mx-auto mb-3 w-14 h-14 rounded-full bg-black/20 flex items-center justify-center"
          style={{
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.6), 0 0 22px rgba(34,197,94,0.16)",
          }}
        >
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-md">
            <TickIcon className="w-8 h-auto" />
          </div>
        </div>

        <h3
          id="toast-title"
          className="text-sm sm:text-base font-semibold mb-2"
        >
          {savedMessage}
        </h3>
      </div>
    </div>
  );
};
