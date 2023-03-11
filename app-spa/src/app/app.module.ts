import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../environments/environment';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { StockTableComponent } from './watchlist/stock-table/stock-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { QuoteSearchInputComponent } from './shared/utility-components/quote-search-input/quote-search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BigNumberPipePipe } from './shared/pipes/big-number-pipe.pipe';
import { TargetAllicationPipe } from './shared/pipes/target-allocation.pipe';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { PortfolioViewComponent } from './portfolios/portfolio-view/portfolio-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    WatchlistComponent,
    StockTableComponent,
    QuoteSearchInputComponent,
    BigNumberPipePipe,
    TargetAllicationPipe,
    PortfoliosComponent,
    PortfolioViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
