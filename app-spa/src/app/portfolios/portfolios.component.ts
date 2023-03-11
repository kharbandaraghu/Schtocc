import { Component, OnInit } from '@angular/core';
import { PortfolioResearchService } from '../shared/services/portfolio-research.service';
import { PortfolioService } from '../shared/services/portfolio.service';
import { Portfolio } from '../shared/models/portfolio.model';
import { PortfolioStock } from '../shared/models/portfoliostock.model';
import { FinanceServiceService } from '../shared/services/finance-service.service';
import { FormsModule } from '@angular/forms';
import { faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.sass']
})
export class PortfoliosComponent implements OnInit {

  // fa icons
  crossIcon = faTimes;
  externalLinkIcon = faExternalLinkAlt;

  constructor(private portfolioResearchService: PortfolioResearchService, private financeService: FinanceServiceService, private portfolioService: PortfolioService) { }

  portfolioName: string = '';
  allPortfolios: any[] = [];

  ngOnInit(): void {
    this.portfolioService.getPortfolios().subscribe((portfolios: Portfolio[]) => {
      this.allPortfolios = portfolios;
    });
  }

  AddPortfolio() {
    this.portfolioService.createPortfolio({name: this.portfolioName}).subscribe((portfolios) => {
      this.allPortfolios = portfolios;
    });
  }

  DeletePortfolio(id: string) {
    // confirm and then delete
    if(confirm("Are you sure you want to delete this portfolio?")){
      this.portfolioService.deletePortfolio(id).subscribe((portfolios) => {
        this.allPortfolios = portfolios;
      });
    }
  }

  do() {
    console.log('do');
    console.log(this.portfolioResearchService.generateBacktestLink([{name: 'One', stocks: [{ticker: 'TD.TO', targetAllocation: 25},{ticker: 'GIB-A.TO', targetAllocation: 75}]},{name: 'Two', stocks: [{ticker: 'TD.TO', targetAllocation: 25},{ticker: 'RBNK.TO', targetAllocation: 75}]}], true));
  }

}
