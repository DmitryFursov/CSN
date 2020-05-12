import { Component, OnInit, Input } from '@angular/core';
import { Post, Commentary } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../user/shared/services/posts.service';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../user/shared/services/auth.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  commentText: string = '';





  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private auth:AuthService
  ) { }

  ngOnInit() {
    

    this.post$ = this.route.params
    .pipe(switchMap((params: Params)=>{
      return this.postsService.getPostById(params['id'])
    }))
  }


  submit()
  {

    const comment: Commentary ={
      authorId: this.auth.uid,
      date:new Date(),
      text:this.commentText

      
    }
     
    this.commentText=''
    this.post$=this.post$.pipe(
      map(
        (post)=>{
          let localCommentList : Commentary[] =[]

          if(!!post.commentList){
            localCommentList=post.commentList
          } 
          console.log(localCommentList)
          localCommentList.push(comment)
          console.log(localCommentList)
          post.commentList=localCommentList
          return post
        }
      ),
      mergeMap(post => this.postsService.update(post))
    )
    this.post$.subscribe(post=>console.log(post))


  }


}
