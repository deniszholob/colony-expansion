import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatsGroupModule } from "../stats-group/stats-group.module";

import { TileDataComponent } from "./tile-data.component";

@NgModule({
  imports: [CommonModule, StatsGroupModule],
  declarations: [TileDataComponent],
  exports: [TileDataComponent],
})
export class TileDataModule {}
