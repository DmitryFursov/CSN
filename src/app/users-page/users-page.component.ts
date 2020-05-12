import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../user/shared/services/users.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users$: Observable<User[]> 

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.getAll()
  }

}
