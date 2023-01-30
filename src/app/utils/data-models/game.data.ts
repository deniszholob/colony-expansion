export const RESOURCE_TYPES = {
  food: 'food',
  wood: 'wood',
  stone: 'stone',
  gold: 'gold',
  actions: 'actions',
} as const;
export type ResourceType = keyof typeof RESOURCE_TYPES;
export const ResourceTypes: ResourceType[] = Object.keys(RESOURCE_TYPES).filter(
  (v): v is ResourceType => v in RESOURCE_TYPES
);

export const HEX_TYPES = {
  grass: 'grass',
  forest: 'forest',
  mountains: 'mountains',
  water: 'water',
} as const;
export type HexType = keyof typeof HEX_TYPES;
export const HexTypes: HexType[] = Object.keys(HEX_TYPES).filter(
  (v): v is HexType => v in HEX_TYPES
);

export const STRUCTURE_TYPES = {
  road: 'road',
  outpost: 'outpost',
  city: 'city',
  capitol: 'capitol',
  dock: 'dock',
  monument: 'monument',
} as const;
export type StructureType = keyof typeof STRUCTURE_TYPES;
export const StructureTypes: StructureType[] = Object.keys(
  STRUCTURE_TYPES
).filter((v): v is StructureType => v in STRUCTURE_TYPES);

export const TILE_PROBABILITIES: Record<HexType, number> = {
  grass: 0.9,
  forest: 0.9,
  mountains: 0.9,
  water: 0.5,
};
export const tileProbabilities: number[] = Object.values(TILE_PROBABILITIES);
export const TILE_PROBABILITY_TOTAL = tileProbabilities.reduce(
  (a, b) => a + b,
  0
);

export const COLORS_PLAYER = {
  cyan: 'cyan',
  magenta: 'magenta',
  yellow: 'yellow',
  red: 'red',
  orange: 'orange',
  violet: 'violet',
} as const;

export const COLORS_SYSTEM = {
  grey: 'grey',
  white: 'white',
} as const;

export type ColorsPlayer = keyof typeof COLORS_PLAYER;
export type ColorsSystem = keyof typeof COLORS_SYSTEM;

// function constToArray<T>(obj:){
//   Object.keys(PLAYER_COLORS).filter(
//     (v): v is T => v in PLAYER_COLORS
//   );
// }

export const ICON_MAP: Record<ResourceType | StructureType | HexType, string> =
  {
    food: 'apple',
    // food: "wheat",
    gold: 'ore_gold',
    stone: 'rockGrey_small4',
    // wood: "logPile",
    wood: 'treePine_large',
    actions: 'hourglass',
    // ===================== //
    capitol: 'oldBuilding',
    city: 'housing',
    outpost: 'militaryOutlook',
    road: 'stone_02',
    dock: 'mill_hightop',
    monument: 'scifi_scraper2',
    // ===================== //
    water: 'water_03',
    grass: 'grass-wheat-02',
    forest: 'grass_12',
    mountains: 'grass_14',
  };

export type ProductionData = Partial<Record<ResourceType, number>>;
export type StructuresData = Record<StructureType, StructureData>;
export type StructureData = {
  description: string;
  note: string;
  buildingRequirement: ProductionData;
  productionMultiplier: number;
  bonusProduction?: ProductionData;
};

export const structureData: StructuresData = {
  road: {
    description: 'Connects other structures, covers up resources',
    note: 'Necessary for expansion',
    buildingRequirement: { stone: 5, gold: 1 },
    productionMultiplier: 0,
  },
  outpost: {
    description: 'Produces resources from the non road tile its built on',
    note: 'Cannot build next to other structure',
    buildingRequirement: { food: 5, wood: 5, gold: 2, stone: 2 },
    productionMultiplier: 1,
    bonusProduction: { gold: 1, actions: 1 },
  },
  city: {
    description: 'Upgrade from Outpost',
    note: 'Produces more resources',
    buildingRequirement: { stone: 10, food: 50, wood: 30, gold: 10 },
    productionMultiplier: 2,
    bonusProduction: { gold: 2, actions: 2 },
  },
  capitol: {
    description: 'Upgrade from City',
    note: 'Can build only 1',
    buildingRequirement: { stone: 100, food: 100, wood: 100, gold: 100 },
    productionMultiplier: 4,
    bonusProduction: { gold: 3, actions: 4 },
  },
  monument: {
    description: 'Victory Condition: signifies your claim for this island',
    note: 'Build in City. Can build only 1',
    buildingRequirement: {
      stone: 1000,
      wood: 500,
      gold: 500,
    },
    productionMultiplier: 1,
    bonusProduction: { actions: 5 },
  },
  dock: {
    description:
      'Starting structure, receives resource shipments for colony, not buildable',
    note: 'Cannot build next to other structure',
    buildingRequirement: { stone: 10, wood: 20, gold: 15 },
    productionMultiplier: 1,
    bonusProduction: { gold: 1, stone: 1, food: 1, wood: 1, actions: 1 },
  },
} as const;

export type TileData = {
  // buildingCost: ProductionData;
  production: ProductionData;
};

export const hexTileProductionData: Record<HexType, TileData> = {
  forest: { production: { wood: 5, food: 1 } },
  grass: { production: { food: 5 } },
  mountains: { production: { stone: 5, wood: 1 } },
  water: { production: {} },
  // water: { production: { food: 3 } },
};
