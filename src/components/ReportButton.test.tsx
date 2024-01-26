import { ReportButton } from './ReportButton';
import { render } from '../utils/test-utils';

describe('ReportButton', () => {
  it('renders `Report` when `reported` is false', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <ReportButton reported={false} onClick={onClickSpy} />,
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('renders `Reported` when `reported` is true', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <ReportButton reported={true} onClick={onClickSpy} />,
    );

    expect(queryByText('Reported')).toBeInTheDocument();
  });
});
