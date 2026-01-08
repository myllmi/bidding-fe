import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiddingListResponse, BiddingResponse, ResponseMessage} from '../model/interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  httpClient = inject(HttpClient);

  getAllBid(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(`${environment.apiURL}/api/v1/tender/list`, {headers})
  }

  uploadBid(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({});
    return this.httpClient.post(`${environment.apiURL}/api/v1/tender/upload`, formData, {headers});
  }

  getBid(idBidding: string):  Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(`${environment.apiURL}/api/v1/tender/${idBidding}`, {headers})
  }

  getBidCandidate(idEvaluation: string):  Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(`${environment.apiURL}/api/v1/tender/candidate/${idEvaluation}`, {headers})
  }

  evaluateBid(idBidding: string):  Observable<ResponseMessage>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<ResponseMessage>(`${environment.apiURL}/api/v1/tender/evaluate/${idBidding}`, {headers})
  }
}
