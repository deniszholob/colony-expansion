import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HexTileModule } from '../hex-tile/hex-tile.module';

import { HexGridComponent } from './hex-grid.component';

@NgModule({
  imports: [CommonModule, HexTileModule],
  declarations: [HexGridComponent],
  exports: [HexGridComponent],
})
export class HexGridModule {}
