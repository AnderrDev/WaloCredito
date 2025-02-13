import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  enrollmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enrollmentForm = this.fb.group({
      step1: this.createStep1Form(),
      step2: this.createStep2Form(),
      step3: this.createStep3Form(),
      step4: this.createStep4Form()
    });
  }

  private createStep1Form(): FormGroup {
    return this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      termsAccepted: [true, Validators.requiredTrue],
      consultAccepted: [true, Validators.requiredTrue]
    });
  }

  private createStep2Form(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      surName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      expeditionDate: [new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0], Validators.required],
      sex: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private createStep3Form(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d{4}$/)]],
      confirmPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d{4}$/)]]
    });
  }

  private createStep4Form(): FormGroup {
    return this.fb.group({
      otp: ['', Validators.required]
    });
  }
}
