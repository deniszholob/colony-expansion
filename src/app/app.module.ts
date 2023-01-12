import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterModule } from "./components/footer/footer.module";
import { HexGridModule } from "./components/hex-grid/hex-grid.module";
import { HexTileModule } from "./components/hex-tile/hex-tile.module";
import { StatsBarModule } from "./components/stats-bar/stats-bar.module";
import { StructureDataModule } from "./components/structure-data/structure-data.module";
import { TileDataModule } from "./components/tile-data/tile-data.module";
import { GameService } from "./game/game.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HexTileModule,
    HexGridModule,
    StatsBarModule,
    StructureDataModule,
    TileDataModule,
    FooterModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
