import { Component, OnInit, Input } from '@angular/core';
import { Commentary, User } from '../../interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/shared/services/auth.service';
import { UsersService } from 'src/app/user/shared/services/users.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
 
  @Input() comment :Commentary

  user$: Observable<User>


  constructor(private auth: AuthService,private usersService:UsersService) {
    
   }

  ngOnInit(): void {
    this.user$=this.usersService.getById(this.comment.authorId)
  }

}
