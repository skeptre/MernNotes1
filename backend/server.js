// Importing required modules
import express from "express"; // Express framework for building web APIs
import dotenv from "dotenv"; // For loading environment variables from .env files
import connectDB from "./config/db.js"; // Function to connect to the MongoDB database
import notesRoutes from "./routes/notesRoutes.js"; // Route handlers for /api/notes endpoints

// Load environment variables from .env into process.env
dotenv.config();

// Define the port to run the server on, default to 5001 if not specified in .env
const PORT = process.env.PORT || 5001;

// Create an instance of the Express app
const app = express();

// Enable parsing of JSON request bodies (e.g. req.body) and MIDDLEWARE
// Because of express.json, we can read the req body {title, content} which otherwise would be undefined
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `We received a request, the method is ${req.method} & the URl is ${req.url}`,
  );
});

// Mount the notes routes on the /api/notes path
// All routes defined in notesRoutes.js will be prefixed with /api/notes
app.use("/api/notes", notesRoutes);

// ----------------------
//      SERVER SETUP
// ----------------------

// Start the server and listen on the defined PORT
const server = app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});

// Listen for server errors (e.g., port in use, permission issues)
server.on("error", (err) => {
  console.error(`❌ Error occurred: ${err.message}`);
  process.exit(1); // Exit the process if there's a fatal error
});

// ----------------------
//      DATABASE SETUP
// ----------------------

// Connect to the MongoDB database and only then start the server again
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
