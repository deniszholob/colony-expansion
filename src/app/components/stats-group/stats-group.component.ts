import { Component, Input } from "@angular/core";
import { ResourceType, StructureType } from "src/app/game/game.data";

export type StatEntity = {
  statType: ResourceType | StructureType;
  statCount?: number;
  statRate?: number;
};

@Component({
  selector: "app-stats-group",
  templateUrl: "./stats-group.component.html",
})
export class StatsGroupComponent {
  @Input()
  public stats: StatEntity[] = [];
}
