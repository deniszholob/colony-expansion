import { Meta, StoryObj } from '@storybook/angular';

import { DropdownComponent } from './dropdown.component';

type ComponentWithCustomControls = DropdownComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Dropdown` } },
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
  args: {},
};
export default meta;

export const Dropdown: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({
    props: args,
    template: `
  <app-dropdown>
  <button>Hover Me</button>
  <div class="box" dropdownContent>Hello World!</div>
</app-dropdown>
  `,
  }),
};
