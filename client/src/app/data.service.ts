import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/login', data, httpOptions);
  }

  getDataForAppPage(): Observable<any> {
    return this.http.get<any>('/api/app');
  }

  getDataForHomePage(): Observable<any> {
    return this.http.get<any>('/api/home');
  }

  getDataForAboutUsPage(): Observable<any> {
    return this.http.get<any>('/api/about-us');
  }

  getDataForServicePage(): Observable<any> {
    return this.http.get<any>('/api/services');
  }

  getDataForContactUsPage(): Observable<any> {
    return this.http.get<any>('/api/contact-us');
  }

  updateDataForServicePage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/services', data, httpOptions);
  }
}
