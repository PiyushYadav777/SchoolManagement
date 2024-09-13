import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private studentsKey = 'Project5-students';
  // private serialNumberKey = 'Project5-serial-number';
  private teachersKey = 'Project5-teachers';
  private subjectsKey = 'Project5-subjects';
  private classesKey = 'Project5-classes';

  constructor() {
    // Initialize the serial number in local storage if it doesn't exist
    // if (!localStorage.getItem(this.serialNumberKey)) {
    //   localStorage.setItem(this.serialNumberKey, '0');
    // }
  }

  addStudent(student: any) {
    let students = this.getStudents();
    // student.id = this.getNextId(); // Assign the next available ID

    students.push(student);
    localStorage.setItem(this.studentsKey, JSON.stringify(students));
  }

  // private getNextId(): number {
  //   let currentSerialNumber = parseInt(localStorage.getItem(this.serialNumberKey)!, 10);
  //   localStorage.setItem(this.serialNumberKey, (currentSerialNumber + 1).toString());
  //   return currentSerialNumber + 1;
  // }

  getStudents(): any[] {
    const students = localStorage.getItem(this.studentsKey);
    return students ? JSON.parse(students) : [];
  }

  addTeacher(teacher: any) {
    let teachers = this.getTeachers();
    // teacher.id = this.getNextId(); // Assign the next available ID

    teachers.push(teacher);
    localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
  }

  getTeachers():  any[] {
    const teachers = localStorage.getItem(this.teachersKey);
    return teachers ? JSON.parse(teachers) : [];
  }

  getStudentCount(): number {
    const students = this.getStudents();
    return students.length;
  }

  getTeacherCount(): number {
    const teachers = this.getTeachers();
    return teachers.length;
  }

  getSubjectCount(): number {
    const subjects = this.getSubjects();
    return subjects.length;
  }

  getClassCount(): number {
    const classes = this.getClasses();
    return classes.length;
  }
  
  getSubjects(): string[] {
    const subjects = localStorage.getItem(this.subjectsKey);
    return subjects ? JSON.parse(subjects) : [];
  }

  addSubject(subject: string): void {
    let subjects = this.getSubjects();
    if (!subjects.includes(subject)) {
      subjects.push(subject);
      localStorage.setItem(this.subjectsKey, JSON.stringify(subjects));
    }
  }

  deleteSubject(subject: string): void {
    let subjects = this.getSubjects();
    subjects = subjects.filter(sub => sub !== subject);
    localStorage.setItem(this.subjectsKey, JSON.stringify(subjects));
  }

  // Classes
  getClasses(): string[] {
    const classes = localStorage.getItem(this.classesKey);
    return classes ? JSON.parse(classes) : [];
  }

  addClass(className: string): void {
    let classes = this.getClasses();
    if (!classes.includes(className)) {
      classes.push(className);
      localStorage.setItem(this.classesKey, JSON.stringify(classes));
    }
  }

  deleteClass(className: string): void {
    let classes = this.getClasses();
    classes = classes.filter(cls => cls !== className);
    localStorage.setItem(this.classesKey, JSON.stringify(classes));
  }

  deleteStudent(id: number): void {
    let students = this.getStudents();
    students = students.filter(student => student.id !== id);
    localStorage.setItem(this.studentsKey, JSON.stringify(students));
  }

  deleteTeacher(id: number): void {
    let teachers = this.getTeachers();
    teachers = teachers.filter(teacher => teacher.id !== id);
    localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
  }

  updateStudent(id: number, updatedStudent: any): void {
    let students = this.getStudents();
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updatedStudent };
      localStorage.setItem(this.studentsKey, JSON.stringify(students));
    }
  }

  updateTeacher(id: number, updatedTeacher: any): void {
    let teachers = this.getTeachers();
    const index = teachers.findIndex(teacher => teacher.id === id);
    if (index !== -1) {
      teachers[index] = { ...teachers[index], ...updatedTeacher };
      localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
    }
  }
}

