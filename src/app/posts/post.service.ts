import {Post} from './post.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs'; // Observables that helps us pass data around.
import {HttpClient} from '@angular/common/http'; // can inject the client inside the service too.
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


// tslint:disable-next-line:max-line-length
@Injectable({providedIn: 'root'}) // injects the service inside the provided array inside the parent (app module ts) and only makes 1 instant.
export class PostService {
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>(); // Planned on passing a list of Post as a payload.

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // tslint:disable-next-line:max-line-length
    // we dont want to return the org array (we would return the memory address of the org array so we have to make a new array of the content.
    // return [...this.posts]; // the spread operator grabs the elements from the array and make a new array with the content.
                            // this so it will not affect the org array.

    // tslint:disable-next-line:max-line-length
    // http request to post. We subscribe as the angular http client uses observables which wont do anything or send the request unless you listen to it = subscribe
    // because if you are not even interested in it's response why would it send it?
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return{
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformPosts) => {
        this.posts = transformPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // This is a method that is a listener to the subject when it is updated.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // It is private so we have to observe it
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }


  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    // tslint:disable-next-line:max-line-length
    // http request to post. We subscribe (see get to see why) to post in app.js it using the url that the post is coming from. We also input the other post
    // that we put locally and the updatedPost array.
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); // push (emits) a new value.
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        // filter works by keeping the arguments that are true for the conditional statement.
        // So we pass in an array of post and we check if the posts Id is not equal to the one the uses wants to delete.
        // If they do not equal then that is true and that will be kept on the angular side of the code.
        // tslint:disable-next-line:max-line-length
        const updatedPosts = this.posts.filter(post => post.id !== postId );  // filter will keep the post.id that are not equal to the postId (the one you want to delete)
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

