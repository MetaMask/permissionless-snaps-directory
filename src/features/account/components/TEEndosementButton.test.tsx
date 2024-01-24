import { TEEndosementButton } from './TEEndosementButton';
import { render } from '../../../utils/test-utils';

describe('TEEndosementButton', () => {
  it('renders `Endose` when `endosed` is false', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <TEEndosementButton endosed={false} onClick={onClickSpy} />,
    );

    expect(queryByText('Endose')).toBeInTheDocument();
  });

  it('renders `Endosed` when `endosed` is true', () => {
    const onClickSpy = jest.fn();

    const { queryByText } = render(
      <TEEndosementButton endosed={true} onClick={onClickSpy} />,
    );

    expect(queryByText('Endosed')).toBeInTheDocument();
  });
});
