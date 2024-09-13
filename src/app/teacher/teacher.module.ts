import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AddNewStudentComponent } from '../teacher/add-new-student/add-new-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditStudentComponent } from '../teacher/edit-student/edit-student.component';
import { ListStudentComponent } from '../teacher/list-student/list-student.component';
import { StudentDetailsComponent } from '../teacher/student-details/student-details.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { StepperFormComponent } from './stepper-form/stepper-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ConfirmationDialogComponent } from '../teacher/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent,
    AddNewStudentComponent,
    EditStudentComponent,
    ListStudentComponent,
    StudentDetailsComponent,
    TeacherProfileComponent,
    StepperFormComponent,
    ConfirmationDialogComponent
    
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatCardModule,
    MatIconModule,
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
    MatToolbarModule,
    MatStepperModule
  ]
})
export class TeacherModule { }
