import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import notesRoutes from './routes/notesRoutes.js';

dotenv.config(); // load variables from .env

const PORT = process.env.PORT || 5001; // fallback if undefined

const app = express();

//middleware
app.use(express.json());

app.use("/api/notes", notesRoutes);

const server = app.listen(PORT, () => {
	console.log(`✅ Server started on port ${PORT}`);
});

server.on('error', (err) => {
	console.error(`❌ Error occurred: ${err.message}`);
	process.exit(1);
});

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Server started on PORT:", PORT);
	})
})
