import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { GameService } from 'src/app/utils';

import { GameComponent } from './game.component';

type ComponentWithCustomControls = GameComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Views/Game',
  component: GameComponent,
  decorators: [moduleMetadata({ providers: [GameService] })],
  parameters: {
    docs: { description: { component: `Game` } },
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

export const Game: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
};
