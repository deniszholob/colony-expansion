import { Meta, StoryObj } from '@storybook/angular';
import { StructureTypes } from 'src/app/utils';

import { StructureDataComponent } from './structure-data.component';

type ComponentWithCustomControls = StructureDataComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Structure Data',
  component: StructureDataComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `StructureData` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    type: { options: [...StructureTypes], control: { type: 'select' } }, // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {
    type: 'capitol',
  },
};
export default meta;

export const StructureData: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
