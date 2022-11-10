const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async'); 


exports.getUser = asyncHandler(async (req, res, next)=>{
  const userId = req.params.id;
  const user = await User.findById(userId);
 const {name, followers, followings} = user;
  res.status(200).json({
    success: true,
    data: {name, followers, followings}
  })
})

exports.follow = asyncHandler(async(req, res, next)=>{
  if(req.user.id === req.params.id){
    return next(new ErrorResponse('You are not allowed to follow yourself', 403));
  }
  const user = await User.findById(req.params.id);
   const currentUser = await User.findById(req.user.id);
   
   if (!user.followers.includes(req.user.id)) {
    await user.updateOne({ $push: { followers: req.user.id } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });
    res.status(200).json({
      success: true,
      message: "User has been followed"
    });
  } else {
    return next(new ErrorResponse('You are already following this user', 403));
  }
})
exports.unfollow = asyncHandler(async(req, res, next)=>{
  if(req.user.id === req.params.id){
    return next(new ErrorResponse('You are not allowed to follow yourself', 403));
  }
  const user = await User.findById(req.params.id);
   const currentUser = await User.findById(req.user.id);
   
   if  (user.followers.includes(req.user.id)) {
    await user.updateOne({ $pull: { followers: req.user.id } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });
    res.status(200).json({
      success: true,
      message: "User has been unfollowed"
    });
  } else {
    return next(new ErrorResponse('You are already not following this user', 403));
  }
})