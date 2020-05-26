import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { UserComponent } from './components/smallUser/smallUser.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from "@angular/fire/storage";


@NgModule({
    imports: [
//        AngularFireStorage,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
//        BrowserModule,
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports: [
//        AngularFireStorage,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
//        BrowserModule,
        HttpClientModule,
        QuillModule
    ],
    declarations: []
})
export class SharedModule {

}