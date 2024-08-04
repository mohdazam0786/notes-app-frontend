import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNotes();
  }, [search, category]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes', {
        params: { search, category }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (selectedNote) {
        await axios.put(`http://localhost:5000/api/notes/${selectedNote._id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/notes', data);
      }
      reset();
      setSelectedNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    reset(note);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Notes App</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full mb-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full mb-6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{selectedNote ? 'Edit Note' : 'Add Note'}</h2>
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Note Title"
          className="p-3 border border-gray-300 rounded-md w-full mb-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          {...register('content', { required: true })}
          placeholder="Note Content"
          rows="4"
          className="p-3 border border-gray-300 rounded-md w-full mb-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register('category')}
          type="text"
          placeholder="Category"
          className="p-3 border border-gray-300 rounded-md w-full mb-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md w-full hover:bg-blue-700 transition-colors"
        >
          {selectedNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <ul className="mt-6">
        {notes.map((note) => (
          <li key={note._id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
            <p className="text-gray-700 mb-4">{note.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
