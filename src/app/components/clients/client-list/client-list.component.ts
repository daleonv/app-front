import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(response => {
      if (response.code === 200 && response.data) {
        this.customers = response.data;
      }
    }, error => {
      console.error('Error al obtener clientes:', error);
    });
  }

  goToAddClient(): void {
    this.router.navigate(['/client-add']);
  }

  goToEditClient(customer: any): void {
    this.router.navigate(['/client-edit', { data: customer.customerId }]);
  }

  deleteCustomer(customer: any): void {
    if (confirm(`¿Seguro que deseas eliminar a ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.customerId).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customerId !== customer.customerId);
          console.log("Cliente eliminado:", customer);
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
        }
      });
    }
  }

}
