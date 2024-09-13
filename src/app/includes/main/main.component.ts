import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isAuthenticated: boolean = false;
 
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.isAuthenticated = this.authService.isAuthenticated();
    // console.log(this.isAuthenticated, "dsdsd")
  }


}
