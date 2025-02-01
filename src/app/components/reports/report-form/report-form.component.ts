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
    customerId: null,
    extension: 'pdf'
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
    if (!this.report.initialDate || !this.report.endDate || !this.report.customerId) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const requestData = {
      initialDate: `${this.report.initialDate}T00:00:00Z`,
      endDate: `${this.report.endDate}T23:59:59Z`,
      customerId: this.report.customerId,
      extension: this.report.extension
    };

    this.reportService.downloadReport(requestData).subscribe({
      next: (response) => {
        const fileType = requestData.extension === 'pdf' ? 'application/pdf' : 'text/csv';
        const blob = new Blob([response], { type: fileType });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte.${requestData.extension}`;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el reporte:', err);
        alert('Error al descargar el reporte. Inténtelo de nuevo.');
      }
    });
  }

}
