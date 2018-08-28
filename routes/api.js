var {Post} = require('../models/postModel');
const express = require('express')
const router = express.Router()

router.get('/gettingdata', function (req, response) {
 Post.find({}).populate({
    path: 'comments'
  }).exec(function (err, res) {
  response.send(res)
  })
});

// POST 
// router.post('/users', urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.name +" "+ req.body.role)
// })
// router.listen(8000, function () {
//   console.log("Hello server");
// });
module.exports = router