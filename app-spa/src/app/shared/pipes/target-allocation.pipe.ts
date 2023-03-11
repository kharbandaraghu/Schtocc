import { Pipe, PipeTransform } from '@angular/core';
import { PortfolioStock } from '../models/portfoliostock.model';

@Pipe({
  name: 'targetAllocationPipe'
})
export class TargetAllicationPipe implements PipeTransform {

  transform(input: PortfolioStock[], args?: any): any {
    return input.reduce((a, b) => a + b.targetAllocation, 0);
  }
}
