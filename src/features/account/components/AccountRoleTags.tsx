import { HStack, Tag, TagLabel } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { type FunctionComponent } from 'react';

import { TrustScoreScope } from '../trust-score/types';

export enum AccountRoleType {
  Developer = 'developer',
  Security = 'security',
  Auditor = 'auditor',
  Builder = 'builder',
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
  isAuditor?: boolean | undefined;
  isBuilder?: boolean | undefined;
};

export const AccountRoleTags: FunctionComponent<AccountRoleTagProps> = ({
  trustScores,
  isAuditor,
  isBuilder,
}) => {
  let roles = [] as AccountRole[];

  if (isBuilder) {
    roles.push({
      roleType: AccountRoleType.Builder,
      tier: 0,
    });
  }

  if (isAuditor) {
    roles.push({
      roleType: AccountRoleType.Auditor,
      tier: 0,
    });
  }

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
          roleType: AccountRoleType.Security,
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
      case AccountRoleType.Security:
        return {
          bg: '#72398E40',
          color: '#AE00FF',
          label: t`Security Engineer`,
        };
      case AccountRoleType.Auditor:
        return {
          bg: '#F66A0A1A',
          color: '#F66A0A',
          label: t`Auditor`,
        };
      case AccountRoleType.Builder:
        return {
          bg: '#1C823440',
          color: '#1C8234',
          label: t`Builder`,
        };
      default:
        return {
          bg: '#D738471A',
          color: '#D73847',
          label: t`Reported`,
        };
    }
  };

  const getRoleIcon = (role: AccountRole) => {
    switch (role.roleType) {
      case AccountRoleType.Developer:
        return '🧑‍💻';
      case AccountRoleType.Auditor:
        return '🛡️';
      case AccountRoleType.Builder:
        return '🛠';
      case AccountRoleType.Security:
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
