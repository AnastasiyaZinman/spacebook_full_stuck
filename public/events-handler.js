class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    ajaxRender() {
        console.log("ajaxrender");
        this.postsRepository.getajax()
        .then((data) => {
        this.postsRepository.posts = data;
        return this.postsRepository.posts;
        })
        .then((new_d) => {
        this.postsRenderer.renderPosts(new_d)});
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            let text = $input.val();
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {  
                this.postsRepository.addPost(text);
                this.ajaxRender();
                // this.postsRenderer.renderPosts(this.postsRepository.posts);
                $input.val("");
            }
            });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            console.log("postsexists?", this.postsRepository.posts);
            // this.ajaxRender();
            this.postsRepository.removePost(index);
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
            let newComment = { text: $comment.val(), user: $user.val() };
          
            this.postsRepository.addComment(newComment, postIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            this.postsRepository.deleteComment(postIndex, commentIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        });
    }
}

export default EventsHandler