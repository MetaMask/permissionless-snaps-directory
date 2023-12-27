import { Rating } from './Rating';
import { render } from '../utils/test-utils';

describe('Rating', () => {
  it('renders', async () => {
    const { queryByTestId } = render(<Rating rate={1} maxRate={2} />);

    expect(queryByTestId('filled-0')).toBeInTheDocument();
    expect(queryByTestId('empty-0')).toBeInTheDocument();
  });

  it('renders correctly when provided parameter `rate` larger than `maxRate`', async () => {
    const { queryByTestId } = render(<Rating rate={10} maxRate={2} />);

    expect(queryByTestId('filled-0')).toBeInTheDocument();
    expect(queryByTestId('filled-1')).toBeInTheDocument();
    expect(queryByTestId('filled-3')).not.toBeInTheDocument();
    expect(queryByTestId('empty-0')).not.toBeInTheDocument();
  });
});
