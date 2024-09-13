import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { TeacherGuard } from '../teacher.guard';
import { AddNewStudentComponent } from '../teacher/add-new-student/add-new-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { StepperFormComponent } from './stepper-form/stepper-form.component';

const routes: Routes = [

  {
    path:'', 
    component:TeacherComponent, 
    canActivate: [TeacherGuard],

    children:[
      {
        path:'', component: TeacherDashboardComponent
      },
      {
        path:'new-student', component: AddNewStudentComponent
      },
      {
        path: 'edit-student/:id', 
        component: AddNewStudentComponent
      },
      {
        path:'student-list', component: ListStudentComponent
      },
      {
        path:'profile', component: TeacherProfileComponent
      },
      {
        path:'StepperForm', component: StepperFormComponent
      }
    ]
  }
]
   

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
