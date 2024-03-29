import { act } from '@testing-library/react';

import { EndorseSnapModal } from './EndorseSnapModal';
import { render } from '../../../../utils/test-utils';

describe('EndorseSnapModal', () => {
  const options = ['option1', 'option2'];
  it('renders', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { queryByText } = render(
      <EndorseSnapModal
        options={options}
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    expect(queryByText('Endorse a Trustworthy Snap')).toBeInTheDocument();
    expect(queryByText('snap1')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
    expect(queryByText('Sign to endorse')).toBeInTheDocument();
  });

  it('checks checkbox options when clicked', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByLabelText } = render(
      <EndorseSnapModal
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
      <EndorseSnapModal
        options={options}
        snapName="snap1"
        onClose={onClose}
        onSign={onSign}
        isOpen={true}
      />,
    );

    await act(async () => {
      getByText('Sign to endorse').click();
    });

    expect(onSign).toHaveBeenCalled();
  });
});
