import { AccountRoleTags, AccountRole } from './AccountRoleTags';
import { render } from '../../../utils/test-utils';

describe('AccountRoleTags', () => {
  it('renders', () => {
    const { queryByText } = render(
      <AccountRoleTags
        roles={[
          AccountRole.Auditor,
          AccountRole.Developer,
          AccountRole.Reviewer,
        ]}
      />,
    );

    expect(queryByText('Developer')).toBeInTheDocument();
    expect(queryByText('Reviewer')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('does not render account role tags if provided `roles` is not an `AccountRole`', () => {
    const { queryByText } = render(
      // @ts-expect-error - Invalid role.
      <AccountRoleTags roles={['test']} />,
    );

    expect(queryByText('Developer')).not.toBeInTheDocument();
    expect(queryByText('Reviewer')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).not.toBeInTheDocument();
  });

  it('does not render account role tags if provided `roles` is an empty array', () => {
    const { queryByText } = render(<AccountRoleTags roles={[]} />);

    expect(queryByText('Developer')).not.toBeInTheDocument();
    expect(queryByText('Reviewer')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).not.toBeInTheDocument();
  });
});
