import express from "express";
import {
  createNote,
  getNoteById,
  updateNoteByID,
  deleteNoteByID,
  getAllNotes
} from "../controllers/notes.controller.js";
import { authenticator} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/create', authenticator, createNote);
router.get('/', authenticator, getAllNotes); 
router.get('/:id', authenticator, getNoteById);
router.put('/:id', authenticator, updateNoteByID);
router.delete('/:id', authenticator, deleteNoteByID);

export default router;
