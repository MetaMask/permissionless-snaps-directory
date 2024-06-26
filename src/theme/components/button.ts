import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: defineStyle({
    _hover: {
      opacity: '0.75',
    },
  }),

  variants: {
    solid: defineStyle({
      bg: '#24272A',
      textColor: 'white',
      _hover: {
        bg: '#0376C9',
      },
      _active: {
        bg: '#0376C9',
      },
    }),

    primary: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'info.default',
      fontSize: 'md',
      fontWeight: '500',
      lineHeight: '157%',
      color: 'white',
      borderColor: 'info.default',
      padding: '4',
      _hover: {
        _disabled: {
          background: 'info.default',
        },
      },
    }),

    primaryPortableError: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'error.default',
      color: 'white',
      borderColor: 'error.default',
      padding: '4',
      _hover: {
        _disabled: {
          background: 'error.default',
        },
      },
    }),

    primaryPortable: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'info.default',
      color: 'white',
      borderColor: 'info.default',
      padding: '4',
      _hover: {
        _disabled: {
          background: 'info.default',
        },
      },
    }),

    outline: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'transparent',
      fontSize: 'md',
      fontWeight: '500',
      lineHeight: '157%',
      color: 'info.default',
      border: '1.5px solid',
      borderColor: 'info.default',
      padding: '4',
    }),

    outlinePortableError: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'transparent',
      color: 'error.default',
      border: '1.5px solid',
      borderColor: 'error.default',
      padding: '4',
    }),

    outlinePortable: defineStyle({
      height: '48px',
      borderRadius: '30px',
      background: 'transparent',
      color: 'info.default',
      border: '1.5px solid',
      borderColor: 'info.default',
      padding: '4',
    }),

    filter: defineStyle({
      background: 'background.alternative',
      _hover: {
        background: 'background.alternative-hover',
        opacity: 1,
      },
    }),

    small: defineStyle({
      fontSize: 'sm',
      fontWeight: '500',
      height: '26px',
      borderRadius: '36px',
      background: 'background.alternative',
      borderColor: 'info.default',
      color: 'text.alternative',
      transitionDuration: 'normal',
      _hover: {
        '.chakra-button__icon': {
          svg: {
            fill: 'white',
          },
        },
      },
      '.chakra-button__icon': {
        marginLeft: '1',
        svg: {
          transitionDuration: 'normal',
        },
      },
    }),

    connect: defineStyle({
      borderRadius: '36px',
      background: 'info.default',
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: '157%',
      color: 'white',
      padding: '4',
    }),

    connected: defineStyle({
      borderRadius: '36px',
      background: 'background.alternative',
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: '157%',
      color: 'text.alternative',
      padding: '4',
      _hover: {
        background: 'info.default',
        color: 'white',
      },
    }),
  },
});
