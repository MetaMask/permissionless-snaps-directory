import { EndorseButton } from './EndorseButton';
import { render } from '../utils/test-utils';

describe('EndorseButton', () => {
  it('renders `Endorse` when `endorsed` is false', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <EndorseButton endorsed={false} onClick={onClickSpy} />,
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
  });

  it('renders `Endorsed` when `endorsed` is true', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <EndorseButton endorsed={true} onClick={onClickSpy} />,
    );

    expect(queryByText('Endorsed')).toBeInTheDocument();
  });
});
