import { Component, OnInit, ViewChild } from '@angular/core';
import { PrincipalService } from 'src/app/Services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  students: any[] = [];
  displayedColumns: string[] = [
    'serialNumber',
    'name',
    'email',
    // 'dob',
    // 'age',
    // 'gender',
    'class',
    'enrollmentNumber',
    // 'address',
    // 'contactNo',
    // 'fees',
    // 'status',
    'image',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>(this.students);

  genderOptions: string[] = ['Boy', 'Girl', 'Other'];
  classOptions: string[] = [];
  isFilterFormVisible = false;
  genderFilter = '';
  classFilter = '';
  classes: string[] = [];

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isAddStudentFormVisible: boolean = false;

  constructor(private principalService: PrincipalService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadStudents(): void {
    this.students = this.principalService.getStudents();
    this.dataSource.data = this.students;
  }

  loadClasses(): void {
    this.classOptions = this.principalService.getClasses();
  }
  
  deleteStudent(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.principalService.deleteStudent(id);
        this.loadStudents();
        this.snackBar.open('Student deleted successfully', 'Close', { duration: 3000 });
      }
    });
  }
  
  editStudent(student: any): void {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '500px',
      data: { student }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadStudents();
    });
  }

  toggleFilterForm(): void {
    this.isFilterFormVisible = !this.isFilterFormVisible;
  }

  toggleAddStudentForm(): void {
    this.isAddStudentFormVisible = !this.isAddStudentFormVisible;
  }
  
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onKeyUp(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.applyFilter(input.value);
  }

  applyFilters(): void {
    this.dataSource.data = this.students.filter(student => {
      const matchesGender = this.genderFilter ? student.gender === this.genderFilter : true;
      const matchesClass = this.classFilter ? student.class === this.classFilter : true;
      return matchesGender && matchesClass ;
    });
    this.dataSource.paginator?.firstPage(); // Reset paginator to the first page
  }

  viewStudent(student: any): void {
    const dialogRef = this.dialog.open(StudentDetailsComponent, {
      width: '600px',
      data: { student }
    });
  }

  onStudentAdded(): void {
    this.isAddStudentFormVisible = false; // Hide the form
    this.loadStudents(); // Optionally refresh the student list
  }
}
