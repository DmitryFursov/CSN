import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Post, FbCreateResponse } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(
        private http: HttpClient,
        private usersService: UsersService) {
    }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.firebaseConfig.databaseURL}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                }
            }))
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.firebaseConfig.databaseURL}/posts.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))
            }))
    }

    // возвращает посты пользователей, на которых оформлена подписка
    // и посты пользвателя, который залогинен
    public getPostsBySubscription(uid: string): Observable<Post[]> {
        let localSubscriptionList = []
        return this.usersService.getById(uid).pipe(
            map(user => {
                if (!!user.subscriptions) {
                    localSubscriptionList = user.subscriptions;
                }
                return user.subscriptions;
            }),
            mergeMap(() => {
                const calls = []; // массив запросов к базе
                localSubscriptionList.forEach(subuid => calls.push(this.getPostsByUserId(subuid))); // сообщения от подписок
                calls.push(this.getPostsByUserId(uid)); // свои сообщения
                return forkJoin(calls) // вызов запросов 
                    .pipe(map(postsArray => {
                        const unsortedPostArray = [].concat.apply([], postsArray)
                        const sortedPostArray = unsortedPostArray.sort((p1, p2) => {
                            return new Date(p1.date) > new Date(p2.date) ? -1 : 1
                        })
                        return sortedPostArray
                    }));
            })
        )
    }

    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.firebaseConfig.databaseURL}/posts/${id}.json`)
            .pipe(map((post: Post) => {
                return {
                    ...post, id,
                    date: new Date(post.date)
                }
            }))
    }

    getPostsByUserId(uid: string): Observable<Post[]> {
        return this.http.get<Post>(`${environment.firebaseConfig.databaseURL}/posts.json`, { params: { orderBy: `"author"`, equalTo: `"${uid}"` } })
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                    }))

            }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.firebaseConfig.databaseURL}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post> {
        console.log(post)
        return this.http.patch<Post>(`${environment.firebaseConfig.databaseURL}/posts/${post.id}.json`, post)
    }

    toggleLike(id: string, uid: string) {
        return this.getPostById(id)
            .pipe(
                map(
                    (post) => {
                        let localLikeList: string[] = []
                        if (!!post.likeList) {
                            localLikeList = post.likeList
                        }

                        if (!localLikeList.includes(uid)) {
                            localLikeList.push(uid)
                        }
                        else {
                            const index = localLikeList.indexOf(uid)
                            localLikeList.splice(index, 1)
                        }
                        post.likeList = localLikeList
                        return post
                    }
                ),
                mergeMap((post)=>this.update(post))
            )
    }

}