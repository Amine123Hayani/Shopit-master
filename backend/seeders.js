import mongoose from "mongoose";
import { config } from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log("DATA IMPORTED".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("DATA Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
