import { Meta, StoryObj } from '@storybook/angular';
import { HexTypes } from 'src/app/utils';

import { TileDataComponent } from './tile-data.component';

type ComponentWithCustomControls = TileDataComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Tile Data',
  component: TileDataComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `TileData` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    type: { options: [...HexTypes], control: { type: 'select' } }, // Output
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    type: 'forest',
  },
};
export default meta;

export const TileData: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
