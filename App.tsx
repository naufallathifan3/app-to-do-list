import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, Filter, Priority, SortOrder } from './types';
import { suggestTodoTask } from './services/geminiService';
import { TodoInput } from './components/TodoInput';
import { FilterButtons } from './components/FilterButtons';
import { TodoItem } from './components/TodoItem';
import { SortControls } from './components/SortControls';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error reading todos from localStorage", error);
      return [];
    }
  });
  
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.CreationDate);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error writing todos to localStorage", error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const handleSuggestTodo = useCallback(async () => {
    setIsSuggesting(true);
    try {
      const suggestedText = await suggestTodoTask();
      if(suggestedText && !suggestedText.toLowerCase().includes("error")) {
        // Suggested tasks get medium priority by default
        addTodo(suggestedText, Priority.Medium);
      }
    } catch (error) {
        console.error("Failed to suggest a todo:", error);
    } finally {
        setIsSuggesting(false);
    }
  }, [addTodo]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const processedTodos = useMemo(() => {
    // 1. Filter
    const filtered = todos.filter(todo => {
        switch (filter) {
            case Filter.Active:
                return !todo.completed;
            case Filter.Completed:
                return todo.completed;
            default:
                return true;
        }
    });

    // 2. Sort
    const priorityOrder = { [Priority.High]: 1, [Priority.Medium]: 2, [Priority.Low]: 3 };

    return filtered.sort((a, b) => {
        switch (sortOrder) {
            case SortOrder.Priority:
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            case SortOrder.Status:
                return (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
            case SortOrder.CreationDate:
            default:
                return b.createdAt - a.createdAt; // Newest first
        }
    });
  }, [todos, filter, sortOrder]);
  
  const activeCount = useMemo(() => todos.filter(t => !t.completed).length, [todos]);

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">
            To Do List Harian
          </h1>
          <p className="text-slate-400 mt-2">Kegiatan Apa yang akan kamu lakukan hari ini.</p>
        </header>
        
        <main className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl shadow-slate-950/50 border border-slate-700">
          <TodoInput 
            onAddTodo={addTodo} 
            onSuggestTodo={handleSuggestTodo}
            isSuggesting={isSuggesting}
          />
          <div className="flex justify-center items-center gap-3 mb-4">
            <FilterButtons currentFilter={filter} onSetFilter={setFilter} />
            <div className="border-l border-slate-600 h-8 mx-2"></div>
            <SortControls currentSort={sortOrder} onSetSort={setSortOrder} />
          </div>

          <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="text-slate-400 text-sm mb-4 px-2">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </div>
            <ul className="max-h-[40vh] overflow-y-auto pr-2">
              {processedTodos.length > 0 ? (
                processedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <li className="text-center text-slate-500 py-8">
                  No tasks here. Add one to get started!
                </li>
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
