const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { validatePost } = require("../validators/postValidator");
const verifyToken = require("../middlewares/authMiddleware");



router.get('/', verifyToken, async (req, res, next) => {
    try {
      const posts = await Post.find().populate("category");
      res.json(posts);
      
    } catch (err) {
      next(err)
    }
});

router.get('/:id', verifyToken, async(req, res, next) =>{
    try {
      const post = await Post.findById(req.params.id).populate("category");
      if (!post) {
        return res.status(404).json({ message: "Post not Found" });
      }
      res.json(post);
     
    } catch (err) {
      next(err)
    }
});

router.post('/', verifyToken, async( req, res, next ) => {
    try {

      const { title, content, category } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json({ message: "Missing required fields" });
      }


      const post = new Post({
        title,
        content,
        category,
        author: req.user.id,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
      });
     
      await post.save();
      res.status(201).json(post);
      
    } catch (err) {
      next(err);
    }
});

router.put('/:id', verifyToken, async(req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!post) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      res.json(post);
      
    } catch (err) {
     
        next(err);
    }
});

router.delete('/:id', verifyToken, async(req, res, next) => {
    try{
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post Not Found"});
    }
    res.json({ message: "Post deleted"});
    
    }catch(err){
        next(err);
    }
});

module.exports = router;
