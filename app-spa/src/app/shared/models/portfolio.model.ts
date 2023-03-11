import { PortfolioStock } from "./portfoliostock.model";

export interface Portfolio {
    _id?: string;
    name?: string;
    stocks?: PortfolioStock[];
    inceptionDate?: string;
    revisitDate?: string;
    rebalancePeriod?: string;
    modelPortfolio?: boolean;
  }