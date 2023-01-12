import { Component, Input } from "@angular/core";
import {
  ResourceType,
  ResourceTypes,
  StructureType,
  StructureTypes,
} from "src/app/game/game.data";
import { PlayerStats } from "src/app/game/player.model";
import { StatEntity } from "../stats-group/stats-group.component";

@Component({
  selector: "app-stats-bar",
  templateUrl: "./stats-bar.component.html",
})
export class StatsBarComponent {
  @Input()
  public set playerStats(s: PlayerStats) {
    this.statsForResources = ResourceTypes.map(
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
