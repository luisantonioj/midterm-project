import React from "react";

export default function ConfirmModal({ show, onConfirm, onCancel, message, title }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-indigo-600"></i>
            {title}
          </h3>
        )}
        <div className="text-slate-700 mb-6 whitespace-pre-line leading-relaxed">
          {message}
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}