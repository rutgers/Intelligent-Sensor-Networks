//grocery-item.js
//Author: Rutgers ISN Team

const mongoose = require("mongoose");

//Define schema for GroceryItem
const groceryItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

//Create a model for GroceryItem
const groceryItem = mongoose.model("GroceryItem", groceryItemSchema);

//Export model for outside use
module.exports = groceryItem;
