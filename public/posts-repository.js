/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getajax() {
        return $.ajax({
            method: "GET",
            url: '/gettingdata',
            dataType: "json",
            success: function (data) {
                // console.log("getajax return",data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error", textStatus);
            }
        });

    }

    addPost(postText) {
        $.ajax({
            type: "POST",
            url: '/post',
            data: { "text": postText },
            dataType: "json",
            success: function (data) {
                console.log("Add post", data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Post error", textStatus);
            }
        })
            .then(() => {
                this.posts.push({ "text": postText, comments: [] }); //promise don't wait answer from ajax
            })
    }

    removePost(index) {
        console.log("posts in remove", this.posts);
        console.log('index', index)
        let id = this.posts[index]._id;
        console.log('id =', id);
        $.ajax({
            type: "GET",
            url: '/delete/' + id,
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Post error", textStatus);
            }
            })
            // console.log("splice");
            this.posts.splice(index, 1);
            console.log("Postsaftersplice", this.posts);
        }

    addComment(newComment, postIndex) {
        console.log("new comment",newComment);
        let post_id = this.posts[postIndex]._id;
        console.log('Post id =', newComment.text, newComment.user);
        $.ajax({
            type: "POST",
            url: '/comment',
            data: {"post_id": post_id ,"text": newComment.text,"user": newComment.user},
            dataType: "json",
            success: function (data) {
                console.log("Add comments", data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Comment error", textStatus);
            }
        })       
                this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        let PostId = this.posts[postIndex]._id;
        let CommentId = this.posts[postIndex].comments[commentIndex]._id;
        console.log('PostId',PostId,'CommentId',CommentId);
        $.ajax({
            type: "GET",
            url: '/deletecomment/' + CommentId+ '/inPost/' + PostId,
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Post error", textStatus);
            }
            })
            // console.log("splice");   
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };
}

export default PostsRepository