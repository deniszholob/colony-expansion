import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { GameComponent } from './game.component';
import { GameModule } from './game.module';

type ComponentWithCustomControls = GameComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Game',
  component: GameComponent,
  decorators: [
    moduleMetadata({
      imports: [GameModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Game` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const Game = Template.bind({});
Game.args = {};
