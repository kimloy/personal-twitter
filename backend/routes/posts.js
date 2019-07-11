const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.post("", (req,res,next) => {
  /* const post = req.body; // This is the new field from bodyParser. (1 Post)
   console.log(post);
   /!*res.status(201).json({  // 201 = everything ok something new was added
     message: 'Post added successfully!'
   });*!/*/
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully!",
      postId: createdPost._id
    });
  });
});

// Put request for the editing section of the routerlication. Able to dynamically receive the postid for the http request.
router.put("/:id", (req, res, next) => {
  // make a new post using the requested title, id, and content.
  const post = new Post({
    title: req.body.title,
    _id: req.body.id,
    content: req.body.content
  });
  // Call the updateOne function which will use the encoded parameters that was defined (_id) and also the post that was defined.
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successfully!'});
  });
});

router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: documents
      });
    });
});

router.get("/:id", (req, res,next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found"});
    }
  })
});

router.delete("/:id", (req,res,next) =>{
  Post.deleteOne({_id: req.params.id}) // params gives us access to all encoded params inside the path we define (id) so we are accessing the id that is pasted in
    .then(result => {
      console.log(result);
      res.status(200). json({message: "Post deleted"});
    });
});
module.exports = router;
