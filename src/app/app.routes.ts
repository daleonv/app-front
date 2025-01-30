import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/clients' } // Ruta comodín para manejar errores
];