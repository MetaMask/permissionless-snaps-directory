import { Text, HStack, MenuItem } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from './Card';

export type MenuCardProps = {
  icon: JSX.Element;
  label: string;
  textColor?: 'default' | 'error';
  onClick?: () => void;
};

export const MenuItemCard: FunctionComponent<MenuCardProps> = ({
  icon,
  label,
  textColor = 'default',
  onClick,
}) => {
  return (
    <MenuItem m="0.5rem" borderRadius="0.5rem" w="95%" onClick={onClick}>
      <Card padding="2">
        <HStack spacing="2">
          <Text color={textColor}>{icon}</Text>
          <Text color={textColor}>{label}</Text>
        </HStack>
      </Card>
    </MenuItem>
  );
};
