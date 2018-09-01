/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getajax(url_data) {
        return $.ajax({
            method: "GET",
            url: url_data,
            dataType: "json",
            success: function (data) {
                console.log("getajax return", data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error", textStatus);
            }
        });

    }
    postajax(url_data, data) {
        console.log("postAJAX");
        $.ajax({
            type: "POST",
            url: url_data,
            data: data,
            dataType: "json",
            success: function (data) {
                console.log("Data", data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(url_data + "error", textStatus);
            }
        })
    }
    addPost(postText) {
        this.posts.push({ "text": postText, comments: [] }); //promise don't wait answer from ajax

    }

    removePost(index) {
        console.log("splice");
        this.posts.splice(index, 1);
    }

    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        // console.log("splice");   
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };
}

export default PostsRepository