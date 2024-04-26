import { HStack, Tag, TagLabel } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { type FunctionComponent } from 'react';

import { TrustScoreScope } from '../trust-score/types';

export enum AccountRoleType {
  Developer = 'developer',
  Auditor = 'auditor',
  Reported = 'reported',
}

export type AccountRole = {
  roleType: AccountRoleType;
  tier: number;
};

export type AccountTrustScore = {
  result: number;
  trustScoreScope: TrustScoreScope;
  accuracy?: number | undefined;
};

export type AccountRoleTagProps = {
  trustScores: AccountTrustScore[];
};

export const AccountRoleTags: FunctionComponent<AccountRoleTagProps> = ({
  trustScores,
}) => {
  let roles = [] as AccountRole[];

  for (const trustScore of trustScores) {
    if (trustScore.result >= 0) {
      if (trustScore.trustScoreScope === TrustScoreScope.SoftwareDevelopment) {
        const role: AccountRole = {
          roleType: AccountRoleType.Developer,
          tier: 0,
        };
        roles.push(role);
      } else {
        let tier = 0;
        if (trustScore.accuracy !== undefined) {
          if (trustScore.accuracy >= 0.99) {
            tier = 1;
          } else if (trustScore.accuracy >= 0.9) {
            tier = 2;
          } else if (trustScore.accuracy >= 0.75) {
            tier = 3;
          }
        }
        const role: AccountRole = {
          roleType: AccountRoleType.Auditor,
          tier,
        };
        roles.push(role);
      }
    } else {
      // If there is reported role, remove all other roles
      const role: AccountRole = {
        roleType: AccountRoleType.Reported,
        tier: 0,
      };
      roles = [role];
      break;
    }
  }

  const getRoleAttributes = (role: AccountRole) => {
    switch (role.roleType) {
      case AccountRoleType.Developer:
        return {
          bg: '#FFDC5B40',
          color: '#FFC700',
          label: t`Software Engineer`,
        };
      case AccountRoleType.Reported:
        return {
          bg: '#D738471A',
          color: '#D73847',
          label: t`Reported`,
        };
      default:
        return {
          bg: '#72398E40',
          color: '#AE00FF',
          label: t`Security Engineer`,
        };
    }
  };

  const getRoleIcon = (role: AccountRole) => {
    switch (role.roleType) {
      case AccountRoleType.Developer:
        return '🧑‍💻';
      case AccountRoleType.Auditor:
        switch (role.tier) {
          case 1:
            return '🥇';
          case 2:
            return '🥈';
          case 3:
            return '🥉';
          default:
            return '';
        }
      default:
        return '👹';
    }
  };

  return (
    <HStack spacing="2" alignItems="center">
      {roles.map((role, i) => {
        const attr = getRoleAttributes(role);
        return (
          <Tag key={i} variant="user" bg={attr.bg} borderRadius="full">
            <TagLabel color={attr.color}>
              {getRoleIcon(role)} {attr.label}
            </TagLabel>
          </Tag>
        );
      })}
    </HStack>
  );
};
