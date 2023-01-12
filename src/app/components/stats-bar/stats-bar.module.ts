import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatsGroupModule } from "../stats-group/stats-group.module";

import { StatsBarComponent } from "./stats-bar.component";

@NgModule({
  imports: [CommonModule, StatsGroupModule],
  declarations: [StatsBarComponent],
  exports: [StatsBarComponent],
})
export class StatsBarModule {}
