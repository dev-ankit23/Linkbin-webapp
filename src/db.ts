import mongoose, { Schema } from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://ankitmauryacoder:nqZrFW1HTnBMEFTo@cluster0.akv6x97.mongodb.net/LinkbinWebapp"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// interface Content {

//   type: "document" | "tweet" | "youtube" | "link";
//   link: string;
//   title: string;
//   tags: string[];
// }

const ContentSchema = new Schema({
  title: "String",
  link: "String",
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const UserModel = mongoose.model("User", UserSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
