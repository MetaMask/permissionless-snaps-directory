import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Tabs = defineStyleConfig({
  baseStyle: defineStyle({
    tab: {
      marginLeft: '4',
      marginRight: '4',
      _selected: {
        color: 'text.default',
      },
    },
    root: {
      width: '100%',
      color: 'text.alternative',
    },
  }),
});
