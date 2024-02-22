import { ReviewsTabPanel } from './ReviewsTabPanel';
import { render } from '../../../../utils/test-utils';

describe('ReviewsTabPanel', () => {
  it('renders', () => {
    const { queryByTestId } = render(<ReviewsTabPanel />);
    expect(queryByTestId('reviews-tab')).toBeInTheDocument();
  });
});
