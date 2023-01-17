import { Component } from "@angular/core";
import { Direction, Grid, HexCoordinates } from "honeycomb-grid";
import { TileHex } from "src/app/components/hex-tile/hex.model";
import {
  AVAILABLE_START_POSITIONS_WATER,
  GAME_PLAYERS,
} from "src/app/game/game-configuration.data";
import {
  COLORS_SYSTEM,
  HEX_TYPES,
  ResourceType,
  structureData,
  StructureType,
  STRUCTURE_TYPES,
} from "src/app/game/game.data";
import {
  Actions,
  GameService,
  structureBuildMap,
} from "src/app/game/game.service";
import { Player, PlayerStats } from "src/app/game/player.model";
import {
  generateMap,
  getInteractableTiles,
  initCssVars,
  newGrid,
} from "./map-generator";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
})
export class GameComponent {
  public readonly Actions = Actions;
  public hexGrid: Grid<TileHex> = newGrid();
  public interactableTiles: Grid<TileHex> = getInteractableTiles(this.hexGrid);
  public debug: boolean = false;
  public action?: Actions;

  public currentPlayer: Player;
  /** To update child components will need to use this.playerStats={...this.currentPlayer.stats}
   * as change detection doesn't seem to pick up object property changes without observables
   */
  public playerStats: PlayerStats;
  public structureData = structureData;
  public actionsTaken: number = 0;

  constructor(public gameService: GameService) {
    initCssVars();
    this.gameService.init();
    this.onNewGame();

    this.currentPlayer = this.gameService.getCurrentPlayer();
    this.playerStats = this.currentPlayer.stats;
  }
  public onNewGame() {
    this.gameService.gameRound = 0;
    this.generateMap();
    this.resetPlayers();
    this.assignPlayerStartPositions();
    this.refreshStats();
  }

  private generateMap(): void {
    this.hexGrid = generateMap();
    this.interactableTiles = getInteractableTiles(this.hexGrid);
    this.setTileSubscriptions();
  }

  private resetPlayers() {
    const MAX_PLAYERS = 6;
    this.gameService.resetPlayers(GAME_PLAYERS);
    this.currentPlayer = this.gameService.getRandomStartPlayer();
    // this.currentPlayer = this.gameService.getCurrentPlayer();
  }

  private assignPlayerStartPositions() {
    const players = this.gameService.players;
    players.forEach((player) => {
      const startTile = this.findStartTileForNewPlayer(
        player.id,
        players.length
      );
      startTile.data.owner = player.id;
      startTile.data.color = player.color;
      startTile.data.structure = STRUCTURE_TYPES.dock;

      player.addTile(startTile);
    });
  }

  private refreshStats(): void {
    // console.log(`Refresh Stats`);
    this.playerStats = { ...this.currentPlayer.stats };
    // console.table(this.currentPlayer.stats);
  }

  private setTileSubscriptions() {
    this.interactableTiles.forEach((h) => {
      // TODO: Add .pipe(takeUntil(this.clearSub$))
      h.getClickObs().subscribe(() => {
        if (
          this.action != null &&
          this.action != Actions.EndTurn &&
          h.data.color === "white"
        ) {
          this.executeBuildAction(this.action, h);
          this.action = undefined;
          this.clearHexHighlight(this.interactableTiles);
        }
      });
    });
  }

  private executeBuildAction(
    action: Exclude<Actions, Actions.EndTurn>,
    hex: TileHex
  ): void {
    const player = this.currentPlayer;
    hex.data.structure = structureBuildMap[action];
    hex.data.owner = player.id;
    hex.data.color = player.color;
    player.buildTile(hex);
    this.actionsTaken++;
    this.refreshStats();
    if (action == Actions.BuildMonument && hex.data.structure === "monument") {
      const playAgain = this.gameService.end(player);
      playAgain ? this.onNewGame() : alert("Feel free to continue playing");
    }
  }

  private findStartTileForNewPlayer(playerIdx: number, totalPlayers: number) {
    const startMap = Object.values(AVAILABLE_START_POSITIONS_WATER);
    let playerStartPositionIdx = playerIdx + 1;
    if (totalPlayers === 4 && playerIdx > 1) {
      playerStartPositionIdx++;
    } else {
      const equalMapSlice = Math.floor(startMap.length / totalPlayers); // 6/2 = 3
      playerStartPositionIdx =
        (equalMapSlice * (playerIdx + 1)) % startMap.length; // 3*1 % 6
    }

    const startTileCoordinates: HexCoordinates =
      startMap[playerStartPositionIdx];
    const playerStartTile = this.hexGrid.getHex(startTileCoordinates);
    if (!playerStartTile) {
      throw new Error(
        `Start tile coordinates ${JSON.stringify(startTileCoordinates)} invalid`
      );
    }
    return playerStartTile;
  }

