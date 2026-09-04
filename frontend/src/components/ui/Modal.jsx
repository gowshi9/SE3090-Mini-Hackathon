import React from 'react';

/**
 * Reusable Modal Dialog component.
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility flag.
 * @param {() => void} props.onClose - Dismiss callback function.
 * @param {string} [props.title] - Modal Header Title.
 * @param {React.ReactNode} props.children - Modal content payload.
 * @returns {JSX.Element | null}
 */
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 m-4 relative animate-fade-in">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
