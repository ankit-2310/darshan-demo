import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component'
import { HitsService } from './hits.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'darshan-demo';

  constructor(public dialog: MatDialog, public hitsService: HitsService) { }

  displayedColumns: string[] = ['title', 'url', 'author', 'created_at'];
  dataSource: any
  interval: any

  ngOnInit() {
    this.getResult()
    this.setNewInterval()
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  getResult() {
    this.hitsService.get().subscribe((data: {}) =>
      this.dataSource = new MatTableDataSource(data['hits'])
    );
  }

  setNewInterval() {
    this.interval = setInterval(() => { this.getResult(); }, 10000)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
