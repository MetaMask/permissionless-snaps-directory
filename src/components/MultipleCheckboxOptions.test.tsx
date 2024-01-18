import { screen, fireEvent } from '@testing-library/react';

import { MultipleCheckboxOptions } from './MultipleCheckboxOptions';
import { render } from '../utils/test-utils';

describe('MultipleCheckboxOptions', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const onChangeMock = jest.fn();

  it('renders correctly with options', () => {
    render(
      <MultipleCheckboxOptions options={options} onChange={onChangeMock} />,
    );

    // Assert that checkboxes are rendered correctly
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onChange when checkbox is clicked', () => {
    render(
      <MultipleCheckboxOptions options={options} onChange={onChangeMock} />,
    );

    // Click on the first checkbox
    fireEvent.click(screen.getByText('Option 1'));

    // Assert that onChange is called with the selected options
    expect(onChangeMock).toHaveBeenCalledWith([true, false, false]);

    // Click on the second checkbox
    fireEvent.click(screen.getByText('Option 2'));

    // Assert that onChange is called with the updated selected options
    expect(onChangeMock).toHaveBeenCalledWith([true, true, false]);
  });
});
