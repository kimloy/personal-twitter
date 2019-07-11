import {Component, OnDestroy, OnInit} from '@angular/core'; // took out input
import {Post} from '../post.model';
import {PostService} from '../post.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
 /* posts = [
    {title: 'First Post', content: 'This is the first post\'s content'},
    {title: 'Second Post', content: 'This is the Second post\'s content'},
    {title: 'Third Post', content: 'This is the Third post\'s content'}
  ];*/
 // Makes the posts property bindable from the outside, so that info can be passed to it from different component
 // @Input() posts: Post[] = [];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
 constructor(public postService: PostService) {}

 ngOnInit() {
   this.isLoading = true;
   this.postService.getPosts();
   // tslint:disable-next-line:max-line-length
   this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post []) => {   // we subscribe set up a subscription to listen
     this.isLoading = false;
     this.posts = posts;
   });
 }

 onDelete(postID: string) {
    this.postService.deletePost(postID);
 }

 ngOnDestroy() {
   // So when the DOM is not on the page anymore (change page etc) we should unsub as if we do not then we will cause memory leaks.
   // so anytime we use subscription to listen to events we should unsubscribe to make sure we are not wasting mem.
   this.postsSub.unsubscribe();
 }
}
