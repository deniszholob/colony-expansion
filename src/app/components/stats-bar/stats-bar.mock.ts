import { PlayerStats } from 'src/app/utils';

export const MOCK_PlayerStats: PlayerStats = {
  resourceRate: {
    food: 10,
    gold: -10,
    stone: 0,
    wood: 0,
    actions: 0,
  },
  resourceCount: {
    food: 0,
    gold: 0,
    stone: 10,
    wood: -10,
    actions: 0,
  },
  structureCount: {
    road: -1,
    outpost: 0,
    city: 1,
    capitol: 0,
    dock: 0,
    monument: 0,
  },
};

export const PlayerStats0: PlayerStats = {
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
