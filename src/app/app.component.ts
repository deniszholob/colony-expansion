import { Component } from "@angular/core";
import {
  Direction,
  Grid,
  HexCoordinates,
  rectangle,
  ring,
  spiral,
} from "honeycomb-grid";
import { TileHex } from "./components/hex-tile/hex.model";
import {
  hexTypes,
  HEX_TYPES,
  structureData,
  StructureType,
  STRUCTURE_TYPES,
  tileProbabilities,
  TILE_PROBABILITY_TOTAL,
  ResourceType,
} from "./game/game.data";

import { Actions, GameService, structureBuildMap } from "./game/game.service";
import { Player, PlayerStats } from "./game/player.model";

const HEX_MARGIN = 1; //px
const HEX_SIZE = 55; // px
const HEX_BOX_HEIGHT = HEX_SIZE / Math.sqrt(3);
const HEX_SIZE_TOTAL = HEX_SIZE + HEX_MARGIN * 2;
const HEX_VERTICAL_REPEAT = HEX_SIZE * Math.sqrt(3) + 4 * HEX_MARGIN - 1;
const GRID_SIZE = 15;
const GRID_RADIUS = Math.floor(GRID_SIZE / 2);
const ISLAND_SIZE = GRID_SIZE - 3;
const ISLAND_RADIUS = Math.floor(ISLAND_SIZE / 2);
const ISLAND_ORIGIN: HexCoordinates = {
  row: GRID_RADIUS,
  col: GRID_RADIUS,
};
const GRID_X = (GRID_SIZE + 0.5) * HEX_SIZE_TOTAL;
const GRID_Y = (GRID_SIZE + 1) * HEX_SIZE_TOTAL * (1 - 0.2886 / 2);

const rectangleTraverser = rectangle<TileHex>({
  width: GRID_SIZE,
  height: GRID_SIZE,
});

