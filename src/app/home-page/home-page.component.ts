import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PostsService } from '../user/shared/services/posts.service';
import { Observable, forkJoin } from 'rxjs';
import { Post, User } from '../shared/interfaces';
import { UsersService } from '../user/shared/services/users.service';
import { AuthService } from '../user/shared/services/auth.service';
//import { UserComponent } from '../shared/components/smallUser/smallUser.component';
import { UsersPageComponent } from '../users-page/users-page.component';
//import { tap, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  //  @ViewChild(UsersPageComponent) child: UsersPageComponent

  //@Input subscriptionChanged: 

  currentUserId: string | null;

  users$: Observable<User[]>;

  posts$: Observable<Post[]>;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    //    this.currentUserId = this.auth.uid;
    if (this.auth.isAuthenticated()) {
      console.log('loggen uid: ', this.auth.uid);
      this.users$ = this.usersService.getAll();
      this.posts$ = this.postsService.getPostsBySubscription(this.auth.uid)
    }
    else {
      // сделать переадресацию на страницу логина или что-то другое
      console.log('not logged in');
      this.users$ = this.usersService.getAll();
      this.posts$ = this.postsService.getAll()
    }
  }

  updatePosts() {
    this.posts$ = this.postsService.getPostsBySubscription(this.auth.uid)
//    this.posts$.subscribe(p => console.log(p))
  }

}

