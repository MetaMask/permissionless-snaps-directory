import { act } from '@testing-library/react';

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

const defaultProps: CheckboxWithSliderProps = {
  title: 'Test Checkbox',
  description: 'Test Description',
  sliderLabels: ['Label1', 'Label2', 'Label3'],
  sliderConfig: { minValue: 1, maxValue: 5, stepSize: 1 },
  onSliderChange: mockOnSliderChange,
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
