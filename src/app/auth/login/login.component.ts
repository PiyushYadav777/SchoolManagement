import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  userTypes = ['Principal', 'Student', 'Teacher'];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, userType } = this.loginForm.value;
    this.authService.authenticate(username, password, userType)
      .subscribe(success => {
        if (success) {
          // this.errorMessage = '';
          // Redirect based on userType
          switch (userType) {
            case 'Principal':
              this.router.navigate(['principal']); 
              break;
            case 'Student':
              this.router.navigate(['student']); 
              break;
            case 'Teacher':
              this.router.navigate(['teacher']); 
              break;
            default:
              this.errorMessage = 'Invalid user type';
          }
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }

}
