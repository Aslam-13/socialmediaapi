const express = require('express');
const {createPost, deletePost, getSinglePost, getAllPosts, like, unlike, comment} = require('../controllers/posts');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/',protect,  createPost);   
router.delete('/:id',protect,  deletePost);   
router.get('/:id', getSinglePost);
router.get('/',protect, getAllPosts)
router.post('/like/:id', protect, like)
router.post('/unlike/:id', protect, unlike)
router.post('/comment/:id', protect, comment)


module.exports = router;