import express from "express";
import cors from "cors";
// import dotenv from 'dotenv'
import "dotenv/config";
import connectDB from "./config/db.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
// dotenv.config()

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

// Routers
import router from "./routes/foorRoute.js";
import userrouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

app.use("/api/food", router);
app.use("/api/user", userrouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

// DB Connection
connectDB();

app.listen(port, () => {
  console.log(`server is started in http://localhost:${port}`);
});

// mongodb+srv://vijayStark:<db_password>@cluster0.eyacb.mongodb.net/?
