import type { MenuProps } from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  ExternalLinkIcon,
  MoreOptionIcon,
  ShareIcon,
  UserCircleAddIcon,
} from './icons';
import { MenuItemCard } from './MenuItemCard';

export const MoreOptionMenu: FunctionComponent<MenuProps> = ({ ...props }) => {
  return (
    <Menu closeOnSelect={false} isLazy={true} {...props}>
      <MenuButton
        as={IconButton}
        icon={<MoreOptionIcon />}
        variant={'outline'}
      />
      <MenuList>
        <MenuList>
          <MenuItemCard
            icon={<UserCircleAddIcon />}
            label={t`Add to my circle`}
            onClick={() => {
              console.log('Add to my circle');
            }}
          />
          <MenuItemCard
            icon={<ShareIcon />}
            label={t`Copy profile link`}
            onClick={() => {
              console.log('Copy profile link');
            }}
          />
          <MenuItemCard icon={<ExternalLinkIcon />} label={t`Etherscan`} />
        </MenuList>
      </MenuList>
    </Menu>
  );
};
