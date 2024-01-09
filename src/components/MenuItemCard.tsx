import { HStack, MenuItem } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from './Card';

export type MenuCardProps = {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
};

export const MenuItemCard: FunctionComponent<MenuCardProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <MenuItem>
      <Card padding="2" onClick={onClick} w="90%">
        <HStack spacing="2">
          {icon}
          <span>{label}</span>
        </HStack>
      </Card>
    </MenuItem>
  );
};
