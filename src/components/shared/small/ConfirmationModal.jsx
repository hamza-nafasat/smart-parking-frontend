import React from 'react';

const ConfirmationModal = ({ title, confirmText, cancelText, onConfirm, onCancel, message }) => {
  return (
    <div className="p-2">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
      
      <div className="flex gap-3 mt-8">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all font-semibold"
        >
          {cancelText || 'Cancel'}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold shadow-md shadow-red-100"
        >
          {confirmText || 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
