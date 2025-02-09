import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
//import userRouter from './routes/auth-route'
dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow these origins
    credentials: true, // Allow cookies to be sent
  })
);

// Mount user router
//app.use('/api/auth', userRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
})
// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server running on http://localhost:8000');
});
