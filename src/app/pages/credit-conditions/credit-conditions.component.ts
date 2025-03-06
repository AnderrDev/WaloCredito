import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-credit-conditions',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatCardModule, MatListModule,
    MatIconModule],
  templateUrl: './credit-conditions.component.html',
  styleUrls: ['./credit-conditions.component.scss']
})
export class CreditConditionsComponent {
  conditions = [
    { title: 'Información del seguro', content: 'La suscripción mensual te ofrece flexibilidad para pagar mes a mes...' },
    { title: 'Tasas de interés', content: 'Las tasas de interés son variables y dependen del perfil del cliente...' },
    { title: 'Descuentos', content: 'Ofrecemos descuentos en tasas de interés y seguros...' },
    { title: 'Detalles de la cuota mensual a pagar', content: 'El monto de la cuota se calcula en función del capital prestado...' },
    { title: 'Valor a consignar a favor del cliente', content: 'El valor final a consignar se refleja en el contrato del crédito...' }
  ];

  constructor(private router: Router) { }

  reject() {
    alert('Has rechazado las condiciones del crédito.');
  }

  accept() {
    this.router.navigate(['/next-step']); // Cambia a la ruta correcta
  }
};




