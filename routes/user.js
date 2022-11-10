const express = require('express');
const {getUser, follow, unfollow } = require('../controllers/users');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.get('/:id', getUser);  
router.post('/:id/follow',protect, follow);  
router.post('/:id/unfollow',protect, unfollow);  

module.exports = router;