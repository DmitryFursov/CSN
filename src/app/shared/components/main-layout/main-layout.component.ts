import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/shared/services/auth.service';
import { User } from '../../interfaces';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/user/shared/services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user$: Observable<User> | null;

  constructor(
    private router: Router,
    public auth: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.user$ = this.usersService.getById(this.auth.uid)
    }
    else { this.user$ = null }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/user', 'login']);
  }

}
