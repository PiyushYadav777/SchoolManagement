import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-principal-dashboard',
  templateUrl: './principal-dashboard.component.html',
  styleUrls: ['./principal-dashboard.component.scss']
})
export class PrincipalDashboardComponent implements OnInit {

  studentCount: number = 0;
  teacherCount: number = 0;
  subjectCount: number = 0;
  classCount: number = 0;

  constructor(private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.studentCount = this.principalService.getStudentCount();
    this.teacherCount = this.principalService.getTeacherCount();
    this.subjectCount = this.principalService.getSubjectCount();
    this.classCount = this.principalService.getClassCount();
  }

}
