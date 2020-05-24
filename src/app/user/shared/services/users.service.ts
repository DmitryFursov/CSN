import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User, FbCreateResponse } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { map, tap, mapTo, pluck, finalize, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) { }

    create(user: User, uid: string): Observable<User> {
        return this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${uid}.json`, user)
            .pipe(map((userProfile: User) => {
                return {
                    ...userProfile,
                    uid
                    //date: new Date(user.date)
                }
            }))
    }

    getAll(): Observable<User[]> {
        return this.http.get(`${environment.firebaseConfig.databaseURL}/users.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        uid: key,
                        //date: new Date(response[key].date)
                    }))

            }))
    }

    getById(uid: string): Observable<User> {
        return this.http.get<User>(`${environment.firebaseConfig.databaseURL}/users/${uid}.json`)
            .pipe(map((userProfile: User) => {
                //                console.log(userProfile)
                return {
                    ...userProfile,
                    uid,
                    //date: new Date(post.date)
                }
            }))
    }

    update(userProfile: User): Observable<User> {
        return this.http.patch<User>(`${environment.firebaseConfig.databaseURL}/users/${userProfile.uid}.json`, userProfile)
    }

    toggleSubscription(uid: string): Observable<User> {
        return this.getById(this.auth.uid)
            .pipe(
                map(
                    (user) => {
                        let localSubscriptionList = []
                        if (!!user.subscriptions) {
                            localSubscriptionList = user.subscriptions
                        }

                        if (!localSubscriptionList.includes(uid)) {
                            localSubscriptionList.push(uid)
                        }
                        else {
                            const index = localSubscriptionList.indexOf(uid)
                            localSubscriptionList.splice(index, 1)
                        }
                        user.subscriptions = localSubscriptionList
                        return user
                    }
                ),
                mergeMap(user => this.update(user)
                )
            )
    }
}