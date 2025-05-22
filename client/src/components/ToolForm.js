// src/ToolForm.js
import React, { useState, useEffect } from 'react';
import './styling/ToolForm.css';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ToolForm({ editingTool, clearEdit, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    link: '',
    tags: ''    // comma-separated input
  });

  useEffect(() => {
    if (editingTool) {
      setForm({
        ...editingTool,
        tags: editingTool.tags.join(', ')
      });
    }
  }, [editingTool]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      link: form.link,
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t)
    };

    const req = editingTool
      ? axios.put(`/tools/${editingTool.id}`, payload)
      : axios.post('/tools', payload);

    req
      .then(res => onSaved({ id: res.data.id || editingTool.id, ...payload }))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="tool-form">
      <h2>{editingTool ? 'Edit Tool' : 'Add New Tool'}</h2>

      <div className="form-grid">
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Tags (comma-separated)</label>
          <input
            name="tags"
            value={form.tags}
            placeholder="e.g. frontend, api, cli"
            onChange={handleChange}
          />
        </div>

        <div className="full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="full-width">
          <label>Link</label>
          <input
            name="link"
            type="url"
            value={form.link}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="actions">
        <button type="submit">
          {editingTool ? 'Update' : 'Add'}
        </button>
        {editingTool && (
          <button type="button" onClick={clearEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

ToolForm.propTypes = {
  editingTool: PropTypes.object,
  clearEdit: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
