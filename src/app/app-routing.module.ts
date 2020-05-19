import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
//import { UserComponent } from './shared/components/user/user.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UsersPageComponent } from './users-page/users-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'users', component:UsersPageComponent},
      {path: 'post/:id', component: PostPageComponent},
      {path: 'userpage/:uid', component: UserPageComponent},
      {path: '**',redirectTo:'/'}
    ]
  },
  {
    path: 'user', loadChildren: './user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
