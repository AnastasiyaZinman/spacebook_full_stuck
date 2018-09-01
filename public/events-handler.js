class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    ajaxRender() {
        this.postsRepository.getajax('/gettingdata')
        .then((data) => {
        this.postsRepository.posts = data;
        return this.postsRepository.posts;
        })
        .then((posts) => {
        this.postsRenderer.renderPosts(posts)});
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            let text = $input.val();
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {  
                this.postsRepository.postajax('/post', {"text": text });
                this.postsRepository.addPost(text);
                this.ajaxRender();
                $input.val("");
            }
            });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            let id = this.postsRepository.posts[index]._id;
            this.postsRepository.getajax('/delete/' + id);
            this.postsRepository.removePost(index);
            console.log("back to render");
            this.postsRenderer.renderPosts(this.postsRepository.posts);
          });

    }
  

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let post_id =  this.postsRepository.posts[postIndex]._id;
            let text = $comment.val();
            let user = $user.val();
            let newComment = {'text':text, 'user':user };
            this.postsRepository.postajax('/comment', {'post_id': post_id, 'text':text, 'user':user});
            this.postsRepository.addComment(newComment, postIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            // let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let PostId =  this.postsRepository.posts[postIndex]._id;
            let CommentId = this.postsRepository.posts[postIndex].comments[commentIndex]._id;
            this.postsRepository.getajax('/deletecomment/' + CommentId + '/inPost/' + PostId);
            this.postsRepository.deleteComment(postIndex, commentIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        });
    }
}

export default EventsHandler