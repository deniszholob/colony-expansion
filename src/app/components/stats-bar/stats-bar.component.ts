import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  PlayerStats,
  ResourceType,
  ResourceTypes,
  StructureType,
  StructureTypes,
} from 'src/app/utils';

import {
  StatEntity,
  StatsGroupComponent,
} from '../stats-group/stats-group.component';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  standalone: true,
  imports: [CommonModule, StatsGroupComponent],
})
export class StatsBarComponent {
  @Input()
  public set playerStats(s: PlayerStats) {
    this.statsForResources = ResourceTypes.filter((r) => r !== 'actions').map(
      (t: ResourceType): StatEntity => ({
        statType: t,
        statCount: s.resourceCount[t],
        statRate: s.resourceRate[t],
      })
    );

    this.statsForStructures = StructureTypes.map(
      (t: StructureType): StatEntity => ({
        statType: t,
        statCount: s.structureCount[t],
      })
    );
  }

  public statsForResources: StatEntity[] = [];
  public statsForStructures: StatEntity[] = [];
}
