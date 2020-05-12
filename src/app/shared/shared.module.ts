import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { UserComponent } from './components/smallUser/smallUser.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        RouterModule,
        
        FormsModule,
        ReactiveFormsModule,
    
        MaterialModule,
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports: [
        RouterModule,
        
        
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        QuillModule
    ],
    declarations: []
})
export class SharedModule {

}