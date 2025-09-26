import React from "react";

export default function ConfirmModal({ show, onConfirm, onCancel, message, title, confirmText = "Confirm" }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-exclamation-circle text-indigo-600"></i>
              {title}
            </h3>
          )}
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 rounded-full hover:bg-slate-100"
            onClick={onCancel}
            aria-label="Close"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="text-slate-700 mb-4 whitespace-pre-line leading-relaxed">
          {message}
        </div>

        <button
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium mt-2 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}