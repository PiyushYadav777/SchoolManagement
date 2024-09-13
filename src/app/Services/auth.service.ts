import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PrincipalService } from './principal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PRINCIPAL_USERNAME = 'admin';
  private readonly PRINCIPAL_PASSWORD = 'admin123';

  constructor(private router: Router,
    private principalService: PrincipalService
  ) { }

  authenticate(username: string, password: string, userType: string): Observable<boolean> {
    if (userType === 'Principal' && username === this.PRINCIPAL_USERNAME && password === this.PRINCIPAL_PASSWORD) {
      localStorage.setItem('authUser', JSON.stringify({ username, userType }));
      this.router.navigate(['/principal']);
      return of(true);
    }

    if (userType === 'Teacher') {
      const teachers = this.principalService.getTeachers();
      const validTeacher = teachers.find((teacher: any) => teacher.name === username && teacher.password === password);
      if (validTeacher) {
        localStorage.setItem('authUser', JSON.stringify({ username, userType }));
        this.router.navigate(['/teacher']); // Redirect to Teacher's dashboard
        return of(true);
      }
    }

    if (userType === 'Student') {
      const students = this.principalService.getStudents();
      const validStudent = students.find((student: any) => student.name === username && student.password === password);
      if (validStudent) {
        localStorage.setItem('authUser', JSON.stringify({ username, userType }));
        this.router.navigate(['/student']); // Redirect to Student's dashboard
        return of(true);
      }
    }

    return of(false);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('authUser')) {
      return true
    } else {
      return false
    }
  }

  isPrincipal(): boolean {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    return user.userType === 'Principal';
  }

  isTeacher(): boolean {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    return user.userType === 'Teacher';
  }

  isStudent(): boolean {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    return user.userType === 'Student';
  }

  logout(): void {
    localStorage.removeItem('authUser');
  }

  getUserType(): string | null {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    return user.userType || null;
  }
}
