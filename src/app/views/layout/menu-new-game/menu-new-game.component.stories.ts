import { Meta, StoryObj } from '@storybook/angular';

import { MenuNewGameComponent } from './menu-new-game.component';

type ComponentWithCustomControls = MenuNewGameComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Views/Layout/Menu New Game',
  component: MenuNewGameComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `MenuNewGame` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    // Output
    startChange: { action: 'startChange', table: { disable: true } },
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {},
};
export default meta;

export const MenuNewGame: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
