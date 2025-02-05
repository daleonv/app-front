import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
  customer = {
    name: '',
    gender: '',
    age: null,
    identification: '',
    address: '',
    phone: '',
    password: '',
    status: 'Activo'
};

constructor(private customerService: CustomerService, private router: Router) {}

addCustomer(): void {
  this.customerService.addCustomer(this.customer).subscribe({
    next: response => {
      console.log('Cliente agregado:', response);
      this.router.navigate(['/clients']);
    },
    error: err => {
      console.error('Error al agregar cliente:', err);
    }
  });
}

  cancel(): void {
    this.router.navigate(['/clients']);
  }

}