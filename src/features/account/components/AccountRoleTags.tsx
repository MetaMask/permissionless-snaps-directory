import { Tag, TagLabel, TagLeftIcon, HStack } from '@chakra-ui/react';
import { t } from '@lingui/macro';
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

  const roleAttrs = {
    [AccountRole.Developer]: {
      bg: '#FFDC5B40',
      color: '#FFC700',
      icon: DeveloperIcon,
      label: t`Developer`,
    },
    [AccountRole.Auditor]: {
      bg: '#72398E40',
      color: '#AE00FF',
      icon: AuditorIcon,
      label: t`Auditor`,
    },
    [AccountRole.Reviewer]: {
      bg: '#42FF3240',
      color: '#0FB900',
      icon: ReviewerIcon,
      label: t`Reviewer`,
    },
  };

  return (
    <HStack spacing="2" alignItems="center">
      {roleArr.map((role, i) => {
        const attr = roleAttrs[role];

        if (attr === undefined) {
          return null;
        }

        return (
          <Tag
            key={i}
            size="lg"
            variant="solid"
            bg={attr.bg}
            borderRadius="full"
          >
            <TagLeftIcon boxSize="16px" as={attr.icon} />
            <TagLabel color={attr.color}>{attr.label}</TagLabel>
          </Tag>
        );
      })}
    </HStack>
  );
};
