import mongoose from "mongoose";
import { config } from "dotenv";

import Item from "../models/item.model";

config();

const connection = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("DB READY TO SEED"))
    .catch((err) => console.log(err));
};

const seedDB = async () => {
  await connection();
  await Item.create([
    { name: "Water", description: "Water" },
    { name: "Food", description: "Food" },
    { name: "Medication", description: "Medication" },
    { name: "C-Virus Vaccine", description: "C-Virus Vaccine" },
  ])
    .then(() => console.log("Items seeded"))
    .catch((err) => console.log(err));

  process.exit();
};

seedDB();
