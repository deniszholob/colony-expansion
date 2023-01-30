import { Meta, StoryObj } from '@storybook/angular';
import { TileHex } from 'src/app/utils';

import { HexTileComponent } from './hex-tile.component';

type ComponentWithCustomControls = HexTileComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Hex Tile',
  component: HexTileComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `HexTile` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    // Output
    onClick: { action: 'onClick', table: { disable: true } },
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    debug: true,
    hexTile: new TileHex(),
    variant: false,
  },
};
export default meta;

export const HexTile: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => {
    // initCssVars();
    return { props: args };
  },
};
