//routes.js
//Author: Rutgers ISN Team

const express = require("express");
const mongoose = require("mongoose");

//Get GroceryItem model
const GroceryItem = require("../models/grocery-item");

//Set up express router
const router = express.Router();


//GET request - get list of all grocery items
router.get("/grocery-items", (req, res) => {
    //Use mongoose to find all grocery items
    GroceryItem.find((err, items) => {
        //Send error if present
        if (err) res.send(err);

        //Returns all grocery items as json
        res.json(items);
    });
});

//POST request - add new grocery items
router.post("/grocery-items", (req, res) => {
    //Make object from item POSTed
    let postItem = {
        name: req.body.name,
        quantity: req.body.quantity
    };

    console.log(req.body);
    //Create entry in DB
    GroceryItem.create(postItem, (err, item) => {
        if (err) res.send(err);

        //Return newly created item as json
        res.json(item);
    });
});

//PUT request - update grocery item
router.put("/grocery-items/:id", (req, res) => {
    //Make object from item PUTed
    let putItem = {
        item: req.body.item,
        quantity: req.body.quantity
    };

    //Make id object to hold ID of item
    let id = {
        _id: req.params.id
    };

    //Update entry in DB
    GroceryItem.update(id, putItem, (err, item) => {
        if (err) res.send(err);

        res.json(item);
    });
});

//DELETE request - delete grocery item
router.delete("/grocery-items/:id", (req, res) => {
    //Make id object to hold ID of item
    let id = {
        _id: req.params.id
    };

    //Remove entry in DB
    GroceryItem.remove(id, (err, item) => {
        if (err) res.send(err);

        //Return newly deleted item as json
        res.json(item);
    });
});

//Export router for use
module.exports = router;
