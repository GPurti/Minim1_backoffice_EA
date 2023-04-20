import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router){
    this.form = this._fb.group({
      "name": ['', Validators.required],
      //"website": ['', Validators.required],
      "email": ['', Validators.required],
      "password": ['', Validators.required],
    })
  }

  addOrganization():void{
    console.log("here");
    this._authService.addOrganization(this.form.value).subscribe(data =>{
      this._router.navigate(['/organizations']);
    }, error => {
      console.log(error);
    })
  }

}
