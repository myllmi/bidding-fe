import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResumeListResponse} from '../model/interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  httpClient = inject(HttpClient);

  getAllResume(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(`${environment.apiURL}/api/v1/resume/list`, {headers});
  }

  uploadResume(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post(`${environment.apiURL}/api/v1/resume/upload`, formData, {headers});
  }
}
