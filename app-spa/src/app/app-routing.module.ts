import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { StockTableComponent } from './watchlist/stock-table/stock-table.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { PortfolioViewComponent } from './portfolios/portfolio-view/portfolio-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/watchlist', pathMatch: 'full' },
  { path: 'watchlist', component: WatchlistComponent, children: [
    { path: ':watchlistId', component: StockTableComponent },
    ]
  },
  { path: 'portfolios', component: PortfoliosComponent },
  { path: 'portfolios/:portfolioId', component: PortfolioViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
