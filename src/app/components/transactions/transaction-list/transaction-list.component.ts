import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionsListComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          this.transactions = response.data;
          console.log("Transacciones cargadas:", this.transactions);
        }
      },
      error: (err) => {
        console.error('Error al obtener transacciones:', err);
      }
    });
  }

  goToAddTransaction(): void {
    this.router.navigate(['/transaction-add']);
  }
}
