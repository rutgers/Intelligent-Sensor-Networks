//grocery-item.js
//Author: Rutgers ISN Team

var mongoose = require("mongoose");

//Define schema for GroceryItem
var groceryItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

//Create a model for GroceryItem
var groceryItem = mongoose.model("GroceryItem", groceryItemSchema);

//Export model for outside use
module.exports = groceryItem;
