import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import { UserCategory } from '../store';

export const USER_CATEGORY_LABELS: Record<
  UserCategory,
  {
    name: MessageDescriptor;
    description: MessageDescriptor;
  }
> = {
  [UserCategory.Auditor]: {
    name: defineMessage`Auditor`,
    description: defineMessage`Show auditors from existing snaps.`,
  },
  [UserCategory.Builder]: {
    name: defineMessage`Builder`,
    description: defineMessage`Show builders who have developed at least one snap.`,
  },
  [UserCategory.SecurityEngineer]: {
    name: defineMessage`Security Engineer`,
    description: defineMessage`Show security engineers.`,
  },
  [UserCategory.SoftwareEngineer]: {
    name: defineMessage`Software Engineer`,
    description: defineMessage`Show software engineers from the community.`,
  },
};
