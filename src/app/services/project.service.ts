import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProject(): Observable<any> {
    return this.http.get('https://hvcg-tm.herokuapp.com/projects');
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`https://hvcg-tm.herokuapp.com/projects/${id}`);
  }

}
