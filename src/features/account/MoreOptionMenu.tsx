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
      <MenuItemCard icon={<UserCircleAddIcon />} label={t`Add user`} />
      <MenuItemCard icon={<ShareIcon />} label={t`Share`} />
      <MenuItemCard icon={<ExportOutlineIcon />} label={t`Etherscan`} />
      <MenuItemCard
        icon={<WarningFilledIcon />}
        label={t`Report user`}
        textColor="red"
      />
    </IconMenu>
  );
};
