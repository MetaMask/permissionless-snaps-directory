import { MoreOptionMenu } from './MoreOptionMenu';
import { render } from '../../utils/test-utils';

describe('MoreOptionMenu', () => {
  it('matches the snapshot', () => {
    const { container } = render(<MoreOptionMenu />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-controls="menu-list-:r1:"
        aria-expanded="false"
        aria-haspopup="menu"
        class="chakra-button chakra-menu__menu-button css-1m3sc6v"
        id="menu-button-:r1:"
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
    `);
  });
});
