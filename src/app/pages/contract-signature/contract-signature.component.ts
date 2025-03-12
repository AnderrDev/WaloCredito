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
  styleUrls: ['./contract-signature.component.scss']
})
export class ContractSignatureComponent implements AfterViewInit {
  contractForm: FormGroup;

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;
  private ctx!: CanvasRenderingContext2D;

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

    this.ctx = this.signatureCanvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.drawPlaceholder();
  }

  drawPlaceholder() {
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'gray';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Firma con el mouse en este campo', canvas.width / 2, canvas.height / 2);
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

    const canvas = this.signatureCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawPlaceholder();
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
    this.router.navigate(['/dashboard']);
  }
  
}
