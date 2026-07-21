import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config() 
import jwt from "jsonwebtoken"
import User from "./modles/usermodel.js"
import mongoose from "mongoose";
const SECRET_KEY=process.env.JWT_SECRET_KEY
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

app.post("/signup", async (req, res) => {
  try {
    const { email, password, task } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      task,
    });

    const token = jwt.sign(
      { id: user._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/user", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
     if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json({
    email: user.email,
    task: user.task,
  });
});


app.put("/user", verifyToken, async (req, res) => {
  try {
    const { task } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { task },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Tasks updated successfully",
      task: user.task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.listen(5000,()=>{
    console.log("server is running on Port 5000")
})