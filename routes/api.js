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
    response.send(res)
  })
});

// POST post
router.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  var newPost = new Post({
    text: req.body.text
  });
  newPost.save();
  res.send({ "Text of Post": req.body.text })
})

// POST comments 
router.post('/comment', jsonParser, function (req, res) {
  // console.log("COMMMMMMEEEENTSSS");
  if (!req.body) return res.sendStatus(400)
  console.log("req.body.text",req.body.text,"req.body.user",req.body.user);
  Post.findByIdAndUpdate(req.body.post_id, 
    {$push: 
      { comments: 
        {text: req.body.text,
         user: req.body.user}
      }
    }, {new: true}, (err, post) => {
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
    response.send({ "result": res })
  })
});


module.exports = router;