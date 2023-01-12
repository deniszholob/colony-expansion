import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { StatsBarComponent } from './stats-bar.component';
import { StatsBarModule } from './stats-bar.module';

type ComponentWithCustomControls = StatsBarComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Stats Bar',
  component: StatsBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StatsBarModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `StatsBar` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const StatsBar = Template.bind({});
StatsBar.args = {};
