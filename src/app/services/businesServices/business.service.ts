import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

   private baseUrl = `${environment.apiUrl}/api/business-services`;
  
    constructor(private http: HttpClient) {}
  
    uploadService(formData: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}/upload`, formData);
    }
  
    getAllService(page: number = 0, size: number = 10): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/get-all-business-services?page=${page}&size=${size}`);
    }
    
  
    getImageUrl(id: string): string {
      return `${this.baseUrl}/${id}/image`;
    }
  
    getServiceById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/${id}`);
    }
  
    updateService(id: number, formData: FormData): Observable<any> {
      return this.http.put<any>(
        `${this.baseUrl}/update/${id}`,
        formData,
        {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }
      );
    }
    
  
    deleteService(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
    }
  
    searchService(title: string, page: number = 0, size: number = 10): Observable<any> {
      return this.http.get<any>(
        `${this.baseUrl}/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`
      );
    }
}
