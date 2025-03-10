import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { EnrollmentService } from '../../../core/auth/enrollment.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent {
  currentStep = 1;
  loading = false;
  errorMessage: string | null = null;
  isChecked: boolean = false;

  constructor(public enrollmentService: EnrollmentService) {}

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    console.log('Valor actualizado:', this.isChecked);
  }

  nextStep(): void {

    this.currentStep = this.currentStep + 1; //TODO: Solo para dar estilos a la ventana siguiente

    this.loading = true;
    this.errorMessage = null;

    // Validación del paso actual usando el servicio
    this.enrollmentService.validateStep(this.currentStep).subscribe({
      next: () => {
        this.currentStep++;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error en la validación';
        this.loading = false;
      }
    });
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit(): void {
    this.loading = true;
    this.enrollmentService.finalizeEnrollment().subscribe({
      next: () => {
        alert('Registro completado con éxito');
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al finalizar el registro';
        this.loading = false;
      }
    });
  }

  get currentForm(): FormGroup {
    return this.enrollmentService.enrollmentForm.get('step' + this.currentStep) as FormGroup;
  }
}
