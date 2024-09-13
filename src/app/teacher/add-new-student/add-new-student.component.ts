import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent {

  studentForm: FormGroup;
  // classOptions: string[] = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5', 'Class6', 'Class7', 'Class8', 'Class9', 'Class10'];
  classOptions: string[] = [];
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  hide = true;

  @Output() studentAdded = new EventEmitter<void>(); 
  
  constructor(private fb: FormBuilder,
    private principalService: PrincipalService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      // id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(3), Validators.max(20)]],
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

  ngOnInit():
   void {
    this.loadClassOptions();
   }

  loadClassOptions(): void {
    this.classOptions = this.principalService.getClasses();
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          formValue.image = reader.result as string;
          this.principalService.addStudent(formValue);
          this.studentForm.reset();
          this.previewImage = null;
          this.selectedFile = null;
          this.studentAdded.emit();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Handle the case where no image is selected
        formValue.image = "";
        this.principalService.addStudent(formValue);
        this.studentForm.reset();
        this.studentAdded.emit(); 
      }
      this.snackBar.open('Student added successfully', 'Close', {    //snackbar for submitting student
        duration: 5000,
      });

      // setTimeout(() => {                            // setTimeout for progress spinner 
      //   this.isLoading = false;
      // }, 1000);
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
}