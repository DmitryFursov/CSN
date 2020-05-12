import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthData, User } from 'src/app/shared/interfaces';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';
import { onErrorResumeNext } from 'rxjs';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup

 


  constructor(private usersService: UsersService, private auth:AuthService,private router:Router,private alert:AlertService) {

   }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'change'
      }),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      firstName: new FormControl(null, Validators.required)
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const user: UserAuthData={
      email:this.form.value.email,
      password:this.form.value.password
    }


    const userProfile: User ={
      firstName:this.form.value.firstName
       
    }
     
    this.auth.register(user).subscribe((response)=>{
       console.log(response)
       this.usersService.create(userProfile, response.localId).subscribe(()=>{
         this.router.navigate(['/user', 'dashboard'])
       })
        this.form.reset()
        this.alert.success('User Created')
    })


    /* 
    }) */

  }

}


