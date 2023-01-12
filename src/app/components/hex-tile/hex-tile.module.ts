import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HexGridModule } from "../hex-grid/hex-grid.module";
import { HexTileComponent } from "./hex-tile.component";

@NgModule({
  imports: [CommonModule],
  declarations: [HexTileComponent],
  exports: [HexTileComponent],
})
export class HexTileModule {}
