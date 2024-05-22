const mongoose = require("mongoose");
const { USER } = require("../constants");
const { v4: uuidv4 } = require("uuid");
const Product = require("./product.Schema");
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => USER + ":" + uuidv4(),
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    products :[{ type: String, ref: "Product" }]
  },
  {
    _id: false, // Disable the _id field
    versionKey: false, // Disable the __v field
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
