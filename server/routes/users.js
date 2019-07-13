const express = require("express");
const router = express.Router();
const User = require("../models/User"); //gets the folder - usersSchema
const Blog = require("../models/Blog"); //"gets the folder - blogSchema "

// "Get all the Users"
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(404).send("No users found"));
});

// "Get Single User"
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(200).json(user);
    })
    .catch(err => res.status(404).send("Houston, Weve got a problem"));
});

// "Create a User"
router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).send("Ain't postin nothing here dawg"));
});

// "Update a User"
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(204).json(user);
    })
    .catch(err => res.status(500).send("Did not put"));
});

// "Delete a User"
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(200).json(user);
    })
    .catch(err => res.status(404).send("Still here - didn't delete"));
});

module.exports = router;
