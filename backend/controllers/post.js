const res = require("express/lib/response");
const Post= require("../models/Post");
const User = require("../models/User");
const cloudinary=require("cloudinary")

exports.createPost = async (req,res) => {
    try{
         
         //const myCloud=await cloudinary.uploader.upload(req.body.image,{folder:"posts",});
         
         
        if(req.body.image===null){
          const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:"myCloud.public_id",
                url:"myCloud.secure_url",
            },
            owner:req.user._id,
          }
          
            const newPost = await Post.create(newPostData);

            const user = await User.findById(req.user._id);

            user.posts.unshift(newPost._id);
       

        
            await user.save();

           
        
        }
        else{
          const myCloud=await cloudinary.uploader.upload(req.body.image,{folder:"posts",});
          const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
                
            },
            owner:req.user._id,
          }
            const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.unshift(newPost._id);
       

        
        await user.save();

           
        };
        
        
        //new changes for post creation
        // if(image.public_id && image.url ===null){
        //   const newPost1 = await Post.create(newPostData);
        //   const user = await User.findById(req.user._id);
        //   user.posts.unshift(newPost1._id);
        //   await user.save();
        // }
         
        // const newPost = await Post.create(newPostData);

        // const user = await User.findById(req.user._id);

        // user.posts.unshift(newPost._id);
       

        
        // await user.save();

        

        res.status(201).json({
            success:true,
            message: "Post created",
    
        })
      

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

};

// exports.createPostOnlyCaption = async (req,res) => {
//   try{

    
//       const newPostData = {
//           caption:req.body.caption,
          
//           owner:req.user._id,
         
//       };
//       const newPost = await Post.create(newPostData);

//       const user = await User.findById(req.user._id);

//       user.posts.unshift(newPost._id);

      
      
//       await user.save();

      

//       res.status(201).json({
//           success:true,
//           message: "Post of caption only created",
  
//       })

//   }catch(error){
//       res.status(500).json({
//           success:false,
//           message:error.message
//       });
//   }

// };


exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const moderator="625adff7873065be04eed6b5"
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      
      if(req.user._id.toString()===moderator || post.owner.toString() === req.user._id.toString()){
        await cloudinary.uploader.destroy(post.image.public_id);
  
        await post.remove();
    
        const user = await User.findById(req.user._id);
    
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Post deleted",
        });
      }


      // if (post.owner.toString() !== req.user._id.toString() && req.user._id.toString()!==moderator) {
      else{
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
     
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

exports.likeAndUnlikePost = async(req,res) =>{
    try{
      const post = await Post.findById(req.params.id);

      if(!post){
          return res.status(404).json({
              success:false,
              message:"post not found",
          });
      }
      if(post.likes.includes(req.user._id)){
          const index = post.likes.indexOf(req.user._id);
          post.likes.splice(index,1);
          await post.save();
          return res.status(200).json({
              success:true,
              message:"post unlinked",
          });
      }
      else{
        post.likes.push(req.user._id);
        await  post.save();
        return res.status(200).json({
            success:true,
            message:"post liked",
        });
      }
     
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


exports.flagedandUnflaged = async(req,res) =>{
  try{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            success:false,
            message:"post not found",
        });
    }
    if(post.flags.includes(req.user._id)){
        const index = post.flags.indexOf(req.user._id);
        post.flags.splice(index,1);
        await post.save();
        return res.status(200).json({
            success:true,
            message:"post unflaged",
        });
    }
    else{
      post.flags.push(req.user._id);
      await  post.save();
      return res.status(200).json({
          success:true,
          message:"post flagged",
      });
    }
   
  }catch(error){
      res.status(500).json({
          success:false,
          message:error.message,
      });
  }
};

exports.getPostOffriends = async (req,res) => {
  try {
     const currentPage = req.query.page-1
     const numberOfPostPerPage = 10;
     const skip = numberOfPostPerPage*currentPage
     if (currentPage!=undefined) {
       const user = await User.findById(req.user._id);
       const posts = await Post.find({
         owner: {
           $in: user.friends,
         },
       }).sort({createdAt: -1}).skip(skip).limit(numberOfPostPerPage).populate("owner likes comments.user");;
       const totalPosts= await Post.countDocuments({});
       res.status(200).json({
         success: true,
         posts: posts,
         currentPage:currentPage+1,
         hasNextPage: totalPosts-((currentPage+1)*numberOfPostPerPage) < 0 ?false:true
       })
     }
     else{
       const user = await User.findById(req.user._id);
       const posts = await Post.find({
         owner: {
           $in: user.friends,
         },
       }).populate("owner likes comments.user");
       res.status(200).json({
         success: true,
         posts: posts.reverse(),
       })
     }
 
 
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 }


exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const moderator="625adff7873065be04eed6b5"
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString() && req.user._id.toString()!== moderator) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;

    // Checking if comment already exists

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
