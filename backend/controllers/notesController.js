import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find()
		res.status(200).json(notes)
	} catch (error) {
		console.error("Error in getAllNotes controller", error)
		res.status(500).json({ message:"Internal server error" });
	}
}

export const createNote = async (req, res) => {
	try {
		const {title, content} = req.body;
		const newNote = new Note({title, content});

		const SavedNote = await newNote.save();
		res.status(201).json(SavedNote);
	} catch (error){
		console.error("Error in createNote controller", error)
		res.status(500).json({ message:"Internal server error" });
	}
}


export const updateNote = async (req, res) => {

	try {
		const {title, content} = req.body;
		const updatedNote = await Note.findByIdAndUpdate()
		res.status(200).json({message:"Note updated successfully"})
	}
	catch (error) {
		console.error("Error in updateNote controller", error)
	}
}





export const deleteNote = (req, res) => {
	res.status(200).json({message: 'Note deleted successfully.'});
}
