import { fireEvent } from '@testing-library/react';

import { MoreOptionMenu } from './MoreOptionMenu';
import { render } from '../../utils/test-utils';

describe('MoreOptionMenu', () => {
  it('render', () => {
    const { getByTestId, queryByText } = render(<MoreOptionMenu />);

    const menuBtn = getByTestId('icon-menu-button');
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(queryByText('Add to my circle')).toBeInTheDocument();
    expect(queryByText('Copy profile link')).toBeInTheDocument();
    expect(queryByText('Etherscan')).toBeInTheDocument();
    expect(queryByText('Access obilities')).toBeInTheDocument();
    expect(queryByText('Report user')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<MoreOptionMenu />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-controls="menu-list-:r8:"
          aria-expanded="false"
          aria-haspopup="menu"
          class="chakra-button chakra-menu__menu-button css-1m3sc6v"
          data-testid="icon-menu-button"
          id="menu-button-:r8:"
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
            id="menu-list-:r8:"
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
