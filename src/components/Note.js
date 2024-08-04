// components/Note.js
import React from 'react';
import axios from 'axios';

const Note = ({ note, fetchNotes }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
    fetchNotes();
  };

  return (
    <div>
      <h2>{note.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Note;
