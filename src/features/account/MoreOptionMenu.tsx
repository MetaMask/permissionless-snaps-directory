import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { IconMenu } from '../../components/IconMenu';
import {
  ExportOutlineIcon,
  MoreOptionIcon,
  ShareIcon,
  UserCircleAddIcon,
  WarningFilledIcon,
} from '../../components/icons';
import { MenuItemCard } from '../../components/MenuItemCard';

export const MoreOptionMenu: FunctionComponent = () => {
  return (
    <IconMenu icon={<MoreOptionIcon />}>
      <MenuItemCard icon={<UserCircleAddIcon />} label={t`Add to my circle`} />
      <MenuItemCard icon={<ShareIcon />} label={t`Copy profile link`} />
      <MenuItemCard icon={<ExportOutlineIcon />} label={t`Etherscan`} />
      <MenuItemCard
        icon={<WarningFilledIcon />}
        label={t`Report user`}
        textColor="error"
      />
    </IconMenu>
  );
};
