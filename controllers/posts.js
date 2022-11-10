const Post = require('../models/Post');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async'); 

exports.createPost = asyncHandler(async (req, res, next)=>{
  req.body.userId = req.user.id;
  const post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    data: post
  })
})
exports.deletePost = asyncHandler(async (req, res, next)=>{ 
  const post = await Post.findById(req.params.id);
  if(!post){
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
   } 
   if(post.userId.toString()!== req.user.id ){
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete post${post._id}`, 401))
  
  }
   await post.remove();
    res.status(200).json({
      success: true, 
      data:  {}
    });
  
})
exports.getSinglePost = asyncHandler(async (req, res, next)=>{
  const post = await Post.findById(req.params.id);

  if(!post){
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
   }  
   const {_id, likes, comments} = post;
   console.log(post);
   res.status(200).json({
    success: true,
    data: {_id, likes, comments}
   })
  })
exports.getAllPosts = asyncHandler(async (req, res, next)=>{
  const post = await Post.find({userId: req.user.id});

  if(!post){
    return next(
      new ErrorResponse(`No post with the id of ${req.user.id}`),
      404
    );
   }   
   res.status(200).json({
    success: true,
    data: post.reverse()
   })
  })
  exports.like = asyncHandler(async(req, res, next)=>{ 
    const post = await Post.findById(req.params.id);  
     if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } }); 
      res.status(200).json({
        success: true,
        message: "Post has been liked"
      });
    } else {
      return next(new ErrorResponse('You are already likes this post', 403));
    }
  })
  exports.unlike = asyncHandler(async(req, res, next)=>{ 
    const post = await Post.findById(req.params.id);  
     if (post.likes.includes(req.user.id)) {
      await post.updateOne({ $pull: { likes: req.user.id } }); 
      res.status(200).json({
        success: true,
        message: "Post has been unliked"
      });
    } else {
      return next(new ErrorResponse('You are not allow to unlike again', 403));
    }
  })
  exports.comment = asyncHandler(async(req, res, next)=>{ 
    const post = await Post.findById(req.params.id);  
    const user = req.user.id;
    const message =  req.body.comment;  
    const value = {user, message};
    console.log(value)
    post.comments.push(value);
    post.save();
      res.status(200).json({
        success: true, 
        data: post
      });
     
  })