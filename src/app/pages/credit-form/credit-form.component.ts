import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from '../../components/company-form/company-form.component';
import { PersonFormComponent } from '../../components/person-form/person-form.component';


@Component({
  selector: 'app-credit-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PersonFormComponent, CompanyFormComponent, FormsModule],
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent {
  personType: 'NATURAL' | 'JURIDICA' = 'NATURAL'; // Estado inicial

  switchType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.personType = target.value as 'NATURAL' | 'JURIDICA';
  }
}
