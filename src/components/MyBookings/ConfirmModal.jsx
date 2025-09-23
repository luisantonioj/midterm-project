import React from "react";

export default function ConfirmModal({ show, onConfirm, onCancel, message = "Are you sure?", title }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-11/12 max-w-md">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <p className="mb-4 whitespace-pre-line">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}