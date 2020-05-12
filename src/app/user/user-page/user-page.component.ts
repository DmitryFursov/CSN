import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user$: Observable<User>


  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.user$ = this.route.params
    .pipe(switchMap((params: Params)=>{
      return this.usersService.getById(params['uid'])
    }))
  }
}
