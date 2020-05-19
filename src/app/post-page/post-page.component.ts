import { Component, OnInit, Input } from '@angular/core';
import { Post, Commentary } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../user/shared/services/posts.service';
import { switchMap, map, mergeMap, take, first, count, distinct, concatMap, tap } from 'rxjs/operators';
import { AuthService } from '../user/shared/services/auth.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>
  commentList$: Observable<Commentary[]> | null

  commentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'])
      }))
    this.commentList$ = this.post$.pipe(map(post => { return post.commentList }))
  }

  submit() {
    const comment: Commentary = {
      authorId: this.auth.uid,
      date: new Date(),
      text: this.commentText
    }

    this.commentText = ''
    this.commentList$ = this.post$.pipe(
      tap((post) => {
        let localCommentList: Commentary[] = []
        if (!!post.commentList) {
          localCommentList = post.commentList
        }
        localCommentList.unshift(comment)
        post.commentList = localCommentList
        return post
      }),
      mergeMap((post) => { return this.postsService.update(post) }),
      map((post) => { return post.commentList }
      )
    )
  }
}