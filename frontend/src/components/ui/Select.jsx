import React from 'react';

/**
 * Reusable Select Dropdown component.
 * @param {Object} props
 * @param {string} [props.label] - Field label text.
 * @param {Array<{value: string, label: string}>} [props.options=[]] - Dropdown options list.
 * @param {string} [props.error] - Validation error message.
 * @returns {JSX.Element}
 */
export function Select({ label, options = [], error, className = '', id, ...props }) {
  const selectId = id || props.name;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white transition-all ${
          error ? 'border-rose-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
}
