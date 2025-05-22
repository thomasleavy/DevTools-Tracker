// src/App.js
import React, { useState } from 'react';
import './styling/App.css';
import Header from './Header';
import ToolForm from './ToolForm';
import ToolList from './ToolList';

export default function App() {
  const [tools, setTools] = useState([]);
  const [editingTool, setEditingTool] = useState(null);

  const refreshList = () => {
    // force reload in ToolList via changing key or re-render
    setTools([]);
    setTimeout(() => {}, 0);
  };

  const clearEdit = () => setEditingTool(null);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ToolForm
        editingTool={editingTool}
        clearEdit={clearEdit}
        refreshList={() => window.location.reload()}
      />
      <div className="mt-8">
        <ToolList tools={tools} setTools={setTools} onEdit={setEditingTool} />
      </div>
    </div>
  );
}
