import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrincipalService } from 'src/app/Services/principal.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: string[] = [];
  newSubject: string = '';
  showForm: boolean = false; // Controls the visibility of the form
  displayedColumns: string[] = ['serial', 'subjectName', 'actions'];

  constructor(private principalService: PrincipalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjects = this.principalService.getSubjects();
  }

  addSubject(): void {
    if (this.newSubject.trim()) {
      this.principalService.addSubject(this.newSubject.trim());
      this.newSubject = '';
      this.loadSubjects();
    }
  }

  deleteSubject(subject: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.principalService.deleteSubject(subject);
        this.loadSubjects();
        this.snackBar.open('Subject deleted successfully', 'Close', { duration: 3000 });
      }
    });
  }
  
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  
}
