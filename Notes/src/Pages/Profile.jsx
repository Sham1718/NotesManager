import React, { useCallback, useEffect, useState } from 'react'
import api from '../Helpers/axiosconfig';
import NoteCard from '../Component/NoteCard';
import { getUsername } from '../Helpers/auth';
import { useSearch } from '../context/SearchContext';

const Profile = () => {

  const [note, setNote] = useState([]);
  const username = getUsername();

  useEffect(() => {
    fetchnotes();
  }, []);

  const fetchnotes = async () => {
    try {
      const res = await api.get("/notes/mine");
      setNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  const { search } = useSearch();
  const filteredNotes = note.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  // Create Note
  const [cnote, setCnote] = useState(null);

  const SaveCreate = async () => {
    try {
      const res = await api.post(`/notes`, {
        title: cnote.title,
        content: cnote.content
      });

      setNote(prev => [...prev, res.data]);
      setCnote(null);

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Note
  const handleDelete = useCallback(async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      alert("Note deleted!");
      setNote(prev => prev.filter(n => n.id !== id));

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete note");
    }
  }, []);

  // Edit Note
  const [editnote, setEditnote] = useState(null);

  const saveEditedNote = async () => {
    try {
      await api.put(`/notes/${editnote.id}`, {
        id: editnote.id,
        title: editnote.title,
        content: editnote.content
      });

      alert("Note updated!");

      setNote(prev =>
        prev.map(n => (n.id === editnote.id ? editnote : n))
      );

      setEditnote(null);

    } catch (error) {
      console.error(error);
      alert("Failed to update note");
    }
  };

  return (
    <div className="
      min-h-screen w-full 
      bg-[#F8FAFC] dark:bg-[#0D1117] 
      text-[#1F2937] dark:text-white 
      p-6 pt-24 transition-all
    ">

      {/* Profile Box OUTSIDE the grid */}
      <div className="
        w-full mb-6 
        flex justify-between items-center 
        bg-white dark:bg-[#161B22] 
        border border-gray-300 dark:border-[#2D333B] 
        rounded-2xl p-5 shadow-md dark:shadow-xl h-24
      ">

        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="
            h-16 w-16 
            bg-amber-400 text-black 
            rounded-2xl text-4xl font-extrabold 
            flex justify-center items-center
          ">
            {username.slice(0, 1)}
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#1F2937] dark:text-amber-50">
              {username}
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Full-stack Developer • React | Spring Boot • Note Keeper User
            </p>
          </div>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => setCnote({ title: "", content: "" })}
          className="
            flex items-center gap-2 
            bg-amber-400 text-black font-bold 
            px-5 py-2 rounded-xl 
            text-lg shadow-md hover:bg-amber-300 transition
          "
        >
          <span className="text-3xl leading-none">+</span> Create
        </button>
      </div>

      {/* Notes Grid BELOW Profile Box */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredNotes.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            showActions={true}
            onDelete={handleDelete}
            onEdit={setEditnote}
          />
        ))}

        {/* EMPTY STATE */}
        {filteredNotes.length === 0 && (
          <div className="col-span-4 text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
            No notes found
          </div>
        )}
      </div>

      {/* Create Note Modal */}
      {cnote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[#202121] p-6 rounded-xl w-80 shadow-xl text-[#1F2937] dark:text-[#E5E7EB]">
            <h2 className="text-xl font-bold mb-3">Create Note</h2>

            <input
              type="text"
              placeholder="Enter title"
              value={cnote.title}
              onChange={(e) => setCnote({ ...cnote, title: e.target.value })}
              className="w-full p-2 rounded mb-3 bg-gray-100 dark:bg-[#404040] border border-gray-300 dark:border-[#7b7878]"
            />

            <textarea
              rows="4"
              placeholder="Enter content"
              value={cnote.content}
              onChange={(e) => setCnote({ ...cnote, content: e.target.value })}
              className="w-full p-2 rounded mb-3 bg-gray-100 dark:bg-[#404040] border border-gray-300 dark:border-[#7b7878]"
            />

            <div className="flex gap-3">
              <button
                onClick={SaveCreate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => setCnote(null)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editnote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[#202121] p-6 rounded-xl w-80 shadow-xl text-[#1F2937] dark:text-[#E5E7EB]">
            <h2 className="text-xl font-bold mb-3">Edit Note</h2>

            <input
              type="text"
              value={editnote.title}
              onChange={(e) =>
                setEditnote({ ...editnote, title: e.target.value })
              }
              className="w-full p-2 rounded mb-3 bg-gray-100 dark:bg-[#404040] border border-gray-300 dark:border-[#7b7878]"
            />

            <textarea
              rows="4"
              value={editnote.content}
              onChange={(e) =>
                setEditnote({ ...editnote, content: e.target.value })
              }
              className="w-full p-2 rounded mb-3 bg-gray-100 dark:bg-[#404040] border border-gray-300 dark:border-[#7b7878]"
            />

            <div className="flex gap-3">
              <button
                onClick={saveEditedNote}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditnote(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
