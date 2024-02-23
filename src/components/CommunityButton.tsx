import type { As, IconButtonProps, ComponentWithAs } from '@chakra-ui/react';
import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { navigate } from 'gatsby';

import { AvatarBlueIcon } from '.';

export type CommunityButtonProps = Partial<IconButtonProps>;

export const CommunityButton: ComponentWithAs<As, CommunityButtonProps> =
  forwardRef((props, ref) => {
    return (
      <IconButton
        ref={ref}
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => navigate(`/community`, { replace: true })}
        position="relative"
        aria-label={t`Open community menu`}
        variant="clear"
        icon={
          <AvatarBlueIcon
            fill="icon.alternative"
            cursor="pointer"
            width="2.25rem"
            height="2.25rem"
            sx={{
              '& > svg > rect': {
                fillOpacity: 1,
              },
              '& > svg > path': {
                fill: 'text.alternative',
              },
            }}
          />
        }
      />
    );
  });
