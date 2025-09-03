import express from "express";
import jwt from "jsonwebtoken";
import Note from "../models/Note.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "Missing authorization" });
  const token = header.split(" ")[1] || header;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // optional: attach user doc
    req.userDoc = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

// Get notes
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(notes);
});

// Create note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  if (!content) return res.status(400).json({ msg: "Note content required" });
  const note = new Note({ userId: req.user.id, title, content });
  await note.save();
  res.json(note);
});

// Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!note) return res.status(404).json({ msg: "Note not found" });
  res.json({ msg: "Deleted" });
});

export default router;
