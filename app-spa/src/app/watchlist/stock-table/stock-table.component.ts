import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/shared/services/watchlist.service';
import { FinanceServiceService } from 'src/app/shared/services/finance-service.service';
import { ResearchLinksService } from 'src/app/shared/services/research-links.service';
import { faTimes, faExternalLinkAlt, faStickyNote, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Watchlist } from 'src/app/shared/models/watchlist.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.sass']
})
export class StockTableComponent implements OnInit {

  crossIcon = faTimes;
  externalLinkIcon = faExternalLinkAlt;
  noteIcon = faStickyNote;
  lineChartIcon = faChartLine;

  constructor(private watchlistService: WatchlistService, private activatedRoute: ActivatedRoute, private financeService: FinanceServiceService, private researchLinkService: ResearchLinksService) { }

  stockList: any = [];
  stockDetails: any = [];

  selectedWatchlist?: Watchlist;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.watchlistService.GetWatchlist(params['watchlistId']).subscribe(data => {
        this.selectedWatchlist = data;
      });

      this.watchlistService.GetWatchlistStocksByWatchlistId(params['watchlistId']).subscribe(data => {
        this.stockList = data;
        this.updateStockDetails();
      });

      this.watchlistService.watchlistUpdated.subscribe(data => {

        if(data === "update-stocks"){
          this.updateStockList();
        }
      }
      );

    });
  }

  updateStockDetails(){
    this.stockDetails = [];
    // if stock list is empty, return
    if(this.stockList.length === 0) return;
    // add stock data from API into stockdata
    this.financeService.getQuotes(this.stockList.map(item => item.ticker)).subscribe(data => {
      this.stockDetails = JSON.parse(data["contents"]).quoteResponse.result;
      // add rationale to stockdata
      this.stockDetails.forEach(item => {
      item.notes = this.stockList.find(stock => stock.ticker === item.symbol).notes;
    }
    );
    }
    );
  }

  // update stock list
  updateStockList(){
    this.watchlistService.GetWatchlistStocksByWatchlistId(this.selectedWatchlist._id).subscribe(data => {
      this.stockList = data;
      this.updateStockDetails();
    });
  }

  // delete stock from watchlist
  deleteStockFromWatchlist(ticker: string){
    if(window.confirm("Are you sure you want to delete this stock from your watchlist?")){
      // get id of the ticker from stocklist
    const stockId = this.stockList.find(item => item.ticker === ticker)._id;
    this.watchlistService.DeleteWatchlistStock(stockId).subscribe(data => {
      this.watchlistService.onSelectedStockRefresh();
    });
    }
  }

  // open stock research link
  openStockResearchLink(ticker: string){
    this.researchLinkService.openResearchLinks(ticker);
  }

  // open stock chart
  openTradingViewLink(ticker: string){
    this.researchLinkService.openTradingViewLink(ticker);
  }

}
