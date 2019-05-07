const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog"); //"gets the folder - BlogSchema"
const User = require("../models/User"); //"gets the folder - UserSchema "

// "Get all Blogs"
router.get("/", (req, res) => {
    Blog
    .find()
    .then(Blogs => {
        res.status(200).json(Blogs);
      })
      .catch(err => res.status(500).send("No Blogs found"));
  });


//"Get all featured Blogs"
router.get("/featured", (req, res) => {
  Blog
    .where("featured", true)
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => res.status(500).send("No FEATURED Blogs found"))
});


//"Get Single Blog"
router.get("/:id", (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blogs => {
      if (!blogs) res.status(404).send();
      res.status(200).json(blogs);
    })
    .catch(err => res.status(404));
});

//"Create a Blog + associate to userId"
router.post("/", (req, res) => {
  let dbUser = null;
  
  User.findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      console.log(dbUser);
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    })
    .catch(err => res.status(500).send(req.body));
});

//"Update a Blog"
router.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(blogs => {
      if (!blogs) return res.status(404).send;
      res.status(204).json(blogs);
    })
    .catch(err => res.status(500).send("Did not put by id"));
});

//"Delete a Blog"
router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(blogs => {
      if (!blogs) return res.status(200).json(blogs);
      res.status(200).json(blogs);
    })
    .catch(err => res.status(404).send("Still here - didn't delete"));
});


module.exports = router;