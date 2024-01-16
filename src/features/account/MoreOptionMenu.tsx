import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  ExportOutlineIcon,
  IconMenu,
  MenuItemCard,
  MoreOptionIcon,
  ShareIcon,
  UserCheckIcon,
  UserCircleAddIcon,
  WarningFilledIcon,
} from '../../components';

export const MoreOptionMenu: FunctionComponent = () => {
  return (
    <IconMenu icon={<MoreOptionIcon />}>
      <MenuItemCard icon={<UserCircleAddIcon />} label={t`Add to my circle`} />
      <MenuItemCard icon={<ShareIcon />} label={t`Copy profile link`} />
      <MenuItemCard icon={<ExportOutlineIcon />} label={t`Etherscan`} />
      <MenuItemCard
        icon={<UserCheckIcon />}
        label={t`Access obilities`}
        textColor="blue"
      />
      <MenuItemCard
        icon={<WarningFilledIcon />}
        label={t`Report user`}
        textColor="red"
      />
    </IconMenu>
  );
};
