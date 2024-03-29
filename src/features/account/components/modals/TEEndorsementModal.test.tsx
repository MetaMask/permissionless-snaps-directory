import { act } from '@testing-library/react';

import { TEEndorsementModal } from './TEEndorsementModal';
import { render } from '../../../../utils/test-utils';

describe('TEEndorsementModal', () => {
  const options = [
    {
      label: 'option1',
      description: 'description 1',
      value: 'value 1',
    },
    {
      label: 'option2',
      description: 'description 2',
      value: 'value 2',
    },
  ];

  it('renders', () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { queryByText } = render(
      <TEEndorsementModal
        trustEntity="mock.ens.name"
        options={options}
        onClose={onClose}
        onSign={onSign}
        visibility={true}
      />,
    );

    expect(queryByText('Endorse Technical Expertises')).toBeInTheDocument();
    expect(queryByText('mock.ens.name')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
    expect(queryByText('Sign to endorse')).toBeInTheDocument();
  });

  it('does not render description if it has not provided', async () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const optionsWithoutDescription = options.map((option) => ({
      label: option.label,
      value: option.value,
    }));

    const { queryByText } = render(
      <TEEndorsementModal
        trustEntity="mock.ens.name"
        options={optionsWithoutDescription}
        onClose={onClose}
        onSign={onSign}
        visibility={true}
      />,
    );

    expect(queryByText('Sign to endorse')).toBeInTheDocument();
    expect(queryByText('option1')).toBeInTheDocument();
    expect(queryByText('option2')).toBeInTheDocument();
    expect(queryByText('description 1')).not.toBeInTheDocument();
    expect(queryByText('description 2')).not.toBeInTheDocument();
  });

  it("calls `onSign` with selected item's value when clicking on sign button", async () => {
    const onSign = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    const { getByText } = render(
      <TEEndorsementModal
        trustEntity="mock.ens.name"
        options={options}
        onClose={onClose}
        onSign={onSign}
        visibility={true}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('option1').click();
        getByText('Sign to endorse').click();
      }),
    );

    expect(onSign).toHaveBeenCalledWith(['value 1']);
  });
});
