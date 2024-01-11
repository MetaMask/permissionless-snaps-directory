import {
  Box,
  Flex,
  Checkbox,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  type ResponsiveValue,
} from '@chakra-ui/react';
import { type FunctionComponent, useState } from 'react';

export type CheckboxWithSliderProps = {
  label: string;
  description: string;
  options: string[];
  steps: number;
  onSliderChange: (value: number) => void;
};

/**
 * Render the box with checkbox header and a slider with configurable options.
 *
 * @param props - The component props.
 * @param props.label - The label for checkbox header.
 * @param props.description - The description for checkbox header.
 * @param props.options - The options to be shown along with slider.
 * @param props.steps - The number of steps for the slider.
 * @param props.onSliderChange - A function to be called when slider is moved.
 * @returns A React component.
 */
export const CheckboxWithSlider: FunctionComponent<CheckboxWithSliderProps> = ({
  label,
  description,
  options,
  steps,
  onSliderChange,
  ...props
}) => {
  const [sliderValue, setSliderValue] = useState<number>(2);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onSliderChange(value);
  };

  const getTextAlignmentForSlider = (index: number): ResponsiveValue<any> => {
    let textAlign = 'left';
    if (index === (options.length - 1) / 2) {
      textAlign = 'center';
    } else if (index > (options.length - 1) / 2) {
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
      <Flex direction="column" alignItems="flex-start" gap="1rem">
        <Flex direction="column" alignItems="flex-start" gap="0.5rem">
          <Flex direction="row" alignItems="center" height="1.5rem">
            <Checkbox>
              <Text p="1">{label}</Text>
            </Checkbox>
          </Flex>
          <Text variant="small-description">{description}</Text>
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          width="100%"
          height="1rem"
        >
          <Slider
            width="100%"
            value={sliderValue}
            min={0}
            max={steps - 1}
            step={1}
            onChange={(value) => handleSliderChange(value)}
            mb={2}
          >
            <SliderTrack>
              <SliderFilledTrack
                bg={
                  sliderValue < (steps - 1) / 2
                    ? 'error.default'
                    : 'info.default'
                }
              />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="1rem"
        >
          {options.map((option, index) => (
            <Text
              variant="small-description"
              key={index}
              textAlign={getTextAlignmentForSlider(index)}
              flexGrow={1}
            >
              {option}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckboxWithSlider;
