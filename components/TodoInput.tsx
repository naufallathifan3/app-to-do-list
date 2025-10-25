import React, { useState } from 'react';
import { Priority } from '../types';

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority) => void;
  onSuggestTodo: () => Promise<void>;
  isSuggesting: boolean;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118a2.25 2.25 0 0 1-2.47-2.118a3 3 0 0 0 3.698-3.086 3 3 0 0 0-5.78-1.128 2.25 2.25 0 0 1-2.47-2.118a2.25 2.25 0 0 1 2.47-2.118a3 3 0 0 0 5.78-1.128 2.25 2.25 0 0 1 2.47-2.118a2.25 2.25 0 0 1 2.47 2.118 3 3 0 0 0-3.698 3.086 3 3 0 0 0 5.78 1.128a2.25 2.25 0 0 1 2.47 2.118a2.25 2.25 0 0 1-2.47 2.118 3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118a2.25 2.25 0 0 1-2.47-2.118Z" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const PrioritySelector: React.FC<{ selected: Priority; onSelect: (p: Priority) => void; }> = ({ selected, onSelect }) => {
    const priorities = [
        { value: Priority.High, label: 'High', color: 'bg-red-500', ring: 'ring-red-400' },
        { value: Priority.Medium, label: 'Medium', color: 'bg-yellow-500', ring: 'ring-yellow-400' },
        { value: Priority.Low, label: 'Low', color: 'bg-green-500', ring: 'ring-green-400' },
    ];

    return (
        <div className="flex items-center gap-2">
            {priorities.map(p => (
                <button
                    key={p.value}
                    type="button"
                    onClick={() => onSelect(p.value)}
                    className={`w-6 h-6 rounded-full transition-all duration-200 ${p.color} ${selected === p.value ? `ring-2 ring-offset-2 ring-offset-slate-700 ${p.ring}` : 'opacity-50 hover:opacity-100'}`}
                    aria-label={`Set priority to ${p.label}`}
                />
            ))}
        </div>
    );
};


export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, onSuggestTodo, isSuggesting }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim(), priority);
      setInputValue('');
      setPriority(Priority.Medium);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <div className="flex gap-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow bg-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
            <button
                type="submit"
                className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors duration-200 disabled:bg-emerald-800"
                disabled={!inputValue.trim()}
            >
                Add
            </button>
            <button
                type="button"
                onClick={onSuggestTodo}
                disabled={isSuggesting}
                className="bg-indigo-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-indigo-500 transition-colors duration-200 flex items-center justify-center disabled:bg-indigo-800 disabled:cursor-not-allowed"
                aria-label="Suggest a task"
            >
                {isSuggesting ? <LoadingSpinner /> : <MagicWandIcon className="h-5 w-5" />}
            </button>
        </div>
        <div className="flex items-center justify-start gap-3 px-1">
            <span className="text-slate-400 text-sm font-medium">Priority:</span>
            <PrioritySelector selected={priority} onSelect={setPriority} />
        </div>
    </form>
  );
};
