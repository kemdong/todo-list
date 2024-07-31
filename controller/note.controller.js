
const NoteService = require('../services/note.services');


exports.createNote = async (req, res, next) => {
  try {
    const {  title, content,date,time } = req.body;

    // Assuming NoteService handles creation and returns a note object
    let note = await NoteService.createNote( title, content, date ,time);
    
    res.json({ status: true, success: note });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
}
exports.getAllNotes = async (req, res, next) => {
    try {
        let notes = await NoteService.getAllNotes();
        res.json({ status: true, success: notes });
    } catch (error) {
        next(error);
        }
    }
exports.deleteNote = async (req, res, next) => {
    try {
        const id = req.params.id;  // Get the id from the URL parameters
        let deleted = await NoteService.deleteNote(id);

        if (deleted) {
            res.json({ status: true, success: 'Note deleted successfully' });
        } else {
            res.json({ status: false, message: 'Note not found' });
        }
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
}
exports.completeNote = async (req, res) => {
  const { id } = req.params;

  try {
      // Call the service method to mark the note as complete
      const note = await NoteService.markNoteComplete(id);
      if (note) {
          res.json({ status: 'success', success: note });
      } else {
          res.status(404).json({ status: 'error', message: 'Note not found' });
      }
  } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
  }
}
exports.updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content,date,time } = req.body;

        let updatedNote = await NoteService.updateNote(id, title, content,date,time);

        res.json({ status: true, success: updatedNote });
    } catch (error) {
        next(error);
    }
};
