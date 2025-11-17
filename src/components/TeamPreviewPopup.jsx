import React, { useEffect } from "react";
import { CrossIcon } from "./icons/CrossIcon";
import TeamPreview from "./TeamPreview";

export const TeamPreviewPopup = ({ selected, captain = 0, viceCaptain = 0, onClose }) => {
      useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-lg sm:rounded-lg shadow-xl p-4 z-50">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Team Preview</h3>
          <button onClick={onClose} className="hover:cursor-pointer">
            <CrossIcon className="w-5 h-auto fill-black!" />
          </button>
        </div>
        <TeamPreview captain={captain} viceCaptain={viceCaptain} players={selected} />
      </div>
    </div>
  );
};
