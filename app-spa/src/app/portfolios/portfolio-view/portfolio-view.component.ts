import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PortfolioResearchService } from '../../shared/services/portfolio-research.service';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Portfolio } from '../../shared/models/portfolio.model';
import { PortfolioStock } from '../../shared/models/portfoliostock.model';
import { FinanceServiceService } from '../../shared/services/finance-service.service';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { SymbolSearch } from 'src/app/shared/models/symbol-search.model';
import { faArrowAltCircleLeft, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.sass']
})
export class PortfolioViewComponent implements OnInit {

  // icons
  backIcon = faArrowAltCircleLeft;
  crossIcon = faTimes;
  saveIcon = faSave;

  constructor(private portfolioResearchService: PortfolioResearchService, private financeService: FinanceServiceService, private portfolioService: PortfolioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  portfolio: Portfolio;
  toggleSave: boolean = false;
  stockToAdd: SymbolSearch;

  ngOnInit(): void {
    // populate portfolio
    this.portfolioService.getPortfolio(this.activatedRoute.snapshot.params['portfolioId']).subscribe((portfolio: Portfolio) => {
      this.portfolio = portfolio;
      this.processPortfolio();
    }
    );
  }

  SavePortfolio() {
    this.portfolioService.updatePortfolio(this.portfolio).subscribe((portfolio) => {
      this.toggleSave = false;
      this.portfolioService.getPortfolio(this.activatedRoute.snapshot.params['portfolioId']).subscribe((portfolio: Portfolio) => {
        this.portfolio = portfolio;
        this.processPortfolio();
      }
      );
    });
  }

  onStockSelect(stock: SymbolSearch) {
    this.stockToAdd = stock;
  }

  addStock() {
    const newStock: PortfolioStock = {
      name: this.stockToAdd.name,
      ticker: this.stockToAdd.symbol,
      exchange: this.stockToAdd.exchange
    };
    this.portfolioService.createPortfolioStock(this.portfolio._id, newStock).subscribe((portfolio) => {
      this.portfolio = portfolio;
      this.processPortfolio();
    });
  }

  deleteStock(stockId: string) {
    if(confirm("Are you sure you want to delete this stock?")){
      this.portfolioService.deletePortfolioStock(this.portfolio._id, stockId).subscribe((portfolio) => {
        this.portfolio = portfolio;
        this.processPortfolio();
      });
    }
  }

  updateStock(stock: PortfolioStock) {
    this.portfolioService.updatePortfolioStock(this.portfolio._id, stock).subscribe((portfolio) => {
      this.portfolio = portfolio;
      this.processPortfolio();
    });
  }


  // this function is used to add extra data to the stocks in the portfolio
  processPortfolio() {
    // convert purchasePrice of all stocks to number
    this.portfolio.stocks.forEach(stock => {
      console.log(stock);
    });
  }

  visualizePortfolio() {
    const link = this.portfolioResearchService.generateBacktestLink([this.portfolio], false)
    window.open(link, '_blank');

  }


    

}
