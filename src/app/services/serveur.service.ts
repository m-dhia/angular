import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serveur } from '../models/serveur.model';

const baseUrl = 'http://20.19.33.63:3000/api/serveurs';

@Injectable({
  providedIn: 'root'
})
export class ServeurService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Serveur[]> {
    return this.http.get<Serveur[]>(baseUrl);
  }

  get(id: any): Observable<Serveur> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findById(id: any): Observable<Serveur[]> {
    return this.http.get<Serveur[]>(`${baseUrl}?id=${id}`);
  }
}
