import express from "express";
import { connectDB, UserModel } from "./db.js";

const app = express();
app.use(express.json());

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

    const NewUser = await UserModel.create({
      username: username,
      password: password,
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

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
