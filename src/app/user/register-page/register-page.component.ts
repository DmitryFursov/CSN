import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthData, User, Sex } from 'src/app/shared/interfaces';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';
import { onErrorResumeNext } from 'rxjs';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { AlertService } from '../shared/services/alert.service';
import { ImageService } from '../shared/services/image.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup
  photo: any;
  sexValues = Object.values(Sex);

  constructor(
    private usersService: UsersService,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private imageService: ImageService,
    private fireStore: AngularFirestore
  ) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'change'
      }),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      sex: new FormControl(),
      birthday: new FormControl(),
      photoUrl: new FormControl(null)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const user: UserAuthData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    const userProfile: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      photo: this.photo,
      regDate: new Date(),
      sex: this.form.value.sex,
      birthday: new Date(this.form.value.birthday)
    }

    this.auth.register(user)
      .pipe(
        mergeMap((response) => { return this.usersService.create(userProfile, response.localId) }),
      )
      .subscribe(
        () => {
          this.router.navigate(['/user', 'dashboard'])
          this.alert.success('User Created')
        },
        (error) => {
          this.alert.danger('User NOT Created: ' + error.error.error.message)
        }
      )
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      //reader.readAsBinaryString(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.photo = event.target.result;
      }
    }
  }
}