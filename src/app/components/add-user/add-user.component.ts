import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router){
    this.form = this._fb.group({
      "name": ['', Validators.required],
      "surname": ['', Validators.required],
      "email": ['', Validators.required],
      "password": ['', Validators.required],
      "role": ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.form.patchValue({
      role: 'help',
    });
  }

  addUser():void{
    this._authService.addUser(this.form.value).subscribe(data =>{
      this._router.navigate(['/users']);
    }, error => {
      console.log(error);
    })
  }

}
