import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import {
  MARKET_RATES,
  MarketRates,
  RESOURCE_TYPES,
  ResourceType,
  StructureType,
} from 'src/app/utils';

import { StatsEntityComponent } from '../stats-entity/stats-entity.component';
import { Trade } from './trade.model';

type TradeAction = 'Buy' | 'Sell';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  standalone: true,
  imports: [CommonModule, StatsEntityComponent],
})
export class TradeComponent {
  @Input()
  public marketRate: MarketRates = { ...MARKET_RATES };

  public _resourceType: ResourceType = 'gold';
  @Input()
  public set resourceType(type: ResourceType | StructureType) {
    if (type in RESOURCE_TYPES) {
      this._resourceType = type as ResourceType;
    } else {
      throw new Error('Cant trade structures');
    }
  }
  public get resourceType(): ResourceType {
    return this._resourceType;
  }

  @Input()
  public moneyResource: ResourceType = 'gold';

  @Output()
  public tradeChange: EventEmitter<Trade> = new EventEmitter();

  public onTradeAction(action: TradeAction): void {
    if (action !== 'Buy' && action !== 'Sell')
      throw new Error(`Invalid Trade Action: ${action}`);

    this.tradeChange.emit({
      tradeResource: this.resourceType,
      tradeResourceChange:
        action === 'Buy'
          ? this.marketRate.costToBuy // Add resource if bought
          : -this.marketRate.costToSell, // Subtract resource if sold
      moneyResource: this.moneyResource,
      moneyResourceChange:
        action === 'Buy'
          ? -this.marketRate.costToSell // Subtract money if bought
          : this.marketRate.costToBuy, // Add money if sold
    });
  }

  // public playerResources: StatResources;

  // constructor(private gameService: GameService) {
  //   const player = this.gameService.getCurrentPlayer();
  //   this.playerResources = player.stats.resourceCount;
  // }

  // public onTrade(buy: boolean): void {
  //   // if (type in RESOURCE_TYPES) {
  //   if (buy) {
  //     this.playerResources[this.resourceType] += MARKET_RATES.costToBuy;
  //     this.playerResources['gold'] -= MARKET_RATES.costToSell;
  //   } else {
  //     this.playerResources[this.resourceType] -= MARKET_RATES.costToSell;
  //     this.playerResources['gold'] += MARKET_RATES.costToBuy;
  //   }
  //   this.gameService.refreshUi.next();
  // }
}
