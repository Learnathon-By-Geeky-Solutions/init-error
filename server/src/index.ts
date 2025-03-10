import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth-route";
import projectRouter from "./routes/projects-route";
dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Mount user router
app.use("/api/auth", userRouter);
app.use("/api/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("App error -> ", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// catch all the unknown routes
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:8000");
});
