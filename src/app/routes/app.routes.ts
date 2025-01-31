import {RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../components/clients/client-list/client-list.component';
import { AccountsComponent } from '../components/accounts/accounts.component';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { NgModule } from '@angular/core';
import { ClientAddComponent } from '../components/clients/client-add/client-add.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'client-add', component: ClientAddComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}