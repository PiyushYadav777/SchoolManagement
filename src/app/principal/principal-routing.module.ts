import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { PrincipalComponent } from './principal.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddNewTeacherComponent } from './add-new-teacher/add-new-teacher.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { ClassComponent } from './class/class.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { PrincipalGuard } from '../principal.guard';

const routes: Routes = [
  {
    path:'', 
    component:PrincipalComponent,         canActivate: [PrincipalGuard],


    children:[
      {
        path:'', component: PrincipalDashboardComponent
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
        path:'new-teacher', component: AddNewTeacherComponent
      },
      {
        path:'teacher-list', component: ListTeacherComponent
      },
      {
        path:'classes', component: ClassComponent
      },
      {
        path:'subjects', component: SubjectsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
