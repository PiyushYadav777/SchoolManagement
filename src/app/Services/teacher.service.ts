import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private principalService: PrincipalService) { }

  getTeacherProfile(id: number): any {
    const teachers = this.principalService.getTeachers();
    return teachers.find(teacher => teacher.id === id);
  }
}
