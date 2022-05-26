import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogModelComponent } from './dialog-model/dialog-model.component';
class Property{
  name!: string;
  desc!:string;
  size!:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Property]
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}
  title = 'prop-management';
  properties: Property[] = [];

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModelComponent, {
      width: '250px',
      disableClose:true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.properties.push(result);
      }
    });
  }
}

