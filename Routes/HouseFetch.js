import express from "express";
import House from "../Models/House.js";

const router = express.Router();

router.get("/house/buy", async (request, response) => {
  await House.find({ "house_properties.sale_or_rent": "Sell" })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/house/rent", async (request, response) => {
  await House.find({ "house_properties.sale_or_rent": "rent" })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/houses", async (request, response) => {
  await House.find({
    "house_properties.houseImage": { $exists: true, $ne: null },
  })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/house/buy/:location", async (request, response) => {
  const req_location = request.params.location;

  await House.find({
    "house_location.city": req_location,
    "house_properties.sale_or_rent": "sell",
  })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/house/rent/:location", async (request, response) => {
  const req_location = request.params.location;

  await House.find({
    "house_location.city": req_location,
    "house_properties.sale_or_rent": "rent",
  })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/bookmarks/:user_id", async (request, response) => {
  const req_user_id = request.params.user_id;
  await House.find({
    user_id: req_user_id,
    bookmarks: { $ne: null },
  })
    .exec()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
