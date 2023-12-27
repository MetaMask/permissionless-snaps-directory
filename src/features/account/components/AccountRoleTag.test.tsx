import { AccountRoleTags, AccountRole } from './AccountRoleTags';
import { render } from '../../../utils/test-utils';

describe('AccountRoleTags', () => {
  it('renders', () => {
    const { queryByTestId } = render(
      <AccountRoleTags
        roles={[
          AccountRole.AUDITOR,
          AccountRole.DEVELOPER,
          AccountRole.REVIEWER,
        ]}
      />,
    );

    expect(queryByTestId('account-role-developer')).toBeInTheDocument();
    expect(queryByTestId('account-role-reviewer')).toBeInTheDocument();
    expect(queryByTestId('account-role-auditor')).toBeInTheDocument();
  });

  it('renders developer account role tag', () => {
    const { queryByTestId } = render(
      <AccountRoleTags roles={[AccountRole.DEVELOPER]} />,
    );

    expect(queryByTestId('account-role-developer')).toBeInTheDocument();
    expect(queryByTestId('account-role-reviewer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-auditor')).not.toBeInTheDocument();
  });

  it('renders reviewer account role tag', () => {
    const { queryByTestId } = render(
      <AccountRoleTags roles={[AccountRole.REVIEWER]} />,
    );

    expect(queryByTestId('account-role-developer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-reviewer')).toBeInTheDocument();
    expect(queryByTestId('account-role-auditor')).not.toBeInTheDocument();
  });

  it('renders auditor account role tag', () => {
    const { queryByTestId } = render(
      <AccountRoleTags roles={[AccountRole.AUDITOR]} />,
    );

    expect(queryByTestId('account-role-developer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-reviewer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-auditor')).toBeInTheDocument();
  });

  it('does not render account role tags if provided `roles` is an empty array', () => {
    const { queryByTestId } = render(<AccountRoleTags roles={[]} />);

    expect(queryByTestId('account-role-developer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-reviewer')).not.toBeInTheDocument();
    expect(queryByTestId('account-role-auditor')).not.toBeInTheDocument();
  });
});
