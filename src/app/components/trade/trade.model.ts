import { ResourceType } from 'src/app/utils';

export interface Trade {
  tradeResource: ResourceType;
  tradeResourceChange: number;
  moneyResource: ResourceType;
  moneyResourceChange: number;
}
