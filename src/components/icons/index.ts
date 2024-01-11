import { defineMessage } from '@lingui/macro';

import BaseAuditorIcon from './auditor.svg';
import BaseAvatarBlueIcon from './avatar-blue.svg';
import BaseAvatarRedIcon from './avatar-red.svg';
import BaseAvatarReportBlueIcon from './avatar-report-blue.svg';
import BaseAvatarReportRedIcon from './avatar-report-red.svg';
import BaseBackIcon from './back.svg';
import BaseCheckThinIcon from './check-thin.svg';
import BaseCheckIcon from './check.svg';
import BaseCloseIcon from './close.svg';
import BaseDarkModeIcon from './dark-mode.svg';
import BaseDeveloperIcon from './developer.svg';
import BaseDotIcon from './dot.svg';
import BaseDropdownIcon from './dropdown.svg';
import BaseExportOutlineIcon from './export-outline.svg';
import BaseExternalLinkIcon from './external-link.svg';
import BaseFilterIcon from './filter.svg';
import { wrapIcon } from './Icon';
import BaseInteroperabilityIcon from './interoperability.svg';
import BaseLightModeIcon from './light-mode.svg';
import BaseLiveIcon from './live.svg';
import BaseMetaMaskIcon from './metamask.svg';
import BaseMoreVerticalOutlineIcon from './more-vertical-outline.svg';
import BaseNotificationsIcon from './notifications.svg';
import BaseReviewerIcon from './reviewer.svg';
import BaseSearchIcon from './search.svg';
import BaseShareIcon from './share.svg';
import BaseSignIcon from './sign.svg';
import BaseSnapIcon from './snap.svg';
import BaseTransactionInsightsIcon from './transaction-insights.svg';
import BaseUserCheckIcon from './user-check.svg';
import BaseUserCircleAddFillIcon from './user-cirlce-add-filled.svg';
import BaseWarningFilledIcon from './warning-filled.svg';

export const AuditorIcon = wrapIcon(BaseAuditorIcon, defineMessage`Auditor`);

export const AvatarBlueIcon = wrapIcon(
  BaseAvatarBlueIcon,
  defineMessage`Avatar`,
);

export const AvatarRedIcon = wrapIcon(BaseAvatarRedIcon, defineMessage`Avatar`);

export const AvatarReportBlueIcon = wrapIcon(
  BaseAvatarReportBlueIcon,
  defineMessage`Avatar`,
);

export const AvatarReportRedIcon = wrapIcon(
  BaseAvatarReportRedIcon,
  defineMessage`Avatar`,
);

export const BackIcon = wrapIcon(BaseBackIcon, defineMessage`Back`);

export const CloseIcon = wrapIcon(BaseCloseIcon, defineMessage`Close`);

export const CheckIcon = wrapIcon(BaseCheckIcon, defineMessage`Check`);

export const CheckThinIcon = wrapIcon(BaseCheckThinIcon, defineMessage`Check`);

export const DarkModeIcon = wrapIcon(
  BaseDarkModeIcon,
  defineMessage`Enable dark mode`,
);

export const DeveloperIcon = wrapIcon(
  BaseDeveloperIcon,
  defineMessage`Developer`,
);

export const DotIcon = wrapIcon(
  BaseDotIcon,
  defineMessage`Unread notification`,
);

export const DropdownIcon = wrapIcon(BaseDropdownIcon, defineMessage`Dropdown`);

export const ExternalLinkIcon = wrapIcon(
  BaseExternalLinkIcon,
  defineMessage`External link`,
);

export const ExportOutlineIcon = wrapIcon(
  BaseExportOutlineIcon,
  defineMessage`Export`,
);

export const FilterIcon = wrapIcon(BaseFilterIcon, defineMessage`Filter`);

export const InteroperabilityIcon = wrapIcon(
  BaseInteroperabilityIcon,
  defineMessage`Interoperability`,
);

export const LightModeIcon = wrapIcon(
  BaseLightModeIcon,
  defineMessage`Enable light mode`,
);

export const LiveIcon = wrapIcon(BaseLiveIcon, defineMessage`Live`);

export const MetaMaskIcon = wrapIcon(BaseMetaMaskIcon, defineMessage`MetaMask`);

export const MoreOptionIcon = wrapIcon(
  BaseMoreVerticalOutlineIcon,
  defineMessage`More Options`,
);

export const NotificationsIcon = wrapIcon(
  BaseNotificationsIcon,
  defineMessage`Notifications`,
);

export const NotificationsCategoryIcon = wrapIcon(
  BaseNotificationsIcon,
  defineMessage`Communication`,
);

export const ReviewerIcon = wrapIcon(BaseReviewerIcon, defineMessage`Reviewer`);

export const SearchIcon = wrapIcon(BaseSearchIcon, defineMessage`Search`);

export const ShareIcon = wrapIcon(BaseShareIcon, defineMessage`Share`);
export const SnapIcon = wrapIcon(BaseSnapIcon, defineMessage`Snap`);

export const SignIcon = wrapIcon(BaseSignIcon, defineMessage`Sign`);

export const TransactionInsightsIcon = wrapIcon(
  BaseTransactionInsightsIcon,
  defineMessage`Security`,
);

export const UserCheckIcon = wrapIcon(
  BaseUserCheckIcon,
  defineMessage`User check`,
);

export const UserCircleAddIcon = wrapIcon(
  BaseUserCircleAddFillIcon,
  defineMessage`Add to my circle`,
);

export const WarningFilledIcon = wrapIcon(
  BaseWarningFilledIcon,
  defineMessage`Warning`,
);

export type { IconProps } from './Icon';
