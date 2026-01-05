import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IamService {

  authService = inject(AuthService);
  httpClient = inject(HttpClient);

  loginUser(email: string, password: string)  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.post<any>(`${environment.apiURL}/api/v1/iam/login`, {
      "email": email,
      "password": password,
    }, {headers}).subscribe(res => {
      this.authService.setAccessToken(res.token);
      
    });
  }
}
