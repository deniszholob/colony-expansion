import { Meta, StoryObj } from '@storybook/angular';

import { StatEntity, StatsGroupComponent } from './stats-group.component';

const MOCK_StatEntity: StatEntity[] = [
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
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    stats: MOCK_StatEntity,
  },
};
export default meta;

export const StatsGroup: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
