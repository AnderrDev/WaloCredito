import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-credit-validation',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './credit-validation.component.html',
  styleUrls: ['./credit-validation.component.scss'],
})
export class CreditValidationComponent {
  step = 1;  // Track current step
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      bankSelection: [''],
      salaryRange: [''],
      loanPurpose: [''],
      otherLoans: ['']
    });
  }

  nextStep() {
    if (this.step < 4) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.router.navigate(['/credit-form']);
    }
  }
}
