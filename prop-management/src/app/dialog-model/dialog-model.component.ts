import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-model',
  templateUrl: './dialog-model.component.html',
  styleUrls: ['./dialog-model.component.css']
})
export class DialogModelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogModelComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private dialog: MatDialog) { }
  nameFormControl=new FormControl();
  descFormControl=new FormControl();
  sizeFormControl=new FormControl();
  ngOnInit(): void {
    this.nameFormControl.setValidators([Validators.required]);
    this.descFormControl.setValidators([Validators.required]);
    this.sizeFormControl.setValidators([Validators.required]);
  }
  close(bool:any){
    if(bool){
      this.dialogRef.close({name:this.nameFormControl.value,desc:this.descFormControl.value,size:this.sizeFormControl.value});
    }
    else{
      this.dialogRef.close(bool);
    }
  }

}
