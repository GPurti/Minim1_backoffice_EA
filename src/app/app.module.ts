import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { FormsModule } from '@angular/forms';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ActComponent } from './components/act/act.component';
import { AddActComponent } from './components/act-post/act-post.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ActEditComponent } from './components/act-edit/act-edit.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserComponent,
    LoginComponent,
    EditUserComponent,
    AddUserComponent,
    ActComponent,
    AddActComponent,
    ActEditComponent,
    OrganizationComponent,
    EditOrganizationComponent,
    ConfirmDialogComponent,
    AddOrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    MatDialogModule,
    LocalStorageModule.forRoot({
      storageType: 'localStorage'
    })
  ],
  providers: [{ provide: 'LOCAL_STORAGE', useFactory: () => localStorage }],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class AppModule { }
