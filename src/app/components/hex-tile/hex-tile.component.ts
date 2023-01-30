import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TileHex } from 'src/app/utils';

@Component({
  selector: 'app-hex-tile',
  templateUrl: './hex-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HexTileComponent {
  @Input()
  public debug: boolean = false;
  @Input()
  public hexTile?: TileHex;
  @Input()
  public variant: boolean = !!Math.round(Math.random());

  // @Input()
  // public canUpgrade: boolean = true;

  constructor() {
    this.hexTile?.data;
  }

  public onClick(doUpgrade: boolean): void {
    this.hexTile?.onClick(doUpgrade);
  }
}
