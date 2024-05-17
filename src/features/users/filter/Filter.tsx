import {
  Divider,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useAccount } from 'wagmi';

import {
  FilterButton,
  FilterCategory,
  FilterItem,
  FilterTags,
} from './components';
import { USER_CATEGORY_LABELS } from './constants';
import { useDispatch, useSelector } from '../../../hooks';
import {
  getEndorsedByYou,
  getReportedByYou,
  getShowReportedUsers,
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
  type UserCategory,
} from '../store';

export const Filter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const endorsedByYou = useSelector(getEndorsedByYou);
  const reportedByYou = useSelector(getReportedByYou);
  const showReportedUsers = useSelector(getShowReportedUsers);

  const { isConnected } = useAccount();

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
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Menu closeOnSelect={false} isLazy={true}>
        <MenuButton as={FilterButton} />
        <MenuList width="17.188rem" boxShadow="md">
          {isConnected && (
            <>
              <MenuGroup
                marginLeft="2"
                title={t`For you`}
                data-testid="menu-group"
              >
                <FilterItem
                  checked={endorsedByYou}
                  onClick={handleClickEndorsedByYou}
                >
                  <Text>
                    <Trans>Endorsed by you</Trans>
                  </Text>
                </FilterItem>
                <FilterItem
                  checked={reportedByYou}
                  onClick={handleClickReportedByYou}
                >
                  <Text>
                    <Trans>Reported by you</Trans>
                  </Text>
                </FilterItem>
              </MenuGroup>
              <Divider borderColor={'#E2E8F0'} />
            </>
          )}
          <MenuGroup
            marginLeft="2"
            title={t`Categories`}
            data-testid="menu-group"
          >
            {Object.entries(USER_CATEGORY_LABELS).map(
              ([category, { name }]) => (
                <FilterCategory
                  key={name.id}
                  category={category as UserCategory}
                />
              ),
            )}
          </MenuGroup>
          <Divider borderColor={'#E2E8F0'} />
          <MenuGroup marginLeft="2" title={''}>
            <FilterItem
              checked={showReportedUsers}
              onClick={handleClickShowReportedUsers}
            >
              <Text variant="red">
                <Trans>Show reported users</Trans>
              </Text>
            </FilterItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <FilterTags />
    </Stack>
  );
};
