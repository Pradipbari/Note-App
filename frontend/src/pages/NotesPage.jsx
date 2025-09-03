import React, { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../api";
import NoteCard from "../components/NoteCard";

export default function NotesPage({ token, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const fetch = async () => {
    try {
      const res = await getNotes(token);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAdd = async () => {
    if (!content) return;
    await createNote(token, { title, content });
    setTitle("");
    setContent("");
    fetch();
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    fetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-purple-700 drop-shadow">
            Your Notes
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              onLogout();
            }}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 p-3 rounded mb-3 transition"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            className="w-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 p-3 rounded mb-3 transition resize-none"
            rows="4"
          />
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className={`bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded shadow font-semibold ${
                !content ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!content}
            >
              Add Note
            </button>
            <a
              href={`${
                process.env.REACT_APP_API_URL || "http://localhost:5000/api"
              }/auth/google`}
              className="px-5 py-2 border border-gray-300 hover:bg-gray-100 transition rounded inline-flex items-center gap-2 font-medium"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" className="mr-1">
                <g>
                  <path
                    fill="#4285F4"
                    d="M44.5 20H24v8.5h11.7C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.2 0 19.1-7.8 19.9-17.7.1-.7.1-1.3.1-2.3z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.5 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44c5.3 0 10.2-1.8 14-4.9l-6.5-5.3C29.7 35.7 27 36.7 24 36.7c-6.1 0-10.7-3.1-13.1-7.6l-7 5.4C7.1 39.9 14.9 44 24 44z"
                  />
                  <path
                    fill="#EA4335"
                    d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 6.2-7.7 7.8l6.5 5.3c3.8-3.5 6.1-8.7 6.1-14.6 0-1.1-.1-2.1-.3-3z"
                  />
                </g>
              </svg>
              Link Google
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 py-10 animate-pulse">
              No notes yet. Start by adding one!
            </div>
          ) : (
            notes.map((n, idx) => (
              <NoteCard
                key={n._id}
                note={n}
                onDelete={() => handleDelete(n._id)}
                className="hover:scale-105 transition-transform"
                style={{ animationDelay: `${idx * 50}ms` }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
