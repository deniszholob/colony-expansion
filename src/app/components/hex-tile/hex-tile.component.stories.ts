import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { HexTileComponent } from './hex-tile.component';
import { HexTileModule } from './hex-tile.module';

type ComponentWithCustomControls = HexTileComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Hex Tile',
  component: HexTileComponent,
  decorators: [
    moduleMetadata({
      imports: [HexTileModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `HexTile` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const HexTile = Template.bind({});
HexTile.args = {};
