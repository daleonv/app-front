import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientId: number | null = null;
  customer: any = {};

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = Number(params.get('data'));

      if (this.clientId) {
        this.customerService.getCustomerById(this.clientId).subscribe({
          next: (response) => {
            this.customer = response.data;
          },
          error: (err) => {
            console.error('Error al obtener cliente:', err);
          }
        });
      }
    });
  }

  saveChanges(): void {
    if (this.clientId) {
      this.customerService.updateCustomer(this.clientId, this.customer).subscribe(
        () => {
          console.log('Cliente actualizado correctamente');
          this.router.navigate(['/client-list']);
        },
        (error) => {
          console.error('Error al actualizar el cliente:', error);
        }
      );
    }
  }

  
  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
