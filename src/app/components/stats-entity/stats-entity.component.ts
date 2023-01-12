import { Component, Input } from "@angular/core";
import { ResourceType, StructureType, ICON_MAP } from "src/app/game/game.data";

@Component({
  selector: "app-stats-entity",
  templateUrl: "./stats-entity.component.html",
})
export class StatsEntityComponent {
  @Input()
  public statCount?: number = 0;
  @Input()
  public statRate?: number = 0;
  @Input()
  public set statType(statType: ResourceType | StructureType) {
    this.statIcon = ICON_MAP[statType];
    this.type = statType;
  }

  public type: string = "";
  public statIcon: string = "";
}
