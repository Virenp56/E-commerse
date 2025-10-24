import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ECommerceService {
  private baseUrl = 'http://localhost:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  register(data: { email: any; password: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: { email: any; password: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`);
  }
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/products`);
  }
}
