import { StatEntity } from './stats-entity.model';

export const MOCK_StatEntity: StatEntity[] = [
  {
    statType: 'food',
    statCount: 0,
    statRate: 0,
  },
  {
    statType: 'wood',
    statCount: 10,
    statRate: 10,
  },
  {
    statType: 'stone',
    statCount: -10,
    statRate: -10,
  },
];
