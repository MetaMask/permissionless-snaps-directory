import type { MenuItemProps } from '@chakra-ui/react';
import { MenuItem, Stack } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { CheckThinIcon } from '../../../../components';

export type FilterItemProps = MenuItemProps & {
  checked: boolean;
  children: ReactNode;
};

export const FilterItem: FunctionComponent<FilterItemProps> = ({
  children,
  checked,
  ...props
}) => (
  <MenuItem height="3rem" borderRadius="md" {...props}>
    <Stack direction="row" alignItems="center" gap="2" width="100%">
      <CheckThinIcon
        width="0.831rem"
        height="0.573rem"
        visibility={checked ? 'initial' : 'hidden'}
      />
      {children}
    </Stack>
  </MenuItem>
);
