import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { StatsEntityComponent } from './stats-entity.component';
import { StatsEntityModule } from './stats-entity.module';

type ComponentWithCustomControls = StatsEntityComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Stats Entity',
  component: StatsEntityComponent,
  decorators: [
    moduleMetadata({
      imports: [StatsEntityModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `StatsEntity` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const StatsEntity = Template.bind({});
StatsEntity.args = {};
