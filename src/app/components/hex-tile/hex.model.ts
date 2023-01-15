import { defineHex, HexCoordinates } from "honeycomb-grid";
import { Subject } from "rxjs";
import { ColorsPlayer, ColorsSystem, COLORS_SYSTEM, HexType, HEX_TYPES, StructureType } from "src/app/game/game.data";

export type HexData = {
  type: HexType;
  color: ColorsPlayer | ColorsSystem;
  /** -1 is environment */
  owner: number;
  yield: number;
  structure?: StructureType;
};

interface HexCallBack {
  (): void;
}

export class TileHex extends defineHex({ origin: "topLeft" }) {
  public data: HexData = {
    type: HEX_TYPES.water,
    color: COLORS_SYSTEM.grey,
    owner: -1,
    yield: 0,
  };
  private clickEvent$ = new Subject<boolean>();

  public onClick(doUpgrade: boolean): void {
    console.log(doUpgrade);
    this.clickEvent$.next(doUpgrade);
  }

  public getClickObs() {
    return this.clickEvent$.asObservable();
  }

  public getRowColCoordinates(): HexCoordinates {
    return { row: this.row, col: this.col };
  }

  public static filterNotWater(tile: TileHex, type: HexType): boolean {
    return this.filterNotType(tile, HEX_TYPES.water);
  }

  public static filterNotType(tile: TileHex, type: HexType): boolean {
    return tile.data.type !== type;
  }
}
