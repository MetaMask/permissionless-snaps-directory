import type { MenuProps } from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type ItemMenuProps = MenuProps & {
  iconButtonVariant?: 'outline' | 'ghost' | 'solid' | 'link' | 'unstyled';
  icon: ReactNode;
  children?: ReactNode;
};

export const IconMenu: FunctionComponent<ItemMenuProps> = ({
  icon,
  iconButtonVariant = 'link',
  children,
  ...props
}) => {
  return (
    <Menu closeOnSelect={false} isLazy={true} variant="icon-menu" {...props}>
      <MenuButton as={IconButton} icon={icon} variant={iconButtonVariant} />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};
