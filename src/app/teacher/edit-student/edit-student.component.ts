import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentForm: FormGroup;
  classOptions: string[] = [];
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private principalService: PrincipalService,
    public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      class: ['', Validators.required],
      enrollmentNumber: ['', Validators.required],
      address: ['', Validators.required],
      image: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNo: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      fees: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClassOptions();
    this.populateForm();
  }

  loadClassOptions(): void {
    this.classOptions = this.principalService.getClasses();
  }

  populateForm(): void {
    this.studentForm.patchValue(this.data.student);
     // Handle image preview
     if (this.data.student.image) {
      this.previewImage = this.data.student.image;
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

  // onSubmit(): void {
  //   if (this.studentForm.valid) {
  //     const updatedStudent = this.studentForm.value;
  //     this.principalService.updateStudent(this.data.student.id, updatedStudent);
  //     this.dialogRef.close();
  //   } else {
  //     // Optionally handle form validation errors
  //   }
  // }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudent = this.studentForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedStudent.image = reader.result as string;
          this.principalService.updateStudent(this.data.student.id, updatedStudent);
          this.dialogRef.close();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Handle the case where no new image is selected
        this.principalService.updateStudent(this.data.student.id, updatedStudent);
        this.dialogRef.close();
      }
    } else {
      // Optionally handle form validation errors
    }
  }
}
