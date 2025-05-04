import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance"; // import the axios instance

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/notes/create", newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewNote({ title: "", description: "", tag: "" });
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-gray-800" style={{ backgroundImage: "url('https://your-image-url.com/background.jpg')" }}>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-4 shadow bg-opacity-70">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Navbar content removed */}
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto py-10 px-4 bg-white bg-opacity-80 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-700">Your Notes</h2>

        {/* Form */}
        <form onSubmit={handleAddNote} className="space-y-4 mb-10">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newNote.title}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newNote.description}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
          <input
            type="text"
            name="tag"
            placeholder="Tag (optional)"
            value={newNote.tag}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition"
          >
            Add Note
          </button>
        </form>

        {/* Notes Display */}
        <div className="space-y-5">
          {notes.map((note) => (
            <motion.div
              key={note._id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
              <p className="mt-2 text-gray-600">{note.description}</p>
              <p className="mt-1 text-sm text-gray-500">Tag: {note.tag}</p>
              <button
                onClick={() => handleDelete(note._id)}
                className="mt-3 text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
