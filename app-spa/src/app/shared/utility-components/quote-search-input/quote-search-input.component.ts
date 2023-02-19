import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FinanceServiceService } from '../../../shared/services/finance-service.service';
import { SymbolSearch } from '../../models/symbol-search.model';

@Component({
  selector: 'app-quote-search-input',
  templateUrl: './quote-search-input.component.html',
  styleUrls: ['./quote-search-input.component.sass']
})
export class QuoteSearchInputComponent implements OnInit {

  constructor(private financeService: FinanceServiceService) { }

  ngOnInit(): void {
  }

  // output for the parent component
  @Output() public ticker = new EventEmitter<SymbolSearch>();

  public model: any;
  searchResults;

	search: OperatorFunction<string, readonly { symbol; name; exchange }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			switchMap((term) => {
				if (term.length < 1) {
					return of([]);
				}
				this.searchResults = [];
				return this.financeService.search(term).pipe(
					map(data => {
						let searchdata = JSON.parse(data["contents"]).quotes;
						for (let i = 0; i < searchdata.length; i++) {
							this.searchResults.push({symbol: searchdata[i]["symbol"], name: searchdata[i]["longname"], exchange: searchdata[i]["exchange"]});
						}
						return this.searchResults;
					})
				);
			})
		);


	formatter = (x: SymbolSearch) => x.symbol;

  // onChange funciton to emit as output the value in the input field
  onChange(event) {
    this.ticker.emit(event.item);
  }

}

