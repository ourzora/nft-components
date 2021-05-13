import { create } from '@storybook/theming';

import header from './brand.png';

export default create({
  base: 'light',
  brandTitle: 'Zora Engineering',
  brandUrl: 'https://zora.engineering/',
  brandImage: header,
});
