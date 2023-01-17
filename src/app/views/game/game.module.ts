import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HexGridModule } from "src/app/components/hex-grid/hex-grid.module";
import { HexTileModule } from "src/app/components/hex-tile/hex-tile.module";
import { StatsBarModule } from "src/app/components/stats-bar/stats-bar.module";
import { StructureDataModule } from "src/app/components/structure-data/structure-data.module";
import { TileDataModule } from "src/app/components/tile-data/tile-data.module";

import { GameComponent } from "./game.component";

@NgModule({
  imports: [
    CommonModule,
    HexTileModule,
    HexGridModule,
    StatsBarModule,
    StructureDataModule,
    TileDataModule,
  ],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
