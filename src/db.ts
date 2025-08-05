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

interface Content {
  title: string;
  type: "document" | "tweet" | "youtube" | "link";
  link: string;
  tags: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<Content>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["document", "tweet", "youtube", "link"],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const UserModel = mongoose.model("User", UserSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
