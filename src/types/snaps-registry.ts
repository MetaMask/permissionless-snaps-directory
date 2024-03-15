import { SnapsRegistryDatabaseStruct } from '@metamask/snaps-registry';
import type { Infer } from 'superstruct';
import { assign, object, string } from 'superstruct';

const PermissionlessSnapsRegistryDatabaseStruct = assign(
  SnapsRegistryDatabaseStruct,
  object({
    author: object({ name: string(), website: string(), address: string() }),
  }),
);

export type PermissionlessSnapsRegistryDatabase = Infer<
  typeof PermissionlessSnapsRegistryDatabaseStruct
>;
