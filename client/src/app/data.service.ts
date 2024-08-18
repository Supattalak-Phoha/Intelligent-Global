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
  
  updateDataForHomePage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/home', data, httpOptions);
  }

  updateDataForAboutUsPage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/about-us', data, httpOptions);
  }

  updateDataForServicePage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/services', data, httpOptions);
  }

  updateDataForContactUsPage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/contact-us', data, httpOptions);
  }
}
