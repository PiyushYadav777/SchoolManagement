import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  teacherForm: FormGroup;
  classOptions: string[] = [];
  subjectOptions: string[] = [];
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private principalService: PrincipalService,
    public dialogRef: MatDialogRef<EditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: [null, Validators.required],
      age: ['', [Validators.required, Validators.min(20), Validators.max(60)]],
      gender: ['', Validators.required],
      qualifications: ['', Validators.required],
      assignedClass: [[], Validators.required],
      assignedSubject: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadClassOptions();
    this.loadSubjectOptions();
    this.populateForm();
  }

  loadSubjectOptions() {
    this.subjectOptions= this.principalService.getSubjects();
  }

  loadClassOptions(): void {
    this.classOptions = this.principalService.getClasses();
  }

  populateForm(): void {
    this.teacherForm.patchValue(this.data.teacher);
    // Handle image preview
    if (this.data.teacher.image) {
      this.previewImage = this.data.teacher.image;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      const updatedTeacher = this.teacherForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedTeacher.image = reader.result as string;
          this.principalService.updateTeacher(this.data.teacher.id, updatedTeacher);
          this.dialogRef.close();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Handle the case where no new image is selected
        this.principalService.updateTeacher(this.data.teacher.id, updatedTeacher);
        this.dialogRef.close();
      }
    } else {
      // Optionally handle form validation errors
    }
  }
}
