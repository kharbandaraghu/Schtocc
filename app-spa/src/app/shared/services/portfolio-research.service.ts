import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioStock } from '../models/portfoliostock.model';
import { Portfolio } from '../models/portfolio.model';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResearchService {

  constructor() { }

  generateBacktestLink(portfolios: Portfolio[], multiple: boolean): string {
    let link = 'https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=4&startYear=1985&firstMonth=1&endYear=2023&lastMonth=12&calendarAligned=true&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&reinvestDividends=true&showYield=false&showFactors=false&factorModel=3&portfolioNames=true';

    if (multiple) {
      let i = 1;
      let symbolsCount = 1;
      for (let portfolio of portfolios) {
        link += `&portfolioName${i}=${encodeURIComponent(portfolio.name)}`;
        for (let j = 0; j < portfolio.stocks.length; j++) {
          let stock = portfolio.stocks[j];
          link += `&symbol${symbolsCount}=${encodeURIComponent(stock.ticker)}&allocation${symbolsCount}_${i}=${stock.targetAllocation}`;
          symbolsCount++;
        }
        i++;
      }
    } else {
      let portfolio = portfolios[0];
      link += `&portfolioName1=${encodeURIComponent(portfolio.name)}`;
      for (let i = 0; i < portfolio.stocks.length; i++) {
        let stock = portfolio.stocks[i];
        link += `&symbol${i+1}=${encodeURIComponent(stock.ticker)}&allocation${i+1}_1=${stock.targetAllocation}`;
      }
    }

    return link;
  }

}