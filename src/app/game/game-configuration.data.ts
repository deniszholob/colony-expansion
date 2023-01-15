import { HexCoordinates } from "honeycomb-grid";
import { InitPlayer, StatResources } from "./player.model";

export const PLAYER_STARTING_RESOURCES_NORMAL: StatResources = {
  food: 5,
  gold: 5,
  stone: 15,
  wood: 5,
  actions: 5,
};

export const PLAYER_STARTING_RESOURCES_DEV: StatResources = {
  food: 999,
  gold: 999,
  stone: 999,
  wood: 999,
  actions: 999,
};

export const MAX_PLAYERS = 6;
export const GAME_PLAYERS: InitPlayer[] = [
  // { color: "cyan", name: "AAA" },
  // { color: "magenta", name: "BBB" },
  // { color: "yellow", name: "CCC" },
  { color: "red", name: "DDD" },
  // { color: "orange", name: "EEE" },
  // { color: "violet", name: "FFF" },
];

export const AVAILABLE_START_POSITIONS_WATER: Record<number, HexCoordinates> = {
  0: { row: 7, col: 0 },
  60: { row: 0, col: 4 },
  120: { row: 0, col: 11 },
  180: { row: 7, col: 14 },
  240: { row: 14, col: 11 },
  300: { row: 14, col: 4 },
};

export const AVAILABLE_START_POSITIONS_LAND: Record<number, HexCoordinates> = {
  0: { row: 7, col: 1 },
  60: { row: 1, col: 4 },
  120: { row: 1, col: 10 },
  180: { row: 7, col: 13 },
  240: { row: 13, col: 10 },
  300: { row: 13, col: 4 },
};
