
import React from 'react';
import { Filter } from '../types';

interface FilterButtonsProps {
  currentFilter: Filter;
  onSetFilter: (filter: Filter) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onSetFilter }) => {
  const filters = [Filter.All, Filter.Active, Filter.Completed];
  const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500';
  const activeClasses = 'bg-emerald-600 text-white';
  const inactiveClasses = 'bg-slate-700 text-slate-300 hover:bg-slate-600';

  return (
    <div className="flex justify-center gap-3 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSetFilter(filter)}
          className={`${baseClasses} ${currentFilter === filter ? activeClasses : inactiveClasses}`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};
