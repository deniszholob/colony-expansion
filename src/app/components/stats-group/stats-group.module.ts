import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatsEntityModule } from "../stats-entity/stats-entity.module";

import { StatsGroupComponent } from "./stats-group.component";

@NgModule({
  imports: [CommonModule, StatsEntityModule],
  declarations: [StatsGroupComponent],
  exports: [StatsGroupComponent],
})
export class StatsGroupModule {}
