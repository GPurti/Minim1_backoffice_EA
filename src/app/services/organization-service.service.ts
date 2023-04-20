import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Organization } from '../models/organization';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
    url = 'http://localhost:4002/organizations';

    constructor(private http: HttpClient) { }

    getOrganizations(page: number, limit:number): Observable<{organizations: Organization[], totalPages:number}> {
        const url = `${this.url}/all?page=${page}&limit=${limit}`;
        return this.http.get<any>(url).pipe(
            map(res=>{
                return{
                    organizations: res.docs,
                    totalPages: res.totalPages
                }
            })
        );
    }

    getOrganization(id?: string): Observable<Organization> {
        return this.http.get<Organization>(this.url + '/' + id);
    } 

    editOrganization(id?: string, Organization?: Organization): Observable<Organization> {
        return this.http.put<Organization>(this.url + '/' + id, Organization);
    }

    deleteOrganization(id?: string): Observable<Organization> {
        return this.http.delete<Organization>(this.url + '/' + id);
    }

}