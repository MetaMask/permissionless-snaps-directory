import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import { type FunctionComponent } from 'react';

import { FilterItem } from './FilterItem';
import { useDispatch, useSelector } from '../../../../hooks';
import { getCategory, toggleCategory, type UserCategory } from '../../store';
import { USER_CATEGORY_LABELS } from '../constants';

export type FilterCategoryProps = {
  category: UserCategory;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
}) => {
  const dispatch = useDispatch();
  const checked = useSelector(getCategory(category));

  const handleClick = () => {
    dispatch(toggleCategory({ category }));
  };

  return (
    <FilterItem checked={checked} onClick={handleClick}>
      <Text>
        <Trans id={USER_CATEGORY_LABELS[category].name.id} />
      </Text>
      <Box flexGrow={1} />
    </FilterItem>
  );
};
