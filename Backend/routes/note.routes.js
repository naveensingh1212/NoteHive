import express from "express";
import { createNote,getNoteById,updateNoteByID,deleteNoteByID } from "../controllers/notes.controller.js";

const router = express.Router();

router.post('/create', createNote);
router.get('/:id',getNoteById);
router.put('/:id',updateNoteByID);
router.delete('/:id',deleteNoteByID);

export default router;