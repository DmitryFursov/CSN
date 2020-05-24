import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertService } from './shared/services/alert.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePostComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
    RegisterPageComponent,
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [//поменять адм лайаут
          { path: '', redirectTo: '/user/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'createpost', component: CreatePostComponent },
          { path: 'post/:id/edit', component: EditPageComponent },
          { path: 'register', component: RegisterPageComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService]
})
export class UserModule {

}
