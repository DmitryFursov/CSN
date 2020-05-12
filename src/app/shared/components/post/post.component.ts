import { Component, OnInit, Input } from '@angular/core';
import { Post, User } from '../../interfaces';
import { PostsService } from 'src/app/user/shared/services/posts.service';
import { AuthService } from 'src/app/user/shared/services/auth.service';
import { IfStmt } from '@angular/compiler';
import { UsersService } from 'src/app/user/shared/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post


  isAuthenticated: boolean
  action = ''
  localLikeList: string[] = []
  author$: Observable<User>

  constructor(
    private postsService: PostsService,
     private auth: AuthService,
     private usersService: UsersService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated()

    if (!!this.post.likeList) {
      this.localLikeList = this.post.likeList
    }

    if (this.post.author === this.auth.uid) {
      this.action = 'none'
    }
    else if (this.localLikeList.includes(this.auth.uid)) {
      this.action = 'unlike'
    }
    else {
      this.action = 'like'
    }

    this.author$ = this.usersService.getById(this.post.author)

  }

  ToggleLikePost() {
    this.postsService.toggleLike(this.post.id, this.auth.uid)
      .subscribe((post) => {
        if (!!post.likeList) {
          this.localLikeList = post.likeList
        }
        else{
          this.localLikeList=[]
        }
            
        if (post.author === this.auth.uid) {
          this.action = 'none'
        }
        else if (this.localLikeList.includes(this.auth.uid)) {
          this.action = 'unlike'
        }
        else {
          this.action = 'like'
        }

      }
      )
  }
}
