import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Act } from 'src/app/models/act';
import { ActService } from 'src/app/services/act-service.service';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.css']
})
export class ActComponent implements OnInit{
  acts : Act[] = [];
  currentPage:number=1;
  totalPages:number=1;
  limit:number=2;
  constructor(private _actService: ActService, 
    private _router: Router, 
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getActs();
  }

  getActs(){
    this._actService.getActs(this.currentPage,this.limit).subscribe({
      next: data => {
        console.log(data);
        this.totalPages=data.totalPages;
        this.acts = data.acts;
      }, 
      error: error => {
      console.log(error);
      }
    });
  }

  editAct(act: Act): void {
    this._router.navigate(['/act-edit/' + act._id]);
  }

  confirmDelete(act: Act) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteAct(act);
        this.getActs();
      }
    });
  }

  deleteAct(act: Act): void {
    this._actService.deleteAct(act._id).subscribe(
      () => {
        this.getActs();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  addAct(){
    this._router.navigate(['/act']);
  }

  prevPage(){
    this.currentPage=this.currentPage-1;
    this.getActs();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.getActs();
  }

}
