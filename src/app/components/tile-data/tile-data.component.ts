import { Component, Input } from "@angular/core";
import {
  hexTileProductionData,
  HexType,
  ICON_MAP,
  ResourceType,
  ResourceTypes,
} from "src/app/game/game.data";
import { StatEntity } from "../stats-group/stats-group.component";

@Component({
  selector: "app-tile-data",
  templateUrl: "./tile-data.component.html",
})
export class TileDataComponent {
  private _type: HexType = "grass";
  @Input()
  public set type(type: HexType) {
    this._type = type;
    const tileData = hexTileProductionData[type];
    this.structureIcon = ICON_MAP[type];

    this.tileProductionStats = ResourceTypes.map(
      (r: ResourceType): StatEntity => ({
        statType: r,
        statRate: tileData.production[r],
      })
    ).filter((s) => !!s.statRate);
  }
  public get type(): HexType {
    return this._type;
  }

  public structureIcon: string = "";
  public tileProductionStats: StatEntity[] = [];
}
