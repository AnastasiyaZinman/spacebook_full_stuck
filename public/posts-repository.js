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
        // console.log("postAJAX",data);
        return $.ajax({
            type: "POST",
            url: url_data,
            data: data,
            dataType: "json",
            success: function (data) {
                console.log("id",data.post_id);
                return data.post_id;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(url_data + "error", textStatus);
            }
        })
    }
    addPost(post_ad,postText) {
        this.posts.push({"_id":post_ad,"text": postText, comments: [] }); //promise doesn't wait answer from ajax

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