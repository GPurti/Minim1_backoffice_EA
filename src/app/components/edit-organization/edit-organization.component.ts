import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization-service.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  form: FormGroup;
  organizationId?: string;
  organizationData: Organization = { name: '', email: '', website: '', password: '' };
  showMessage = false;
  
  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _organizationService: OrganizationService) {

    this.form = this._fb.group({
      "id": ['', Validators.required],
      "name": [''],
      "email": [''],
      "website": [''],
    })
  }

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['id'];
    this.getOrganizationData();
  }

  getOrganizationData(): void {
    this._organizationService.getOrganization(this.organizationId).subscribe(
      (data: Organization) => {
        this.organizationData = data;
        this.setOrganizationData();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const name = this.form.controls['name'].value;
    const website = this.form.controls['website'].value;
    const email = this.form.controls['email'].value;
    const password = this.organizationData.password;
    this.organizationData = {name, email, website, password};

    this._organizationService.editOrganization(this.organizationId, this.organizationData).subscribe(
      (data: Organization) => {
        this.organizationData = data;
        this.setOrganizationData();
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  setOrganizationData(): void {
    this.form = this._fb.group({
      name: new FormControl(this.organizationData.name, Validators.required),
      email: new FormControl(this.organizationData.email, Validators.required),
      website: new FormControl(this.organizationData.website, Validators.required),
    });
  }
}

