import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { HexGridComponent } from './hex-grid.component';
import { HexGridModule } from './hex-grid.module';

type ComponentWithCustomControls = HexGridComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Hex Grid',
  component: HexGridComponent,
  decorators: [
    moduleMetadata({
      imports: [HexGridModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `HexGrid` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const HexGrid = Template.bind({});
HexGrid.args = {};
