import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AddNewTeacherComponent } from './add-new-teacher/add-new-teacher.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassComponent } from './class/class.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    AddNewStudentComponent,
    ListStudentComponent,
    AddNewTeacherComponent,
    ListTeacherComponent,
    PrincipalDashboardComponent,
    SubjectsComponent,
    ClassComponent,
    EditStudentComponent,
    EditTeacherComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule

  ]
})
export class PrincipalModule { }
