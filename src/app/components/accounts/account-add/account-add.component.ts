import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent {

  account = {
    accountNumber: '',
    accountType: 'Ahorros',
    initialBalance: 0,
    status: 'Activo',
    customerId: null
  };

  customers: any[] = [];

  constructor(private accountService: AccountService, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  addAccount(): void {
    this.accountService.addAccount(this.account).subscribe({
      next: response => {
        console.log('Cuenta agregada:', response);
        this.router.navigate(['/accounts']);
      },
      error: err => {
        console.error('Error al agregar cuenta:', err);
      }
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          this.customers = response.data;
          console.log("Clientes cargados:", this.customers);
        }
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/accounts']);
  }
}
