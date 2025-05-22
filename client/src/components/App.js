// src/App.js
import React, { useState, useEffect } from 'react';
import './styling/App.css';
import Header from './Header';
import ToolForm from './ToolForm';
import ToolList from './ToolList';
import Footer from './Footer';

export default function App() {
  const [tools, setTools] = useState([]);
  const [editingTool, setEditingTool] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/tools')
      .then(r => r.json())
      .then(setTools)
      .catch(console.error);
  }, []);

  const clearEdit = () => setEditingTool(null);

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(filter.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="app-container">
      <Header />

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search tools by name / tag…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <ToolForm
        editingTool={editingTool}
        clearEdit={clearEdit}
        onSaved={newTool => {
          setTools(prev => {
            const exists = prev.find(t => t.id === newTool.id);
            return exists
              ? prev.map(t => (t.id === newTool.id ? newTool : t))
              : [newTool, ...prev];
          });
          clearEdit();
        }}
      />

      <ToolList
        tools={filtered}
        setTools={setTools}
        onEdit={setEditingTool}
      />

      {/* Footer at end of page bro */}
      <Footer />
    </div>
  );
}

