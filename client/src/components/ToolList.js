// src/ToolList.js
import React, { useEffect } from 'react';
import './styling/ToolList.css';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ToolList({ tools, setTools, onEdit }) {
  useEffect(() => {
    axios.get('/tools')
      .then(res => setTools(res.data))
      .catch(err => console.error(err));
  }, [setTools]);

  const handleDelete = (id) => {
    axios.delete(`/tools/${id}`)
      .then(() => setTools(prev => prev.filter(t => t.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {tools.map(tool => (
        <div key={tool.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.description}</p>
            <a href={tool.link} target="_blank" rel="noopener" className="text-blue-500 underline mt-1 block">
              Visit
            </a>
            <span className="inline-block mt-2 px-2 py-1 bg-gray-200 rounded-full text-xs">
              {tool.tag}
            </span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(tool)} className="px-3 py-1 bg-yellow-300 rounded">Edit</button>
            <button onClick={() => handleDelete(tool.id)} className="px-3 py-1 bg-red-400 text-white rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

ToolList.propTypes = {
  tools: PropTypes.array.isRequired,
  setTools: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};