import { act } from '@testing-library/react';

import { SnapReport } from './ReportSnap';
import { render } from '../../../utils/test-utils';

describe('AccountReport', () => {
  it('renders', async () => {
    const { queryByText } = render(<SnapReport snapName="Snap1" />);

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('should show modal when click report button', async () => {
    const { queryByText, getByText } = render(<SnapReport snapName="Snap1" />);

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
  });

  it('should close modal when click close button', async () => {
    const { queryByText, getByText, getByLabelText } = render(
      <SnapReport snapName="Snap1" />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Sign to report')).not.toBeInTheDocument();
  });

  it('should display `reported` when report success', async () => {
    const { queryByText, getByText } = render(<SnapReport snapName="Snap1" />);

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    expect(queryByText('Reported')).toBeInTheDocument();
    expect(queryByText('Reported')).toBeDisabled();
  });
});
