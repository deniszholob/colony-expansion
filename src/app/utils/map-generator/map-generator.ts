import { Grid, HexCoordinates, rectangle, ring, spiral } from 'honeycomb-grid';

import {
  HEX_TYPES,
  HexTypes,
  TILE_PROBABILITY_TOTAL,
  tileProbabilities,
} from '../data-models/game.data';
import { TileHex } from '../data-models/hex.model';

const HEX_MARGIN = 1; //px
const HEX_SIZE = 55; // px
const HEX_BOX_HEIGHT: number = HEX_SIZE / Math.sqrt(3);
const HEX_SIZE_TOTAL: number = HEX_SIZE + HEX_MARGIN * 2;
const HEX_VERTICAL_REPEAT: number =
  HEX_SIZE * Math.sqrt(3) + 4 * HEX_MARGIN - 1;
const GRID_SIZE = 15;
const GRID_RADIUS: number = Math.floor(GRID_SIZE / 2);
const ISLAND_SIZE: number = GRID_SIZE - 3;
const ISLAND_RADIUS: number = Math.floor(ISLAND_SIZE / 2);
const ISLAND_ORIGIN: HexCoordinates = {
  row: GRID_RADIUS,
  col: GRID_RADIUS,
};
const GRID_X: number = (GRID_SIZE + 0.5) * HEX_SIZE_TOTAL;
const GRID_Y: number = (GRID_SIZE + 1) * HEX_SIZE_TOTAL * (1 - 0.2886 / 2);

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

export function newGrid(): Grid<TileHex> {
  return new Grid<TileHex>(TileHex, rectangleTraverser);
}

// TODO: Rewrite so you can pass in parameters
export function generateMap(): Grid<TileHex> {
  const hexGrid: Grid<TileHex> = newGrid();
  hexGrid.traverse(spiralTraverser).forEach((tile: TileHex): void => {
    const rand: number = Math.random();
    let cumulativeProbability: number = 0;
    for (let i = 0; i < HexTypes.length; i++) {
      cumulativeProbability += tileProbabilities[i] / TILE_PROBABILITY_TOTAL;
      if (rand < cumulativeProbability) {
        tile.data.type = HexTypes[i];
        break;
      }
    }
    // !!Math.round(Math.random()) ? (tile.data.structure = 'road') : undefined;
  });

  // Outer ring replace water with grass
  hexGrid.traverse(ringTraverser).forEach((tile: TileHex): void => {
    if (tile.data.type === HEX_TYPES.water) {
      tile.data.type = HEX_TYPES.grass;
    }
  });

  return hexGrid;
}

export function getInteractableTiles(hexGrid: Grid<TileHex>): Grid<TileHex> {
  // Not doing anything with water atm
  return hexGrid.filter(
    (h: TileHex): boolean => h.data.type !== HEX_TYPES.water
  );
}

export function initCssVars(): void {
  setCssVar('--hex-size', `${HEX_SIZE}px`);
  setCssVar('--hex-margin', `${HEX_MARGIN}px`);
  setCssVar('--hex-box-height', `${HEX_BOX_HEIGHT}px`);
  setCssVar('--hex-v-repeat', `${HEX_VERTICAL_REPEAT}px`);
  setCssVar('--grid-x', `${GRID_X}px`);
  setCssVar('--grid-y', `${GRID_Y}px`);
}

function setCssVar(variable: string, value: string): void {
  document.documentElement.style.setProperty(variable, value);
}

export function printHexInfo(): void {
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
  // hexTile.data.type = "grass";
  // hexTile.data.structure = "capitol";
  // hexTile.data.yield = 2;
}
