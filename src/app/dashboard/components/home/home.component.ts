import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Student } from '../../interfaces/dashboard.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchInput = new Subject<string | any>();
  displayedColumns: string[] = [
    'name',
    'age',
    'class',
    'division',
    'profilephoto',
    'actions',
  ];
  dataSource = new MatTableDataSource<Student | any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterType = ''; // Default value for filter dropdown
  filterYear = '';
  allData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dashboardService.getStudents().subscribe((data: Student[] | any) => {
      this.dataSource.data = data;
      this.allData = data;
    });
  }

  saveEdit(element: any) {
    console.log(element);
    element.editing = false;
    this.dashboardService.updateStudent(element.id, element).subscribe(() => {
      element.editing = false;
      element.editable = false;
      this.openSnackBar('Student Data updated');
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog?.open(DialogComponent, { data: id });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dashboardService.deleteStudent(id).subscribe((data) => {
          this.openSnackBar('Student data deleted');
          this.ngOnInit();
        });
      }
    });
  }

  navigateToView(id: number) {
    this.router.navigateByUrl(`dashboard/home/view-student/${id}`);
  }

  startEdit(row: any): void {
    row.editing = true;
  }

  cancelEdit(row: any): void {
    row.editing = false;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  filterData(): void {
    let filteredData = this.allData;
    console.log(filteredData);

    if (this.filterType === 'primary') {
      filteredData = filteredData.filter((item) =>
        [1, 2, 3].includes(item.class)
      );
    } else if (this.filterType === 'secondary') {
      filteredData = filteredData.filter((item) =>
        [4, 5, 6, 7].includes(item.class)
      );
    }

    console.log(this.filterYear);

    if (this.filterYear) {
      filteredData = filteredData.filter(
        (item) => item.year === this.filterYear
      );
    }

    this.dataSource.data = filteredData;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
