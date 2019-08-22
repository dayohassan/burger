var express = require("express");
var path = require('path')
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    console.log(data)
    res.render("index", { burgers: data })
  });
});

router.post("/api/burger", function(req, res) {
  console.log("BC")
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, 0
  ], function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    res.redirect("/")
  });
});
// router.post("/api/burger", function(req, res) {
//   console.log("BC")
//   burger.create([
//     "burger_name", "devoured"
//   ], [
//     req.body.burger_name, req.body.devoured
//   ], function(result) {
//     // Send back the ID of the new quote
//     // res.json({ id: result.insertId });
//     res.redirect("/")
//   });
// });

router.post("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.redirect("/")
    }
  });
});

router.delete("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;