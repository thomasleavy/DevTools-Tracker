// src/ToolList.js
// src/components/ToolList.js
import React, { useEffect } from 'react';
import './styling/ToolList.css';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ToolList({ tools, setTools, onEdit }) {
  useEffect(() => {
    axios.get('/tools')
      .then(res => setTools(res.data))
      .catch(console.error);
  }, [setTools]);

  const handleDelete = id =>
    axios.delete(`/tools/${id}`)
      .then(() => setTools(prev => prev.filter(t => t.id !== id)))
      .catch(console.error);

  return (
    <div className="tool-list">
      {tools.map(tool => {
        // ensure tags is always an array
        const tags = Array.isArray(tool.tags) ? tool.tags : [];

        return (
          <div key={tool.id} className="tool-card">
            <div>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
              <a href={tool.link} target="_blank" rel="noreferrer">
                Visit
              </a>
              <div className="tag-badges">
                {tags.map((t, i) => (
                  <span key={i} className="tag-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="actions">
              <button
                onClick={() => onEdit(tool)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tool.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

ToolList.propTypes = {
  tools: PropTypes.array.isRequired,
  setTools: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};
