import { Text, HStack, MenuItem } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from './Card';

export type MenuCardProps = {
  icon: JSX.Element;
  label: string;
  textColor?: 'default' | 'red' | 'blue';
  onClick?: () => void;
};

export const MenuItemCard: FunctionComponent<MenuCardProps> = ({
  icon,
  label,
  textColor = 'default',
  onClick,
}) => {
  return (
    <MenuItem
      m="0.5rem"
      borderRadius="0.5rem"
      w="95%"
      onClick={onClick}
      data-testid="menu-item-card"
    >
      <Card padding="2">
        <HStack spacing="2">
          <Text variant={textColor}>{icon}</Text>
          <Text variant={textColor}>{label}</Text>
        </HStack>
      </Card>
    </MenuItem>
  );
};
