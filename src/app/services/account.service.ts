import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

interface ApiResponse {
  code: number;
  message: string | null;
  data: Account[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/procedure/account';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  addAccount(account: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, account);
  }

}
