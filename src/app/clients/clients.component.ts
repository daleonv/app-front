import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' },
  ];

  buscarCliente(termino: string): void {
    console.log('Buscando cliente:', termino);
  }
}
