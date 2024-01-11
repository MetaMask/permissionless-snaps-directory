import { Box, Checkbox, VStack } from '@chakra-ui/react';
import { useState, type FunctionComponent } from 'react';

export type MultipleCheckboxOptionsProps = {
  options: string[];
  onChange: (selectedOptions: string[]) => void;
};

/**
 * A box with multiple checkbox options.
 *
 * @param props - The component props.
 * @param props.options - The options to be shown with checkboxes.
 * @param props.onChange - A function to be called when option selection is changed.
 * @returns A React component.
 */
export const MultipleCheckboxOptions: FunctionComponent<
  MultipleCheckboxOptionsProps
> = ({ options, onChange, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <Box
      background="background.default"
      padding="1rem"
      borderRadius="1rem"
      {...props}
    >
      <VStack alignItems="flex-start">
        {options.map((option) => (
          <Checkbox
            size="md"
            borderRadius="0.25rem"
            padding="0.012rem"
            marginInline="1"
            key={option}
            isChecked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          >
            {option}
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
};
