const express = require('express');
const router = express.Router();
const Author = require('../models/Author');


router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const authors = await Author.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Author.countDocuments();
    res.json({
      authors,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const author = new Author(req.body);
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;