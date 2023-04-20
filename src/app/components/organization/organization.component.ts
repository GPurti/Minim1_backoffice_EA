import { Component, getNgModuleById, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog-service.service';
import { OrganizationService } from 'src/app/services/organization-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations : Organization[] = [];
  currentPage:number=1;
  totalPages:number=1;
  limit:number=2;

  constructor(private _organizationService: OrganizationService, 
    private _router: Router, 
    private dialogService: DialogService,
    private _userService: UserService) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this._organizationService.getOrganizations(this.currentPage,this.limit).subscribe({
      next: data => {
        this.organizations = data.organizations;
        this.totalPages=data.totalPages;
        this.setAdvertisorsNames();
      }, 
      error: error => {
      console.log(error);
      }
    })
  }

  editOrganization(organization: Organization): void {
    this._router.navigate(['/edit-organization/' + organization._id]);
  }

  confirmDelete(organization: Organization) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteOrganization(organization);
        this.getOrganizations();
      }
    });
  }

  deleteOrganization(organization: Organization): void {
    this._organizationService.deleteOrganization(organization._id).subscribe(
      () => {
        this.getOrganizations();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addOrganization(){
    this._router.navigate(['/organization']);
  }

  prevPage(){
    this.currentPage=this.currentPage-1;
    this.getOrganizations();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.getOrganizations();
  }

  getNameAdv(idAdv: string): Observable<string> {
    return this._userService.getUser(idAdv).pipe(
      map(data => data.name)
    );
  }
  
  setAdvertisorsNames() {
    this.organizations.forEach((organization, a) => {
      organization.advertisers?.forEach((advertiser, i) => {
        this.getNameAdv(advertiser).subscribe(name => {
          this.organizations[a].advertisers![i] = name;
        });
      });
    });
  }
}
