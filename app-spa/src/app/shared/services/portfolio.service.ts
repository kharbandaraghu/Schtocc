import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioStock } from '../models/portfoliostock.model';
import { Portfolio } from '../models/portfolio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  endpoint = environment.backendUrl;

  private readonly API_URL = `${this.endpoint}/portfolios`;

   constructor(private readonly http: HttpClient) {}

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.API_URL);
  }

  getPortfolio(id: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.API_URL}/${id}/stocks`);
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio[]> {
    return this.http.post<Portfolio[]>(this.API_URL, portfolio);
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio[]> {
    return this.http.put<Portfolio[]>(`${this.API_URL}/${portfolio._id}`, portfolio);
  }

  deletePortfolio(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  createPortfolioStock(portfolioId: string, stock: PortfolioStock): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${this.API_URL}/${portfolioId}/stocks`, stock);
  }

  updatePortfolioStock(portfolioId: string, stock: PortfolioStock): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.API_URL}/${portfolioId}/stocks/${stock._id}`, stock);
  }

  deletePortfolioStock(portfolioId: string, stockId: string): Observable<Portfolio> {
    return this.http.delete<Portfolio>(`${this.API_URL}/${portfolioId}/stocks/${stockId}`);
  }
}
