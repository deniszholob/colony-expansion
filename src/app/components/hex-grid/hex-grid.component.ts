import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Grid } from 'honeycomb-grid';
import { TileHex } from 'src/app/utils';

import { HexTileComponent } from '../hex-tile/hex-tile.component';

@Component({
  selector: 'app-hex-grid',
  templateUrl: './hex-grid.component.html',
  standalone: true,
  imports: [CommonModule, HexTileComponent],
})
export class HexGridComponent {
  @Input()
  public debug: boolean = false;
  @Input()
  public grid?: Grid<TileHex>;
}
