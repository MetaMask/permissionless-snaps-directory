import { Tag, TagLabel, TagLeftIcon, HStack } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { AuditorIcon, DeveloperIcon, ReviewerIcon } from '../../../components';

export enum AccountRole {
  Developer = 'developer',
  Auditor = 'auditor',
  Reviewer = 'reviewer',
}

export type AccountRoleTagProps = {
  roles: AccountRole[];
};

export const AccountRoleTags: FunctionComponent<AccountRoleTagProps> = ({
  roles,
}) => {
  const roleset = new Set(roles);
  const roleArr = Array.from(roleset);

  return (
    <HStack spacing={2} alignItems="center">
      {roleArr.map((role, i) => {
        switch (role) {
          case AccountRole.Developer:
            return (
              <Tag
                key={i}
                size={'lg'}
                variant={'solid'}
                bg={'#FFDC5B40'}
                borderRadius={'full'}
                data-testid="account-role-developer"
              >
                <TagLeftIcon boxSize={'16px'} as={DeveloperIcon} />
                <TagLabel color={'#FFC700'}>
                  <Trans>Developer</Trans>
                </TagLabel>
              </Tag>
            );
          case AccountRole.Auditor:
            return (
              <Tag
                key={i}
                size={'lg'}
                variant={'solid'}
                bg={'#72398E40'}
                borderRadius={'full'}
                data-testid="account-role-auditor"
              >
                <TagLeftIcon boxSize={'16px'} as={AuditorIcon} />
                <TagLabel color={'#AE00FF'}>
                  <Trans>Auditor</Trans>
                </TagLabel>
              </Tag>
            );
          case AccountRole.Reviewer:
            return (
              <Tag
                key={i}
                size={'lg'}
                variant={'solid'}
                bg={'#42FF3240'}
                borderRadius={'full'}
                data-testid="account-role-reviewer"
              >
                <TagLeftIcon boxSize={'16px'} as={ReviewerIcon} />
                <TagLabel color={'#0FB900'}>
                  <Trans>Reviewer</Trans>
                </TagLabel>
              </Tag>
            );
          default:
            return null;
        }
      })}
    </HStack>
  );
};
