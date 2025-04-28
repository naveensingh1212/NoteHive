import Note from "../models/notes.model.js";
import User from "../models/user.model.js";

//create a note 
export const createNote = async (req, res) => {
    try {
        const { title, description, tag, user } = req.body;

        // Create and save the new note
        const newNote = new Note({
            title,
            description,
            tag,
            user // Linking the note to a specific user
        });

        await newNote.save();

        // Populate the user field to include user details (name and email)
        const populatedNote = await newNote.populate('user', 'name email');

        // Respond with the populated note
        res.status(201).json(populatedNote);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create note', error: err });
    }

};

//read / get the note 

export const getNoteById = async (req,res) => {
    try{
        const noteId = await req.params.id;
         
        const note = await Note.findById(noteId).populate('user', 'fullname email')
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    }catch (err) {
        res.status(500).json({ message: 'Failed to retrieve note', error: err });
    }

}

// update the note 
export const updateNoteByID = async (req, res) => {
    try {
        const noteId = req.params.id; // Get note ID from params
        const { title, description, tag } = req.body; // Get updated data from request body

        // Find the note by ID and update with the provided data
        const note = await Note.findByIdAndUpdate(
            noteId, // The ID of the note to update
            { title, description, tag }, // The fields to update
            { new: true } // Return the updated document
        ).populate('user', 'fullname email'); // Populate the user details

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Send the updated note in response
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update note', error: err });
    }
};

//delete the node 


export const deleteNoteByID = async (req, res) => {
    try {
        const noteId = req.params.id; // Get the note ID from the params

        // Find and delete the note by ID
        const note = await Note.findByIdAndDelete(noteId);

        // Check if note exists before deleting
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Send a success response if the note is deleted
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete note', error: err });
    }
};
