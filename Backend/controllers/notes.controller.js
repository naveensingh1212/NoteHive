import Note from "../models/notes.model.js";
import User from "../models/user.model.js";

// Create Note
export const createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const userId = req.user.id; // ✅ Use the correct field 'id' from token

        const newNote = new Note({
            title,
            description,
            tag,
            user: userId // ✅ Properly assigned user ID
        });

        await newNote.save();

        const populatedNote = await newNote.populate('user', 'fullname email'); // ✅ Correct fields

        res.status(201).json(populatedNote);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create note', error: err });
    }
};

// Get the note by ID
export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId).populate('user', 'fullname email'); // ✅ Correct fields

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve note', error: err });
    }
};

// Get all notes for the logged-in user
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // ✅ Correct usage of user ID
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch notes', error: err });
    }
};

// Update the note
export const updateNoteByID = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description, tag } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: noteId, user: req.user.id }, // ✅ Secure update, check user ownership
            { title, description, tag },
            { new: true }
        ).populate('user', 'fullname email'); // Populate user details

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {  
        res.status(500).json({ message: 'Failed to update note', error: err });
    }
};

// Delete the note
export const deleteNoteByID = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await Note.findOneAndDelete({ _id: noteId, user: req.user.id }); // ✅ Secure delete

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete note', error: err });
    }
};
