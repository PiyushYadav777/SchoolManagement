
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      const user = JSON.parse(localStorage.getItem('authUser') || '{}');
      if (user.userType === 'Principal' || user.userType === 'Student' || user.userType === 'Teacher') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
