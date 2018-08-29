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
            data: {"text":postText},
            dataType: "json",
            success: function (data) {
                console.log("Add post",data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  console.log("Post error", textStatus);
                }
          })
          .then(() => {
        //   console.log("posts addPost",this.posts);
          this.posts.push({ "text": postText, comments: [] });
          })
       
    }
   
    removePost(index) {
        console.log("posts in remove",this.posts);
        console.log('index', index)
        let id = this.posts[index]._id;
        console.log('id =',id);
        // $.ajax({
        //     type: "POST",
        //     url: '/delete',
        //     data: {"_id": id},
        //     dataType: "json",
        //     success: function (data) {
        //         console.log(data);
        //         },
        //         error: function (jqXHR, textStatus, errorThrown) {
        //           console.log("Post error", textStatus);
        //         }
        //   })
        //   .then(() => {
        //   this.posts.splice(index, 1);
        //   })
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository