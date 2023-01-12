import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatsGroupModule } from "../stats-group/stats-group.module";

import { StructureDataComponent } from "./structure-data.component";

@NgModule({
  imports: [CommonModule, StatsGroupModule],
  declarations: [StructureDataComponent],
  exports: [StructureDataComponent],
})
export class StructureDataModule {}
