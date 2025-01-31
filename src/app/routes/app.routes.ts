import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from '../components/clients/client-list/client-list.component';
import { AccountListComponent } from '../components/accounts/account-list/account-list.component';
import { TransactionsListComponent } from '../components/transactions/transaction-list/transaction-list.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { NgModule } from '@angular/core';
import { ClientAddComponent } from '../components/clients/client-add/client-add.component';
import { ClientEditComponent } from '../components/clients/client-edit/client-edit.component';
import { AccountAddComponent } from '../components/accounts/account-add/account-add.component';
import { TransactionAddComponent } from '../components/transactions/transaction-add/transaction-add.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsListComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'transactions', component: TransactionsListComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'client-add', component: ClientAddComponent },
  { path: 'client-edit', component: ClientEditComponent },
  { path: 'account-add', component: AccountAddComponent },
  { path: 'transaction-add', component: TransactionAddComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }