import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Log } from '../../models/log';
import { LogService } from '../../services/log-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog-service.service';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  form: FormGroup;
  userId: any;
  logId:any;
  logData: Log = { logged: true, start: '', duration: 0 };
  showMessage = false;
  user: any;
  constructor(private route: ActivatedRoute, private _userService: UserService, private _fb: FormBuilder, 
    private _logService: LogService, private _router: Router, private dialogService: DialogService) {
    this.form = this._fb.group({
      "logged": ['', Validators.required],
      "start": ['', Validators.required],
      "duration": ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.getLogData();
  }
  getLogData(): void {
    this._userService.getUser(this.userId).subscribe({
      next: data => {
        console.log(data);
        this.user = data;
      }, 
      error: error => {
      console.log(error);
      }
    });
  }
  postLog(){
    this._userService.postLog(this.userId,this.form.value).subscribe(data =>{
      this._router.navigate(['/users']);
    }, error => {
      console.log(error);
    })
  }
  confirmDelete() {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteLog(this.user.logs._id);
        this._router.navigate(['/users']);
      }
    });
  }

  deleteLog(log: Log): void {
    this._logService.deleteLog(log._id).subscribe(
      () => {

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
