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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post(`${environment.apiURL}/bidding/upload`, formData, {headers});
  }

  getBid(idBidding: string):  Observable<BiddingResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<BiddingResponse>(`${environment.apiURL}/bidding/id/${idBidding}`, {headers})
  }

  evaluateBid(idBidding: string):  Observable<ResponseMessage>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post<ResponseMessage>(`${environment.apiURL}/bidding/rational/${idBidding}`, {headers})
  }
}
