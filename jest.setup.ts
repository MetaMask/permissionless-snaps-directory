/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-nodejs-modules */
// eslint-disable-next-line import/order
import { beforeEach } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { TextEncoder, TextDecoder } from 'util';

expect.extend({ toMatchImageSnapshot });

// Polyfill global TextEncoder and TextDecoder
global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

beforeEach(() => {
  const originalConsoleError = console.error;
  jest.spyOn(console, 'error').mockImplementation((error, ...args) => {
    // When testing the pages' Head component, we get the following error:
    // "<html> cannot appear as a child of <div>."
    // Because `@testing-library/react` renders the page in a div. We can
    // safely ignore this error, since Gatsby will render the Head component
    // in the <head> tag.
    if (
      error.includes('cannot appear as a child of') &&
      args[0] === '<html>' &&
      args[1] === 'div'
    ) {
      return;
    }

    // Require tests to be wrapped in act(...).
    if (error.includes('was not wrapped in act(...).')) {
      originalConsoleError(error, ...args);
      throw new Error('Test was not wrapped in act(...).');
    }

    originalConsoleError(error, ...args);
  });
});
