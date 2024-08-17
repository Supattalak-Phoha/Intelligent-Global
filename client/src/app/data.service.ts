import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

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

  // updateData(id: number, data: any): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put<any>(url, data, httpOptions);
  // }

  // deleteData(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<any>(url);
  // }

  // uploadFile(file: File): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'multipart/form-data'
  //     })
  //   };

  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   console.log("===============", file)

  //   return this.http.post<any>(`${this.apiUrl}/uploadFile`, formData);
  // }
}