  private getAvailableBuildTiles() {
    const availableTiles = new Set<TileHex>();
    // get from player object
    const playerTiles: TileHex[] =
      this.gameService.getCurrentPlayer().ownedTiles;

    // Tile filter:
    // * No water tiles (for now until dock?)
    // * For road: can only be env tile
    // * For structures: env tile that is not adjacent to another structure
    //   Implement later: or same tile to upgrade existing structure

    const availableTilesArr = playerTiles.flatMap((tile): TileHex[] => {
      if (!this.action) {
        throw new Error(`Action is not available`);
      }

      // ===== Tiles for Road ===== //
      if (this.action === Actions.BuildRoad) {
        return this.getHexNeighbors(tile).filter((n) => {
          const neighborTileIsWater = n.data.type === HEX_TYPES.water;
          const neighborTileIsEnvironment = n.data.owner === -1;
          return !neighborTileIsWater && neighborTileIsEnvironment;
        });
      }

      // ===== Tiles for Capitol ===== //
      if (this.action === Actions.BuildCapitol) {
        if (this.currentPlayer.stats.structureCount.capitol > 0) {
          return [];
        }
        return tile.data.structure === "city" ? [tile] : [];
      }

      // ===== Tiles for Monument ===== //
      if (this.action === Actions.BuildMonument) {
        if (this.currentPlayer.stats.structureCount.monument > 0) {
          return [];
        }
        return tile.data.structure === "city" ? [tile] : [];
      }

      // ===== Tiles for City ===== //
      if (this.action === Actions.BuildCity) {
        return tile.data.structure === "outpost" ? [tile] : [];
      }

      // ===== Tiles for Outpost or Monument ===== //
      // For current tile, can only build a structure on the neighbor tile
      //  * if the neighbor tile doe not have a neighbor structure.
      //  * if neighbor tile is not water
      //  * if the neighbor tile is an environment tile ( no owner)
      return this.getHexNeighbors(tile).filter((n) => {
        const neighborTileIsWater = n.data.type === HEX_TYPES.water;
        const neighborTileIsEnvironment = n.data.owner === -1;
        const neighborTileHasNeighborStructure = this.getHexNeighbors(n)
          .map(
            (n2) =>
              !!n2.data.structure && n2.data.structure !== STRUCTURE_TYPES.road
          )
          .reduce((acc, curr) => acc || curr);
        // console.log(
        //   `neighborTileHasNeighborStructure`,
        //   neighborTileHasNeighborStructure,
        //   [tile.row, tile.col]
        // );
        return (
          !neighborTileIsWater &&
          neighborTileIsEnvironment &&
          !neighborTileHasNeighborStructure
        );
      });
    });

    // Unique Tiles
    availableTilesArr.forEach((tile) => availableTiles.add(tile));

    return availableTiles;
  }

  public onAction(action: Actions): void {
    this.action = action;
    this.clearHexHighlight(this.interactableTiles);
    if (action === Actions.EndTurn) {
      this.currentPlayer.updateActionCount();
      this.actionsTaken = 0;
      this.currentPlayer = this.gameService.setNextPLayerTurn();
      this.refreshStats();
    } else {
      this.onBuild();
    }
  }

  public onCancelAction(): void {
    this.action = undefined;
    this.clearHexHighlight(this.interactableTiles);
  }

  public onBuild() {
    const availableTiles = this.getAvailableBuildTiles();
    if (availableTiles.size <= 0) {
      this.action = undefined;
      return alert("No available tiles to build on for this structure");
    }
    availableTiles.forEach((h) => {
      h.data.color = COLORS_SYSTEM.white;
    });
  }

  public clearHexHighlight(h: Set<TileHex> | TileHex[] | Grid<TileHex>): void {
    h.forEach((h) => {
      // WHite color is highlight
      if (h.data.color === COLORS_SYSTEM.white) {
        // If tile is  env then can switch back to default grey,
        // Otherwise need to revert to player owned color
        h.data.color =
          h.data.owner === -1
            ? COLORS_SYSTEM.grey
            : this.gameService.players[h.data.owner].color;
      }
    });
  }

  private getHexNeighbors(coordinates: HexCoordinates) {
    return Object.values(Direction)
      .filter((d): d is Direction => !isNaN(Number(d)))
      .filter((d) => d !== Direction.S && d !== Direction.N)
      .map((d: Direction) =>
        this.hexGrid.neighborOf(coordinates, d, { allowOutside: false })
      )
      .filter((h): h is TileHex => !!h);
  }

  public canBuildStructure(structure: StructureType): string | null {
    // Action Requirements
    if (this.actionsTaken >= this.currentPlayer.maxActions) {
      return "Not Enough Actions";
    }

    // Structure Requirements
    if (
      structure === STRUCTURE_TYPES.capitol &&
      (this.currentPlayer.stats.structureCount.capitol >= 1 ||
        this.currentPlayer.stats.structureCount.city <= 0)
    ) {
      return "Structure requirement not met";
    }

    if (
      structure === STRUCTURE_TYPES.monument &&
      (this.currentPlayer.stats.structureCount.monument >= 1 ||
        this.currentPlayer.stats.structureCount.city <= 0)
    ) {
      return "Structure requirement not met";
    }

    if (
      structure === STRUCTURE_TYPES.city &&
      this.currentPlayer.stats.structureCount.outpost <= 0
    ) {
      return "Structure requirement not met";
    }

    // Resource Requirements
    const reqMet = Object.entries(structureData[structure].buildingRequirement)
      .flatMap(
        ([resourceType, requirementCount]) =>
          this.currentPlayer.stats.resourceCount[
            resourceType as ResourceType
          ] >= requirementCount
      )
      .reduce((acc, curr) => acc && curr);
    return reqMet ? null : "Not enough Resources";
  }
}
