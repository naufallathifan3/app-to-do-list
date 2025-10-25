import React from 'react';
import { Todo, Priority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.036.954-2.036 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

const PriorityIndicator: React.FC<{ priority: Priority }> = ({ priority }) => {
    const priorityConfig = {
        [Priority.High]: { color: 'bg-red-500', label: 'High priority' },
        [Priority.Medium]: { color: 'bg-yellow-500', label: 'Medium priority' },
        [Priority.Low]: { color: 'bg-green-500', label: 'Low priority' },
    };
    const { color, label } = priorityConfig[priority];
    return <span className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${color}`} title={label}></span>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center bg-slate-800 p-4 rounded-lg mb-2 transition-colors duration-300 hover:bg-slate-700/50">
      <PriorityIndicator priority={todo.priority} />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-6 w-6 rounded border-slate-600 text-emerald-600 bg-slate-700 focus:ring-emerald-500 cursor-pointer"
        aria-labelledby={`todo-text-${todo.id}`}
      />
      <span
        id={`todo-text-${todo.id}`}
        className={`flex-grow mx-4 text-slate-200 transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : ''}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-500 hover:text-red-500 transition-colors duration-200"
        aria-label={`Delete task: ${todo.text}`}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
};
