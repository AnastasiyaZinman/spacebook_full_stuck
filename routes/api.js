var {Post} = require('../models/postModel');
const express = require('express')
const router = express.Router()
//----------------Post-----
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
//------------
router.get('/gettingdata', function (req, response) {
 Post.find({}).populate({
    path: 'comments'
  }).exec(function (err, res) {
  response.send(res)
  })
});

// POST 
router.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  var newPost = new Post({
    text: req.body.text
  });
  newPost.save();
  res.send({"Text of Post": req.body.text})
})

router.post('/delete', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
 
  res.send({"Text of Post": req.body.text})
})
module.exports = router