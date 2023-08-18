import { Meta, StoryObj } from '@storybook/angular';

import { ResourceTypes } from 'src/app/utils';
import { StatsGroupComponent } from './stats-group.component';
import { MOCK_StatEntity } from '../stats-entity/stats-entity.mock';

type ComponentWithCustomControls = StatsGroupComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Stats Group',
  component: StatsGroupComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `StatsGroup` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    marketMoneyTradeResource: {
      options: ResourceTypes,
      control: { type: 'select' },
    },
    // Output
    tradeChange: { action: 'tradeChange', table: { disable: true } },
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    marketMoneyTradeResource: 'gold',
    stats: MOCK_StatEntity,
  },
};
export default meta;

export const StatsGroup: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
