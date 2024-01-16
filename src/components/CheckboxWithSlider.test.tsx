import { act } from '@testing-library/react';

import {
  CheckboxWithSlider,
  type CheckboxWithSliderProps,
} from './CheckboxWithSlider';
import { render } from '../utils/test-utils';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  SliderThumb: jest
    .fn()
    .mockImplementation(({ boxSize, ...props }) => <div {...props} />),
}));

const mockOnSliderChange = jest.fn();

const defaultProps: CheckboxWithSliderProps = {
  title: 'Test Checkbox',
  description: 'Test Description',
  sliderLabels: ['Label1', 'Label2', 'Label3'],
  sliderConfig: { minValue: 1, maxValue: 5, stepSize: 1 },
  onSliderChange: mockOnSliderChange,
};

describe('CheckboxWithSlider', () => {
  it('renders CheckboxWithSlider component', async () => {
    const { queryByText, getByTestId } = await act(
      async () =>
        await act(() =>
          render(<CheckboxWithSlider {...defaultProps}></CheckboxWithSlider>),
        ),
    );

    expect(queryByText('Test Checkbox')).toBeInTheDocument();
    expect(queryByText('Test Description')).toBeInTheDocument();
    expect(getByTestId('slider')).toBeInTheDocument();
    expect(queryByText('Label1')).toBeInTheDocument();
    expect(queryByText('Label2')).toBeInTheDocument();
    expect(queryByText('Label3')).toBeInTheDocument();
  });
});
