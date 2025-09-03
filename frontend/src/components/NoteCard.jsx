import React from "react";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
      {note.title && (
        <h3 className="font-bold text-lg mb-2 text-purple-700">{note.title}</h3>
      )}
      <p className="text-base mb-4 text-gray-700">{note.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400 italic">
          {new Date(note.createdAt).toLocaleString()}
        </span>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
