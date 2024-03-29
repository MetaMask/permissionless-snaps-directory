import { act } from '@testing-library/react';

import { AccountReportModal } from './AccountReportModal';
import { render } from '../../../../utils/test-utils';

describe('AccountReportModal', () => {
  const options = ['option1', 'option2'];

  it('renders', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { queryByText } = render(
      <AccountReportModal
        reportEntity="mock.ens.name"
        options={options}
        onClose={onClose}
        onSign={onSign}
        visibility={true}
      />,
    );

    expect(queryByText('Report a Malicious Actor')).toBeInTheDocument();
    expect(queryByText('mock.ens.name')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
    expect(queryByText('Sign to report')).toBeInTheDocument();
  });

  it("calls `onSign` with selected item's value when clicking on sign button", async () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByText } = render(
      <AccountReportModal
        reportEntity="mock.ens.name"
        options={options}
        onClose={onClose}
        onSign={onSign}
        visibility={true}
      />,
    );

    await act(async () => {
      getByText('option1').click();
      getByText('Sign to report').click();
    });

    expect(onSign).toHaveBeenCalledWith(['option1']);
  });
});
