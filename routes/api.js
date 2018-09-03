var { Post, Comment } = require('../models/postModel');
const express = require('express')
const router = express.Router()
//----------------Post-----
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
//--------GET-BD-----------
router.get('/gettingdata', function (req, response) {
  Post.find({}).populate({
    path: 'comments'
  }).exec(function (err, res) {
    //Add err handler everywhere
    if(err){
        console.log(err);
     }
    response.send(res)
  })
});

// POST post
router.post('/post', jsonParser, function (req, res) {
  //Very good practice but also send .res so the user can understand why
  if (!req.body) return res.sendStatus(400)
  var newPost = new Post({
    text: req.body.text
  });
  //Add callback function + err handling
  //Make the code async so we only get reply if everything is working. if not then err
  newPost.save(
  (err, post) => {
    if (err) throw err;
    else {
      res.send({ "post_id": post._id})
      }
    }
  );
})

// POST comments 
router.post('/comment', jsonParser, function (req, res) {
  console.log("COMMMMMMEEEENTSSS");
  if (!req.body) return res.sendStatus(400)
  //Use destruct and also define all var (let/const) at the top
  let {post_id,text,user} =req.body;
  console.log(post_id,"req.body.text",text,"req.body.user",user);
  Post.findByIdAndUpdate(post_id, 
    {$push: 
      { comments: 
        {text: text,
         user: user}
      }
    }, {new: true}, (err, post) => {
    //This is a good handling of callback + 
    if (err) throw err;
    else {res.send(post)}
    })
  })
//Delete comment
router.get('/deletecomment/:commentId/inPost/:postId', (req, res,err) =>{
  let {commentId,postId}  = req.params;
  if (err) {
    console.log(err);
  }
  Post.findById(postId, function(err, result){
    if(err){
      console.log(err);
    }
    result.comments.splice(commentId, 1);;
    //Notice you can control the var name anyware;
    let updatedPost = result;
    Post.findByIdAndUpdate(postId,updatedPost, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(updatedPost);
    });
  });
});
//delete with pull
// router.delete('/deletecomment', (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, 
//     {$pull: 
//       {comments: {
//         _id: req.body.commentId}
//       }
//     }, {new: true}, (err, post) => {
//       if (err) throw err;
//       else res.send(post)
//     })
//   })

// DELETE post
router.get('/delete/:id', function (req, response) {
  var post_id = req.params.id;
  // console.log("Post_id",post_id);
  Post.findOneAndRemove({ _id: post_id }).exec(function (err, res) {
    //Err handling
    response.send({ "result": res })
  })
});


module.exports = router;