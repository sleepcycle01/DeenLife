
import React, { useState, useEffect } from 'react';
import { getHabits, saveHabits } from '../services/storageService';
import { Habit } from '../types';
import { Plus, Trash2, Check, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SUGGESTED_HABITS = [
  "Read Surah Al-Mulk before sleep",
  "Pray Duha",
  "Morning Adhkar",
  "Evening Adhkar",
  "Fast Mondays/Thursdays",
  "Give Sadaqah",
];

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const updateHabits = (updated: Habit[]) => {
    setHabits(updated);
    saveHabits(updated);
  };

  const addHabit = (name: string) => {
    if (!name.trim()) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completedDates: [],
      targetPerWeek: 7,
    };
    updateHabits([...habits, newHabit]);
    setNewHabitName("");
    setShowSuggestions(false);
  };

  const removeHabit = (id: string) => {
    updateHabits(habits.filter(h => h.id !== id));
  };

  const toggleCompletion = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h => {
      if (h.id === habitId) {
        const isCompleted = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: isCompleted 
            ? h.completedDates.filter(d => d !== today)
            : [...h.completedDates, today]
        };
      }
      return h;
    });
    updateHabits(updated);
  };

  const getWeeklyProgressData = () => {
    // Calculate total completions for last 7 days for chart
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      
      let count = 0;
      habits.forEach(h => {
        if (h.completedDates.includes(dateStr)) count++;
      });
      
      data.push({ name: dayName, count });
    }
    return data;
  };

  const isCompletedToday = (h: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return h.completedDates.includes(today);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end animate-slide-up">
        <div>
           <h2 className="text-3xl font-bold text-white">Sunnah Habits</h2>
           <p className="text-slate-400 mt-1">"The most beloved deeds to Allah are those that are consistent."</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 animate-slide-up delay-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Add a new habit..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition"
            onKeyDown={(e) => e.key === 'Enter' && addHabit(newHabitName)}
          />
          <button 
            onClick={() => addHabit(newHabitName)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center hover:scale-105 active:scale-95 duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="mt-3">
          <button 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {showSuggestions ? "Hide suggestions" : "+ View Sunnah suggestions"}
          </button>
          
          {showSuggestions && (
            <div className="flex flex-wrap gap-2 mt-3 animate-fade-in">
              {SUGGESTED_HABITS.map(s => (
                <button 
                  key={s}
                  onClick={() => addHabit(s)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700 transition transform hover:scale-105"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      {habits.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-64 animate-slide-up delay-200">
           <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
             <TrendingUp size={16} /> Weekly Consistency
           </h3>
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={getWeeklyProgressData()}>
               <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
               <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
               />
               <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {getWeeklyProgressData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#10b981" />
                  ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
      )}

      {/* Habit List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-12 text-slate-500 animate-fade-in">
            No habits tracking yet. Start by adding one above!
          </div>
        ) : (
          habits.map((habit, idx) => {
            const completed = isCompletedToday(habit);
            return (
              <div 
                key={habit.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 animate-slide-up ${
                  completed 
                    ? 'bg-emerald-900/20 border-emerald-800/50' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-md hover:scale-[1.01]'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleCompletion(habit.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition transform duration-200 active:scale-90 ${
                      completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700 hover:border-emerald-500 hover:text-emerald-500'
                    }`}
                  >
                    {completed && <Check size={18} />}
                  </button>
                  <span className={`text-lg transition-all duration-300 ${completed ? 'text-emerald-100 line-through opacity-70' : 'text-slate-200'}`}>
                    {habit.name}
                  </span>
                </div>
                <button 
                  onClick={() => removeHabit(habit.id)}
                  className="p-2 text-slate-600 hover:text-red-400 transition"
                  title="Remove habit"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Habits;
