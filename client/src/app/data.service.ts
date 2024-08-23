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

  getDataForServiceDetailPage(code: string): Observable<any> {
    return this.http.get<any>('/api/service-detail/' + code);
  }

  getDataForContactUsPage(): Observable<any> {
    return this.http.get<any>('/api/contact-us');
  }

  getDataForTeamUsPage(): Observable<any> {
    return this.http.get<any>('/api/users');
  }

  getDataForImagesPage(): Observable<any> {
    return this.http.get<any>('/api/images');
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

  updateDataForOthersPage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/app', data, httpOptions);
  }

  updateDataForTeamUsPage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/users', data, httpOptions);
  }

  uploadFile(file: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };

    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>('/api/uploadImage', formData);
  }

  deleteImage(fileName: string): Observable<any> {
    return this.http.delete<any>('/api/deleteImage/' + fileName);
  }
}
