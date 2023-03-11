import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Watchlist } from '../models/watchlist.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  // to notify that watchlists have been updated or a stock has been added to a watchlist
  watchlistUpdated = new EventEmitter<any>();

  // when a new watchlist is added
  onWatchlistRefresh() {
    this.watchlistUpdated.emit("update-watchlists");
  }

  // when a stock is added to a watchlist
  onSelectedStockRefresh() {
    this.watchlistUpdated.emit("update-stocks");
  }

  // Node API
  endpoint = environment.backendUrl;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Add watchlist
  AddWatchlist(data: Watchlist): Observable<any> {
    const API_URL = `${this.endpoint}/watchlists`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all watchlists
  GetWatchlists() {
    return this.httpClient.get(`${this.endpoint}/watchlists`);
  }

  // Get watchlist by id
  GetWatchlist(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/watchlists/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  // Delete watchlist by id
  DeleteWatchlist(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/watchlists/${id}`;
    return this.httpClient.delete(API_URL, {responseType: 'text'}).pipe(
      catchError(this.handleError));
  }

  // update watchlist by id
  UpdateWatchlist(id: string, data: Watchlist): Observable<any> {
    const API_URL = `${this.endpoint}/watchlists/${id}`;
    return this.httpClient.put(API_URL, data).pipe(
      catchError(this.handleError)
    );
  }

  // Add stock to watchlist - this uses a different model since you can add a stock to multiple watchlists
  AddStockToWatchlists(data: {
    _id?: string;
    name?: string;
    ticker?: string;
    listIds?: string[];
    notes?: string;
  }): Observable<any> {
    const API_URL = `${this.endpoint}/watchlist-stocks`;
    return this.httpClient.post(API_URL, data, {responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a stock in a watchlist
  UpdateStockInWatchlist(id: string, data: {
    notes?: string;
  }): Observable<any> {
    const API_URL = `${this.endpoint}/watchlist-stocks/${id}`;
    return this.httpClient.put(API_URL, data).pipe(
      catchError(this.handleError)
    );
  }


  // Get all watchlist stocks by watchlist id
  GetWatchlistStocksByWatchlistId(id: string) {
    return this.httpClient.get(`${this.endpoint}/watchlist-stocks/${id}`);
  }

  // Delete watchlist stock by id
  DeleteWatchlistStock(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/watchlist-stocks/${id}`;
    return this.httpClient.delete(API_URL, {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
