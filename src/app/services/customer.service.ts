import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse {
  code: number;
  message: string | null;
  data: Customer[];
}

interface Customer {
  name: string;
  gender: string;
  age: number;
  identification: string;
  address: string;
  phone: string;
  customerId: number;
  password: string;
  status: string;
  accounts: any;
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
    return this.http.post<any>(this.apiUrl, customer);
  }
}
