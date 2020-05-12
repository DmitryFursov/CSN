import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../../interfaces';
import { UsersService } from 'src/app/user/shared/services/users.service';
import { AuthService } from 'src/app/user/shared/services/auth.service';


@Component({
  selector: 'app-smallUser',
  templateUrl: './smallUser.component.html',
  styleUrls: ['./smallUser.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  @Output() subscriptionChangeEvent = new EventEmitter();

  action = ''
  isAuthenticated: boolean

  constructor(
    private usersService: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.RedrawSubscriptButton();
    }
  }


  ToggleSubscription() {
    this.usersService.toggleSubscription(this.user.uid).subscribe(
      () => { this.RedrawSubscriptButton(); },
      null,
      () => { this.subscriptionChangeEvent.emit('subscriptionChanged'); }
    )
  }

  RedrawSubscriptButton() {
    this.isAuthenticated = this.auth.isAuthenticated()
    this.usersService.getById(this.auth.uid)
      .subscribe(user => {
        let localSubscriptionList: string[] = []
        const currentUser = user;
        if (!!currentUser.subscriptions) {
          localSubscriptionList = currentUser.subscriptions
        }
        else {
          localSubscriptionList = []
        }

        // toggle action button
        const canSubscribe = (
          !(localSubscriptionList.includes(this.user.uid))
          && (this.auth.uid !== this.user.uid)
        )
        if ((this.auth.uid === this.user.uid)) {
          this.action = 'none';
        }
        else {
          this.action = canSubscribe === true ? 'add' : 'delete';
        }
      })
  }
}
