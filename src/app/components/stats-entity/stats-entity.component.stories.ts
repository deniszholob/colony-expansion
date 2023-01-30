import { Meta, StoryObj } from '@storybook/angular';
import { ResourceTypes } from 'src/app/utils';

import { StatsEntityComponent } from './stats-entity.component';

type ComponentWithCustomControls = StatsEntityComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Stats Entity',
  component: StatsEntityComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `StatsEntity` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    statType: { options: [...ResourceTypes], control: { type: 'select' } },
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    statCount: 0,
    statRate: 0,
    statType: 'food',
  },
};
export default meta;

export const StatsEntity: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
