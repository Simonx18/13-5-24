const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');


router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const blogPosts = await BlogPost.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await BlogPost.countDocuments();
    res.json({
      blogPosts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const blogPost = new BlogPost(req.body);
  try {
    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;