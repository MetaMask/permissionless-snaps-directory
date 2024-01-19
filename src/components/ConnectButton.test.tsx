import { act } from '@testing-library/react';
import { navigate } from 'gatsby';

import { ConnectButton } from './ConnectButton';
// eslint-disable-next-line jest/no-mocks-import
import { mockGetIsConnected, mockShowModel } from '../__mocks__/connectkit';
import { render } from '../utils/test-utils';

describe('ConnectKitButton.Custom', () => {
  it('renders', async () => {
    const { queryByText } = render(<ConnectButton />);

    expect(queryByText('Connect')).toBeInTheDocument();
  });

  it('trigger showModal when account is not connected', async () => {
    mockGetIsConnected.mockReset();
    mockGetIsConnected.mockReturnValueOnce(false);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('Connect');

    await act(async () => act(() => button.click()));

    expect(mockShowModel).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledTimes(0);
  });

  it('trigger navigate when account is connected', async () => {
    mockGetIsConnected.mockReset();
    mockGetIsConnected.mockReturnValueOnce(true);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('fake.ens.name');

    await act(async () => act(() => button.click()));

    expect(mockShowModel).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
