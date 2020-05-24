import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  app: firebase.app.App;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;
  storageRef: firebase.storage.Reference;

constructor(
  private http: HttpClient,
) {
  this.app = firebase.initializeApp(environment.firebaseConfig);
  this.db = firebase.database();
  this.storage = firebase.storage();
  this.storageRef= firebase.storage().ref();
}

uploadPhoto(photo: any) {
     let images = this.storageRef.child('images');
     this.storageRef.putString(photo,'data_url');
     images.putString(photo,'data_url');
  // console.log(storageRef);
}

getPhoto(){
  //this.db.ref
}

}
