import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceType } from 'src/app/utils';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { StatsEntityComponent } from '../stats-entity/stats-entity.component';
import { StatEntity } from '../stats-entity/stats-entity.model';
import { TradeComponent } from '../trade/trade.component';
import { Trade } from '../trade/trade.model';

@Component({
  selector: 'app-stats-group',
  templateUrl: './stats-group.component.html',
  standalone: true,
  imports: [
    CommonModule,
    StatsEntityComponent,
    TradeComponent,
    DropdownComponent,
  ],
})
export class StatsGroupComponent {
  @Input()
  public stats: StatEntity[] = [];
  @Input()
  public marketMoneyTradeResource?: ResourceType;

  @Output()
  public tradeChange: EventEmitter<Trade> = new EventEmitter();
}
