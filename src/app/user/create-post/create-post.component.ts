import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post, User } from 'src/app/shared/interfaces';
import { PostsService } from '../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { Observable } from 'rxjs';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup

  currentUser$: Observable<User>

  constructor(
    private postsService: PostsService,
    private alert: AlertService,
    private usersService: UsersService,
    private auth: AuthService

  ) { }

  ngOnInit() {
    this.currentUser$ = this.usersService.getById(this.auth.uid)

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      //author: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      title: this.form.value.title,
      author: this.auth.uid,
      text: this.form.value.text,
      date: new Date()
    }

    console.log(post.text)

    this.postsService.create(post)
      .subscribe(
        () => {
          this.form.reset()
          this.alert.success('Post Created')
        },
        () => {
          this.alert.danger('Произошла ошибка. Пост не создан.')
        }
      )
  }
}
