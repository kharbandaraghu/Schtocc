import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../environments/environment';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AddStockComponent } from './watchlist/add-stock/add-stock.component';
import { StockTableComponent } from './watchlist/stock-table/stock-table.component';
import { QuoteComponent } from './quote/quote.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { QuoteSearchInputComponent } from './shared/utility-components/quote-search-input/quote-search-input.component';

@NgModule({
  declarations: [
    AppComponent,
    WatchlistComponent,
    AddStockComponent,
    StockTableComponent,
    QuoteComponent,
    QuoteSearchInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
