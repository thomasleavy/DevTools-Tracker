// src/ToolForm.js
import React, { useState, useEffect } from 'react';
import './styling/ToolForm.css';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ToolForm({ editingTool, clearEdit, refreshList }) {
  const [form, setForm] = useState({ name: '', description: '', link: '', tag: '' });

  useEffect(() => {
    if (editingTool) setForm(editingTool);
  }, [editingTool]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const req = editingTool
      ? axios.put(`/tools/${editingTool.id}`, form)
      : axios.post('/tools', form);

    req.then(() => {
      refreshList();
      clearEdit();
      setForm({ name: '', description: '', link: '', tag: '' });
    })
    .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-bold">{editingTool ? 'Edit Tool' : 'Add New Tool'}</h2>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Link</label>
        <input
          name="link"
          type="url"
          value={form.link}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tag</label>
        <input
          name="tag"
          value={form.tag}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editingTool ? 'Update' : 'Add'}
        </button>
        {editingTool && (
          <button type="button" onClick={clearEdit} className="px-4 py-2 bg-gray-300 rounded">
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
  refreshList: PropTypes.func.isRequired,
};