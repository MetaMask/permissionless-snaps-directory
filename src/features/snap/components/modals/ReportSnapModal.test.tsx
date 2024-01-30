import { act } from '@testing-library/react';

import { ReportSnapModal } from './ReportSnapModal';
import { render } from '../../../../utils/test-utils';

describe('AccountReportModal', () => {
  const options = ['option1', 'option2'];
  it('renders', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { queryByText } = render(
      <ReportSnapModal
        options={options}
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    expect(queryByText('Sign to report')).toBeInTheDocument();
    expect(queryByText('snap1')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
  });

  it('check checkbox options click', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByLabelText } = render(
      <ReportSnapModal
        options={options}
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    expect(getByLabelText('option1')).not.toBeChecked();
    expect(getByLabelText('option2')).not.toBeChecked();

    act(() => {
      getByLabelText('option1').click();
      getByLabelText('option2').click();
    });
    expect(getByLabelText('option1')).toBeChecked();
    expect(getByLabelText('option2')).toBeChecked();
  });

  it('calls `onSign` when clicking on sign button', async () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByText } = render(
      <ReportSnapModal
        options={options}
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
