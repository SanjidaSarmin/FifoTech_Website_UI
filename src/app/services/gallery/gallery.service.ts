import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseUrl = `${environment.apiUrl}/api/gallery`;
  

  constructor(private http: HttpClient) {}

  createGalleryItem(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/createGallery`, formData);
  }

  updateGalleryItem(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateGallery/${id}`, formData);
  }

  // getGalleryItems(page: number = 0, size: number = 9): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());
  //   return this.http.get(`${this.baseUrl}/getAllGallery`, { params });
  // }  

  getGalleryItems(page: number, size: number, sortBy: string, direction: string){
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get(`${this.baseUrl}/getAllGallery`,  { params });
  }

  getGalleryItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getGalleryById/${id}`);
  }

  deleteGalleryItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteGallery/${id}`);
  }
}
