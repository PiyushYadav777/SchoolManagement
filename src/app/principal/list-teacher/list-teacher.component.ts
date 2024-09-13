import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrincipalService } from 'src/app/Services/principal.service';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherDetailsComponent } from '../teacher-details/teacher-details.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {

  teachers: any[] = [];
  displayedColumns: string[] = [
    'serialNumber',
    'name',
    'email',
    // 'dob',
    // 'age',
    // 'gender',
    // 'contactNo',
    // 'address',
    // 'qualifications',
    'assignedClass',
    'assignedSubject',
    'image',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>(this.teachers);

  // Filter options
  genderFilter = '';
  classFilter = '';
  subjectFilter = '';
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  classOptions: string[] = [];
  subjectOptions: string[] = [];
  isFilterFormVisible = false;
  classes: string[] = [];
  isAddTeacherFormVisible: boolean = false;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private principalService: PrincipalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadClasses();
    this.loadSubjects();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  loadTeachers(): void {
    this.teachers = this.principalService.getTeachers();
    this.dataSource.data = this.teachers;
  }

  loadClasses(): void {
    this.classOptions = this.principalService.getClasses();
  }

  loadSubjects(): void {
    this.subjectOptions = this.principalService.getSubjects();
  }

  deleteTeacher(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.principalService.deleteTeacher(id);
        this.loadTeachers();
        this.snackBar.open('Teacher deleted successfully', 'Close', { duration: 3000 });
      }
    });
  }

  editTeacher(teacher: any): void {
    const dialogRef = this.dialog.open(EditTeacherComponent, {
      width: '500px',
      data: { teacher }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTeachers();
    });
  }

  toggleAddTeacherForm(): void {
    this.isAddTeacherFormVisible = !this.isAddTeacherFormVisible;
  }

  toggleFilterForm(): void {
    this.isFilterFormVisible = !this.isFilterFormVisible;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onKeyUp(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.applyFilter(input.value);
  }

  applyFilters(): void {
    this.dataSource.data = this.teachers.filter(teacher => {
      const matchesGender = this.genderFilter ? teacher.gender === this.genderFilter : true;
      const matchesClass = this.classFilter ? teacher.assignedClass === this.classFilter : true;
      const matchesSubject = this.subjectFilter ? teacher.assignedSubject === this.subjectFilter : true;

      return matchesGender && matchesClass && matchesSubject;
    });
    this.dataSource.paginator?.firstPage(); // Reset paginator to the first page
  }

  viewTeacher(teacher: any): void {
    const dialogRef = this.dialog.open(TeacherDetailsComponent, {
      width: '600px',
      data: { teacher }
    });
  }

  onTeacherAdded(): void{
    this.isAddTeacherFormVisible = false; // Hide the form
    this.loadTeachers(); // Optionally refresh the student list
  }
}

