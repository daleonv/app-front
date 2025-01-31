import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  report = {
    initialDate: '',
    endDate: '',
    customerId: null
  };

  customers: any[] = [];
  reportData: any[] = [];

  constructor(
    private reportService: ReportService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
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

  generateReport(): void {
    if (!this.report.initialDate || !this.report.endDate || !this.report.customerId) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const initialDate = `${this.report.initialDate}T00:00:00Z`;
    const endDate = `${this.report.endDate}T23:59:59Z`;

    const requestData = {
      initialDate: initialDate,
      endDate: endDate,
      customerId: this.report.customerId
    };

    this.reportService.getReport(requestData).subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          this.reportData = response.data;
          console.log("Reporte generado:", this.reportData);
        } else {
          alert('No se encontraron resultados.');
        }
      },
      error: (err) => {
        console.error('Error al generar reporte:', err);
        alert('Error al generar el reporte. Inténtelo de nuevo.');
      }
    });
  }

  downloadReport(): void {
    if (this.reportData.length === 0) {
      console.warn("No hay datos para exportar.");
      return;
    }

    const headers = "Fecha,Cliente,Número de Cuenta,Tipo de Cuenta,Saldo Inicial,Estado,Tipo de Transacción,Monto,Saldo Final\n";

    const csvRows = this.reportData.map(transaction =>
      `${transaction.date.split("T")[0]},${transaction.name},${transaction.accountNumber},${transaction.accountType},${transaction.initialBalance},${transaction.status},${transaction.transactionType},${transaction.amount},${transaction.balance}`
    );

    const csvContent = headers + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  }

}
