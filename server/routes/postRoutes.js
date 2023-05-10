import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET all posts route
router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success:false, data: posts});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed' });
      }
});

//Create a post route
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    //upload image to cloudinary and get url
    const photoUrl = await cloudinary.uploader.upload(photo);

    //create document with newly obtained image url
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unabelto create a post' });
  }
});

export default router;
