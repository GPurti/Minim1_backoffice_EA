import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-edit-user', 
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  form: FormGroup;

  userId: any;
  userData: User = { name: '', email: '', role: '', surname: '', password: '' };
  showMessage = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private _fb: FormBuilder, 
    private _userService: UserService, private _router: Router, private dialogService: DialogService) {
    this.form = this._fb.group({
      "name": ['', Validators.required],
      "surname": ['', Validators.required],
      "email": ['', Validators.required],
      "role": ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getUser(this.userId).subscribe(
      (data: User) => {
        this.userData = data;
        this.form.patchValue({
          name: this.userData.name,
          surname: this.userData.surname,
          email: this.userData.email,
          role: this.userData.role
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  editUser():void{

    this.dialogService.openConfirmDialog("The changes where done correctly.", "OK", "Cancel")
    .afterClosed().subscribe(res => {
      if(res){
        this._userService.updateUser(this.userId,this.form.value).subscribe(data =>{
          this._router.navigate(['/users']);            
        }, error => {
          console.log(error);
        })
      }
    });
    
  }


}
