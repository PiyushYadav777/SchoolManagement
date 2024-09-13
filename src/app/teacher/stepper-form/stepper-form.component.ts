import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent implements OnInit {
  
    studentFormStep1: FormGroup;
    studentFormStep2: FormGroup;
    studentFormStep3: FormGroup;
    classOptions: string[] = [];
    previewImage: string | ArrayBuffer | null = null;
    selectedFile: File | null = null;
    isLoading = false;
    hide = true;
    isLinear = true;
  
    constructor(private fb: FormBuilder,
                private principalService: PrincipalService,
                private snackBar: MatSnackBar) {
      this.studentFormStep1 = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        dob: [null, Validators.required]
      });
  
      this.studentFormStep2 = this.fb.group({
        age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
        gender: ['', Validators.required],
        class: ['', Validators.required],
        enrollmentNumber: ['', Validators.required]
      });
  
      this.studentFormStep3 = this.fb.group({
        contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required],
        fees: ['', [Validators.required, Validators.min(0)]],
        status: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.loadClassOptions();
    }
  
    loadClassOptions(): void {
      this.classOptions = this.principalService.getClasses();
    }
  
    onSubmit(): void {
      if (this.studentFormStep1.valid && this.studentFormStep2.valid && this.studentFormStep3.valid) {
        const formValue = { ...this.studentFormStep1.value, ...this.studentFormStep2.value, ...this.studentFormStep3.value };
  
        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            formValue.image = reader.result as string;
            this.principalService.addStudent(formValue);
            this.resetForm();
          };
          reader.readAsDataURL(this.selectedFile);
        } else {
          formValue.image = "";
          this.principalService.addStudent(formValue);
          this.resetForm();
          this.snackBar.open('Student added successfully', 'Close', { duration: 5000 });
        }
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
  
    resetForm(): void {
      this.studentFormStep1.reset();
      this.studentFormStep2.reset();
      this.studentFormStep3.reset();
      this.previewImage = null;
      this.selectedFile = null;
    }
  }
  