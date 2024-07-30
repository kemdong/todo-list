const Note = require('../schemas/note');

class NoteService {
    static async createNote(title, content,date,time) {
        const createNote = new Note({ title, content,date,time});
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

    static async updateNote(id, title, content,date,time) {
        try {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id },
                { title, content,date,time},
                { new: true } // To return the updated document
            );
            return updatedNote;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = NoteService;
