import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems(): void {
    const userType = this.authService.getUserType();

    switch (userType) {
      case 'Principal':
        this.menuItems = [
          { icon: 'dashboard', label: 'Dashboard', link: '/principal' },
          { icon: 'people', label: 'Students', link: '/principal/student-list' },
          { icon: 'school', label: 'Teachers', link: '/principal/teacher-list' },

          // {
          //   icon: 'people', label: 'Students', items: [
          //     { icon: 'add', label: 'Add New Student', link: '/principal/new-student' },
          //     { icon: 'list', label: 'Students List', link: '/principal/student-list' }
          //   ]
          // },

          // {
          //   icon: 'school', label: 'Teachers', items: [
          //     { icon: 'add', label: 'Add New Teacher', link: '/principal/new-teacher' },
          //     { icon: 'list', label: 'Teachers List', link: '/principal/teacher-list' }
          //   ]
          // },
          { icon: 'class', label: 'Classes', link: '/principal/classes' },
          { icon: 'subject', label: 'Subjects', link: '/principal/subjects' },
        ];
        break;


      case 'Teacher':
        this.menuItems = [
          { icon: 'dashboard', label: 'Dashboard', link: '/teacher' },
          { icon: 'people', label: 'Students', link: '/teacher/student-list' },
          { icon: 'people', label: 'Add Student', link: '/teacher/StepperForm' },
          // {
          //   icon: 'people', label: 'Students', items: [
          //     { icon: 'add', label: 'Add New Student', link: '/teacher/new-student' },
          //     { icon: 'list', label: 'Students List', link: '/teacher/student-list' }
          //   ]
          // },
        
          { icon: 'face', label: 'My Profile', link: '/teacher/profile' },
          // { icon: 'class', label: 'My Classes', link: '/teacher/classes' },
          // { icon: 'subject', label: 'My Subjects', link: '/teacher/subjects' },
        ];
        break;


      case 'Student':
        this.menuItems = [
          { icon: 'dashboard', label: 'Dashboard', link: '/student' },
          { icon: 'face', label: 'My Profile', link: '/student/profile' },
          // { icon: 'class', label: 'My Classes', link: '/student/classes' },
          { icon: 'subject', label: 'My Subjects', link: '/student/subjects' },
        ];
        break;

      default:
        this.menuItems = [];
        break;
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
