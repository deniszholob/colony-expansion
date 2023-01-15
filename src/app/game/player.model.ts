import { BehaviorSubject } from "rxjs";
import { TileHex } from "../components/hex-tile/hex.model";
import {
  ColorsPlayer,
  hexTileProductionData,
  ProductionData,
  ResourceType,
  ResourceTypes,
  structureData,
  StructureData,
  StructureType,
} from "./game.data";

export interface InitPlayer {
  name: string;
  color: ColorsPlayer;
}

export type StatResources = Record<ResourceType, number>;
type StatStructures = Record<StructureType, number>;

export type PlayerStats = {
  resourceRate: StatResources;
  resourceCount: StatResources;
  structureCount: StatStructures;
};

export class Player implements InitPlayer {
  public stats: PlayerStats = {
    resourceRate: {
      food: 0,
      gold: 0,
      stone: 0,
      wood: 0,
      actions: 0,
    },
    resourceCount: {
      food: 0,
      gold: 0,
      stone: 0,
      wood: 0,
      actions: 0,
    },
    structureCount: {
      road: 0,
      outpost: 0,
      city: 0,
      capitol: 0,
      dock: 0,
      monument: 0,
    },
  };
  public maxActions = 2;
  private _ownedTiles: TileHex[] = [];

  // TODO
  // private subject = new BehaviorSubject(this.stats);

  /** Returns a copy, use methods to modify instead of directly */
  public get ownedTiles(): TileHex[] {
    return this._ownedTiles;
    // return [...this._ownedTiles];
  }

  constructor(public name: string, public color: ColorsPlayer, public id: number) {}

  public addTile(tile: TileHex): void {
    if (tile.data.structure == undefined) {
      throw new Error(`Cant add tile with no structure to player`);
    }

    this._ownedTiles.push(tile);
    this.stats.structureCount[tile.data.structure]++;
    this.updateProductionRates();
  }

  public updateActionCount(): void {
    this.maxActions = this._ownedTiles
      .map((t) => {
        if (t.data.structure) {
          const influence =
            structureData[t.data.structure].bonusProduction?.actions;
          return influence ?? 0;
        }
        return 0;
      })
      .reduce((acc, curr) => acc + curr, 0);
  }

  public buildTile(tile: TileHex) {
    if (tile.data.structure == undefined) {
      throw new Error(`Cant build tile with no structure`);
    }

    this.addTile(tile);
    this.subtractTileCost(tile.data.structure);
  }

  private subtractTileCost(structure: StructureType) {
    const cost = structureData[structure].buildingRequirement;
    ResourceTypes.forEach((type: ResourceType) => {
      this.stats.resourceCount[type] -= cost[type] ?? 0;
    });
  }

  private updateProductionRates() {
    // Reset rates
    ResourceTypes.forEach((type: ResourceType) => {
      this.stats.resourceRate[type] = 0;
    });

    // Recalculate Rates
    this._ownedTiles.forEach((tile) => {
      if (tile.data.structure) {
        this.updateProductionRateFromTile(
          hexTileProductionData[tile.data.type].production,
          structureData[tile.data.structure]
        );
      }
    });
  }

  public updateProduction() {
    ResourceTypes.forEach((type: ResourceType) => {
      // if (type === "influence") {
      //   this.stats.resourceCount[type] = this.stats.resourceRate[type];
      //   this.stats.resourceRate[type] = 0;
      // } else {
      this.stats.resourceCount[type] += this.stats.resourceRate[type];
      // }
    });
  }

  private updateProductionRateFromTile(
    tileProduction: ProductionData,
    structure: StructureData
  ): void {
    ResourceTypes.forEach((type: ResourceType) => {
      this.getProductionStat(
        type,
        structure.productionMultiplier,
        tileProduction[type]
      );

      if (structure.bonusProduction) {
        this.getProductionStat(
          type,
          structure.productionMultiplier,
          structure.bonusProduction[type]
        );
      }
    });
  }

  private getProductionStat(
    type: ResourceType,
    multiplier: number,
    productionYield?: number
  ): void {
    if (productionYield) {
      this.stats.resourceRate[type] += productionYield * multiplier;
    }
  }
}
