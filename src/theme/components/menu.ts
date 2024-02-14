import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

export const Menu = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    list: {
      border: 'none',
      borderRadius: 'lg',
      padding: '1',
      boxShadow: 'md',
      background: 'background.default',
    },
    item: {
      padding: '2',
      background: 'none',
      _hover: {
        background: 'background.default-hover',
      },
    },
    groupTitle: {
      textTransform: 'uppercase',
      color: 'text.alternative',
      fontSize: 'sm',
      fontWeight: '500',
      marginBottom: '1',
    },
  }),
  variants: {
    'icon-menu': {
      list: {
        background: 'background.alternative',
        _hover: {
          background: 'background.alternative-hover',
        },
      },
      item: {
        margin: '0.5rem',
        borderRadius: '0.5rem',
        background: 'background.default',
        _hover: {
          background: 'background.default-hover',
        },
      },
    },
  },
});
