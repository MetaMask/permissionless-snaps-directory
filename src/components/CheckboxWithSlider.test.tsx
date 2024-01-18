import { act, fireEvent } from '@testing-library/react';

import {
  CheckboxWithSlider,
  getTextAlignmentForSlider,
  getSliderTrackColor,
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
const mockOnCheckboxChange = jest.fn();

const defaultProps: CheckboxWithSliderProps = {
  title: 'Test Checkbox',
  description: 'Test Description',
  sliderLabels: ['Label1', 'Label2', 'Label3'],
  sliderConfig: { minValue: 1, totalSteps: 5, defaultValue: 3, stepSize: 1 },
  onSliderChange: mockOnSliderChange,
  onCheckboxChange: mockOnCheckboxChange,
};

describe('CheckboxWithSlider', () => {
  it('renders CheckboxWithSlider component', async () => {
    const { queryByText, queryByTestId } = await act(
      async () =>
        await act(() =>
          render(<CheckboxWithSlider {...defaultProps}></CheckboxWithSlider>),
        ),
    );

    expect(queryByText('Test Checkbox')).toBeInTheDocument();
    expect(queryByText('Test Description')).toBeInTheDocument();
    expect(queryByTestId('slider')).toBeInTheDocument();
    expect(queryByText('Label1')).toBeInTheDocument();
    expect(queryByText('Label2')).toBeInTheDocument();
    expect(queryByText('Label3')).toBeInTheDocument();
  });

  it('calls onCheckboxChange when checkbox is checked or unchecked', () => {
    const { getByText } = render(<CheckboxWithSlider {...defaultProps} />);

    const checkbox = getByText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(true);

    fireEvent.click(checkbox);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(false);
  });

  describe('getTextAlignmentForSlider', () => {
    it('return left if index < midIndex', async () => {
      expect(getTextAlignmentForSlider(0, 1)).toBe('left');
    });
    it('return center if index = midIndex', async () => {
      expect(getTextAlignmentForSlider(0, 0)).toBe('center');
    });
    it('return right if index > midIndex', async () => {
      expect(getTextAlignmentForSlider(1, 0)).toBe('right');
    });
  });

  describe('getSliderTrackColor', () => {
    it('return error.default if sliderValue < midValue', async () => {
      expect(getSliderTrackColor(0, 1)).toBe('error.default');
    });
    it('return infor.default if sliderValue >= midValue', async () => {
      expect(getSliderTrackColor(0, 0)).toBe('info.default');
    });
  });
});
