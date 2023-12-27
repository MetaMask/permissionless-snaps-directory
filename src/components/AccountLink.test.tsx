import { AccountLink } from './AccountLink';
import { render } from '../utils/test-utils';

describe('AccountLink', () => {
  it('renders account name when account name provided', () => {
    const { queryByText } = render(
      <AccountLink
        account={{
          name: 'Account Name',
          address: '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7',
        }}
      />,
    );

    expect(queryByText('Account Name')).toBeInTheDocument();
  });

  it('renders trimed address when account name is not provided', () => {
    const { queryByText } = render(
      <AccountLink
        account={{
          address: '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7',
        }}
      />,
    );

    expect(queryByText('0x6B24a...57Cc7')).toBeInTheDocument();
  });

  it('renders trimed address when account name is a empty string', () => {
    const { queryByText } = render(
      <AccountLink
        account={{
          address: '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7',
          name: ' ',
        }}
      />,
    );

    expect(queryByText('0x6B24a...57Cc7')).toBeInTheDocument();
  });
});
