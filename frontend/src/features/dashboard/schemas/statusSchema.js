/**
 * Status constants and badges mapping.
 */
export const FOOD_STATUSES = {
  AVAILABLE: 'Available',
  RESERVED: 'Reserved',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired',
};

export const STATUS_COLORS = {
  [FOOD_STATUSES.AVAILABLE]: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  [FOOD_STATUSES.RESERVED]: 'bg-amber-100 text-amber-800 border-amber-300',
  [FOOD_STATUSES.COMPLETED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [FOOD_STATUSES.EXPIRED]: 'bg-slate-100 text-slate-700 border-slate-300',
};
