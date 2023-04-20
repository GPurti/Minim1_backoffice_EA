import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Log } from '../models/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {
    url = 'http://localhost:4002/logs';

    constructor(private http: HttpClient) { }

    getLogs(){
        return this.http.get<Log[]>(this.url + "/all");
    }
    getLog(id?: string): Observable<Log> {
        return this.http.get<Log>(this.url + '/' + id);
    } 
    postLog(log: Log): Observable<Log>{
        return this.http.post<Log>(this.url, log);
    }
    editLog(id?: string, Log?: Log): Observable<Log> {
        return this.http.put<Log>(this.url + '/' + id, Log);
    }
    deleteLog(id?: string): Observable<Log> {
        return this.http.delete<Log>(this.url + '/' + id);
    }

}