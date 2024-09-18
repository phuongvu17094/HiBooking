import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import userRoute from "./routes/users.js";
import roomRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database");
  } catch (err) {
    throw err;
  }
};
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//middlewares
//fix loi khong gui duoc cookie chua token cua nguoi dung
app.use(cors({
  origin:['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8800', 'https://mern-booking-web.onrender.com', 'http://localhost:3002', 'https://admin17.netlify.app', 'https://hibooking.netlify.app'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello');
});
app.use("/api/auth", authRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);

//xu ly neu co loi xay ra
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("connected to back end");
});
