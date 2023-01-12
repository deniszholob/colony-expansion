import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { StructureDataComponent } from './structure-data.component';
import { StructureDataModule } from './structure-data.module';

type ComponentWithCustomControls = StructureDataComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Structure Data',
  component: StructureDataComponent,
  decorators: [
    moduleMetadata({
      imports: [StructureDataModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `StructureData` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const StructureData = Template.bind({});
StructureData.args = {};
