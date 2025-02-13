import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../core/auth/enrollment.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent {
  currentStep = 1; // Indica en qué paso estamos

  constructor(public enrollmentService: EnrollmentService) { }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit(): void {
    if (this.enrollmentService.enrollmentForm.valid) {
      console.log('Formulario enviado', this.enrollmentService.enrollmentForm.value);
    }
  }
}
