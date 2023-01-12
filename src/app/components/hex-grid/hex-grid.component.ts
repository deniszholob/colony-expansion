import { Component, Input } from "@angular/core";
import { Grid } from "honeycomb-grid";
import { TileHex } from "../hex-tile/hex.model";

@Component({
  selector: "app-hex-grid",
  templateUrl: "./hex-grid.component.html",
})
export class HexGridComponent {
  @Input()
  public debug: boolean = false;
  @Input()
  public grid?: Grid<TileHex>;
}
