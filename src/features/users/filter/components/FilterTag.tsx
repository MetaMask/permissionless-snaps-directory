import { Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import { type FunctionComponent } from 'react';

import { CloseIcon } from '../../../../components';
import type { UserCategory } from '../../store';
import { USER_CATEGORY_LABELS } from '../constants';

export type FilterTagProps = {
  category: UserCategory;
  handleClick: (category: UserCategory) => void;
};

export const FilterTag: FunctionComponent<FilterTagProps> = ({
  category,
  handleClick,
}) => {
  return (
    <Tag variant="category">
      <TagLabel>
        <Trans
          data-testid="trans-component"
          id={USER_CATEGORY_LABELS[category].name.id}
        />
      </TagLabel>
      <CloseIcon
        data-testid={`filter-${category}-close`}
        onClick={() => handleClick(category)}
        cursor="pointer"
        marginLeft="1.5"
        width="0.6875rem"
      />
    </Tag>
  );
};
