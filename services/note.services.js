const Note = require('../schemas/note');

class NoteService {
    static async createNote(userId, title, content, createdAt) {
        const createNote = new Note({ userId, title, content, createdAt });
        return await createNote.save();
    }

    static async getAllNotes() {
        try {
            return await Note.find(); // Use Mongoose's find method to get all notes
        } catch (error) {
            throw error; // Throw the error to be caught by the calling function
        }
    }

    static async deleteNote(id) {
        try {
            const deleted = await Note.findOneAndDelete({ _id: id });
            return deleted;
        } catch (error) {
            throw error;
        }
    }

    static async updateNote(id, userId, title, content, createdAt) {
        try {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id },
                { userId, title, content, createdAt },
                { new: true } // To return the updated document
            );
            return updatedNote;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NoteService;
