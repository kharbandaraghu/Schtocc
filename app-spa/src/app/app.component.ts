import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import { ResearchLinksService } from './shared/services/research-links.service';
import { SymbolSearch } from './shared/models/symbol-search.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Schtocc';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private researchLinkService: ResearchLinksService) {}

  activatedNavigationPath: string;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedNavigationPath = this.activatedRoute.snapshot.firstChild.url[0].path;
      }
    });
  }

  selectedSymbol: SymbolSearch;

  // open all research links
  openResearchLinks(){
    // make sure a symbol is selected
    if(!this.selectedSymbol) return;
    this.researchLinkService.openResearchLinks(this.selectedSymbol.symbol);
  }

  // open tradingview
  openTradingViewLink(){
    // make sure a symbol is selected
    if(!this.selectedSymbol) return;
    this.researchLinkService.openTradingViewLink(this.selectedSymbol.symbol);
  }

  onTickerChange(result: SymbolSearch){
    this.selectedSymbol = result;
  }
}
