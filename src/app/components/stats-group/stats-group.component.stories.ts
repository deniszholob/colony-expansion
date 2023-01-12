import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { StatsGroupComponent } from './stats-group.component';
import { StatsGroupModule } from './stats-group.module';

type ComponentWithCustomControls = StatsGroupComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Stats Group',
  component: StatsGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [StatsGroupModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `StatsGroup` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const StatsGroup = Template.bind({});
StatsGroup.args = {};
