import { Meta, StoryObj } from '@storybook/angular';

import { StatsBarComponent } from './stats-bar.component';
import { MOCK_PlayerStats } from './stats-bar.mock';

type ComponentWithCustomControls = StatsBarComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Stats Bar',
  component: StatsBarComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `StatsBar` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    // Output
    // onTrade: { action: 'onTrade', table: { disable: true } },
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    playerStats: MOCK_PlayerStats,
    marketTradeEnabled: true,
  },
};
export default meta;

export const StatsBar: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
