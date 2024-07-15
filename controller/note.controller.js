const NoteService = require('../services/note.services');

exports.createNote = async (req, res, next) => {
  try {
    const { userId, title, content, createdAt } = req.body;

    // Assuming NoteService handles creation and returns a note object
    let note = await NoteService.createNote(userId, title, content, createdAt);
    
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
exports.updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, title, content, createdAT } = req.body;

        let updatedNote = await NoteService.updateNote(id, userId, title, content, createdAT);

        res.json({ status: true, success: updatedNote });
    } catch (error) {
        next(error);
    }
};
