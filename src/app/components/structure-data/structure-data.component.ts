import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ICON_MAP,
  ResourceType,
  ResourceTypes,
  STRUCTURE_TYPES,
  structureData,
  StructureType,
} from 'src/app/utils';

import { StatEntity } from '../stats-entity/stats-entity.model';
import { StatsGroupComponent } from '../stats-group/stats-group.component';

@Component({
  selector: 'app-structure-data',
  templateUrl: './structure-data.component.html',
  standalone: true,
  imports: [CommonModule, StatsGroupComponent],
})
export class StructureDataComponent {
  private _type: StructureType = STRUCTURE_TYPES.dock;
  @Input()
  public set type(type: StructureType) {
    this._type = type;
    const data = structureData[type];
    this.structureDescription = data.description;
    this.structureNote = data.note;
    this.productionMultiplier = data.productionMultiplier;
    this.structureIcon = ICON_MAP[type];

    this.structureRequirementStats = ResourceTypes.map(
      (r: ResourceType): StatEntity => ({
        statType: r,
        statCount: data.buildingRequirement[r],
      })
    ).filter((s) => !!s.statCount);

    this.structureProductionStats = ResourceTypes.map(
      (r: ResourceType): StatEntity => ({
        statType: r,
        statRate: data.bonusProduction?.[r],
      })
    ).filter((s) => !!s.statRate);
  }
  public get type(): StructureType {
    return this._type;
  }

  public structureIcon: string = '';
  public structureDescription: string = '';
  public structureNote: string = '';
  public productionMultiplier: number = 0;
  public structureRequirementStats: StatEntity[] = [];
  public structureProductionStats: StatEntity[] = [];
}
