import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-add.component.html',
  styleUrl: './transaction-add.component.css'
})
export class TransactionAddComponent {
  transaction = {
    date: new Date().toISOString().slice(0, 10),
    transactionType: 'Deposito',
    amount: 0,
    accountId: null,
    status: 'Activo'
  };

  accounts: any[] = [];

  constructor(private transactionService: TransactionService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.setTransactionDate();
    this.loadAccounts();
  }

  formatDateToAPI(date: Date): string {
    return date.toISOString().slice(0, 19);
  }

  setTransactionDate(): void {
    const now = new Date();
    this.transaction.date = this.formatDateToAPI(now);
  }

  addTransaction(): void {
    this.transactionService.addTransaction(this.transaction).subscribe({
      next: response => {
        console.log('Transacción agregada:', response);
        this.router.navigate(['/transactions']);
      },
      error: err => {
        console.error('Error al agregar transacción:', err);
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Ocurrió un error al procesar la transacción.');
        }
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          this.accounts = response.data;
          console.log("Cuentas cargadas:", this.accounts);
        }
      },
      error: (err) => {
        console.error('Error al obtener cuentas:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }
}
