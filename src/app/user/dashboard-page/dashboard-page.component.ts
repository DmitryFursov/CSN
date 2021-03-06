import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {


  pSub: Subscription
  dSub: Subscription
  posts: Post[] = []
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
    ) { }


  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
   this.dSub=  this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger('Post Deleted')
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if(this.dSub)
    {
      this.dSub.unsubscribe()
    }
  }
}
