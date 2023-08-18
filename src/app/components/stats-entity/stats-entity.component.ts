import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICON_MAP, ResourceType, StructureType } from 'src/app/utils';

import { StatEntity } from './stats-entity.model';

@Component({
  selector: 'app-stats-entity',
  templateUrl: './stats-entity.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class StatsEntityComponent implements StatEntity {
  @Input()
  public statCount?: number;
  @Input()
  public statRate?: number;
  @Input()
  public set statType(statType: ResourceType | StructureType) {
    this.statIcon = ICON_MAP[statType];
    this.type = statType;
  }

  public type: string = '';
  public statIcon: string = '';
}
