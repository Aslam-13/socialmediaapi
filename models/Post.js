const mongoose = require("mongoose");
const PostSchema = new  mongoose.Schema( { 
   title: {
    type: String, 
    required: [true, 'Please add a title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  likes:{
    type: Array,
    default: [],
  },
  comments:{ 
    type: [{  }], 
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  },
 }, 
);
module.exports = mongoose.model("Post", PostSchema);