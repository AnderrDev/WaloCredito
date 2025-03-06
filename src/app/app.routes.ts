import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EnrollmentComponent } from './features/auth/enrollment/enrollment.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreditValidationComponent } from './pages/credit-validation/credit-validation.component';
import { CreditFormComponent } from './pages/credit-form/credit-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: EnrollmentComponent }, // ✅ Registro por pasos
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'credit-validation', component: CreditValidationComponent },
    { path: 'credit-form', component: CreditFormComponent },
    { path: '**', redirectTo: 'auth/login' },
];
