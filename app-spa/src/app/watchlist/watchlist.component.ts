import { Component, OnInit } from '@angular/core';
import { SymbolSearch } from 'src/app/shared/models/symbol-search.model';
import { ResearchLinksService } from 'src/app/shared/services/research-links.service';
import { WatchlistService } from 'src/app/shared/services/watchlist.service';
import { Watchlist } from 'src/app/shared/models/watchlist.model';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.sass']
})
export class WatchlistComponent implements OnInit {

  crossIcon = faTimes;

  constructor(private researchLinkService: ResearchLinksService, private watchlistService: WatchlistService, private router: Router, private activatedRoute: ActivatedRoute) { }

  watchlists: any = [];
  newWatchlist: Watchlist = new Watchlist();
  selectedWatchlistId: string;
  selectedSymbol: SymbolSearch;
  rationaleToAdd: string;

  ngOnInit(): void {
    // TODO figute out a way to get the selected watchlist id from the url

    this.watchlistService.GetWatchlists().subscribe(data => {
      this.watchlists = data;
    });

    this.watchlistService.watchlistUpdated.subscribe(data => {
      if(data === "update-watchlists"){
        this.updateWatchlists();
      }
    }
    );
  }

  onTickerChange(result: SymbolSearch){
    this.selectedSymbol = result;
  }

  addStocksToWatchlist(){
    // make sure a symbol is selected
    if(!this.selectedSymbol) return;
    let selectedIds = [];
    // make sure at least one watchlist is selected
    if(this.watchlists.filter(item => item.checked).length === 0){
      // if no watchlist is selected, chack is any watchlist is open, if so, add stock to that watchlist
      if(this.selectedWatchlistId){
        selectedIds = [this.selectedWatchlistId];
      } else {
        window.alert("Please select at least one watchlist or open a watchlist to add the stock to.");
        return;
      }
    } else {
      // if at least one watchlist is selected, add the stock to all selected watchlists
      selectedIds = this.watchlists.filter(item => item.checked).map(item => item._id);
    }
    const stockToAdd = {
      name: this.selectedSymbol.name,
      ticker: this.selectedSymbol.symbol,
      listIds: selectedIds,
      notes: this.rationaleToAdd
    }
    this.watchlistService.AddStockToWatchlists(stockToAdd).subscribe(data => {
      // wait 100 ms before refreshing the watchlist
      // this is to give the backend time to update the watchlist
      setTimeout(() => {
        this.watchlistService.onSelectedStockRefresh();
        this.rationaleToAdd = "";
      }, 100);
    }
    );
  }

  // function to update all watchlists
  updateWatchlists(){
    this.watchlistService.GetWatchlists().subscribe(data => {
      this.watchlists = data;
    })
  }

  // function to add a new watchlist
  addNewWatchlist(){
    if(!this.newWatchlist.name) return;
    this.watchlistService.AddWatchlist(this.newWatchlist).subscribe(data => {
      this.watchlistService.onWatchlistRefresh();
      this.newWatchlist = new Watchlist();
    });
  }

  // function to delete a watchlist
  deleteWatchlist(id: string){
    if(confirm("Are you sure to delete this watchlist?")) {
      this.watchlistService.DeleteWatchlist(id).subscribe(data => {
        this.updateWatchlists();
        this.router.navigate(['/watchlist']);
      })
    }
    
  }

  // open all research links
  openResearchLinks(){
    // make sure a symbol is selected
    if(!this.selectedSymbol) return;
    this.researchLinkService.openResearchLinks(this.selectedSymbol.symbol);
  }

  // watchlist selected
  onWatchlistClick(watchlist: Watchlist){
    this.router.navigate(['/watchlist', watchlist._id]);
    this.selectedWatchlistId = watchlist._id;
  }

  // open tradingview
  openTradingViewLink(){
    // make sure a symbol is selected
    if(!this.selectedSymbol) return;
    this.researchLinkService.openTradingViewLink(this.selectedSymbol.symbol);
  }
}
