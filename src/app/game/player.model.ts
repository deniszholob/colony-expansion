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
  STRUCTURE_TYPES,
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

  constructor(
    public name: string,
    public color: ColorsPlayer,
    public id: number
  ) {}

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
    const structure = tile.data.structure;
    if (structure == undefined) {
      throw new Error(`Cant build tile with no structure`);
    }
    this.subtractTileCost(structure);

    if (
      structure === STRUCTURE_TYPES.city ||
      structure === STRUCTURE_TYPES.capitol
    ) {
      this.stats.structureCount[structure]++;
      this.updateProductionRates();
    } else {
      this.addTile(tile);
    }
  }

  private subtractTileCost(structure: StructureType) {
    const cost = structureData[structure].buildingRequirement;
    ResourceTypes.forEach((type: ResourceType) => {
      this.stats.resourceCount[type] -= cost[type] ?? 0;
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

  private updateProductionRates() {
    // console.group("updateProductionRates");
    // Reset rates
    ResourceTypes.forEach((type: ResourceType) => {
      this.stats.resourceRate[type] = 0;
    });

    // Recalculate Rates
    this._ownedTiles.forEach((tile) => {
      if (!tile.data.structure) return;

      this.updateProductionRateFromTile(
        hexTileProductionData[tile.data.type].production,
        structureData[tile.data.structure]
      );
    });
    // console.groupEnd();
  }

  private updateProductionRateFromTile(
    tileProduction: ProductionData,
    structure: StructureData
  ): void {
    if (!structure.productionMultiplier) return;

    // console.group("updateProductionRateFromTile", tileProduction, structure);
    // console.log(`updateProductionRateFromTile`);
    ResourceTypes.forEach((resource: ResourceType) => {
      const tileYield = tileProduction[resource];
      if (tileYield) {
        // console.log("Tile Production", resource);
        this.addToProductionRateStat(
          resource,
          structure.productionMultiplier,
          tileYield
        );
      }

      const tileBonusYield = structure.bonusProduction?.[resource];
      if (tileBonusYield) {
        // console.log("Bonus Production");
        this.addToProductionRateStat(resource, tileBonusYield);
      }
    });
    // console.groupEnd();
  }

  private addToProductionRateStat(
    resource: ResourceType,
    productionYield: number,
    multiplier: number = 1
  ): void {
    // console.log(`addToProductionStat`, resource, productionYield * multiplier);
    this.stats.resourceRate[resource] += productionYield * multiplier;
  }
}
