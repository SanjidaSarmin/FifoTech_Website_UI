import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = `${environment.apiUrl}/api/addresses` 

  constructor(private http: HttpClient) {}

  // getAddress(){
  //   return this.http.get(this.apiUrl);
  // }
  getAddress(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // direct single object
  }
  
  updateAddress(address: any) {
    return this.http.put(this.apiUrl, address);
  }
}

