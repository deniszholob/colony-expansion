import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { TileDataComponent } from './tile-data.component';
import { TileDataModule } from './tile-data.module';

type ComponentWithCustomControls = TileDataComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Tile Data',
  component: TileDataComponent,
  decorators: [
    moduleMetadata({
      imports: [TileDataModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `TileData` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const TileData = Template.bind({});
TileData.args = {};
