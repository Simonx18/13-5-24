const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/strive_blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


const authorsRouter = require('./routes/authors');
const blogPostsRouter = require('./routes/blogPosts');
app.use('/authors', authorsRouter);
app.use('/blogPosts', blogPostsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));