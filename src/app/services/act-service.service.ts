import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Act } from '../models/act';


@Injectable({
  providedIn: 'root'
})
export class ActService {
    url = 'http://localhost:4002/acts';

    constructor(private http: HttpClient) { }

    getActs(page: number, limit:number): Observable<{acts: Act[], totalPages:number}>{
        const url = `${this.url}/all?page=${page}&limit=${limit}`;
        return this.http.get<any>(url).pipe(
            map(res=>{
                return{
                    acts:res.docs,
                    totalPages: res.totalPages
                }}));
    }
    getAct(id?: string): Observable<Act> {
        console.log("aquiiii")
        return this.http.get<Act>(this.url + '/' + id);
    } 
    postAct(act: Act): Observable<Act>{
        return this.http.post<Act>(this.url, act);
    }
    editAct(id?: string, Act?: Act): Observable<Act> {
        return this.http.put<Act>(this.url + '/' + id, Act);
    }
    deleteAct(id?: string): Observable<Act> {
        return this.http.delete<Act>(this.url + '/' + id);
    }

}