import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/api/contact`;
  private msgUrl = `${environment.apiUrl}/api/contact-messages`;

  constructor(private http: HttpClient) {}

  // Get contact info
  getContact(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Update contact info
  updateContact(contact: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update`, contact);
  }

  submitMessage(payload: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.msgUrl}/submit`, payload);
  }  
  
  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.msgUrl);
  }
  
}

