import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent, ReactNode } from 'react';

import { FilterIcon } from '../../../../components';

export type FilterButtonProps = {
  children?: ReactNode;
};

// TODO: this can be moved to a shared component
export const FilterButton: FunctionComponent<FilterButtonProps> = forwardRef<
  FilterButtonProps,
  'button'
>((props, ref) => (
  <IconButton
    ref={ref}
    data-testid="filter-button"
    {...props}
    variant="filter"
    isRound={true}
    aria-label={t`Open filter menu`}
    height="auto"
    icon={<FilterIcon width="1.25rem" />}
    flexShrink="0"
  />
));
