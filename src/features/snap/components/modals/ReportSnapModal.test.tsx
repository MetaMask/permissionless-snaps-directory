import { act } from '@testing-library/react';

import { ReportSnapModal } from './ReportSnapModal';
import { render } from '../../../../utils/test-utils';

describe('ReportSnapModal', () => {
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

    expect(queryByText('Report an Untrustworthy Snap')).toBeInTheDocument();
    expect(queryByText('snap1')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
    expect(queryByText('Sign to report')).toBeInTheDocument();
  });

  it('checks checkbox options when clicked', () => {
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

  it('calls `onSign` when sign button is clicked', async () => {
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
