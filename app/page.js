'use client'

import { useState, useEffect } from "react";
import { PlusCircle, Calendar, Tag } from "lucide-react";

export default function KinlyApp() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ title: '', category: 'Loisir' });

  useEffect(() => {
    const saved = localStorage.getItem('kinly_activities');
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('kinly_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;

    const activity = {
      id: Date.now(),
      title: newActivity.title,
      category: newActivity.category,
      date: new Date().toLocaleDateString('fr-FR')
    };

    setActivities([activity, ...activities]);
    setNewActivity({ title: '', category: 'Loisir' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-slate-900">
      <header className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-600">Kinly</h1>
        <p className="text-gray-600">Organisez vos moments partagés</p>
      </header>

      <main className="max-w-2xl mx-auto">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600">
            <PlusCircle size={20} />
            Ajouter une activité
          </h2>
          <form onSubmit={addActivity} className="space-y-4">
            <input
              type="text"
              placeholder="Ex: Aller au ciné, Restaurant..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-black"
              value={newActivity.title}
              onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
            />
            <div className="flex gap-4">
              <select 
                className="flex-1 p-3 rounded-lg border border-gray-300 bg-white text-black h-[50px]"
                value={newActivity.category}
                onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
              >
                <option value="Loisir">Loisir</option>
                <option value="Sport">Sport</option>
                <option value="Travail">Travail</option>
                <option value="Famille">Famille</option>
              </select>
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors h-[50px]"
              >
                Ajouter
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Mes Activités</h2>
          {activities.length === 0 ? (
            <p className="text-gray-400 text-center py-10 italic">Aucune activité pour le moment...</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{act.title}</h3>
                  <div className="flex gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Tag size={14}/> {act.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {act.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
