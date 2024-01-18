import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'text.default',
    lineHeight: 'base',
  },

  variants: {
    muted: {
      color: 'text.muted',
    },
    red: {
      color: 'error.default',
    },
    blue: {
      color: 'info.default',
    },
    'small-description': {
      fontSize: '0.625rem',
      lineHeight: '1rem',
      letterSpacing: '0.016rem',
    },
  },
});
