import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
}

interface News {
  id?: number;
  title: string;
  description: string;
  imageBase64?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = `${environment.apiUrl}/api/news`;

  constructor(private http: HttpClient) { }

  uploadNews(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getAllNews(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-all-news?page=${page}&size=${size}`);
  }


  getImageUrl(id: string): string {
    return `${this.baseUrl}/${id}/image`;
  }

  getNewsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateNews(id: number, formData: any): Observable<any> {
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

  deleteNews(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  searchNews(title: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`
    );
  }

}
