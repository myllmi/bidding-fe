import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectorService {

  httpClient = inject(HttpClient);

  getAllSector(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(`${environment.apiURL}/api/v1/sector/list`, {headers})
  }

}
