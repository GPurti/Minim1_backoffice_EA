import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';
import { Act } from '../models/act';
import { User } from '../models/user';
import { TokenStorage } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:4002/auth';

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', {...user, 'type': 'user'}) ;
  }

  addOrganization(organization: Organization): Observable<Organization> {
    console.log({...organization, 'type': 'organization'});
    return this.http.post<Organization>(this.url + '/register', {...organization, 'type': 'organization'}) ;
  }


  verifyToken(): Observable<string> {
    return this.http.get<string>(this.url + '/tokenVerification', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken(),
      })
    }) ;
  }
}
