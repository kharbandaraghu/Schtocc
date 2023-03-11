export interface PortfolioStock {
    _id?: string;
    name?: string;
    ticker?: string;
    purchasePrice?: number;
    exchange?: string;
    unitsHeld?: number;
    targetAllocation?: number;
    currentAllocation?: number;
    currentPrice?: number;
    updated?: boolean;
}
