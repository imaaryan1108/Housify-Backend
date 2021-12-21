import express from "express";
import House from "../Models/House.js";
import formidable from "formidable";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import cors from "cors";

const Cloudinary = cloudinary.v2;
const cloud_name = "snap-shelter";
const api_key = "855228652121537";
const api_secret = "h3GNbqYAJq_UJsU869sGu13cYDs";

const mongoURI =
  "mongodb+srv://dbUser:lddufobioDygq9v2@cluster0.7nxqt.mongodb.net/Houses?retryWrites=true&w=majority";

const mongoURI2 =
  "mongodb+srv://dbUser:lddufobioDygq9v2@cluster0.7nxqt.mongodb.net/Users?retryWrites=true&w=majority";

//-----------------------------Cloudinary Config--------------------------------//
Cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

//-----------------------------MongoDb Config----------------------------------//
mongoose.connect(mongoURI, (error) => {
  if (error) {
    return console.log(error);
  }
  return console.log("Connection to MongoDB was Successful");
});

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post("/houseListing", (req, res) => {
  const dbData = req.body;
  console.log(req.body);
  House.create(dbData, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.post("/uniqueId", (req, res) => {
  const dbData = req.body;
  House.countDocuments({ user_id: dbData.user_id }, (err, count) => {
    try {
      if (count > 0) {
        console.log(count);
      } else {
        House.create(dbData, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(count.toString());
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

router.post("/bookmarks", async (req, res) => {
  const dbData = req.body;
  console.log("BOOKMARK");
  console.log(dbData);

  try {
    const result = await House.updateOne(
      { user_id: dbData.user_id },
      { $push: { bookmarks: dbData } },
      { upsert: true }
    );
    console.log(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/delete", async (req, res) => {
  console.log("DELETE");
  const dbData = req.body;
  console.log(dbData.user_id);

  try {
    const result = await House.updateOne(
      { user_id: dbData.user_id },
      { $pull: { bookmarks: { image: dbData.image } } }
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
