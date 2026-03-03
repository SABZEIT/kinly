'use client'

import { useState, useEffect } from "react";

export default function KinlyApp() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Loisir');

  useEffect(() => {
    const saved = localStorage.getItem('kinly_data');
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('kinly_data', JSON.stringify(activities));
  }, [activities]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newAct = { id: Date.now(), title, category, date: new Date().toLocaleDateString() };
    setActivities([newAct, ...activities]);
    setTitle('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', color: '#333' }}>
      <h1 style={{ color: '#4f46e5', textAlign: 'center' }}>Kinly</h1>
      
      <form onSubmit={handleAdd} style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <input 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          placeholder="Nouvelle activité..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Loisir">Loisir</option>
            <option value="Sport">Sport</option>
            <option value="Travail">Travail</option>
          </select>
          <button type="submit" style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Ajouter
          </button>
        </div>
      </form>

      <div>
        {activities.map(a => (
          <div key={a.id} style={{ background: 'white', padding: '10px', marginBottom: '10px', borderRadius: '8px', borderLeft: '5px solid #4f46e5', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <strong>{a.title}</strong>
            <div style={{ fontSize: '0.8em', color: '#666' }}>{a.category} - {a.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

