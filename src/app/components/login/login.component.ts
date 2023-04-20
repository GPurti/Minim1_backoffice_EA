import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { LoginService } from 'src/app/services/login-service.service';
import { TokenStorage } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string='';
  password: string='';
  auth: Auth={email: this.email, password:this.password};
  constructor(private _loginService: LoginService, private _router: Router, private tokenStorage: TokenStorage) {}
  ngOnInit(): void {
  
  }
  login() {
    this.auth={email:this.email, password:this.password};
    this._loginService.login(this.auth).subscribe(
      (data:any)=>{
        this.tokenStorage.saveToken(data.token);
        this._router.navigate(['/users']);
      },(error:any)=>{alert("Wrong credentials!!")});
  }
}
