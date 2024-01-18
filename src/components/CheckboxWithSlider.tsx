import {
  Box,
  Checkbox,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  type ResponsiveValue,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { type FunctionComponent, useState, useEffect } from 'react';

export type CheckboxWithSliderProps = {
  title: string;
  description: string;
  sliderLabels: string[];
  sliderConfig: SliderConfig;
  onSliderChange: (value: number) => void;
  onCheckboxChange: (checked: boolean) => void;
};

export type SliderConfig = {
  minValue: number;
  totalSteps: number;
  defaultValue: number;
  stepSize: number;
};

export const getTextAlignmentForSlider = (
  index: number,
  midIndex: number,
): ResponsiveValue<any> => {
  if (index === midIndex) {
    return 'center';
  } else if (index > midIndex) {
    return 'right';
  }
  return 'left';
};

export const getSliderTrackColor = (
  sliderValue: number,
  midValue: number,
): ResponsiveValue<any> => {
  return sliderValue < midValue ? 'error.default' : 'info.default';
};

/**
 * Render the box with checkbox header and a slider with configurable options.
 *
 * @param props - The component props.
 * @param props.title - The title for checkbox header.
 * @param props.description - The description for checkbox header.
 * @param props.sliderLabels - The labels to be shown along with slider.
 * @param props.sliderConfig - The slider configuration like minimum value, maximum value and step size.
 * @param props.onSliderChange - A function to be called when slider is moved.
 * @param props.onCheckboxChange - A function to be called when checkbox is checked or unchecked.
 * @returns A React component.
 */
export const CheckboxWithSlider: FunctionComponent<CheckboxWithSliderProps> = ({
  title,
  description,
  sliderLabels,
  sliderConfig,
  onSliderChange,
  onCheckboxChange,
  ...props
}) => {
  const maxValue =
    sliderConfig.minValue +
    sliderConfig.stepSize * (sliderConfig.totalSteps - 1);

  const [sliderValue, setSliderValue] = useState<number>(
    sliderConfig.defaultValue,
  );
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    onSliderChange(sliderValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

  useEffect(() => {
    if (!checked) {
      setSliderValue(sliderConfig.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const midLabelIndex = (sliderLabels.length - 1) / 2;

  return (
    <Box
      p="4"
      borderWidth="0.063rem"
      borderRadius="1rem"
      backgroundColor="background.default"
      width="100%"
      {...props}
    >
      <VStack alignItems="flex-start" gap="1rem">
        <VStack alignItems="flex-start" gap="0.5rem">
          <HStack height="1.5rem">
            <Checkbox
              isChecked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            >
              <Text p="1">{title}</Text>
            </Checkbox>
          </HStack>
          <Text variant="small-description">{description}</Text>
        </VStack>
        <HStack alignItems="baseline" width="100%" height="1rem">
          <Slider
            data-testid="slider"
            min={sliderConfig.minValue}
            max={maxValue}
            step={sliderConfig.stepSize}
            onChange={(value) => setSliderValue(value)}
            value={sliderValue}
            isDisabled={!checked}
          >
            <SliderTrack>
              <SliderFilledTrack
                bg={getSliderTrackColor(sliderValue, sliderConfig.defaultValue)}
              />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        </HStack>
        <HStack width="100%">
          {sliderLabels.map((sliderLabel, index) => (
            <Text
              variant="small-description"
              key={index}
              textAlign={getTextAlignmentForSlider(index, midLabelIndex)}
              flexGrow={1}
            >
              {sliderLabel}
            </Text>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CheckboxWithSlider;
