import { AccountReportButton } from './AccountReportButton';
import { render } from '../../../utils/test-utils';

describe('AccountReportButton', () => {
  it('renders `Report` when `reported` is false', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <AccountReportButton reported={false} onClick={onClickSpy} />,
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('renders `Reported` when `reported` is true', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <AccountReportButton reported={true} onClick={onClickSpy} />,
    );

    expect(queryByText('Reported')).toBeInTheDocument();
  });
});
