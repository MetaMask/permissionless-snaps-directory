import { act } from '@testing-library/react';

import { AccountReportModal } from './AccountReportModal';
import { render } from '../../../../utils/test-utils';

describe('AccountReportModal', () => {
  const options = ['label 1', 'label 2', 'label 3'];

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

    expect(queryByText('Sign to report')).toBeInTheDocument();
    expect(queryByText('label 1')).toBeInTheDocument();
    expect(queryByText('label 2')).toBeInTheDocument();
    expect(queryByText('label 3')).toBeInTheDocument();
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

    await act(async () =>
      act(() => {
        getByText('label 1').click();
        getByText('Sign to report').click();
      }),
    );

    expect(onSign).toHaveBeenCalledWith(['label 1']);
  });
});
