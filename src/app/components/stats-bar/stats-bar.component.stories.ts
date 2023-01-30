import { Meta, StoryObj } from '@storybook/angular';
import { PlayerStats } from 'src/app/utils';

import { StatsBarComponent } from './stats-bar.component';

const MOCK_PlayerStats: PlayerStats = {
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
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    playerStats: MOCK_PlayerStats,
  },
};
export default meta;

export const StatsBar: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
