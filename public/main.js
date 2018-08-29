import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);
postsRepository.getajax()
.then((data) => {
    postsRepository.posts = data; 
    console.log("posts main",postsRepository.posts);
    return postsRepository.posts; 
    // console.log("postsRenderer.posts",postsRenderer.posts);
})
.then ((new_d) => {
    // console.log("new_d",new_d);
    postsRenderer.renderPosts(new_d)});

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();