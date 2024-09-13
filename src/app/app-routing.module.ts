import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './includes/main/main.component';
import { PrincipalGuard } from './principal.guard';
import { TeacherGuard } from './teacher.guard';
import { StudentGuard } from './student.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'principal',
        canActivate: [PrincipalGuard],
        loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule),
      },
      {
        path: 'teacher',
        canActivate: [TeacherGuard],
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
      },
      {
        path: 'student',
        canActivate: [StudentGuard],
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
