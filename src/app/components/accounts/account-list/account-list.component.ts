import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  accounts: any[] = [];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(response => {
      if (response.code === 200 && response.data) {
        this.accounts = response.data;
      }
    }, error => {
      console.error('Error al obtener cuentas:', error);
    });
  }

  goToAddAccount(): void {
    this.router.navigate(['/account-add']);
  }
}