const spiralTraverser = spiral<TileHex>({
  start: ISLAND_ORIGIN,
  radius: ISLAND_RADIUS,
});
const ringTraverser = ring<TileHex>({
  center: ISLAND_ORIGIN,
  radius: ISLAND_RADIUS,
});
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public readonly Actions = Actions;
  // public hexTile: TileHex = new TileHex();
  public hexGrid: Grid<TileHex> = new Grid<TileHex>(
    TileHex,
    rectangleTraverser
  );
  public interactableTiles: Grid<TileHex> = this.getInteractableTiles();
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
    // this.sbx();
    this.initCssVars();
    this.gameService.init();
    this.onNewGame();

    this.currentPlayer = this.gameService.getCurrentPlayer();
    this.playerStats = this.currentPlayer.stats;
  }

  private initCssVars() {
    this.setCssVar("--hex-size", `${HEX_SIZE}px`);
    this.setCssVar("--hex-box-height", `${HEX_BOX_HEIGHT}px`);
    this.setCssVar("--hex-margin", `${HEX_MARGIN}px`);
    this.setCssVar("--hex-v-repeat", `${HEX_VERTICAL_REPEAT}px`);
    this.setCssVar("--grid-x", `${GRID_X}px`);
    this.setCssVar("--grid-y", `${GRID_Y}px`);
  }

  private setCssVar(variable: string, value: string): void {
    document.documentElement.style.setProperty(variable, value);
  }

  private generateMap(): void {
    this.hexGrid = new Grid<TileHex>(TileHex, rectangleTraverser);
    this.hexGrid.traverse(spiralTraverser).forEach((tile) => {
      const rand = Math.random();
      let cumulativeProbability = 0;
      for (let i = 0; i < hexTypes.length; i++) {
        cumulativeProbability += tileProbabilities[i] / TILE_PROBABILITY_TOTAL;
        if (rand < cumulativeProbability) {
          tile.data.type = hexTypes[i];
          break;
        }
      }
      // !!Math.round(Math.random()) ? (tile.data.structure = 'road') : undefined;
    });

    this.hexGrid.traverse(ringTraverser).forEach((tile) => {
      tile.data.type = HEX_TYPES.grass;
    });

    this.interactableTiles = this.getInteractableTiles();
    this.setTileSubscriptions();
  }

  private getInteractableTiles(): Grid<TileHex> {
    // Not doing anything with water atm
    return this.hexGrid.filter(
      (h: TileHex): boolean => h.data.type !== HEX_TYPES.water
    );
  }

  private setTileSubscriptions() {
    this.interactableTiles.forEach((h) => {
      // TODO: Add .pipe(takeUntil(this.clearSub$))
      h.getClickObs().subscribe(() => {
        if (
          this.action != null &&
          this.action != Actions.EndTurn &&
          h.data.ownerColor === "white"
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
    hex.data.ownerColor = player.color;
    player.buildTile(hex);
    this.actionsTaken++;
    this.refreshStats();
    if (action == Actions.BuildMonument && hex.data.structure === "monument") {
      const playAgain = this.gameService.end(player);
      playAgain ? this.onNewGame() : alert("Feel free to continue playing");
    }
  }

  private refreshStats(): void {
    console.log(`Refresh Stats`);
    this.playerStats = { ...this.currentPlayer.stats };
    // console.table(this.currentPlayer.stats);
  }

  public onNewGame() {
    this.gameService.gameRound = 0;
    this.generateMap();
    this.resetPlayers();
    this.assignPlayerStartPositions();
    this.refreshStats();
  }

  private resetPlayers() {
    const MAX_PLAYERS = 6;
    this.gameService.resetPlayers([
      // { color: "cyan", name: "AAA" },
      // { color: "magenta", name: "BBB" },
      // { color: "yellow", name: "CCC" },
      { color: "red", name: "DDD" },
      // { color: "orange", name: "EEE" },
      // { color: "violet", name: "FFF" },
    ]);
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
      startTile.data.ownerColor = player.color;
      startTile.data.structure = STRUCTURE_TYPES.dock;

      player.addTile(startTile);
    });
  }

  private findStartTileForNewPlayer(playerIdx: number, totalPlayers: number) {
    const availableStartPositions = {
      // 0: { row: 7, col: 1 },
      // 60: { row: 1, col: 4 },
      // 120: { row: 1, col: 10 },
      // 180: { row: 7, col: 13 },
      // 240: { row: 13, col: 10 },
      // 300: { row: 13, col: 4 },
      0: { row: 7, col: 0 },
      60: { row: 0, col: 4 },
      120: { row: 0, col: 11 },
      180: { row: 7, col: 14 },
      240: { row: 14, col: 11 },
      300: { row: 14, col: 4 },
    };
    const startMap = Object.values(availableStartPositions);
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

      // ===== Tiles for City ===== //
      if (this.action === Actions.BuildCity) {
        return tile.data.structure === "outpost" ? [tile] : [];
      }

      // ===== Tiles for Monument ===== //
      if (
        this.action === Actions.BuildMonument &&
        this.currentPlayer.stats.structureCount.monument > 0
      ) {
        return [];
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
        console.log(
          `neighborTileHasNeighborStructure`,
          neighborTileHasNeighborStructure,
          [tile.row, tile.col]
        );
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
      h.data.ownerColor = "white";
    });
  }

  public clearHexHighlight(h: Set<TileHex> | TileHex[] | Grid<TileHex>): void {
    h.forEach((h) => {
      if (h.data.ownerColor === "white") {
        h.data.ownerColor = "grey";
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

  public canBuildStructure(structure: StructureType): boolean {
    if (this.actionsTaken >= this.currentPlayer.maxActions) {
      return false;
    }
    if (
      (structure === STRUCTURE_TYPES.capitol &&
        this.currentPlayer.stats.structureCount.capitol >= 1) ||
      (structure === STRUCTURE_TYPES.monument &&
        this.currentPlayer.stats.structureCount.monument >= 1)
    ) {
      return false;
    }

    const reqMet = Object.entries(structureData[structure].buildingRequirement)
      .flatMap(
        ([resourceType, requirementCount]) =>
          this.currentPlayer.stats.resourceCount[
            resourceType as ResourceType
          ] >= requirementCount
      )
      .reduce((acc, curr) => acc && curr);
    return reqMet;
  }

  private sbx() {
    console.table([
      HEX_MARGIN,
      HEX_SIZE,
      HEX_SIZE_TOTAL,
      GRID_SIZE,
      GRID_RADIUS,
      ISLAND_SIZE,
      ISLAND_RADIUS,
      ISLAND_ORIGIN,
      GRID_X,
      GRID_Y,
    ]);
    // this.hexTile.data.type = "grass";
    // this.hexTile.data.structure = "capitol";
    // this.hexTile.data.yield = 2;
  }
}
