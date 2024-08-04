// components/NoteList.js
import React from 'react';
import Note from './Note';

const NoteList = ({ notes, fetchNotes }) => {
  return (
    <div>
      {notes.map(note => (
        <Note key={note._id} note={note} fetchNotes={fetchNotes} />
      ))}
    </div>
  );
}

export default NoteList;
