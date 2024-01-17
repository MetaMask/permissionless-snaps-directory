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
import { type FunctionComponent, useState } from 'react';

export type CheckboxWithSliderProps = {
  title: string;
  description: string;
  sliderLabels: string[];
  sliderConfig: SliderConfig;
  onSliderChange: (value: number) => void;
};

export type SliderConfig = {
  minValue: number;
  maxValue: number;
  stepSize: number;
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
 * @returns A React component.
 */
export const CheckboxWithSlider: FunctionComponent<CheckboxWithSliderProps> = ({
  title,
  description,
  sliderLabels,
  sliderConfig,
  onSliderChange,
  ...props
}) => {
  const numberOfSteps =
    (sliderConfig.maxValue - sliderConfig.minValue) / sliderConfig.stepSize;
  const midValue =
    sliderConfig.minValue + (numberOfSteps / 2) * sliderConfig.stepSize;

  const [sliderValue, setSliderValue] = useState<number>(midValue);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onSliderChange(value);
  };

  const getTextAlignmentForSlider = (index: number): ResponsiveValue<any> => {
    const midIndex = (sliderLabels.length - 1) / 2;
    let textAlign = 'left';
    if (index === midIndex) {
      textAlign = 'center';
    } else if (index > midIndex) {
      textAlign = 'right';
    }
    return textAlign;
  };

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
            <Checkbox>
              <Text p="1">{title}</Text>
            </Checkbox>
          </HStack>
          <Text variant="small-description">{description}</Text>
        </VStack>
        <HStack alignItems="baseline" width="100%" height="1rem">
          <Slider
            data-testid="slider"
            value={sliderValue}
            min={sliderConfig.minValue}
            max={sliderConfig.maxValue}
            step={sliderConfig.stepSize}
            onChange={(value) => handleSliderChange(value)}
          >
            <SliderTrack>
              <SliderFilledTrack
                bg={sliderValue < midValue ? 'error.default' : 'info.default'}
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
              textAlign={getTextAlignmentForSlider(index)}
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
