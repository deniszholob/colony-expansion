import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MARKET_MONEY_RESOURCE,
  PlayerStats,
  ResourceType,
  ResourceTypes,
  StatResources,
  StructureType,
  StructureTypes,
} from 'src/app/utils';

import { StatEntity } from '../stats-entity/stats-entity.model';
import { StatsGroupComponent } from '../stats-group/stats-group.component';
import { Trade } from '../trade/trade.model';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  standalone: true,
  imports: [CommonModule, StatsGroupComponent],
})
export class StatsBarComponent {
  public readonly MARKET_MONEY_RESOURCE: ResourceType = MARKET_MONEY_RESOURCE;

  @Input()
  public marketTradeEnabled: boolean = false;

  private _playerStats?: PlayerStats;
  @Input()
  public set playerStats(s: PlayerStats) {
    this._playerStats = s;
    this.refreshResourceData(s);
    this.refreshStructureData(s);
  }

  public statsForResources: StatEntity[] = [];
  public statsForStructures: StatEntity[] = [];

  private refreshResourceData(s: PlayerStats): void {
    this.statsForResources = ResourceTypes.filter((r) => r !== 'actions').map(
      (t: ResourceType): StatEntity => ({
        statType: t,
        statCount: s.resourceCount[t],
        statRate: s.resourceRate[t],
      })
    );
  }

  private refreshStructureData(s: PlayerStats): void {
    this.statsForStructures = StructureTypes.map(
      (t: StructureType): StatEntity => ({
        statType: t,
        statCount: s.structureCount[t],
      })
    );
  }

  /** TODO: move to game service? Will break if not passing in obj by reference */
  public onTrade(trade: Trade): void {
    // console.log(trade);
    if (this._playerStats) {
      // console.log(this._playerStats.resourceCount);
      const playerResources: StatResources = this._playerStats.resourceCount;
      playerResources[trade.tradeResource] += trade.tradeResourceChange;
      playerResources[trade.moneyResource] += trade.moneyResourceChange;
      // console.log(this._playerStats.resourceCount);
      this.refreshResourceData(this._playerStats);
    }
  }
}
