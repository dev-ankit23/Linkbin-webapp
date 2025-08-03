import express from "express";
import { connectDB, UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
const jwtSecret = "fakljh";

connectDB();

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists. Please login or choose another username.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      Message: "Account Created Successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Something went wrong during signup.",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find the user by username
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({
        message: "User does not exist or wrong credentials",
      });
    }

    // 2. Compare entered password with the hashed password stored in DB
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "User does not exist or wrong credentials",
      });
    }

    // 3. If password is correct, generate token
    const token = jwt.sign({ username }, jwtSecret);

    return res.status(200).json({
      token,
      message: "Signin successful",
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
