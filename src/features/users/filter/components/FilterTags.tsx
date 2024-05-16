import { Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useEffect, type FunctionComponent } from 'react';
import { useAccount } from 'wagmi';

import { FilterTag } from './FilterTag';
import { CloseIcon } from '../../../../components';
import { useDispatch, useSelector } from '../../../../hooks';
import { fetchUsers } from '../../api';
import type { UserCategory } from '../../store';
import {
  getCategories,
  getEndorsedByYou,
  getReportedByYou,
  getShowReportedUsers,
  toggleCategory,
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
} from '../../store';

export const FilterTags: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { address: connectedAddress, isConnected } = useAccount();
  const categories = useSelector(getCategories);
  const endorsedByYou = useSelector(getEndorsedByYou);
  const reportedByYou = useSelector(getReportedByYou);
  const showReportedUsers = useSelector(getShowReportedUsers);

  useEffect(() => {
    dispatch(
      fetchUsers({
        categories,
        endorsedByYou: isConnected ? endorsedByYou : false,
        reportedByYou: isConnected ? reportedByYou : false,
        showReportedUsers,
        userId: isConnected ? connectedAddress : undefined,
      }),
    ).catch(() => {
      console.error('Failed to filter users');
    });
  }, [
    categories,
    endorsedByYou,
    reportedByYou,
    showReportedUsers,
    dispatch,
    isConnected,
    connectedAddress,
  ]);

  const handleCategoryClick = (category: UserCategory) => {
    dispatch(toggleCategory({ category }));
  };

  const handleClickEndorsedByYou = () => {
    dispatch(toggleEndorsedByYou());
  };

  const handleClickReportedByYou = () => {
    dispatch(toggleReportedByYou());
  };

  const handleClickShowReportedUsers = () => {
    dispatch(toggleShowReportedUsers());
  };

  return (
    <>
      {isConnected && endorsedByYou && (
        <Tag
          variant="category"
          background="success.muted"
          color="success.default"
        >
          <TagLabel>
            <Trans>Endorsed by you</Trans>
          </TagLabel>
          <CloseIcon
            data-testid="filter-endorsed-by-you-close"
            onClick={handleClickEndorsedByYou}
            cursor="pointer"
            marginLeft="1.5"
            width="0.6875rem"
          />
        </Tag>
      )}
      {isConnected && reportedByYou && (
        <Tag
          variant="category"
          background="success.muted"
          color="success.default"
        >
          <TagLabel>
            <Trans>Reported by you</Trans>
          </TagLabel>
          <CloseIcon
            data-testid="filter-reported-by-you-close"
            onClick={handleClickReportedByYou}
            cursor="pointer"
            marginLeft="1.5"
            width="0.6875rem"
          />
        </Tag>
      )}
      {categories.map((category) => (
        <FilterTag
          key={category}
          category={category}
          handleClick={handleCategoryClick}
        />
      ))}
      {showReportedUsers && (
        <Tag variant="category" background="error.muted" color="error.default">
          <TagLabel>
            <Trans>Reported users</Trans>
          </TagLabel>
          <CloseIcon
            data-testid="filter-reported-users-close"
            onClick={handleClickShowReportedUsers}
            cursor="pointer"
            marginLeft="1.5"
            width="0.6875rem"
          />
        </Tag>
      )}
    </>
  );
};
