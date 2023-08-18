import { ResourceType, StructureType } from 'src/app/utils';

export interface StatEntity {
  statType: ResourceType | StructureType;
  statCount?: number;
  statRate?: number;
}
