import React from 'react';
import { SortOrder } from '../types';

interface SortControlsProps {
    currentSort: SortOrder;
    onSetSort: (sort: SortOrder) => void;
}

const sortOptions = [
    { value: SortOrder.CreationDate, label: 'By Date' },
    { value: SortOrder.Priority, label: 'By Priority' },
    { value: SortOrder.Status, label: 'By Status' },
];

export const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSetSort }) => {
    return (
        <div className="relative">
            <select
                value={currentSort}
                onChange={(e) => onSetSort(e.target.value as SortOrder)}
                className="appearance-none bg-slate-700 text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 cursor-pointer pr-8"
                aria-label="Sort tasks by"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>
    );
};
