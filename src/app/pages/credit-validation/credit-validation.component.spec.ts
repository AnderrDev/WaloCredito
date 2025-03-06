import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditValidationComponent } from './credit-validation.component';

describe('CreditValidationComponent', () => {
  let component: CreditValidationComponent;
  let fixture: ComponentFixture<CreditValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
