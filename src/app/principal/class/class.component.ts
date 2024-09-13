import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/Services/principal.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  classes: string[] = [];
  newClass: string = '';
  showForm: boolean = false; // Controls the visibility of the form
  displayedColumns: string[] = ['serial', 'class', 'actions'];

  constructor(private principalService: PrincipalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classes = this.principalService.getClasses();
  }

  addClass(): void {
    if (this.newClass.trim()) {
      this.principalService.addClass(this.newClass.trim());
      this.newClass = '';
      this.loadClasses();
    }
  }

  deleteClass(className: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.principalService.deleteClass(className);
        this.loadClasses();
        this.snackBar.open('Class deleted successfully', 'Close', { duration: 3000 });
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
