import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  // Using yahoo finance API
  // On top of that to prevent all origins using https://allorigins.win
  searchUrl = 'http://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v1/finance/search?q='

  constructor(private http: HttpClient) { }

  search(symbol:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.searchUrl}${symbol}`)
  }

  // daily(symbol:string): Observable<any[]>{
  //   return this.http.get<any[]>(`${this.dailyBeg}${symbol}${this.urlEnd}`)
  // }

}