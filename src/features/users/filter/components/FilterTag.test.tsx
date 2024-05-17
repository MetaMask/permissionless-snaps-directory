import { act, fireEvent } from '@testing-library/react';

import type { FilterTagProps } from './FilterTag';
import { FilterTag } from './FilterTag';
import { render } from '../../../../utils/test-utils';
import { UserCategory } from '../../store';

describe('FilterTag', () => {
  const mockHandleClick = jest.fn();

  const renderFilterTag = (category: UserCategory) => {
    const props: FilterTagProps = {
      category,
      handleClick: mockHandleClick,
    };
    return render(<FilterTag {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter tag correctly', () => {
    const category: UserCategory = UserCategory.SoftwareEngineer;
    const { getByText } = renderFilterTag(category);
    expect(getByText('Software Engineer')).toBeInTheDocument();
  });

  it('calls handleClick when close icon is clicked', () => {
    const category: UserCategory = UserCategory.SoftwareEngineer;
    const { getByTestId } = renderFilterTag(category);
    fireEvent.click(getByTestId(`filter-${category}-close`));
    expect(mockHandleClick).toHaveBeenCalledWith(category);
  });

  it('handles click event correctly', () => {
    const category: UserCategory = UserCategory.SoftwareEngineer;
    const { getByTestId } = renderFilterTag(category);
    const closeIcon = getByTestId(`filter-${category}-close`);
    act(() => {
      fireEvent.click(closeIcon);
    });
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith(category);
  });
});
