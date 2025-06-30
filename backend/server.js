// Importing required modules
import express from "express"; // Express framework for building web APIs
import dotenv from "dotenv"; // For loading environment variables from .env files
import connectDB from "./src/config/db.js"; // Function to connect to the MongoDB database
import notesRoutes from "./src/routes/notesRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

// Load environment variables from .env into process.env
dotenv.config();

// Define the port to run the server on, default to 5001 if not specified in .env
const PORT = process.env.PORT || 5001;

// Create an instance of the Express app
const app = express();

app.use(rateLimiter);
// Enable parsing of JSON request bodies (e.g. req.body) and MIDDLEWARE
// Because of express.json, we can read the req body {title, content} which otherwise would be undefined
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `We received a request, the method is ${req.method} & the URl is ${req.url}`,
  );
  next();
});

// Mount the notes routes on the /api/notes path
// All routes defined in notesRoutes.js will be prefixed with /api/notes
const mainRoute = "/api/notes";
app.use(mainRoute, notesRoutes);

// ----------------------
//      SERVER SETUP
// ----------------------



// ----------------------
//      DATABASE SETUP
// ----------------------

// Connect to the MongoDB database and only then start the server again
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT, "--> http://localhost:" + PORT + mainRoute);
  });
});
