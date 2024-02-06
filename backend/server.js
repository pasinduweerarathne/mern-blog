import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, invalidPathHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

app.use(invalidPathHandler);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
