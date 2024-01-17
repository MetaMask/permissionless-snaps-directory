import { Box, Checkbox, VStack } from '@chakra-ui/react';
import { useState, type FunctionComponent } from 'react';

export type MultipleCheckboxOptionsProps = {
  options: string[];
  onChange: (selectedOptions: boolean[]) => void;
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
  const [checkedItems, setCheckedItems] = useState(options.map(() => false));
  const handleCheckboxChange = (checked: boolean, index: number) => {
    checkedItems[index] = checked;
    setCheckedItems([...checkedItems]);
    onChange(checkedItems);
  };

  return (
    <Box
      background="background.default"
      padding="1rem"
      borderRadius="1rem"
      {...props}
    >
      <VStack alignItems="flex-start">
        {options.map((option, index) => (
          <Checkbox
            size="md"
            borderRadius="0.25rem"
            padding="0.012rem"
            marginInline="1"
            key={option}
            isChecked={checkedItems[index] ?? false}
            onChange={(event) =>
              handleCheckboxChange(event.target.checked, index)
            }
          >
            {option}
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
};
