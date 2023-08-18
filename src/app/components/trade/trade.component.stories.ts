import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { TradeComponent } from './trade.component';
import { GameService, MARKET_RATES, ResourceTypes } from 'src/app/utils';

type ComponentWithCustomControls = TradeComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Trade',
  component: TradeComponent,
  decorators: [moduleMetadata({ providers: [GameService] })],
  parameters: {
    docs: { description: { component: `Trade` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    moneyResource: { options: ResourceTypes, control: { type: 'select' } },
    resourceType: { options: ResourceTypes, control: { type: 'select' } },
    // Output
    tradeChange: { action: 'tradeChange', table: { disable: true } },
    // onTradeAction: { action: 'onTradeAction', table: { disable: true } },
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    resourceType: 'food',
    moneyResource: 'gold',
    marketRate: { ...MARKET_RATES },
  },
};
export default meta;

export const Trade: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({
    props: args,
  }),
};
