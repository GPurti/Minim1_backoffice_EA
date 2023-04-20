import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentPage: number = 1;
  totalPages: number = 1; 
  limit: number = 2; 

  constructor( private _userService: UserService, private _router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users: User [] = [];

  getUsers(){
    this._userService.getUsers(this.currentPage, this.limit).subscribe(data => {
      this.users = data.users;
      this.totalPages = data.totalPages;
    }, error => {
      console.log(error);
    })
  }

  passUser(user: any) {
    this._router.navigate(['/edit-user/' + user._id]);
    console.log(user._id);
  }

  deleteAUser(id:any){
    this._userService.deleteUser(id).subscribe(data => {
      this.users = [];
      this.getUsers();    
    }, error => {
      console.log(error);
    })   
  }

  confirmDelete(id: any) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteAUser(id);
        this.getUsers();
      }
    });
  }

  addUser(){
    this._router.navigate(['/user']);
  }

  prevPage() {
    this.currentPage = this.currentPage - 1; 
    this.getUsers();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1; 
    this.getUsers();
  }

}
