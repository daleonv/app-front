import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

interface ApiResponse {
  code: number;
  message: string | null;
  data: Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/person/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, customer);
  }

  getCustomerById(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
