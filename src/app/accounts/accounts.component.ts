import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accounts = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' },
  ];

  buscarCuenta(termino: string): void {
    console.log('Buscando cuenta:', termino);
  }
}
