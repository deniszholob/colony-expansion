import { Parameters } from '@storybook/angular';
import { themes } from '@storybook/theming';

export const parameters: Parameters = {
  // layout: 'fullscreen', // centered, fullscreen, padded
  docs: {
    story: { inline: true }, // render the story in an iframe
    canvas: { sourceState: 'shown' }, // start with the source open
    // source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    toc: true,
    theme: themes.dark,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
    matchers: {
      color: /(background|color)/i,
      date: /Date$/,
    },
  },
  // backgrounds: { default: 'dark' },
};

export const decorators = [
  // (storyFunc: any) => {
  //   const story = storyFunc();
  //   console.log('decorators', story);
  //   return {
  //     ...story,
  //     template: `${story.template}`,
  //   };
  // },
  //   (storyFunc: any) => {
  //     const story = storyFunc();
  //     return {
  //       ...story,
  //       template: `<div class="site">${story.template}</div>`,
  //     };
  //   },
];
