import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { TokenStorage } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4002/users';

  constructor(private http: HttpClient,  private tokenStorage: TokenStorage) { }

  getUsers(page: number, limit: number): Observable<{ users: User[], totalPages: number }> {
    const url = `${this.url}/all?page=${page}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map(res => {
        return {
          users: res.docs,
          totalPages: res.totalPages
        };
      })
    );
  }

  deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken(),
      })
    });
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + id, user);
  }
}