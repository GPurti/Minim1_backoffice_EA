import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/common/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(msg: string, right:string, left:string) {
        return this.dialog.open(ConfirmDialogComponent, {
            width: '390px',
            panelClass: 'dialog-container',
            disableClose: true,
            data: {
                message: msg,
                rightBtn: right,
                leftBtn: left,
            }
        });
    }
}