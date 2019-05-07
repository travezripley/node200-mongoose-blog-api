const express = require("express");
const router = express.Router();
const User = require("../models/User"); //gets the folder - users Schema

// "Get all Users"
router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// "Get Single User"
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      console.log("user:", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("error: user not found");
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// "Create a User"
router.post("/", (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  res.status(201).json({
    message: "User was Created"
  });
});

// "Update a User"
router.put("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  })
    .exec()
    .then(result => {
      console.log(result);
      res.status(204).send(result);
    })
    .catch(err => console.log(err));
});

// "Delete a User"
router.delete("/", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
