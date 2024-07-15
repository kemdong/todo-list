const express = require('express');
const router = express.Router();
const NoteController = require('../controller/note.controller'); // Ensure correct path

router.post('/create', NoteController.createNote); // Correctly reference the createNote function
router.delete('/delete/:id', NoteController.deleteNote);
router.put('/update/:id', NoteController.updateNote);
//router.get('/read', NoteController.readNote);
router.get('/read', NoteController.getAllNotes);
module.exports = router;