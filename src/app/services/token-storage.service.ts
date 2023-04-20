import { Injectable, Inject } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

@Injectable({
    providedIn: 'root'
})
export class TokenStorage {

  constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) { }

  public saveToken(token: string): void {
    this.localStorage.setItem('token', token);
  }

  public getToken(): string {
    const token = this.localStorage.getItem('token');
    return token ? token : ''
  }

  public clearToken(): void {
    this.localStorage.removeItem('token');
  }
}