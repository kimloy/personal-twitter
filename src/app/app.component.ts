import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = []; // We defined storedPosts as an array of post (defined by the post model file)
               // This format (typescript) is saying we have an array of post inside this property.
  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
