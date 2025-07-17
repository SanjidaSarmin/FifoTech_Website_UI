import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private API_URL = `${environment.apiUrl}/api/careers`;

  constructor(private http: HttpClient) {}

  getAllCareers(){
    return this.http.get(this.API_URL);
  }

  getCareerById(id: number){
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createCareer(career: any){
    return this.http.post(this.API_URL, career);
  }

  updateCareer(id: number, career: any){
    return this.http.put(`${this.API_URL}/${id}`, career);
  }

  deleteCareer(id: number){
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
