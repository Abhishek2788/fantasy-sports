import { getTimeLeft } from "../utils/commonUtils";

export const BottomBar = ({
  matchDate,
  onPreview,
  onSave,
  showPreviewBtn = true,
  showSaveBtn = true,
}) => {
  const timeleft = getTimeLeft(matchDate);
  return (
    <div className="fixed left-0 right-0 bottom-0 sm:bottom-4 flex justify-center pointer-events-none z-40">
      <div
        className="w-full max-w-2xl bg-white pointer-events-auto sm:rounded-xl shadow-[0_-4px_12px_rgba(0,0,0,0.15)]
 sm:border px-4 py-3 sm:flex items-center justify-between"
      >
        <div className="hidden sm:flex items-center gap-4">
          <div>
            {timeleft !== "Match Started" ? (
              <div className="text-center font-medium">
                <span className="text-gray-400 text-sm sm:text-base">
                  Registration closed in:{" "}
                </span>
                <span className="text-pink-600">{timeleft}</span>
              </div>
            ) : (
              <div className="text-center font-medium">
                <span className="text-sm sm:text-base text-gray-400">
                  Registration is closed
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 max-sm:w-full">
          {showPreviewBtn && (
            <button
              onClick={onPreview}
              className="max-sm:flex-1 px-3 py-2 hover:cursor-pointer border rounded-md text-sm"
            >
              Team Preview
            </button>
          )}
          {showSaveBtn && (
            <button
              onClick={onSave}
              className="max-sm:flex-1 px-4 py-2 rounded-md bg-pink-600 hover:cursor-pointer text-white text-sm"
            >
              Save Team
            </button>
          )}
        </div>
        {timeleft !== "Match Started" ? (
          <div className="sm:hidden mt-2 text-center font-medium">
            <span className="text-gray-400 text-sm sm:text-base">
              Registration closed in:{" "}
            </span>
            <span className="text-pink-600">{timeleft}</span>
          </div>
        ) : (
          <div className="sm:hidden mt-2 text-center font-medium">
            <span className="text-gray-400 text-sm sm:text-base">
              Registration is closed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
