import { act } from '@testing-library/react';

import { ReportSnapModal } from './ReportSnapModal';
import { render } from '../../../../utils/test-utils';

describe('AccountReportModal', () => {
  it('renders', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { queryByText } = render(
      <ReportSnapModal
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    expect(queryByText('Sign to report')).toBeInTheDocument();
    expect(queryByText('snap1')).toBeInTheDocument();
  });

  it("calls `onSign` with selected item's value when clicking on sign button", async () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByText } = render(
      <ReportSnapModal
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    await act(async () => {
      getByText('Sign to report').click();
    });

    expect(onSign).toHaveBeenCalled();
  });
});
