import { Link } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import { trimAddress } from '../utils/string';

export type Account = {
  name?: string;
  address: string;
};

export type AccountLinkProps = {
  account: Account;
};

export const AccountLink: FunctionComponent<AccountLinkProps> = ({
  account,
}) => {
  let { name } = account;
  name = name?.trim();

  return (
    <Link as={GatsbyLink} variant="landing" to={`/account/${account.address}`}>
      {name && name.length > 0 ? name : trimAddress(account.address)}
    </Link>
  );
};
