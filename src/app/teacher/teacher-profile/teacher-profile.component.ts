import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {
  teacher: any;
  studentCount: number = 0;
  isEditing: boolean = false;

  constructor(private authService: AuthService, private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.loadTeacherProfile();
    this.calculateStudentCount();
  }

  private loadTeacherProfile(): void {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (user.userType === 'Teacher') {
      const teachers = this.principalService.getTeachers();
      this.teacher = teachers.find(t => t.name === user.username);
    }
  }

  calculateStudentCount(): void {
    const assignedClass = this.teacher.assignedClass;
    const students = JSON.parse(localStorage.getItem('Project5-students') || '[]');
    this.studentCount = students.filter((student: any) => student.class === assignedClass).length;
  }

  editProfile(): void {
    this.isEditing = true;
  }
  
  saveProfile(): void {
    if (this.teacher) {
      this.principalService.updateTeacher(this.teacher.id, this.teacher);
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.loadTeacherProfile();  // Reload profile to discard changes
    this.isEditing = false;
  }

}
