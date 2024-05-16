import { Menu } from '@chakra-ui/react';
import { expect } from '@jest/globals';
import { act } from '@testing-library/react';

import { FilterCategory } from './FilterCategory';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import { UserCategory, getCategory } from '../../store';

jest.mock('../constants', () => {
  return {
    USER_CATEGORY_LABELS: {
      'software expert': {
        name: {
          message: 'Software Engineer',
        },
      },
      auditor: {
        name: { message: undefined },
      },
    },
  };
});

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

  it('renders blank label if category is invalid', () => {
    const { queryByText } = render(
      <Menu>
        <FilterCategory category={UserCategory.Auditor} />
      </Menu>,
    );

    expect(queryByText('auditor')).not.toBeInTheDocument();
  });
});
