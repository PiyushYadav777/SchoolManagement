import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

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
