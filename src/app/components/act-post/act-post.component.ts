import { Component } from '@angular/core';
import { Act } from 'src/app/models/act';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActService } from 'src/app/services/act-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-act-post',
  templateUrl: './act-post.component.html',
  styleUrls: ['./act-post.component.css']
})
export class AddActComponent {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _actService: ActService, private _router: Router){
    this.form = this._fb.group({
      "title": ['', Validators.required],
      "location": ['', Validators.required],
      "organization": ['', Validators.required],
      "need_time": ['', Validators.required],
      "help_time": ['', Validators.required],
      "need_description": ['', Validators.required],
      "help_description": ['', Validators.required],
      "need_requirements": ['', Validators.required],
      "help_requirements": ['', Validators.required],
      "need_tag": ['', Validators.required],
      "help_tag": ['', Validators.required],
      "assistance": ['', Validators.required],
    })
  }

  addAct():void{
    console.log("here");
    this._actService.postAct(this.form.value).subscribe(data =>{
      this._router.navigate(['/acts']);
    }, error => {
      console.log(error);
    })
  }

}
