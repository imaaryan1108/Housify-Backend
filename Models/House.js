import mongoose from "mongoose";

const HouseSchema = mongoose.Schema([
  {
    user_id: String,
    owner: {
      name: { type: String },
      surname: { type: String },
      phoneNumber: { type: Number },
      email: { type: String },
    },
    house_location: {
      city: { type: String },
      state: { type: String },
      address: { type: String },
      locality: { type: String },
    },
    house_properties: {
      sale_or_rent: { type: String },
      housePrice: { type: String },
      bedroomNumber: { type: Number },
      houseImage: { type: String },
      buildUpArea: { type: String },
    },
    bookmarks: [],
  },
]);

export default mongoose.model("House", HouseSchema);
