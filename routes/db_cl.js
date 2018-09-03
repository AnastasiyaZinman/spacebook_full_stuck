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