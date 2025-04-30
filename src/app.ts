import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import jobRoutes from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(express.json());
app.use(clerkMiddleware({ publishableKey: process.env.CLERK_PUBLISHABLE_KEY }));
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
