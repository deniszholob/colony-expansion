import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResourceType, StructureType } from 'src/app/utils';

import { StatsEntityComponent } from '../stats-entity/stats-entity.component';

export type StatEntity = {
  statType: ResourceType | StructureType;
  statCount?: number;
  statRate?: number;
};

@Component({
  selector: 'app-stats-group',
  templateUrl: './stats-group.component.html',
  standalone: true,
  imports: [CommonModule, StatsEntityComponent],
})
export class StatsGroupComponent {
  @Input()
  public stats: StatEntity[] = [];
}
