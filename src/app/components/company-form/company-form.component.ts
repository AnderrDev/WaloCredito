import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.component.html',
})
export class CompanyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nit: ['', Validators.required],
      razonSocial: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      acceptedTerms: [false, Validators.requiredTrue],
      acceptedNewTerms: [false, Validators.requiredTrue],
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Empresa registrada:', this.form.value);
      alert('Formulario enviado con éxito');
    }
  }
}
