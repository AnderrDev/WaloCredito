import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[1-9]\d{5,9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      requestedAmount: [0, [Validators.required, Validators.min(300000), Validators.max(3000000)]],
      term: ['', Validators.required],
      creditType: ['', Validators.required],
      acceptedTerms: [false, Validators.requiredTrue],
      acceptedNewTerms: [false, Validators.requiredTrue],
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Solicitud enviada:', this.form.value);
      alert('Formulario enviado con éxito');
    }
  }
}
