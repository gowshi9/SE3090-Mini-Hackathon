import React from 'react';

export function AdminListingsTable({
  listings,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  onStatusChange,
  isUpdatingId,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
      {/* Table Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manage Food Listings</h2>
          <p className="text-xs text-slate-500">Audit, verify, and moderate community surplus food listings.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search title, donor, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Categories</option>
            <option value="Bakery">Bakery</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Fruits & Veg">Fruits & Veg</option>
            <option value="Rice & Curry">Rice & Curry</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Collected">Collected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {listings.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">No food listings found matching criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">FOOD NAME</th>
                <th className="py-3 px-4">PROVIDER / DONOR</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">QUANTITY</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">AVAILABLE UNTIL</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ADMIN ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map((item) => {
                const statusStr = (item.status || 'Available').toUpperCase();
                const isCollected = statusStr === 'COLLECTED' || statusStr === 'COMPLETED';
                const isReserved = statusStr === 'RESERVED';
                const isAvailable = statusStr === 'AVAILABLE';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                      {item.title || item.name}
                      <div className="text-[10px] text-slate-400 font-mono font-normal">#FST-{4000 + item.id}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{item.donorName || 'Registered Partner'}</div>
                      <div className="text-[10px] text-slate-400">Verified Donor</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-[11px]">
                        {item.category || 'Cooked Meals'}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900">
                      {item.quantity} <span className="font-normal text-slate-500">{item.unit || 'portions'}</span>
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      📍 {item.pickupLocation || 'Colombo'}
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      ⏱ {item.expiryDate ? new Date(item.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today, 8:00 PM'}
                    </td>

                    <td className="py-4 px-4">
                      {isAvailable && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                          ● AVAILABLE
                        </span>
                      )}
                      {isReserved && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                          ● RESERVED
                        </span>
                      )}
                      {isCollected && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                          ✓ COLLECTED
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      {isAvailable && (
                        <button
                          onClick={() => onStatusChange(item.id, 'Reserved')}
                          disabled={isUpdatingId === item.id}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                        >
                          Mark Reserved
                        </button>
                      )}
                      {isReserved && (
                        <button
                          onClick={() => onStatusChange(item.id, 'Collected')}
                          disabled={isUpdatingId === item.id}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                        >
                          Mark Collected
                        </button>
                      )}
                      {isCollected && (
                        <span className="text-slate-400 font-semibold text-xs px-2 py-1 bg-slate-100 rounded-lg">
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
