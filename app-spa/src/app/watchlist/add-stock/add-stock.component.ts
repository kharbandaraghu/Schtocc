import { Component, OnInit } from '@angular/core';
import { FinanceServiceService } from '../../shared/services/finance-service.service';
import { SymbolSearch } from 'src/app/shared/models/symbol-search.model';
import { ResearchLinksService } from 'src/app/shared/services/research-links.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  constructor(private financeService: FinanceServiceService, private researchLinkService: ResearchLinksService) { }

  ngOnInit(): void {
  }

  onTickerChange(result: SymbolSearch){
    this.researchLinkService.openResearchLinks(result.symbol);
  }
}
