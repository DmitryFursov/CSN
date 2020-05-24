import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './user/shared/auth.interceptor';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserComponent } from './shared/components/smallUser/smallUser.component';
import { CommentComponent } from './shared/components/comment/comment.component';
//import { UserComponent } from './components/user/user.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi:true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    CommentComponent,
    UserComponent,
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    //UserModule,
    
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
