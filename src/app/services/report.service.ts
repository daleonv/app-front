import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  private apiUrl = 'http://localhost:8080/person/reports/find';

  constructor(private http: HttpClient) {}

  getReport(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestData);
  }
}
