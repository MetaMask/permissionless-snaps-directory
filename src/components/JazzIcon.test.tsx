import mmJazzIcon from '@metamask/jazzicon';
import { render as renderComponent } from '@testing-library/react';
import React from 'react';

import { JazzIcon } from './JazzIcon';
import { render } from '../utils/test-utils';
import { VALID_ACCOUNT_1 } from '../utils/test-utils/input';

jest.mock('@metamask/jazzicon');

describe('JazzIcon', () => {
  beforeEach(() => {
    mmJazzIcon.mockClear();
    // eslint-disable-next-line no-restricted-globals
    mmJazzIcon.mockImplementation(() => document.createElement('div'));
  });

  it('renders', async () => {
    const address = VALID_ACCOUNT_1;
    const size = 100;
    const addr = address.trim().slice(2, 10);
    const seed = parseInt(addr, 16);

    const { queryByTestId } = render(
      <JazzIcon address={address} size={size} />,
    );

    expect(mmJazzIcon).toHaveBeenCalledTimes(1);
    expect(mmJazzIcon).toHaveBeenCalledWith(size, seed);
    expect(queryByTestId('jazzicon')).toBeInTheDocument();
  });

  it('does not renders MetaMask jazzicon if ref is null', async () => {
    const useRefSpy = jest.spyOn(React, 'useRef');
    useRefSpy.mockReturnValue(
      null as unknown as React.MutableRefObject<unknown>,
    );

    const address = VALID_ACCOUNT_1;
    const size = 100;

    const { queryByTestId } = renderComponent(
      <JazzIcon address={address} size={size} />,
    );

    expect(queryByTestId('jazzicon')).toBeInTheDocument();
    expect(mmJazzIcon).toHaveBeenCalledTimes(0);
  });
});
