/* eslint no-restricted-globals: 0 */
import { act, fireEvent } from '@testing-library/react';
import { useAccount } from 'wagmi';

import { MoreOptionMenu } from './MoreOptionMenu';
import { setUserAccount } from './store';
import { createStore } from '../../store';
import {
  render,
  VALID_ACCOUNT_1,
  VALID_ACCOUNT_2,
} from '../../utils/test-utils';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useNetwork: () => ({
    data: {
      chainId: 1,
    },
  }),
}));

describe('MoreOptionMenu', () => {
  let mockUseAccount: jest.Mock;

  const renderMenuWithStore = async () => {
    const store = createStore();

    const { getByTestId, queryByText } = await act(async () =>
      render(<MoreOptionMenu subjectAddress={VALID_ACCOUNT_2} />, store),
    );

    const menuBtn = getByTestId('icon-menu-button');
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(queryByText('Add to my circle')).toBeInTheDocument();
    expect(queryByText('Copy profile link')).toBeInTheDocument();
    expect(queryByText('Etherscan')).toBeInTheDocument();

    return { getByTestId, queryByText, store };
  };

  beforeEach(() => {
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();

    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: true,
    }));
  });

  it('render', () => {
    const { getByTestId, queryByText } = render(
      <MoreOptionMenu subjectAddress={VALID_ACCOUNT_2} />,
    );

    const menuBtn = getByTestId('icon-menu-button');
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(queryByText('Add to my circle')).toBeInTheDocument();
    expect(queryByText('Copy profile link')).toBeInTheDocument();
    expect(queryByText('Etherscan')).toBeInTheDocument();
  });

  it('"Add to my circle" will not render when address is same as subjectAddress', async () => {
    const { getByTestId, queryByText } = render(
      <MoreOptionMenu subjectAddress={VALID_ACCOUNT_1} />,
    );

    const menuBtn = getByTestId('icon-menu-button');
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(queryByText('Add to my circle')).not.toBeInTheDocument();
  });

  it("add to my circle will not render when user's circle already contains subjectAddress", async () => {
    const { queryByText, store } = await renderMenuWithStore();

    act(() => {
      store.dispatch(setUserAccount({ userCircle: [VALID_ACCOUNT_2] }));
    });

    expect(queryByText('Add to my circle')).not.toBeInTheDocument();
  });

  it('test click add to clrcle menu item', async () => {
    const { getByTestId, store } = await renderMenuWithStore();
    act(() => {
      getByTestId('add-to-circle').click();
    });
    expect(store.getState().accountProfile.addToUserModalOpen).toBe(true);
  });

  it('test click copy to profile link menu item', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    navigator.clipboard.writeText.mockResolvedValue(undefined);
    const { getByTestId } = await renderMenuWithStore();

    await act(async () =>
      act(() => {
        getByTestId('copy-profile-link').click();
      }),
    );
    expect(writeText).toHaveBeenCalled();
  });

  it('test click copy to profile link menu item throw error', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    navigator.clipboard.writeText.mockRejectedValue(undefined);
    const { getByTestId, queryByText } = await renderMenuWithStore();

    await act(async () =>
      act(() => {
        getByTestId('copy-profile-link').click();
      }),
    );
    expect(writeText).toHaveBeenCalled();
    expect(
      queryByText('Failed to copy profile link to clipboard'),
    ).toBeInTheDocument();
  });

  it('test click etherscan menu item', async () => {
    jest.spyOn(window, 'open').mockImplementation();
    const { getByTestId } = await renderMenuWithStore();
    act(() => {
      getByTestId('etherscan').click();
    });
    expect(window.open).toHaveBeenCalled();
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <MoreOptionMenu subjectAddress={VALID_ACCOUNT_2} />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-controls="menu-list-:r17:"
          aria-expanded="false"
          aria-haspopup="menu"
          class="chakra-button chakra-menu__menu-button css-1m3sc6v"
          data-testid="icon-menu-button"
          id="menu-button-:r17:"
          type="button"
        >
          <span
            aria-hidden="true"
            class="css-1aj6v23"
            focusable="false"
          >
            <svg
              aria-label="More Options"
              class="css-uwwqev"
            />
          </span>
        </button>
        <div
          class="css-r6z5ec"
          style="visibility: hidden; position: absolute; min-width: max-content; inset: 0 auto auto 0;"
        >
          <div
            aria-orientation="vertical"
            class="chakra-menu__menu-list css-1kfu8nn"
            id="menu-list-:r17:"
            role="menu"
            style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.8) translateZ(0);"
            tabindex="-1"
          />
        </div>
        <span
          hidden=""
          id="__chakra_env"
        />
      </div>
    `);
  });
});
