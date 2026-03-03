'use client'

import React, { useState, useEffect } from "react";

export default function KinlyApp() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Loisir');

  // Charger les données sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem('kinly_storage');
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur de lecture", e);
      }
    }
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    localStorage.setItem('kinly_storage', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newActivity = {
      id: Date.now().toString(),
      title: title,
      category: category,
      date: new Date().toLocaleDateString('fr-FR')
    };

    setActivities([newActivity, ...activities]);
    setTitle('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '20px', 
      fontFamily: 'sans-serif',
      color: '#1e293b' 
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#4f46e5', fontSize: '2.5rem', marginBottom: '5px' }}>Kinly</h1>
          <p style={{ color: '#64748b' }}>Organisez vos moments partagés</p>
        </header>

        <section style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Nouvelle activité</h2>
          <form onSubmit={addActivity}>
            <input
              type="text"
              placeholder="Ex: Restaurant, Cinéma..."
              style={{ 
                width: '100%', 
                padding: '12px', 
                marginBottom: '10px', 
                borderRadius: '8px', 
                border: '1px solid #cbd5e1',
                boxSizing: 'border-box'
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <select 
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#fff'
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Loisir">Loisir</option>
                <option value="Sport">Sport</option>
                <option value="Travail">Travail</option>
                <option value="Famille">Famille</option>
              </select>
              <button 
                type="submit"
                style={{ 
                  backgroundColor: '#4f46e5', 
                  color: 'white', 
                  padding: '12px 20px', 
                  borderRadius: '8px', 
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Ajouter
              </button>
            </div>
          </form>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activities.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '20px' }}>Aucune activité pour le moment.</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} style={{ 
                backgroundColor: '#fff', 
                padding: '15px', 
                borderRadius: '10px', 
                borderLeft: '4px solid #4f46e5',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{act.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  {act.category} • {act.date}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

