import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { LoginPageComponent } from 'src/app/user/login-page/login-page.component';
import { UserAuthData, FbAuthResponse } from "src/app/shared/interfaces";
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

   public error$: Subject<string> = new Subject<string>()

   constructor(private http: HttpClient) { }

   get token(): string {
      if (!!localStorage.getItem('fb-token-exp')) {
         const expDate = new Date(localStorage.getItem('fb-token-exp'))
         if (new Date() > expDate) {
            this.logout()
            return null
         }
      }
      return localStorage.getItem('fb-token')
   }

   get uid(): string {
      const expDate = new Date(localStorage.getItem('fb-token-exp'))
      if (new Date() > expDate) {
         this.logout()
         return null
      }
      return localStorage.getItem('userId')
   }

   register(user: UserAuthData): Observable<any> {
      user.returnSecureToken = true
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, user)
         .pipe(
            tap(this.setToken),
            catchError(this.handlError.bind(this))
         )
   }


   login(user: UserAuthData): Observable<any> {
      user.returnSecureToken = true
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
         .pipe(
            tap(this.setToken),
            catchError(this.handlError.bind(this))
         )
   }
   logout() {
      this.setToken(null)
   }


   isAuthenticated(): boolean {
      return !!this.token
   }

   private handlError(error: HttpErrorResponse) {
      const { message } = error.error.error


      switch (message) {
         case 'INVALID_EMAIL':
            this.error$.next('invalid email')
            break
         case 'INVALID_PASSWORD':
            this.error$.next('invalid password')
            break
         case 'EMAIL_NOT_FOUND':
            this.error$.next('emailnotfound')
            break
      }

      return throwError(error)
   }

   private setToken(response: FbAuthResponse | null) {
      if (response) {
         const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
         localStorage.setItem('fb-token', response.idToken)
         localStorage.setItem('fb-token-exp', expDate.toString())
         localStorage.setItem('userId', response.localId)
      } else {
         localStorage.clear()
      }
   }
}