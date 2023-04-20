import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActService } from 'src/app/services/act-service.service';
import { Router } from '@angular/router';
import { Act } from 'src/app/models/act';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-act-edit',
  templateUrl: './act-edit.component.html',
  styleUrls: ['./act-edit.component.css']
})
export class ActEditComponent implements OnInit{

  form: FormGroup;
  actId?: string;
  actData: Act = { title: '', location: '', organization: '', need_time: '', help_time: '', need_description: '', help_description: '', need_requirements: '', help_requirements: '', need_tag: '', help_tag: '', assistance: '' };
  showMessage = false;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _actService: ActService) { 
    this.form = this._fb.group({
      "id": ['', Validators.required],
      "title": [''],
      "location": [''],
      "organization": [''],
      "need_time": [''],
      "help_time": [''],
      "need_description": [''],
      "help_description": [''],
      "need_requirements": [''],
      "help_requirements": [''],
      "need_tag": [''],
      "help_tag": [''],
      "assistance": [''],
    })
  }
  
  ngOnInit(): void {
    this.actId = this.route.snapshot.params['id'];
    console.log(this.actId);
    this.getActData();
  }

  getActData(): void {
    this._actService.getAct(this.actId).subscribe(
      (data: Act) => {
        console.log(data);
        this.actData = data;
        this.setActData();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  onSubmit() {
    const title = this.form.controls['title'].value;
    const location = this.form.controls['location'].value;
    const organization = this.form.controls['organization'].value;
    const need_time = this.form.controls['need_time'].value;
    const help_time = this.form.controls['help_time'].value;
    const need_description = this.form.controls['need_description'].value;
    const help_description = this.form.controls['help_description'].value;
    const need_requirements = this.form.controls['need_requirements'].value;
    const help_requirements = this.form.controls['help_requirements'].value;
    const need_tag = this.form.controls['need_tag'].value;
    const help_tag = this.form.controls['help_tag'].value;
    const assistance = this.form.controls['assistance'].value;

    this.actData = {title, location, organization, need_time, help_time, need_description, help_description, need_requirements, help_requirements, need_tag, help_tag, assistance};

    this._actService.editAct(this.actId, this.actData).subscribe(
      (data: Act) => {
        this.actData = data;
        this.setActData();
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

  setActData(): void {
    console.log('hey');
    this.form = this._fb.group({
      
      title: new FormControl(this.actData.title, Validators.required),
      location: new FormControl(this.actData.location, Validators.required),
      organization: new FormControl(this.actData.organization, Validators.required),
      need_time: new FormControl(this.actData.need_time, Validators.required),
      help_time: new FormControl(this.actData.help_time, Validators.required),
      need_description: new FormControl(this.actData.need_description, Validators.required),
      help_description: new FormControl(this.actData.help_description, Validators.required),
      need_requirements: new FormControl(this.actData.need_requirements, Validators.required),
      help_requirements: new FormControl(this.actData.help_requirements, Validators.required),
      need_tag: new FormControl(this.actData.need_tag, Validators.required),
      help_tag: new FormControl(this.actData.help_tag, Validators.required),
      assistance: new FormControl(this.actData.assistance, Validators.required)
    });
  }
}

