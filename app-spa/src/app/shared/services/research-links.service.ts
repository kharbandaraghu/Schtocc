import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResearchLinksService {

  constructor() { }

  private finvizUrl = 'https://finviz.com/quote.ashx?t=';
  private marketWatchUrl = 'https://www.marketwatch.com/investing/stock/';
  private globeAndMailUrl = 'https://www.theglobeandmail.com/investing/markets/stocks/';
  private yahooFinanceUrl = 'https://ca.finance.yahoo.com/quote/';
  private tradingViewUrl = 'https://www.tradingview.com/symbols/';
  private tradingViewChartUrl = 'https://www.tradingview.com/chart/?symbol=';

  openTradingViewLink(ticker: string): void {
    let tradingViewTicker = ticker;
    if (ticker.endsWith('.TO')) {
      const tickerWithoutTo = ticker.substring(0, ticker.length - 3);
      tradingViewTicker = 'TSX-' + tickerWithoutTo;
    }
    tradingViewTicker = tradingViewTicker.replace(/-/g, '.').replace('TSX.', 'TSX:');
    window.open(this.tradingViewChartUrl + tradingViewTicker, '_blank');
  }

  // Input ticker is in yahoo finance ticker format
  openResearchLinks(ticker: string): void {

    // create the ticker in the format for each website
    let finvizTicker = ticker;
    let marketWatchTicker = ticker;
    let globeAndMailTicker = ticker;
    let yahooFinanceTicker = ticker;
    let tradingViewTicker = ticker;
    let tradingViewChartTicker = ticker;

    // Adjust the ticker format for each website's format and account for canadian stocks
    if (ticker.endsWith('.TO')) {
      // remove the .TO from the ticker
      const tickerWithoutTo = ticker.substring(0, ticker.length - 3);
      // adjust tickers for canadian stocks
      marketWatchTicker = tickerWithoutTo + '?countrycode=ca';
      globeAndMailTicker = tickerWithoutTo + '-T';
      tradingViewTicker = 'TSX-' + tickerWithoutTo;
      tradingViewChartTicker = 'TSX:' + tickerWithoutTo;
    }

    // Adjust for REITs and different classes of stocks
    marketWatchTicker = marketWatchTicker.replace(/-/g,'.').replace('.UN', '.UT');
    globeAndMailTicker = globeAndMailTicker.replace(/\./g, '-');
    tradingViewTicker = tradingViewTicker.replace(/-/g, '.').replace('TSX.', 'TSX-');
    tradingViewChartTicker = tradingViewChartTicker.replace(/-/g, '.').replace('TSX.', 'TSX:');

    // Open the links in new tabs
    
    //  don't open finviz if the stock is toronto stock exchange
    if (!ticker.endsWith('.TO')) {
      window.open(this.finvizUrl + finvizTicker, '_blank');
    }
    window.open(this.marketWatchUrl + marketWatchTicker, '_blank');
    window.open(this.globeAndMailUrl + globeAndMailTicker, '_blank');
    window.open(this.yahooFinanceUrl + yahooFinanceTicker, '_blank');
    window.open(this.tradingViewUrl + tradingViewTicker, '_blank');
    window.open(this.tradingViewChartUrl + tradingViewChartTicker, '_blank');

  }
    

}
