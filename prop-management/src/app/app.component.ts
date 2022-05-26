import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModelComponent } from './dialog-model/dialog-model.component';
import {config} from '../config';
class Property {
  name!: string;
  desc!: string;
  size!: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Property]
})
export class AppComponent {
  constructor(public dialog: MatDialog) { }
  title = 'prop-management';
  properties: Property[] = [];
  MY_API_TOKEN=config.MY_API_TOKEN;
  ngOnInit() {
    fetch('https://api.airtable.com/v0/appPMyhVTxeM9HVw3/Property%20Details?api_key='+this.MY_API_TOKEN)
      .then(response => response.json())
      .then(data => {
        let records = data.records;
        if (records.length) {
          for (let i = 0; i < records.length; i++) {
            let temp: Property = { name: records[i].fields.name, desc: records[i].fields.desc, size: records[i].fields.size };
            this.properties.push(temp);
          }
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModelComponent, {
      width: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let sampleBody={records:[{fields:result}]}
        fetch('https://api.airtable.com/v0/appPMyhVTxeM9HVw3/Property%20Details', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer '+this.MY_API_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sampleBody),
        })
          .then(response => response.json())
          .then(data => {
            this.properties.push(result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }
}

