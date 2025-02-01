import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  private baseUrl = 'http://localhost:8080/person/reports';

  constructor(private http: HttpClient) {}

  getReport(requestData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/find`, requestData);
  }

  downloadReport(requestData: any): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download`, requestData, { responseType: 'blob' });
  }
}
