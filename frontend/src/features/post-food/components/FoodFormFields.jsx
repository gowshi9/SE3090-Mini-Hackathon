import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const categoryOptions = [
  { value: 'Cooked Meals', label: 'Cooked Meals' },
  { value: 'Bakery Items', label: 'Bakery Items' },
  { value: 'Produce & Veggies', label: 'Fresh Produce & Vegetables' },
  { value: 'Groceries', label: 'Packaged / Groceries' },
  { value: 'Beverages', label: 'Beverages' },
];

const unitOptions = [
  { value: 'servings', label: 'Servings' },
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'packs', label: 'Packs / Boxes' },
  { value: 'items', label: 'Individual Items' },
];

/**
 * Input fields group for food posting form.
 */
export function FoodFormFields({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <Input
        label="Food Title"
        name="title"
        placeholder="e.g. 15 Lunch Boxes (Rice & Curry)"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-semibold text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Provide details about the food, storage instructions, allergens..."
          value={formData.description}
          onChange={handleChange}
          className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
            errors.description ? 'border-rose-500' : 'border-slate-300'
          }`}
        />
        {errors.description && <span className="text-xs text-rose-500">{errors.description}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          name="category"
          options={categoryOptions}
          value={formData.category}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />
          <Select
            label="Unit"
            name="unit"
            options={unitOptions}
            value={formData.unit}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Pickup Location"
          name="pickupLocation"
          placeholder="e.g. Colombo 03, near Liberty Plaza"
          value={formData.pickupLocation}
          onChange={handleChange}
          error={errors.pickupLocation}
        />
        <Input
          label="Best Before / Expiry Time"
          name="expiryDate"
          type="datetime-local"
          value={formData.expiryDate}
          onChange={handleChange}
          error={errors.expiryDate}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        <Input
          label="Your / Organization Name"
          name="donorName"
          placeholder="e.g. Cinnamon Grand Cafe"
          value={formData.donorName}
          onChange={handleChange}
          error={errors.donorName}
        />
        <Input
          label="Contact Number / Email"
          name="donorContact"
          placeholder="e.g. +94 77 123 4567"
          value={formData.donorContact}
          onChange={handleChange}
          error={errors.donorContact}
        />
      </div>
    </div>
  );
}
