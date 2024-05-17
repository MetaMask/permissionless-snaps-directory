import { Menu } from '@chakra-ui/react';
import { expect } from '@jest/globals';
import { act } from '@testing-library/react';

import { FilterCategory } from './FilterCategory';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import { getCategory, UserCategory } from '../../store';

describe('FilterCategory', () => {
  it('renders', () => {
    const { queryByText } = render(
      <Menu>
        <FilterCategory category={UserCategory.SoftwareEngineer} />
      </Menu>,
    );

    expect(queryByText('Software Engineer')).toBeInTheDocument();
  });

  it('toggles the category when clicked', () => {
    const store = createStore();
    const { getByText } = render(
      <Menu>
        <FilterCategory category={UserCategory.SoftwareEngineer} />
      </Menu>,
      store,
    );

    expect(getCategory(UserCategory.SoftwareEngineer)(store.getState())).toBe(
      true,
    );

    const button = getByText('Software Engineer');
    act(() => button.click());

    expect(getCategory(UserCategory.SoftwareEngineer)(store.getState())).toBe(
      false,
    );
  });
});
