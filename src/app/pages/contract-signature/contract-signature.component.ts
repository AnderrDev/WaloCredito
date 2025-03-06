import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-contract-signature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contract-signature.component.html',
  styleUrls: []
})
export class ContractSignatureComponent implements AfterViewInit {
  contractForm: FormGroup;

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contractForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(6)]],
      accountType: ['ahorros', Validators.required],
      bank: ['Bancolombia', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 3,
      penColor: "black",
      backgroundColor: "white"
    });

    this.resizeCanvas();
  }

  resizeCanvas() {
    const canvas = this.signatureCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d")!.scale(ratio, ratio);
    this.signaturePad.clear();
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    if (this.signaturePad.isEmpty()) {
      alert('Debes firmar antes de continuar.');
      return;
    }

    const signatureData = this.signaturePad.toDataURL();
    console.log('Firma guardada:', signatureData);
  }

  reject() {
    alert('Has rechazado el contrato.');
  }

  accept() {
    if (this.contractForm.invalid || this.signaturePad.isEmpty()) {
      alert('Completa todos los campos y firma antes de aceptar.');
      return;
    }

    this.saveSignature();
    alert('Contrato firmado exitosamente.');
    this.router.navigate(['/next-step']);
  }
}
