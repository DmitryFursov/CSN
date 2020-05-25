import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Post, Commentary, User } from '../shared/interfaces';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../user/shared/services/posts.service';
import { switchMap, map, mergeMap, tap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../user/shared/services/auth.service';
import { ViewportScroller } from '@angular/common';
import { UsersService } from '../user/shared/services/users.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy, AfterViewInit {

  author$: Observable<User>
  post$: Observable<Post>
  commentList$: Observable<Commentary[]> | null
  private destroy$$ = new Subject();
  private fragment$$ = new BehaviorSubject<string | null>(null);
  private fragment$ = this.fragment$$.asObservable();

  commentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private auth: AuthService,
    private vps: ViewportScroller,
    private usersService: UsersService
  ) {
    this.route.fragment.pipe(takeUntil(this.destroy$$)).subscribe(fragment => {
      this.fragment$$.next(fragment);
    });

  }

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'])
      }))
    this.commentList$ = this.post$.pipe(map(post => { return post.commentList }))
    this.author$ = this.post$
      .pipe(
        map(post => { return post.author }),
        mergeMap(authorId => { return this.usersService.getById(authorId) })
      );
  }

  submit() {
    const comment: Commentary = {
      authorId: this.auth.uid,
      date: new Date(),
      text: this.commentText
    }

    this.commentText = ''
    this.commentList$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id'])
        }),
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

  public ngAfterViewInit(): void {
    this.fragment$.pipe(takeUntil(this.destroy$$)).subscribe(fragment => {
      if (!!fragment) {
        //        document.querySelector('#' + fragment).scrollIntoView();
        this.vps.scrollToAnchor(fragment)
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}


