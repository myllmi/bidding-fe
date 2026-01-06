import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IamService {

  httpClient = inject(HttpClient);

  loginUser(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(`${environment.apiURL}/api/v1/iam/login`, {
      "email": email,
      "password": password,
    }, {
      headers,
      withCredentials: true
    });
  }
}
