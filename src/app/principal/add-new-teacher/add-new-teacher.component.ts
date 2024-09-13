import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.scss']
})
export class AddNewTeacherComponent implements OnInit {

  teacherForm: FormGroup;
  // classOptions: string[] = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5', 'Class6', 'Class7', 'Class8', 'Class9', 'Class10'];
  // subjectOptions: string[] = ['Maths', 'English', 'Hindi', 'Science', 'Social Science', 'Physical Education'];
  classOptions: string[] = [];
  subjectOptions: string[] = [];
  isLoading = false;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  @Output() teacherAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    private principalService: PrincipalService,
    private snackBar: MatSnackBar) {
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
      contactNo: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.classOptions = this.principalService.getClasses();
    this.subjectOptions = this.principalService.getSubjects();
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const formValue = this.teacherForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          formValue.image = reader.result as string;
          this.principalService.addTeacher(formValue);
          this.teacherForm.reset();
          this.previewImage = null;
          this.selectedFile = null;
          this.teacherAdded.emit();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Handle the case where no image is selected
        formValue.image = "";
        this.principalService.addTeacher(formValue);
        this.teacherForm.reset();
        this.teacherAdded.emit();
      }
      this.snackBar.open('Teacher added successfully', 'Close', { duration: 5000 });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
}

