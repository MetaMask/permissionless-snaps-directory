import { TEEndorsementButton } from './TEEndorsementButton';
import { render } from '../../../utils/test-utils';

describe('TEEndorsementButton', () => {
  it('renders `Endorse` when `endorsed` is false', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <TEEndorsementButton endorsed={false} onClick={onClickSpy} />,
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
  });

  it('renders `Endorsed` when `endorsed` is true', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <TEEndorsementButton endorsed={true} onClick={onClickSpy} />,
    );

    expect(queryByText('Endorsed')).toBeInTheDocument();
  });
});
