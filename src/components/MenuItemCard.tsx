import { Text, HStack, MenuItem, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from './Card';

export type MenuCardProps = {
  icon: JSX.Element;
  label: string;
  textColor?: 'default' | 'red' | 'blue';
  testId?: string;
  onClick?: () => void;
};

export const MenuItemCard: FunctionComponent<MenuCardProps> = ({
  icon,
  label,
  textColor = 'default',
  testId = 'menu-item-card',
  onClick,
}) => {
  return (
    <MenuItem w="95%" onClick={onClick} data-testid={testId}>
      <Card padding="1">
        <HStack spacing="2">
          <Box>{icon}</Box>
          <Text variant={textColor}>{label}</Text>
        </HStack>
      </Card>
    </MenuItem>
  );
};
