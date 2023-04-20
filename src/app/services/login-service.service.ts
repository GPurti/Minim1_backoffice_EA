import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Auth} from '../models/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:4002/auth/login'; 

  constructor(private http: HttpClient) { }

  login(auth: Auth): Observable<any>{
    return(this.http.post<Auth>(this.apiUrl, auth));
  }
}