import { Meta, StoryObj } from '@storybook/angular';
import { generateMap } from 'src/app/utils';

import { HexGridComponent } from './hex-grid.component';

type ComponentWithCustomControls = HexGridComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Hex Grid',
  component: HexGridComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `HexGrid` } },
    layout: 'fullscreen',
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
    debug: true,
    grid: generateMap(),
  },
};
export default meta;

export const HexGrid: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
