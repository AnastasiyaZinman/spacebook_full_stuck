// import { Post, Comment } from './models/postModel.js';
//---------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

//-------------------------------------------------
var {Post, Comment} = require('./models/postModel');

var post1 = new Post({
  text: "New post about spacebook",
  comments: []
});
var post2 = new Post({
  text: "New2 post about spacebook",
  comments: []
});
var comment1 = new Comment({
  text: "new comment1",
  user: "Smb1"
})
var comment2 = new Comment({
  text: "new comment2",
  user: "Smb2"
})
var comment3 = new Comment({
  text: "new comment3",
  user: "Smb3"
})
// comment1.save();
// comment2.save();
// comment3.save();
// post1.comments.push(comment1);
// post1.comments.push(comment2);
// post2.comments.push(comment3);
// comment1.save();
// comment2.save();
// comment3.save();
// post1.save(); post2.save();

// Post.find({}).populate({
//   path: 'comments'
// }).exec(function (err, res) {
//  console.log(res);
//   for(i in res){
//   console.log(res[i].comments);
//   }
// });
//-------------------------------------------------
var app = express();
// app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// You will need to create 5 server routes
// These will define your API:
const api = require('./routes/api')
app.use('/', api)

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
