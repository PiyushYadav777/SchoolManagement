import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  studentCount: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.calculateStudentCount();
  }

  calculateStudentCount(): void {
    const assignedClass = this.data.teacher.assignedClass;
    const students = JSON.parse(localStorage.getItem('Project5-students') || '[]');
    // Count students assigned to the class
    this.studentCount = students.filter((student: any) => student.class === assignedClass).length;
  }
}
