import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatsEntityComponent } from './stats-entity.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StatsEntityComponent],
  exports: [StatsEntityComponent],
})
export class StatsEntityModule {}
