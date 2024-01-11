import { Menu, MenuList } from '@chakra-ui/react';
import { fireEvent } from '@testing-library/react';

import { MenuItemCard } from './MenuItemCard';
import { render } from '../utils/test-utils';

describe('MenuItemCard', () => {
  describe('when the text color is default', () => {
    const mockOnClick = jest.fn();

    const renderWrapper = () => {
      return render(
        <Menu defaultIsOpen={true}>
          <MenuList>
            <MenuItemCard
              icon={<div>Icon</div>}
              label="Label"
              textColor="default"
              onClick={mockOnClick}
            />
          </MenuList>
        </Menu>,
      );
    };

    it('renders the icon and label', () => {
      const { getByText } = renderWrapper();
      expect(getByText('Icon')).toBeInTheDocument();
      expect(getByText('Label')).toBeInTheDocument();
    });

    it('calls the onClick function when clicked', () => {
      const { getByTestId } = renderWrapper();
      const menuItem = getByTestId('menu-item-card');
      fireEvent.click(menuItem);

      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe('when the textColor is red', () => {
    it('renders the icon and label', () => {
      const { getByText } = render(
        <Menu defaultIsOpen={true}>
          <MenuList>
            <MenuItemCard
              icon={<span>Icon</span>}
              label="Label"
              textColor="red"
            />
          </MenuList>
        </Menu>,
      );
      expect(getByText('Icon')).toBeInTheDocument();
      expect(getByText('Label')).toBeInTheDocument();
    });
  });

  it('match the snapshot', () => {
    const { asFragment } = render(
      <Menu defaultIsOpen={true}>
        <MenuList>
          <MenuItemCard icon={<span>Icon</span>} label="Label" />
        </MenuList>
      </Menu>,
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="css-r6z5ec"
          style="visibility: visible; position: absolute; min-width: max-content; inset: 0 auto auto 0;"
        >
          <div
            aria-orientation="vertical"
            class="chakra-menu__menu-list css-1kfu8nn"
            id="menu-list-:ra:"
            role="menu"
            style="transform-origin: var(--popper-transform-origin); visibility: visible; opacity: 1; transform: none;"
            tabindex="-1"
          >
            <button
              class="chakra-menu__menuitem css-1qilg0h"
              data-index="0"
              data-testid="menu-item-card"
              id="menu-list-:ra:-menuitem-:rb:"
              role="menuitem"
              tabindex="-1"
              type="button"
            >
              <div
                class="css-ive15a"
              >
                <div
                  class="chakra-stack css-1uodvt1"
                >
                  <p
                    class="chakra-text css-0"
                  >
                    <span>
                      Icon
                    </span>
                  </p>
                  <p
                    class="chakra-text css-0"
                  >
                    Label
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <span
          hidden=""
          id="__chakra_env"
        />
      </DocumentFragment>
    `);
  });
});
