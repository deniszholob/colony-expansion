import { Meta, StoryObj } from '@storybook/angular';

import { FooterComponent } from './footer.component';

type ComponentWithCustomControls = FooterComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Views/Layout/Footer',
  component: FooterComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Footer` } },
    // layout: 'fullscreen',
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
    version: '1.0',
    updated: 0,
  },
};
export default meta;

export const Footer: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
