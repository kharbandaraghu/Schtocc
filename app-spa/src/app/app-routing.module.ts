import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { QuoteComponent } from './quote/quote.component';

const routes: Routes = [
  { path: '', redirectTo: '/watchlist', pathMatch: 'full' },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'quote', component: QuoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
